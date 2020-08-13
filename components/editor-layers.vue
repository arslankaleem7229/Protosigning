<template>
<div ref="root" class="animated fadeInRight faster p-absolute bg-white box-shadow overflow-y-auto h-100" :style="{width: 360 + 'px', top: 0, right: 0, zIndex: 1000}">
    <div class="w-100">
        <button @click="$hide()" class="btn material-icons">chevron_right</button>
    </div>
    <div class="p-2 bd-bottom" v-if="components.length > 0">
        <div class="bd-top p-3 p-relative hov-elem animated fadeInRight faster" v-for="(component, key, i) in components" :key="i">
            <button class="btn p-absolute material-icons p-1 scale-0 hov-tg" style="right:0px; top:0px">more_vert</button>
            <p class="text-sm font-weight-bold m-0"><span>{{component.type.toUpperCase()}}</span><span class="text-primary">#{{component.id}}</span></p>
            <p v-if="component.text" class="text-sm m-0"><span class="font-weight-bold">text:</span> <span>{{component.text}}</span></p>
        </div>
    </div>
    <p v-else class="w-100 p-5 text-sm text-center">No Components</p>
</div>
</template>

<script>
export default {
    props : {
        components: { required: true }

    },
    data() {
        return {
            props: [
                { icon: "lock"},
                { icon: "visibility"},
                { icon: "copy"},
                { icon: "delete"},
                { icon: "download"}
            ],
            root: null
        }
    },
    methods: {
        $hide() { 
            this.root.removeClass('fadeInRight').addClass('fadeOutRight')
            setTimeout(() => $(this.$refs['root']).remove() , 500)
        }
        
    },
    mounted() { 
        this.root = $(this.$refs['root'])
    }
}
</script>

<style>

</style>