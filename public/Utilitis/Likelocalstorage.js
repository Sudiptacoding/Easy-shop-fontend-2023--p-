const getData = () => {
    const card = localStorage.getItem('like')
    if (card) {
        return JSON.parse(card)
    } return []
}

const saveData = (item) => {
    const saveProduct = JSON.stringify(item)
    localStorage.setItem('like', saveProduct)
}
const addData = (id) => {
    const card = getData();
    card.push(id)
    saveData(card)
}

const removeCard = (id) => {
    const card = getData()
    const filterValue = card.filter(p => p !== id)
    saveData(filterValue)
}



export { addData, getData, removeCard }