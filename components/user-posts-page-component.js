import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { goToPage, getToken, user } from '../index.js'
import {
    initLikeComponent,
    renderModalLikesList,
} from './init-like-component.js'
import { clearingHtml } from './clearing-html-component.js'
import { deletePostCoponent } from './delete-post-component.js'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

export function renderUserPostsPageComponent({ appEl, posts }) {
    // @TODO: реализовать рендер постов из api
    if (!posts || posts.length === 0) {
        appEl.innerHTML = `<p>У этого пользователя нет публикаций</p>`
        return
    }

    const authorPosts = posts[0].user

    const postHtml = posts
        .map((post, index) => {
            const createdPostDate = post.createdAt

            const result = formatDistanceToNow(createdPostDate, {
                addSuffix: true,
                locale: ru,
            })

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
                        <div class="post-header__user-data">
                            <img src="${post.user.imageUrl}" class="post-header__user-image">
                            <p class="post-header__user-name">${clearingHtml(post.user.name)}</p>
                        </div>
                        <div>
                            <button data-post-id="${post.id}" class="header-button delete-post-button">×</button>
                        </div>
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
                      <div class="post-modal-container" style="display: none">
                        <div class="post-modal-content">
                            <p class="post-modal-header">Пользователи, которым понравился пост</p>
                            <span class="button-close-modal">&times;</span>
                        </div>
                        <div class="post-modal-list"></div>
                      </div>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${clearingHtml(post.user.name)}</span>
                      ${clearingHtml(post.description)}
                    </p>
                    <p class="post-date">
                      ${result}
                    </p>
                  </li>`
        })
        .join('')

    const appHtml = `
        <div class="page-container">
            <div class="header-container"></div>
            <div class="post-user-header">
                <h3 class="post-user-heading">Публикации пользователя</h3> 
                <div class="post-user-content">
                    <img class="post-header__user-image post-user-header-image" src="${authorPosts.imageUrl}">
                    <p class="post-user-name">${clearingHtml(authorPosts.name)}</p>
                </div>
            </div> 
            <ul class="posts">${postHtml}</ul>
        </div>`
    console.log(user)
    appEl.innerHTML = appHtml

    initLikeComponent(renderUserPostsPageComponent, appEl, getToken(), posts)
    deletePostCoponent(getToken(), USER_POSTS_PAGE)
    renderModalLikesList(posts)

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
