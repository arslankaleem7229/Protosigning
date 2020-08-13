<template>
    <div class="header-4-container jumbotron d-flex justify-content-center align-content-center flex-wrap" div-type='header' component='true'
    :style="{background:background}">
        <h1 style="border-bottom:12px solid white;letter-spacing:10px;font-family: 'Helvetica Neue', Helvetica, Arial" class="white-color display-2 text-center p-3" component='true'>ARISTOTLE</h1>      
    </div>                
</template>

<script>
export default {
    data() {
        return {
            background: "linear-gradient(41deg, rgba(107, 107, 107, 0.04) 0%, rgba(107, 107, 107, 0.04) 8%, rgba(31, 31, 31, 0.04) 8%, rgba(31, 31, 31, 0.04) 100%), linear-gradient(9deg, rgba(228, 228, 228, 0.04) 0%, rgba(228, 228, 228, 0.04) 62%, rgba(54, 54, 54, 0.04) 62%, rgba(54, 54, 54, 0.04) 100%), linear-gradient(124deg, rgba(18, 18, 18, 0.04) 0%, rgba(18, 18, 18, 0.04) 37%, rgba(233, 233, 233, 0.04) 37%, rgba(233, 233, 233, 0.04) 100%), linear-gradient(253deg, rgba(201, 201, 201, 0.04) 0%, rgba(201, 201, 201, 0.04) 55%, rgba(47, 47, 47, 0.04) 55%, rgba(47, 47, 47, 0.04) 100%), linear-gradient(270deg, rgba(172, 172, 172, 0.04) 0%, rgba(172, 172, 172, 0.04) 33%, rgba(26, 26, 26, 0.04) 33%, rgba(26, 26, 26, 0.04) 100%), linear-gradient(64deg, rgba(11, 11, 11, 0.04) 0%, rgba(11, 11, 11, 0.04) 38%, rgba(87, 87, 87, 0.04) 38%, rgba(87, 87, 87, 0.04) 100%), linear-gradient(347deg, rgba(199, 199, 199, 0.04) 0%, rgba(199, 199, 199, 0.04) 69%, rgba(4, 4, 4, 0.04) 69%, rgba(4, 4, 4, 0.04) 100%), linear-gradient(313deg, rgba(36, 36, 36, 0.04) 0%, rgba(36, 36, 36, 0.04) 20%, rgba(91, 91, 91, 0.04) 20%, rgba(91, 91, 91, 0.04) 100%), linear-gradient(90deg, rgb(10, 17, 72), rgb(35, 148, 228))"
        }
    }

}
</script>

<style>
.header-4-container {
    height: 460px;
}
</style>