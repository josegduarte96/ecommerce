
export const addProduct = (state, product) => {
    const [exist] = state.items.filter(elem => elem.id == product.id)
    if (exist) {
        const index = state.items.indexOf(exist)
        state.items[index].quantity = state.items[index].quantity + product.quantity
    } else {
        state.items.push(product)
    }
    state.showCarrito = true
}

export const deleteProduct = (state, idProduct) => {
    state.items = state.items.filter(elem => elem.id != idProduct)
}

export const setProducts = (state, products) => {
    if(!products) state.items = []
    else {
        state.items = [...products] 
        state.showCarrito = true
    }
}