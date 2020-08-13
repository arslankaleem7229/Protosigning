<template>
    <form component='true' class="p-2 connectedSortable">
        <div class="custom-control col-md-12 custom-checkbox mb-3 checkbox-container custom-control-inline" component='true'>
            <input type="checkbox" class="custom-control-input" id="" name="" ref="checkbox">
            <label class="custom-control-label" for="" ref="label">Custom checkbox</label>
        </div>
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
      let checkbox = $($this.$refs['checkbox'])
      let label = $($this.$refs['label'])
      let id = uuid()
      checkbox.attr("name", uuid())
      checkbox.attr("id", id)
      label.attr("for", id)
    })
  }


}
</script>

<style>

</style>