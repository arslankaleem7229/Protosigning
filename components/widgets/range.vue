<template>
    <div style="width:150px">
        <p class="w-100 text-sm pb-1 m-0">{{title}} <span v-if="dropdown" class="btn text-sm p-0 m-0">&#9207;</span></p>
        <div class="d-flex bg-light-2 bd-round box-shadow">
            <button @mousemove="mousemove($event)" :ref="title" class="btn material-icons text-primary p-0 text-md scale-6">trip_origin</button>
        </div>
    </div>
  
</template>

<script>
export default {
    props: {
        title: {
            required: true
        },
        dropdown: {
            required: false
        }
    },
    data() {
        return {
            down: false,
            point: {
                down: {x:0, y:0},
                move: {x:0, y:0},
            }
        }
    },
    methods: {
        mousedown(e) {
            if($(e.target).text() == "trip_origin") {
                this.down = true
                this.point.down.x = e.offsetX
            }
        },
        mousemove(e) {
            if(this.down) {
                let x = e.offsetX - this.point.down.x
                let ml = parseInt($(e.currentTarget).css("margin-left")) + x
                if((ml/150)*100 > 0 && (ml/150)*100 < 85) {
                    $(e.currentTarget).css({
                        marginLeft: ml + 'px'
                    })
                    this.$emit('position', (ml/150)*100)
                }
            }
        },
        mouseup() {
            this.down = false
        }
    },
    mounted() {
        $(window).mousedown((e) => this.mousedown(e))
        $(window).mousemove((e) => this.mousemove(e))
        $(window).mouseup((e) => this.mouseup(e))
    }
}
</script>

<style>

</style>