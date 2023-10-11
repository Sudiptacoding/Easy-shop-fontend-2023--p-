const getDataCard = () => {
    const card = localStorage.getItem('card')
    if (card) {
        return JSON.parse(card)
    } return []
}

const saveData = (item) => {
    const saveProduct = JSON.stringify(item)
    localStorage.setItem('card', saveProduct)
}
const addDataCard = (id) => {
    const card = getDataCard();
    card.push(id)
    saveData(card)
}

const removeCardData = (id) => {
    const card = getDataCard()

    const filterValue = card.filter(p => p !== id)
    saveData(filterValue)
}



export { addDataCard, getDataCard, removeCardData }