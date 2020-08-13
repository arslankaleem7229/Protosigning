<template>
  <form component='true' class="p-2 connectedSortable">
    <div class="custom-control custom-radio mb-2 col-md-12 custom-control-inline radio-container" component='true' container-type='radio-container'>
      <input type="radio" class="custom-control-input" id="customRadio" name="example1" ref="radio">
      <label class="custom-control-label" for="customRadio" ref="label">Custom radio</label>
    </div>    
    <!-- <div class="custom-control custom-radio mb-2 col-md-2 custom-control-inline" component='true' container-type='radio-container'>
      <input type="radio" class="custom-control-input" id="customRadio2" name="example1" ref="radio">
      <label class="custom-control-label" for="customRadio2" ref="label">Custom radio</label>
    </div>     -->
  </form>
  
</template>

<script>
import {v4 as uuid} from 'uuid'
export default {
  data() {
    return {
      name: null,
      id: null
    }
  },
  mounted() {
    let $this = this
    this.$nextTick(() => {
      let radio = $($this.$refs['radio'])
      let label = $($this.$refs['label'])
      let id = uuid()
      radio.attr("name", uuid())
      radio.attr("id", id)
      label.attr("for", id)
      console.log('hello there this is radio btn')
    })
  }

}
</script>

<style>

</style>