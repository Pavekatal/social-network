import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { posts, goToPage } from '../index.js'
import { initLikeComponent } from './init-like-component.js'
import { userName } from '../api.js'

export function renderPostsPageComponent({ appEl }) {
    // @TODO: реализовать рендер постов из api

    const postHtml = posts
        .map((post, index) => {
            let likeButtonImg = post.isLiked
                ? '<img src="./assets/images/like-active.svg"></img>'
                : '<img src="./assets/images/like-not-active.svg"></img>'

            let likeCountText

            if (post.likes.length === 0) {
                likeCountText = '0'
            } else if (post.likes.length === 1) {
                likeCountText = `${post.likes[0].name}`
            } else if (post.likes.length === 2) {
                likeCountText = `${post.likes[0].name} и еще 1`
            } else {
                likeCountText = `${post.likes.length}`
            }

            return `<li class="post" data-post-index="${index}"> 
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        ${likeButtonImg}
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong class="post-likes-count">${likeCountText}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${userName}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${new Date(post.createdAt).toLocaleString()}
                    </p>
                  </li>`
        })
        .join('')

    const appHtml = `
        <div class="page-container">
            <div class="header-container"></div>
                <ul class="posts">${postHtml}</ul>
            </div>`

    appEl.innerHTML = appHtml
    initLikeComponent(renderPostsPageComponent, appEl)
    console.log('Актуальный список постов:', posts)

    /**
     * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    })

    for (let userEl of document.querySelectorAll('.post-header')) {
        userEl.addEventListener('click', () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            })
        })
    }
}
