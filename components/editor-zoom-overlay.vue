<template>
  <div id="zoom-overlay-container" class="d-flex align-items-center m-0 bg-dark-3 pl-3 pr-3 pt-2 pb-2 p-absolute animated fadeInUp faster box-shadow" ref="container" style="z-index:1000" :style="{left: left + 'px', top: top + 'px'}">
      <button class="btn no-btn text-left text-white" style="width:120px">{{Math.round(zoom*100)}}%</button>
      <button @click="$zoom(zoom+=0.1)" class="btn material-icons p-1 bd-round">add</button>
      <button @click="$zoom(zoom-=0.1)" class="btn material-icons p-1 bd-round">remove</button>
      <button @click="$zoom(zoom=1)" class="btn text-success border ml-2 text-small">Reset</button>
  </div>
</template>

<script>
export default {
    props: {
        e: {
            required: true
        },
        zoom: {
            required: true
        }
    },
    data() {
        return {
            left: 0,
            top: 0,
            c: null,
            auto_hide: null
        }
    },
    methods: {
        $zoom(z) {
            this.$emit("$zoom", z)
        },
        $init() {
            this.c = $(this.$refs['container'])
            this.left = this.e.offset().left
            this.top = this.e.offset().top + this.e.outerHeight()
            this.auto_hide = setTimeout(() => {
                this.c.remove()        
            }, 3000);
            this.c.mouseenter(() => clearTimeout(this.auto_hide))
            this.c.mouseleave(() => setTimeout(() => { this.c.remove() }, 3000 ))
            
            this.$def_w_h()
        },
        $def_w_h() {
            if(this.left + this.c.outerWidth() > $(window).width()) {
                this.left = $(window).width() - this.c.outerWidth() - 10
            }
        }
    },
    mounted() {
        $("#zoom-overlay-container").remove()
        this.$nextTick(() => {
            this.$init()
        })
    }
}
</script>

<style>

</style>