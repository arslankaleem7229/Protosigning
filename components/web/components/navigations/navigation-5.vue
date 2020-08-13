<template>
    <div div-type="navigation">
        <div class="container-fluid border" container-type='inner-container'>
            <div class="d-flex justify-content-between align-items-center">
                <div id="logo-container" class="justify-content-center p-2 d-flex align-items-center" component='true'>
                    <img id="brand-logo-img" class="display-none" component-type='logo' src="~/assets/images/abcd.png" width="80" alt="" component='true'>
                    <h3 id="brand-logo-text" class="font-weight-normal" component='true'>Tutorial Point <span class="text-primary">.com</span> </h3>
                </div>
                <p component='true' style="color:#9D9D9D" class=" mr-4">The World's Largest Tutorial website</p>
            </div>
        </div>  
        <div class="list-group list-group-horizontal bg-dark" ref="list-container">
            <a component='true' href="#" class="btn p-3 list-group-item font-weight-bold" style="color:#9D9D9D;background:transparent"><i class="fa fa-home text-white" style="font-size:25px"></i></a>
            <a component='true' href="#" class="btn p-3 list-group-item " style="color:#9D9D9D;background:transparent">HTML</a>
            <a component='true' href="#" class="btn p-3 list-group-item " style="color:#9D9D9D;background:transparent">CSS</a>
            <a component='true' href="#" class="btn p-3 list-group-item  active text-white">JQUERY</a>
            <a component='true' href="#" class="btn p-3 list-group-item " style="color:#9D9D9D;background:transparent">JAVASCRIPT</a>
            <a component='true' href="#" class="btn p-3 list-group-item " style="color:#9D9D9D;background:transparent">BOOTSTRAP</a>
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