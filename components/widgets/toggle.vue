<template>
    <div>
        <p class="w-100  text-sm pb-1 m-0">{{title}}</p>
        <div class="d-flex bg-light-2 bd-round justify-content-end" style="width:40px;">
            <button class="btn material-icons p-0 m-0 text-md text-primary scale-6">brightness_1</button>
        </div>
    </div>
  
</template>

<script>
export default {
    props: {
        title: {
            required: true
        },
    },
}
</script>

<style>

</style>