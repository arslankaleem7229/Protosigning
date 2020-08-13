<template>
    <div class="container-fluid border p-2 d-flex justify-content-between" container-type='inner-container' style="background:#333333;" div-type="navigation">
        <div id="logo-container" class="p-2 d-flex align-items-center" component='true'>
            <img id="brand-logo-img" component-type='logo' src="~/assets/images/5.png" width="60" alt="" component='true'>
            <h5 id="brand-logo-text" style="color:#9D9D9D" class="ml-2 p-2 font-weight-normal" component='true'>Lamborgini</h5>
        </div>
        <div component='true' class="list-group list-group-horizontal d-flex align-items-center" ref="list-container">
            <a component='true' href="#" class="btn list-group-item " style="color:#9D9D9D;background:transparent">Home</a>
            <a component='true' href="#" class="btn list-group-item " style="color:#9D9D9D;background:transparent">Page 1</a>
            <a component='true' href="#" class="btn list-group-item " style="color:#9D9D9D;background:transparent">Page 2</a>
            <a component='true' href="#" class="btn list-group-item " style="color:#9D9D9D;background:transparent">Page 3</a>
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