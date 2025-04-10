export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    const render = () => {
        // @TODO: Реализовать страницу добавления поста
        const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="add-post-container">
        <h2>Cтраница добавления поста</h2> 
        <input type="text" class="input add-input-post" placeholder="Введите описание поста"/>
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `

        appEl.innerHTML = appHtml

        document.getElementById('add-button').addEventListener('click', () => {
            onAddPostClick({
                description: 'Описание картинки',
                imageUrl: 'https://image.png',
            })
        })
    }

    render()
}
