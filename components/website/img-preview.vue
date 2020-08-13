<template>
    <div class="container-fluid p-3" id="img-preview-container">
        <div class="row m-auto pb-5 pt-2 w-100 justify-content-end" >
            <button class="btn btn-primary d-flex"><span class="material-icons mr-2">get_app</span> <span>Download Current Preview</span></button>
            <button @click="$hide_preview()" class="btn btn-light ml-2"><span class="material-icons font-30">clear</span></button>
        </div>
        <div class="row m-auto w-100 justify-content-center" >
            <img :src="img_src" alt="" class="box-shadow">
        </div>
        <div class="row w-100 p-2 m-auto justify-content-center" >
            <p class="small w-100 font-bold text-center">Change Your Colors</p>
            <button @click="$color($event, c, i)" v-for="(c, i) in colors" :key="i+0.6" class="p-2 btn rounded-btn align-self-center mr-2 box-shadow" :style="{backgroundColor: `rgb(${c.R}, ${c.G}, ${c.B})`}"></button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        colors: {
            required: true
        },
        img_src: {
            required: true
        },
        cluster_pix: {
            required: true
        }
    },
    methods: {
        $hide_preview() {
            $("#img-preview-container").remove()
        },
        $color(e, c, i) {
            let color = null
            let palette = $createColorPalette()   
            let $this = this
            palette.change(function() {
                color = {
                    new: palette.val(),
                    old: c
                }
                $this.colors[i] = __P.hexToRgb(color.new)
                palette.remove()
                $(e.target).css("backgroundColor", color.new)
                __P._IMAGE_LOAD($this.img_src, (f_data) => {
                    EDGE._CHANGE_COLOR(f_data, color, $this.cluster_pix, (output) => {
                        $this.img_src = __P._GET_CANVAS(output)
                    })
                })
            })

        }
    },
    mounted() {
        console.log(this.colors, 'my prop colros')
    }

}
</script>

<style>
#img-preview-container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.75);
    background: white;
}
</style>