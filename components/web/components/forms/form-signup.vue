<template>
    <div class="justify-content-center row p-3" component='true'>
        <form component='true' class="p-3 col-md-6 box-shadow bg-white">
            <h1 component='true' class="font-weight-normal mb-5 ml-2">Signup Form</h1>
            <h5 component="true" class="col-md-12">Full Name</h5>

            <div class="row col-md-12 p-2 ml-1" component='true'>
                <div class="input-group mb-2 p-2 col-md-6" component='true'>
                    <div class="input-group-prepend"></div>
                    <input type="email" class="form-control p-4" placeholder="i.e. First Name" id="" name="">
                    <div class="input-group-append"></div>
                </div>
                <div class="input-group mb-2 p-2 col-md-6" component='true'>
                    <div class="input-group-prepend"></div>
                    <input type="email" class="form-control p-4" placeholder="i.e. Last Name" id="" name="">
                    <div class="input-group-append"></div>
                </div>
            </div>

            <h5 component="true" class="col-md-12">Email</h5>
            <div class="input-group mb-4 p-2 col-md-12" component='true'>
                <div class="input-group-prepend"></div>
                <input type="password" class="form-control p-4" placeholder="Password" id="" name="">
                <div class="input-group-append"></div>
            </div>

            <h5 component="true" class="col-md-12">Password</h5>
            <div class="input-group mb-4 p-2 col-md-12" component='true'>
                <div class="input-group-prepend"></div>
                <input type="password" class="form-control p-4" placeholder="Password" id="" name="">
                <div class="input-group-append"></div>
            </div>
            <h5 component='true' class="col-md-12">Gender</h5>
            <div class="custom-control custom-radio mb-2 ml-3 col-md-3 custom-control-inline radio-container" component='true' container-type='radio-container'>
            <input type="radio" class="custom-control-input" id="customRadio1" name="example22" ref="radio">
            <label class="custom-control-label" for="customRadio1" ref="label">Male</label>
            </div>    
            <div class="custom-control custom-radio mb-2 col-md-3 custom-control-inline radio-container" component='true' container-type='radio-container'>
            <input type="radio" class="custom-control-input" id="customRadio2" name="example22" ref="radio">
            <label class="custom-control-label" for="customRadio2" ref="label">Female</label>
            </div>    

            <div class="col-md-12 p-2" style="text-align:right" component='true'>
                <button type="button" class="btn btn-primary">Signup</button>
            </div>
        </form>

    </div>
</template>

<script>
import uuid from 'uuid'
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
    // //   let checkbox = $($this.$refs['radio'])
    // //   let label = $($this.$refs['label'])
    //   let id = uuid()
    //   checkbox.attr("name", uuid())
    //   checkbox.attr("id", id)
    //   label.attr("for", id)
    })
  }


}

</script>

<style>

</style>