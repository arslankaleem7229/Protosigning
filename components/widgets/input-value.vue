<template>
    <div class="hov-elem">
        <p class="w-100 text-sm p-0 m-0"><span v-if="icon" :class="'icon-'+icon"></span> {{title}}</p>
        <div class="row m-0">
            <input type="text" value="#303030" class="bg-none small text-center bd-bottom-2 p-0 m-0" :style="width ? {width: width+'px'} : {width: '50px'}">
            <button @click="dropdown()" class="btn p-0 m-0 scale-0 material-icons hov-tg">arrow_drop_down</button>
        </div>
    </div>
  
</template>

<script>
export default {
    props: {
        title: {
            required: true
        },
        icon: {
            required: false
        },
        width: {
            required: false
        }
    },
    methods: {
        dropdown() {
            let pick = colorPalette()
            console.log(this.title, 'title.')
            switch(this.title) {
                case "TEXT":
                    pick.change(() => {
                        this.$emit('color', pick.val())
                    })
                    break
                case "Fill":
                    pick.change(() => {
                        this.$emit('fill', pick.val())
                    })
                    break
                case "Stroke":
                    pick.change(() => {
                        this.$emit('stroke', pick.val())
                    })
                    break
            }
        }
    },
    mounted() {
    }
}
</script>

<style>
.bd-bottom-2 {    
    border-radius: 0px 0px 0px 0px !important;
    border: 1px solid transparent !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.275) !important;
}
</style>