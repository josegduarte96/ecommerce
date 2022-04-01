<template>
  <div class="container-md d-flex align-items-center">
      <div class="container-detalles">
          <p class="company fw-bold">SNEAKER COMPANY</p>
          <h1 class="fw-bold">Fall Limited Edition Sneakers</h1>
          <p style="font-size: 16px;" class="text-secondary my-4">
            These low-profile sneakers are your perfect casual wear companion. Featuring a 
            durable rubber outer sole, they’ll withstand everything the weather can offer.
          </p>
          <p class="precio fw-bold position-relative m-0" style="font-size: 28px;">
              125.00$ 
              <span class="position-absolute top-50 start-100 translate-middle badge badge-color">50%</span>
          </p>
          <p class="text-decoration-line-through precio-anterior fw-bold">250.00$</p>
          <div class="row gap-1">
              <div class="cantidades fw-bold p-2 col-4 btn btn-light d-flex align-items-center justify-content-between">
                  <button 
                    class="btn btn-light" 
                    :disabled="product.quantity == 1" 
                    @click="product.quantity--">
                    <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a"/></svg>
                  </button>

                    {{product.quantity}}
                  
                  <button 
                    class="btn btn-light"  
                    @click="product.quantity++">
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b"/></svg>
                  </button>
              </div>
              <button 
                class="addCarrito p-2 col-6 btn btn-light"
                id="addCarrito"
                @click="comprar">
                    <i class="bi-cart mx-2"></i>
                Agregar al carrito
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCartProducts from '../composables/useCartProducts'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
export default {
name: 'DetallesProducto',
setup() {

    const { saveProduct } = useCartProducts()
    const total = ref(0)
    const product = ref({
        product: 'Fall Limited Edition Sneakers',
        quantity: 1,
        price: 125,
        id: '1'
    })

    
    return {

        comprar: () => {
            total.value = product.value.quantity * product.value.price
            product.value = { ...product.value, total: total.value }
            saveProduct(product.value)
            Toastify({
            text: "Item agregado al carrito!",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top" , // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, hsl(26, 100%, 55%), rgb(224 133 16))",
              "min-width": "255px",
              "text-align": "center"
            }
            }).showToast();
        },
        product

    }

}
}
</script>

<style scoped>
@media screen and (max-width: 575px) {
    .row{
        align-items: center;
        flex-direction: column;
    }
    .cantidades{
        width: 80vw !important;
        padding: 5px;
    }
    .row > button{
        width: 80vw;
        margin-bottom: 15px;
    }
}
.company{
    color: hsl(26, 100%, 55%);
    font-size: 14px;
}

.badge-color{
    background-color: hsl(25, 100%, 94%);
    color: hsl(26, 100%, 55%);
    font-size: 15px !important;
}

.cantidades{
    height: 60px;
    background-color: hsl(223, 64%, 98%);
}

.addCarrito{
    height: 60px;
    background-color: hsl(26, 100%, 55%);
    color: white;
    border-radius: 12px;
}

.addCarrito:hover{
    opacity: 0.5;
    transition: all 100ms ease-in-out;
}

.precio-anterior{
color: hsl(220, 14%, 75%);
}

.precio{
    width: 140px;
}

.container-detalles{
    height: 300px;
}
</style>