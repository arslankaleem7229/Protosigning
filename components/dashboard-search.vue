<template>
<div class="">
    <div class="container-fluid p-5 bg-white bd-bottom">
        <div class="text-center p-5 w-75 m-auto">
            <h2>Design anything</h2>
            <p> Protosigning is used by thousands of different users every day for their daily purposes.
            </p>
        </div>
        <div class="input-group w-50 m-auto bd-round mb-5 pb-4">
            <input @keyup="$emit('keywords', keywords)" v-model="keywords" type="text" class="form-control bd-round p-4 box-shadow bg-light" style="border:transparent" placeholder="Search here...">
            <div class="input-group-append ml-2">
                <button @click="search()" class="input-group-text bd-round material-icons btn bg-primary text-white">search</button>
            </div>
        </div>    
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            keywords: ""
        }
    },
    methods: {
        search() {
            this.$emit('search', this.keywords)
        }
    }
}
</script>

<style>

</style>