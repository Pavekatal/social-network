import { renderHeaderComponent } from './header-component.js'
import { renderUploadImageComponent } from './upload-image-component.js'

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    let imageUrl = ''

    const render = () => {
        // @TODO: Реализовать страницу добавления поста

        const appHtml = `
            <div class="page-container">
            <div class="header-container"></div>
            <div class="add-post-container">
                <h3>Cтраница добавления поста</h3> 
                <div class="upload-image-container"></div>
                <input type="text" class="input add-input-post" placeholder="Введите описание поста"/>
                <button class="button" id="add-button">Добавить</button>
            </div>
            </div>
        `
        appEl.innerHTML = appHtml

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        })

        const uploadImageContainer = document.querySelector(
            '.upload-image-container',
        )

        renderUploadImageComponent({
            element: uploadImageContainer,
            onImageUrlChange(newImageUrl) {
                imageUrl = newImageUrl
                console.log(imageUrl)
            },
        })

        document.getElementById('add-button').addEventListener('click', () => {
            const imageDescription =
                document.querySelector('.add-input-post').value
            const imageUploadUrl = imageUrl //document.querySelector('.file-upload-image')

            if (!imageDescription && !imageUploadUrl) {
                alert('Загрузите фото и добавьте к нему описание')
                return
            }

            if (!imageDescription) {
                alert('Добавьте описание к посту')
                return
            }

            if (!imageUploadUrl) {
                alert('Загрузите фото')
                return
            }

            onAddPostClick({
                description: imageDescription,
                imageUrl: imageUploadUrl,
            })
        })
    }

    render()
}
