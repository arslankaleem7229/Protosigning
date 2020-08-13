<template>
    <a type="button" href="javascript:void(0)" link-to="javascript:void(0)" component='false' :class="$class"  class="btn m-1" v-html="html"></a>    
</template>

<script>
export default {
    props: {
        $class: {
            required: true
        },
        html: {
            required: false
        }
    },
    mounted() {
        !this.html ? this.html = "Button" : ""
        // console.log(this.html, 'my html props')
    }
}
</script>

<style>
</style>