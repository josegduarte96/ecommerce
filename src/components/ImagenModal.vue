<template>
  <div class="modal fade" id="imgmodal" tabindex="-1" aria-labelledby="imgmodal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-transparent border-0 position-absolute">
      <i class="bi bi-x-lg closebtn position-relative align-self-end mb-2" data-bs-dismiss="modal" aria-label="Close"></i>
      <div class="position-relative">
        <div 
            v-if="image.id != 0" 
            @click="prevImage(image.id)" 
            class="arrow-prev position-absolute top-50 start-0 translate-middle">
            <i class="bi bi-arrow-left-short fs-2 primary"></i>
        </div>
        <img 
            :src="image.url" 
            class="img-fluid img-round" 
            alt="imagen-producto">
        <div 
            v-if="image.id != 3" 
            @click="nextImage(image.id)" 
            class="arrow-next position-absolute top-50 start-100 translate-middle">
            <i class="bi bi-arrow-right-short fs-2 primary"></i>
        </div>
      </div>
      <div class="container-miniaturas mt-4 mb-4">            
              <img 
              v-for="(img, i) in miniaturas"
              :key="i + 1"
              :class="{ 'img-miniatura-active': image.id == i }" 
              :id="i" 
              @click="selectImage(i)" 
              class="img-miniaturas img-fluid" :src="img" alt="producto-miniatura"
              >
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
    name: 'ImagenModal',
    props: {
        imagen: {
            type: Object,
            required: true
        },
        miniaturas: {
            type: Array,
            required: true
        }
    },
    setup(props) {

        const image = ref(props.imagen)
        

        watch(props.imagen, (val) => {
            image.value = val
        })

        return {
            nextImage: (index) => {
                const next = Number(index) + 1
                image.value = {
                    id: next,
                    url: props.miniaturas[next]
                }          
            },
            prevImage: (index) => {
                const prev = Number(index) - 1
                image.value = {
                    id: prev,
                    url: props.miniaturas[prev]
                }  
            },
            selectImage: (id) => {
                image.value = {
                    id,
                    url: props.miniaturas[id]
                }
            },
            image
        }

    }

}
</script>

<style scoped>

@media screen and (max-width: 575px) {
    .arrow-prev, .arrow-next{
        visibility: hidden;
    }
    .modal{
        padding: 15px;
    }
}
.img-round{
    border-radius: 13px;
}

.primary:hover{
    color: hsl(26, 100%, 55%);
}

.arrow-prev, .arrow-next {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-content: center;
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

.closebtn{
    font-size: 1.3rem;
    color: tomato;
    font-weight: bold;
    cursor: pointer;
}

.container-miniaturas {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
}

.img-miniaturas{
    width: 80px;
    height: 80px;
    border-radius: 10px;
}

.img-miniatura-active{
    border: 4px solid hsl(26, 100%, 55%);
    border-radius: 10px;
    opacity: 0.5;
}

.img-miniaturas:hover{
    opacity: 0.5;
    transition: all 100ms ease-in-out;
    cursor: pointer;
}

.modal { 
   background-color: rgba(0, 0, 0, 0.7) !important; 
}
</style>