import { deletePosts } from '../api.js'
import { goToPage } from '../index.js'
import { AUTH_PAGE, POSTS_PAGE } from '../routes.js'

export const deletePostCoponent = (token) => {
    const deletePostButtons = document.querySelectorAll('.delete-post-button')

    deletePostButtons.forEach((deletePostButton) => {
        deletePostButton.addEventListener('click', async (event) => {
            event.stopPropagation()
            const postId = deletePostButton.dataset.postId

            if (!token) {
                alert('Необходимо авторизоваться')
                goToPage(AUTH_PAGE)
                return
            }

            try {
                const messageForDeletePost = confirm(
                    'Вы уверены, что хотите удалить пост? ',
                )

                if (messageForDeletePost) {
                    await deletePosts({ token, postId })
                    console.log('Пост успешно удален')
                    return goToPage(POSTS_PAGE)
                } else {
                    console.log('Удаление поста отменено')
                    return
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('Сессия истекла. Пожалуйста, авторизуйтесь')
                } else {
                    alert('В процессе удаления поста произошла ошибка')
                }
            }
        })
    })
}
