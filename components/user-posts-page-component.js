import { renderHeaderComponent } from './header-component.js'
import { posts } from '../index.js'
import { initLikeComponent } from './init-like-component.js'
// import { userName } from '../index.js'
import { clearingHtml } from './clearing-html-component.js'
import { renderPostsPageComponent } from './posts-page-component.js'

export function renderUserPostsPageComponent({ appEl, userId }) {
    const postHtml = posts
        .filter((post) => post.user.id === userId)
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
                    <ul class="posts">${postHtml}</ul>
                </div>`

    appEl.innerHTML = appHtml

    initLikeComponent(renderPostsPageComponent, appEl)
    console.log('Актуальный список постов:', posts)

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    })
}
