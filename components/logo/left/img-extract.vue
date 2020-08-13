<template>
<div class="container-fluid p-0 m-0 overflow-auto" ref="uploads-container">
    <div class="d-flex justify-content-center" v-if="loading">
        <button class="btn">
            <span class="spinner-border spinner-border-sm mr-1"></span>
            Loading...
        </button>
    </div>
    <div class="d-flex justify-content-center" v-if="!loading && cluster.length <= 0">
        <p class="small w-75 text-center"><span class="font-bold font-20">&#128712;</span> <span>Upload an image to see the extracted details here</span></p>
    </div>
    <div class="d-flex flex-wrap justify-content-start mb-3 p-2 overflow-auto" v-if="!loading && cluster.length > 0">
        <p class="w-100 font-bold mb-1 small">Colors</p>
        <button v-for="(c, i) in color" :key="i+0.6" class="p-2 btn align-self-center mr-2 box-shadow" :style="{backgroundColor: `rgb(${c.R}, ${c.G}, ${c.B})`}"></button>

        <p class="w-100 border-bottom"></p>

        <p class="w-100 font-bold mb-1 small">Clusters</p>
        <img @click="$more_options($event, img_opts, {index: i, isEdge: false})" v-for="(img, i) in cluster" :key="i+0.5" :src="img" class="w-25 box-shadow" component='true' alt="">
        <p class="w-100 border-bottom"></p>

        <p class="w-100 font-bold mb-1 small">Edges</p>
        <img @click="$more_options($event, img_opts, {index: i, isEdge: true})" v-for="(img, i) in edge" :key="i" :src="img" class="w-25 box-shadow" component='true' alt="">
        <p class="w-100 border-bottom"></p>
    </div>

</div>  
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
import uuid from 'uuid'
import img_preview from '../../website/img-preview'
import vue from 'vue'
export default {
    components: {
        img_preview
    },
    data() {
        return {
            DATA: null,
            clicked_prev: {
                index: null,
                isEdge: false
            },
            cluster: [],
            edge: [],
            color: [],
            cluster_pix: [],
            loading: false,
            img_opts : {
                list: [
                    { title: "<p class='w-100'></p>", value: 4, no_btn: true},
                    { title: '<span class="d-flex ml-2 mr-2"><i class="material-icons">remove_red_eye</i><span class="ml-3">Preview</span></span>', value: 'preview' },
                    { title: '<span class="d-flex ml-2 mr-2"><i class="material-icons">delete</i><span class="ml-3">Delete</span></span>', value: 'delete' },
                    { title: '<span class="d-flex ml-2 mr-2"><i class="material-icons">save_alt</i><span class="ml-3">Download</span></span>', value: 'download' },
                    { title: "<p class='w-100'></p>", value: 4, no_btn: true},
                ],
                open: false,
                type: 'img_opts'
      },
        }
    },
    methods: {
        set_height(e) {
            let container = $(this.$refs['uploads-container'])
            let wh = $(window).height(),
                cont_top =container.offset().top 
            
            container.css("height", wh - cont_top - 10)
        },
        $more_options(e, arr, clicked_info) {
            let { list, type } = arr
            let { items } = $simple_dropdown(e, list, false)
            this.clicked_prev = clicked_info
            switch(type) {
                case "img_opts":
                    this.$img_opts(e, items, list)
                    break
            }
        },    
        getComponent(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return instance.$el
        },    

        $img_opts(e, btns, list) {
            for(let i=0; i<btns.length; i++) {
                btns[i].click(() => {
                    let clicked = list[i].value
                    switch(clicked) {
                        case "preview":
                            let {isEdge, index} = this.clicked_prev
                            let my_colors = []
                            if(isEdge) {
                                my_colors.push({R: 255, G: 255, B: 255 })
                            }
                            else if(this.color[index].length > 0) {
                                for(let i=0; i<this.color[index].length; i++) {
                                    my_colors.push(this.color[index][i])
                                }
                            } else {
                                my_colors.push(this.color[index])
                            }
                            my_colors.push({ R: 0, G: 0, B: 0 })

                            let obj = { 
                                colors: my_colors, 
                                img_src: e.target.src, 
                                cluster_pix: this.cluster_pix[index] 
                            }

                            let $img_preview = this.getComponent(img_preview, obj)
                            document.body.append($img_preview)
                            break
                        case "delete":
                            $(e.target).remove()
                            break
                    }
                })
            }
        }
    },
    mounted() {
        this.set_height()
        $(window).resize(() => this.set_height())

        EventBus.$on('$img_extracting', () => {
            this.loading = true
            this.cluster = []
            this.edge = []
            this.color = []
        })
        EventBus.$on('$image_extracted', (obj) => {
            let {clusters, edges, colors, clusters_pix, final_img } = obj
            this.DATA = obj
            for(let j=0; j<clusters.length; j++) {
                this.cluster.push(__P._GET_CANVAS(clusters[j]))
                this.edge.push(__P._GET_CANVAS(edges[j]))
                this.color.push(colors[j])
                this.cluster_pix.push(clusters_pix[j])
            }
            this.cluster.push(__P._GET_CANVAS(final_img))
            this.color.push(colors)
            this.loading = false
        })
    }
}
</script>

<style>

</style>