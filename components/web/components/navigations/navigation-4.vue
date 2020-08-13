<template>
    <div class="container-fluid border p-2 d-flex justify-content-between" container-type='inner-container' style="background:#1d1d1d;" div-type="navigation">
        <div id="logo-container" class="col-md-4 justify-content-center p-2 d-flex align-items-center" component='true'>
            <img id="brand-logo-img" component-type='logo' src="~/assets/images/logo-YTS.svg" width="80" alt="" component='true'>
            <h5 id="brand-logo-text" style="color:#9D9D9D" class="ml-2 p-2 font-weight-normal" component='true'>HD movies at the smallest file size.</h5>
        </div>

        <div component='true' class="col-md-6 justify-content-center list-group list-group-horizontal d-flex align-items-center" ref="list-container">
            <form component='true' class="p-2">
                <div class="input-group p-2" component='true'>
                <input type="text" class="pl-3 border-dark form-control " placeholder="Search" id="usr" name="username" style="border-radius:22px">
                </div>
            </form>
            <a component='true' href="#" class="btn p-3 list-group-item font-weight-bold" style="color:#9D9D9D;background:transparent">Home</a>
            <a component='true' href="#" class="btn p-3 list-group-item font-weight-bold text-success" style="background:transparent">4K</a>
            <a component='true' href="#" class="btn p-3 list-group-item font-weight-bold" style="color:#9D9D9D;background:transparent">Browse Movies</a>
            <a component='true' href="#" class="btn p-2 ml-4 list-group-item font-weight-bold text-white" style="background:transparent">Login</a>
            <a component='true' href="#" class="btn p-2 list-group-item font-weight-bold text-white" style="background:transparent">Register</a>
        </div>
    </div>            
  
</template>

<script>
export default {
     mounted() {
        let $this = this
        this.$nextTick(function() {
            $($this.$refs['list-container']).sortable()
        })
    }
}
</script>

<style>

</style>