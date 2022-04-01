export const saveProduct = async ({ commit, state }, product) => {
    const exist = state.items.map(elem => elem.id).indexOf(product.id)

    if (exist >= 0) {
        state.items[exist].quantity = state.items[exist].quantity + product.quantity
        localStorage.setItem('product1', JSON.stringify([state.items[exist]]))
    } else {
        commit('addProduct', product)
        localStorage.setItem('product1', JSON.stringify([product]))
    }
}

export const getProducts = async ({commit}) => {
    const products = localStorage.getItem('product1')
    await commit('setProducts', JSON.parse(products))
}

export const deleteProduct = async ({commit}, id) => {
    localStorage.clear()
    commit('deleteProduct', id)
}