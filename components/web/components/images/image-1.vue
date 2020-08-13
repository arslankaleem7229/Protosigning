<template>
    <img src="~/assets/images/2.jpg" border="1px solid black" component='true' class="image-1-component col-md-4">
</template>

<script>
export default {
    methods: {
    },
    mounted() {
        $(document.body).click((e) => {
        })
    }

}
</script>

<style>
.image-1-component {
    width: 300px;
    margin: 5px;
    background-color: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
}
</style>