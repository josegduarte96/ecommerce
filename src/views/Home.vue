<template>
    <Header/>
  <div class="flex-xs-column container d-flex flex-sm-column flex-md-column flex-lg-row">
    <ImagenProducto/>
    <DetallesProducto/>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import DetallesProducto from '../components/DetallesProducto.vue'
import Header from './Header.vue'
import ImagenProducto from '../components/ImagenProducto.vue'
import useCartProducts from '../composables/useCartProducts'

export default {
name: 'Home',
components: { Header, ImagenProducto, DetallesProducto },
emits: ['closeCart'],
setup() {

    const { getProducts } = useCartProducts()

    onMounted(() => {
      getProducts()
    })


    }
  }
</script>

<style scoped>
@media screen and (max-width: 575px) {
  .flex-xs-column{
    flex-direction: column;
    padding: 0 !important;
    margin-top: 78px;
  }
}
</style>