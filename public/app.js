document.addEventListener('click', event => {
  const dataset = event.target.dataset
  const id = dataset.id
  if (dataset.type === 'remove') {
    remove(id).then(() => event.target.closest('li').remove())
  }
  if (dataset.type === 'edit') {
    const titleElement = event.target.closest('li').querySelector('p[data-type="title"]')
    const newTitle = prompt('Введите новое название', titleElement.textContent.trim())
    if (newTitle) {
      edit(id, newTitle).then(() => {
        titleElement.textContent = newTitle
      })
    }
  }
})


async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
  const body = JSON.stringify({ title, id })
  await fetch('/', { method: 'PUT', body, headers: { 'Content-Type': 'application/json' } })
}
