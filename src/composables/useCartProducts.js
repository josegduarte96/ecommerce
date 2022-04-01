
import { computed } from "vue"
import { useStore } from "vuex"

const useCartProducts = () => {

    const store = useStore()

    return {
        saveProduct: (product) => {
            store.dispatch('items/saveProduct', product)
        },
        deleteProduct: (id) => {
            store.dispatch('items/deleteProduct', id)
        },
        getProducts: () => {
            store.dispatch('items/getProducts')
        },
        items: computed(() => store.getters['items/itemsCart']),
        showCart: computed(() => store.getters['items/showCarrito'])
    }
}

export default useCartProducts