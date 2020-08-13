<template>
<div class="container-fluid">
    <div v-if="data">
        <div v-for="(obj, title) in data" :key="title">
            <p class="pt-2 m-4 text-small"><b>{{title.toUpperCase()}}</b></p>
            <div class="d-flex flex-wrap justify-content-center pb-5">
                <div v-for="(nested, i) in obj" :key="i" class="box-shadow m-2 p-4">
                    <img :src="nested.img_url" width="120px" alt="">
                </div>
            </div>
        </div>
    </div>
    <div v-else class="w-100 p-5">
        <p class="text-center text-small"><span class="spinner-border spinner-border-sm mr-2"></span> Please wait...</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: null
        }
    },
    methods: {
        fetch() {
            this.api_fetch('elements', (payload) => {
                this.data = payload
                console.log(payload, 'my-payload')
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>

<style>

</style>