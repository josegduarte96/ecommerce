<template>
  <div 
    class="container-sm container-md border-bottom border-2 p-0 d-flex">
    <div class="row w-100">
      <div class="col-8 col-sm-7 col-md-9 col-lg-9 d-flex flex-fill">
        <!-- Boton Menu Mobile -->
        <button class="icon-list align-self-center btn btn-light p-1 m-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">
          <i class="bi bi-list fs-2"></i>
        </button>
        <!-- Fin Boton Menu -->
        <div class="align-self-center menu">
            <img src="../assets/logo.svg" alt="LOGO" class="logo">
        </div>
        <div class="not-mobile col-sm-3 col-md-8 overflow-hidden">
            <ul class="list-group list-group-horizontal align-items-center">
              <li class="list-group-item p-4">Collections</li>
              <li class="list-group-item p-4">Men</li>
              <li class="list-group-item p-4">Women</li>
              <li class="list-group-item p-4">About</li>
              <li class="list-group-item p-4">Contact</li>
            </ul>
        </div>
        <!-- Menu Mobile -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel">
          <div class="offcanvas-header">
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="list-group m-0 p-0 fw-bold">
              <li class="list-group-item">Collections</li>
              <li class="list-group-item">Men</li>
              <li class="list-group-item">Women</li>
              <li class="list-group-item">About</li>
              <li class="list-group-item">Contact</li>
            </ul>
          </div>
      </div>
      <!-- Fin Menu Mobile -->
      </div>
      <!-- Carrito & Avatar User -->
      <div class="col-4 col-sm-5 col-md-3 col-lg-3 cart-mobile d-flex w-auto flex-fill justify-content-end">
          <div class="align-self-center position-relative btn-group">
              <img 
                @click="showCarrito = !showCarrito" 
                id="cart" 
                src="../assets/icon-cart.svg" 
                alt="cart" 
                class="cart">
              <span 
                v-if="items.length" 
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill" style="background: hsl(26, 100%, 55%)">
                    {{items.length}}
              </span>
              <transition>
                <div 
                  id="carrito" 
                  v-if="showCarrito" 
                  class="carrito shadow p-3 mb-5 bg-body rounded">
                  <p class="fw-bold">Carrito</p>
                  <hr>
                  <div 
                    v-for="item in items" 
                    :key="item.id" 
                    v-show="items.length">
                    <div class="row">
                      <div class="col-4 p-0 d-flex justify-content-center">
                          <img src="../assets/image-product-1-thumbnail.jpg" alt="product1" class="img-fluid rounded" style="width: 70px">
                      </div>
                      <div class="col-8 p-0 d-flex">
                          <div>
                            <p style="font-size: 15px;" class="m-0">Fall Limited Edition Sneakers</p>
                            <p style="font-size: 15px;" class="m-0">
                              <span>
                                ${{item.price}}.00
                              </span>
                                x
                              <span>
                                {{item.quantity}}
                              </span>
                              <span class="fw-bold"> 
                                ${{item.price * item.quantity}}.00
                              </span>
                            </p>
                          </div>
                          <div class="align-self-center">
                            <img 
                              @click="deleteProduct('1')" 
                              src="../assets/icon-delete.svg" 
                              alt="delete-icon"
                              id="delete" 
                              class="p-3">
                          </div>
                      </div>
                  </div>
                  <div class="d-grid mt-4">
                    <button class="btnComprar">
                      Comprar
                    </button>
                  </div>
                  </div>
                  <div 
                    v-show="!items.length">
                    <p>No hay items agregados</p>
                  </div>
                </div>
              </transition>
          </div>
          <div class="align-self-center ms-5">
              <img src="../assets/image-avatar.png" alt="avatarUser" class="img-fluid avatar">
          </div>
      </div>
      <!-- Fin Carrito & Avatar User -->
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCartProducts from '../composables/useCartProducts'
import { onMounted, watch } from '@vue/runtime-core'

export default {
name: 'Header',
setup() {

    const showCarrito = ref(false)
    const {items, deleteProduct, showCart} = useCartProducts()

    onMounted(() => {
      document.addEventListener('click', ({ target }) => {
        const onClick = ['carrito', 'cart', 'addCarrito', 'delete']
        if (onClick.indexOf(target.id) < 0) {
          showCarrito.value = false
        } else if (target.id === 'addCarrito') {
          showCarrito.value = true
        }
      })
    })

    watch(showCart, (val) => {
      showCarrito.value = val
    })
    return {
        showCarrito,
        deleteProduct,
        items
    }
}
}
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .container-md{
      position: fixed;
      top: 0px;
      background: white;
      z-index: 999;
    }
  .not-mobile{
    visibility: hidden;
  }
  .logo{
    margin-bottom: 5px;
  }
  .menu{
    cursor: pointer;
  }
  .offcanvas{
    width: 50vw !important;
  }
  .icon-list{
    visibility: visible !important;
  }
  .cart-mobile{
    display: flex !important;
    position: absolute !important;
    width: 150px !important;
    right: 0;
    top: 10px;
    z-index: 999;
  }
  .cart-mobile>div{
    margin: 5px !important;
  }
  .carrito{
    top: 85px !important;    
    left: 7px !important;
    width: 95vw !important;
  }
}

@media (max-width: 768px) { 
  .not-mobile{
    visibility: hidden;
  }
  .icon-list{
    visibility: visible !important;
    
  }
 }

 @media (max-width: 992px) { 
   .not-mobile{
    visibility: hidden;
  }
  .icon-list{
    visibility: visible !important;
    
  }
  }

.icon-list{
  visibility: hidden;
}
.container-md {
    height: 76px !important;
    overflow: hidden;
}

img {
    cursor: pointer;
}

li{
    cursor: pointer;
    font-size: 14px;
    margin-top: 4px;
    border: none !important;
}

.list-group-item:hover{
    margin-bottom: 2px;
    border-bottom: 3px solid hsl(26, 100%, 55%) !important;
    border-radius: 0px !important;
    transition: all 200ms ease-out;
}

ul{
    margin-left: 20px;
    height: 75px;
}

.avatar{
    width: 50px;
    cursor: pointer;
}

.avatar:hover{
    border-radius: 50px;
    border: 2px solid hsl(26, 100%, 55%);
    transition: all 10ms ease-in;
}

.cart{
    cursor: pointer;
}

.carrito{
    width: 350px;
    height: 230px;
    position: fixed;
    top: 75px;
    right: 45px;
    z-index: 99999;
}

.row {
    height: 60px !important;
}

.btnComprar {
    width: 100%;
    height: 45px;
    color: white;
    border: none;
    background: hsl(26, 100%, 55%);
    border-radius: 10px;
}

.btnComprar:hover{
    background-color: hsl(26, 91%, 49%);
}

.btnComprar {
    width: 100%;
    height: 45px;
    color: white;
    border: none;
    background-color: hsl(26, 100%, 55%);
    border-radius: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>