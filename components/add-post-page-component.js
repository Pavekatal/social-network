import { renderHeaderComponent } from './header-component.js'
import { renderUploadImageComponent } from './upload-image-component.js'

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    // let imageUrl = ''

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

        if (uploadImageContainer) {
            renderUploadImageComponent({
                element: uploadImageContainer,
                onImageUrlChange(newImageUrl) {
                    imageUrl = newImageUrl
                },
            })
        }

        document.getElementById('add-button').addEventListener('click', () => {
            onAddPostClick({
                description: 'Описание картинки',
                imageUrl: 'https://image.png',
            })
        })
    }

    render()
}
