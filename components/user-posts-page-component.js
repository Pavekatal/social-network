import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { goToPage, getToken, user } from '../index.js'
import { initLikeComponent } from './init-like-component.js'
import { clearingHtml } from './clearing-html-component.js'

export function renderUserPostsPageComponent({ appEl, posts }) {
    // @TODO: реализовать рендер постов из api
    if (!posts || posts.length === 0) {
        appEl.innerHTML = `<p>У этого пользователя нет публикаций</p>`
        return
    }

    const postHtml = posts
        .map((post, index) => {
            let likeButtonImg = post.isLiked
                ? '<img src="./assets/images/like-active.svg"></img>'
                : '<img src="./assets/images/like-not-active.svg"></img>'

            let likeCountText

            if (post.likes.length === 0) {
                likeCountText = '0'
            } else if (post.likes.length === 1) {
                likeCountText = `${clearingHtml(post.likes[0].name)}`
            } else if (post.likes.length === 2) {
                likeCountText = `${clearingHtml(post.likes[0].name)} и еще 1`
            } else {
                likeCountText = `${post.likes.length}`
            }

            return `<li class="post" data-post-index="${index}"> 
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${post.user.imageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${clearingHtml(post.user.name)}</p>
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
                      <span class="user-name">${clearingHtml(post.user.name)}</span>
                      ${clearingHtml(post.description)}
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
            <div class="post-user-header">
                <h3>Публикации пользователя</h3> 
                <img class="post-header__user-image" src="${user.imageUrl}">
                <p class="post-user-name">${clearingHtml(user.name)}</p>
            </div> 
            <ul class="posts">${postHtml}</ul>
        </div>`
    console.log(user)
    appEl.innerHTML = appHtml

    initLikeComponent(renderUserPostsPageComponent, appEl, getToken(), posts)
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
