import { createStore } from "vuex";
import items from "./cart";


const store = createStore({
    modules:{
        items       
    }
})

export default store
