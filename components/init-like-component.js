import { addingLikesPosts, removeLikesPosts } from '../api.js'
import { goToPage } from '../index.js'
import { AUTH_PAGE } from '../routes.js'

export const initLikeComponent = (
    renderPostsPageComponent,
    appEl,
    token,
    posts,
) => {
    // token = getToken()
    const likesButtons = appEl.querySelectorAll('.like-button')

    likesButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', async (event) => {
            event.stopPropagation()

            const postId = likeButton.dataset.postId
            const isLiked = likeButton
                .querySelector('img')
                .src.includes('like-active.svg')

            if (!token) {
                alert('Необходимо авторизоваться')
                goToPage(AUTH_PAGE)
                return
            }

            try {
                let updatePost

                if (isLiked) {
                    updatePost = await removeLikesPosts({ token, postId })
                } else {
                    updatePost = await addingLikesPosts({
                        token,
                        postId,
                    })
                    // .catch((error) => {
                    //     alert(error.message)
                    //     goToPage(AUTH_PAGE)
                    // })
                }

                const postIndex = posts.findIndex(
                    (post) => post.id === updatePost.post.id,
                )
                posts[postIndex] = updatePost.post

                renderPostsPageComponent({ appEl, posts })
            } catch (error) {
                console.log(error)

                if (error.responce && error.response.status === 401) {
                    alert('Сессия истекла. Пожалуйста, авторизуйтесь')
                    goToPage(AUTH_PAGE)
                }
            }
        })
    })
}
