<template>
    <div class="container-md">
        <div class="container-producto">
            <div class="imagenes-productos">
                <div 
                    v-if="imgSelected.id != 0" 
                    @click="prevImage(imgSelected.id)" 
                    class="arrow-prev position-absolute top-50 start-0 translate-middle">
                    <i class="bi bi-arrow-left-short fs-2 primary"></i>
                </div>
                <img 
                    id="img-principal" 
                    data-bs-toggle="modal" 
                    data-bs-target="#imgmodal" 
                    :src="imgSelected.url" 
                    alt="producto-1-img" 
                    class="img-fluid imagen-principal">
                <div v-if="imgSelected.id != 3" @click="nextImage(imgSelected.id)" class="arrow-next position-absolute top-50 start-100 translate-middle">
                    <i class="bi bi-arrow-right-short fs-2 primary"></i>
                </div>
                <ImagenModal 
                    :imagen="imgSelected" 
                    :miniaturas="imagenesMiniaturas"
                />
                <div class="container-miniaturas mt-4">            
                    <img v-for="(img, i) in imagenesMiniaturas" :key="i"
                    :class="{'img-miniatura-active': imgSelected.id == i }" 
                    :id="i" 
                    @click="setActive(i)" 
                    class="img-miniaturas img-fluid" :src="img" alt=""
                    >            
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import ImagenModal from './ImagenModal.vue'
 const img1 = require('../assets/image-product-1.jpg')
 const img2 = require('../assets/image-product-2.jpg')
 const img3 = require('../assets/image-product-3.jpg')
 const img4 = require('../assets/image-product-4.jpg')
 

export default {
    name: 'ImagenProducto',
    components: { ImagenModal },
    setup() {
        const imgSelected = ref({
            id: 0,
            url: img1
        })

        const setActive = (id) => {
                imgSelected.value.id = id
                imgSelected.value.url = imagenesMiniaturas.value[id]
                document.getElementById('img-principal').classList.add('fader')
                setTimeout(() => {
                    document.getElementById('img-principal').classList.remove('fader')
                }, 100);
            }

        const imagenesMiniaturas = ref([img1, img2, img3, img4])
        return{
            setActive,
            nextImage: (index) => {
                const next = +index + 1
                setActive(next)
            },
            prevImage: (index) => {
                const prev = +index - 1
                setActive(prev)
            },
            imgSelected,
            imagenesMiniaturas
            
        }
    }

}
</script>

<style scoped>

@media screen and (max-width: 575px) {
    .container-producto{
        width: 100% !important;
        padding: 0% !important;
        margin: 0px !important;
    }
    .container-md{
        padding: 0px !important;
    }
    .imagenes-productos{
        margin: 0px !important;
        height: 24.5rem;
    }
    .imagen-principal{
        width: 100% !important;
        border-radius: 0px !important;
        transition: .8s ease-out;
    }
    .container-miniaturas{
        visibility: hidden !important;
    }
    .top-50{
        top: 35% !important;
    }
    .start-0{
        left: 10% !important;
    }
    .start-100{
        left: 90% !important;
    }
    .arrow-prev, .arrow-next {
    display: flex;
    visibility: visible !important;
    cursor: pointer;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: white;
   height: 40px;
    width: 40px;
    border-radius: 50%;
    }
}

@keyframes xfade{
    0%{
        opacity: 0.2;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 1;
    }
}
img{
    cursor: pointer;
}
.arrow-prev, .arrow-next{
    visibility: hidden;
}
.container-producto {
    width: 100%;
    margin: 20px 0px;
    height: auto;
    padding: 15px;
}
.imagen-principal {
    height: 350px;
    width: 80%;
    border-radius: 10px;
    transition: all 100ms;
}
.fader{
    animation: xfade cubic-bezier(.99,0,.01,.99) 100ms;
}
.img-miniaturas{
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-top: 10px;
}

.img-miniaturas:hover{
    opacity: 0.5;
    transition: all 100ms ease-in-out;
}

.img-miniatura-active{
    border: 4px solid hsl(26, 100%, 55%);
    border-radius: 10px;
    opacity: 0.5;
}

.container-miniaturas {
    display: flex;
    justify-content: space-between;
    width: 60%;
    flex-wrap: wrap;
}

.imagenes-productos {
    width: 100%;
    margin: 5px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>