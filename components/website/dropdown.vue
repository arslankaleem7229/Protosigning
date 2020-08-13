<template>
  <div class="component-dropdown" :style="{ top: click_event.top + 'px', left: click_event.left + 'px', background: 'orange' }">
      <!-- <ul> -->
          <button
          v-for="(item, i) in list"
          :key="i">
            {{item}}
          </button>
      <!-- </ul> -->
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            required: true
        },
        click_event: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // console.log(this.click_event, 'click-event...')
        // $('.component-dropdown').css({
        //     top: this.click_event.top,
        //     left: this.click_event.left
        // })
    }
}
</script>

<style>
.component-dropdown {
    position: absolute;
    background-color: red;
}
.component-dropdown button {
    display: block;
    padding: 10px 20px;
}
</style>