<template>
  <div class="border col-md-2 p-0 bg-white box-shadow">
      <div class="d-flex border mb-2">
          <button :class="{ 'btn-primary': active == 0}" class="w-50 btn btn-light"><i class="material-icons">view_compact</i></button>
          <button :class="{ 'btn-primary': active == 1}" class="w-50 btn bt-light"><i class="material-icons">palette</i></button>
          <button :class="{ 'btn-primary': active == 2}" class="w-50 btn"><i class="material-icons">photo_library</i></button>
      </div>

    <img-extract v-if="active===2" />
  </div>
</template>

<script>
import img_ext from './img-extract.vue'
export default {
    components: {
        "img-extract": img_ext
    },
    data() {
        return {
            active: 2
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>

<style>
</style>