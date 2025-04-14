import { addingLikesPosts, removeLikesPosts } from '../api.js'
import { goToPage } from '../index.js'
import { AUTH_PAGE } from '../routes.js'

export const initLikeComponent = (
    renderPostsPageComponent,
    appEl,
    token,
    posts,
) => {
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

export const renderModalLikesList = (posts) => {
    const likeCountsElements = document.querySelectorAll('.post-likes-count')
    const modalContainer = document.querySelector('.post-modal-container')
    const likesListElement = document.querySelector('.post-modal-list')
    const closeModalButton = document.querySelector('.button-close-modal')

    function renderLikesList(likesList) {
        likesListElement.innerHTML = ''
        likesList.forEach((likes) => {
            // const userItem = document.createElement('p')
            // userItem.textContent = user.name
            // likesListElement.appendChild(userItem)

            const userIdFromLikes = likes.id
            console.log('userIdFromLikes:', userIdFromLikes)
            const userNameFromLikes = likes.name

            const userPost = posts.find(
                (post) => post.user.id === userIdFromLikes,
            )

            if (userPost) {
                const userItem = document.createElement('div')
                userItem.classList.add('user-item')

                const userImage = document.createElement('img')
                userImage.src = userPost.user.imageUrl
                userImage.classList.add('post-header__user-image')

                const userName = document.createElement('p')
                userName.textContent = userNameFromLikes

                userItem.appendChild(userImage)
                userItem.appendChild(userName)
                likesListElement.appendChild(userItem)
            }

            // const userIdFromUsers = posts[index].user.id
            // const imageUrlFromUsers = posts[index].user.imageUrl
            // console.log('userIdFromUsers:', userIdFromUsers)
            // console.log('imageUrlFromUsers:', imageUrlFromUsers)

            // if (userIdFromLikes === userIdFromUsers) {
            //     imageUrlForLikes = imageUrlFromUsers
            // }
        })
    }

    likeCountsElements.forEach((likeCountElement, index) => {
        likeCountElement.addEventListener('click', () => {
            const likesList = posts[index].likes
            renderLikesList(likesList)
            modalContainer.style.display = 'flex'
        })
    })

    closeModalButton.addEventListener('click', () => {
        modalContainer.style.display = 'none'
    })
}
