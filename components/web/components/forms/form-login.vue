<template>
    <div class="justify-content-center row p-3" component='true'>
        <form component='true' class="p-3 col-md-5 box-shadow bg-white">
            <h1 component='true' class="font-weight-normal mb-5 ml-2">login Form</h1>
            <h5 component="true" class="col-md-12">Email</h5>
            <div class="input-group mb-2 p-2 col-md-12 input-group-inline" component='true'>
                <div class="input-group-prepend"></div>
                <input type="email" class="form-control p-4 mb-3" placeholder="i.e. John_Doe@something.com" id="" name="">
                <div class="input-group-append"></div>
            </div>
            <h5 component="true" class="col-md-12">Password</h5>
            <div class="input-group mb-4 p-2 col-md-12" component='true'>
                <div class="input-group-prepend"></div>
                <input type="password" class="form-control p-4" placeholder="Password" id="" name="">
                <div class="input-group-append"></div>
            </div>
            <div class="custom-control col-md-10 ml-2 custom-checkbox mb-3 checkbox-container custom-control-inline" component='true'>
                <input type="checkbox" class="custom-control-input" id="" name="" ref="checkbox">
                <label class="custom-control-label" for="" ref="label">Remember me</label>
            </div>
            <div class="col-md-12 p-2" style="text-align:right" component='true'>
                <button type="button" class="btn btn-primary">Login</button>
            </div>
        </form>

    </div>
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