<template>
  <div class="container-fluid m-0 bg-white box-shadow">
    <div class="row justify-content-between align-center border border-left-0 border-right-0 border-top-0">
      <div class="m-1">
        <button class="btn"><i class="material-icons">create</i></button>
        <h6 class="d-inline" contenteditable="true">Logo Maker</h6>
      </div>
      <div class="align-center">
        <!-- <button class="btn border text-primary">Create A Unique Logo</button> -->
        <button @click="$more_options($event, more_options)" class="btn btn-light"><i class="material-icons">more_vert</i></button>
        <button class="btn btn-primary box-shadow">Share</button>
        <button class="btn btn-light"><i class="material-icons">account_circle</i></button>
      </div>
    </div>
    <!-- border-bottom -->

    <div class="row justify-content-between align-center">
      <div class="m-1 ml-3">
        <button class="btn p-0"><i class="material-icons">undo</i></button>
        <button class="btn p-0"><i class="material-icons">redo</i></button>
        <button class="btn border border-top-0 border-bottom-0 border-right-0 no-radius ml-4"><i class="material-icons">near_me</i> </button>
        <button @click="$draw('polyline')" :class="a_draw == 'polyline' ? 'blue-colored-btn' : ''" class="btn"><i class="material-icons">timeline</i> </button>
        <button class="btn m-0 p-0 bg-light"><span class="btn" style='font-size:22px' v-html="a_shape"></span> <span @click="$more_options($event, more_shapes)" class="material-icons btn btn-light p-0">arrow_drop_down</span></button>
        <button class="btn mr-4 border border-top-0 border-bottom-0 border-left-0 no-radius"><i class="material-icons">format_shapes</i></button>

        <button @click="$color('stroke')" class="p-2 btn align-self-center mr-2 box-shadow" :style="{backgroundColor: color.stroke}"></button>
        <button @click="$color('fill')" class="p-2 btn align-self-center box-shadow" :style="{backgroundColor: color.fill}"></button>
        <button class="btn mr-4 ml-2 ml-0 pl-0 bg-light "><span class="btn font-bold font-12" v-html="s_width"></span> <span @click="$more_options($event, strokes)" class="material-icons btn btn-light p-0">arrow_drop_down</span></button>
        <button @click="$upload_img()" class="btn btn-primary box-shadow"><span class="d-flex"><i class="material-icons">add_photo_alternate</i></span></button>
      </div>
      <div class="mr-3">
        <!-- <button class="btn btn-light">500 X 500</button> -->
      </div>
    </div>

  </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
export default {
  components: {
  },
  data() {
    return {
      a_draw: null,
      color: {
        fill: "red",
        stroke: "black"
      },
      a_shape: "&#128999;",
      s_width: 2,
      more_options : {
          list: [
              { title: "<p class='w-100'></p>", value: 4, no_btn: true},
              { title: '<span class="d-flex ml-2 mr-2"><i class="material-icons">create</i><span class="ml-3">Rename</span></span>', value: 'new_project' },
              { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
              { title: '<span class="d-flex ml-2 mr-2"><i class="material-icons">picture_as_pdf</i><span class="ml-3">Save as PDF</span></span>', value: 'new_project' },
              { title: '<span class="d-flex ml-2 mr-2"><i class="material-icons">photo</i><span class="ml-3">Save Frame as Image</span></span>', value: 'new_project' },
              { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
              { title: '<span class="d-flex ml-2 mr-2 btn bg-primary p-2 text-white box-shadow"><i class="material-icons">new_releases</i><span class="ml-3">Use Logo Maker</span></span>', value: 'new_project' },
              { title: "<p class='w-100'></p>", value: 4, no_btn: true},
          ],
          open: false,
      },
      more_shapes : {
          list: [
              { title: "<p class='w-100'></p>", value: 4, no_btn: true},
              { title: '<span class="font-bold mr-2 ml-2 text-info" style="font-size:20px">&#47;</span> Line', value: 'line', shape: "&#47;" },
              { title: '<span class="font-bold mr-2" style="font-size:20px">&#128994;</span> Circle', value: 'circle', shape: "&#128994;" },
              { title: '<span class="font-bold mr-2" style="font-size:20px">&#128999;</span> Square', value: 'square', shape: "&#128999;" },
              { title: '<span class="font-bold mr-2" style="font-size:20px">&#128311;</span> Diamond', value: 'diamond', shape: "&#128311;" },
              { title: '<span class="font-bold mr-2" style="font-size:20px">&#128314;</span> Triangle', value: 'triangle', shape: "&#128314;" },
              { title: '<span class="font-bold mr-2 text-warning" style="font-size:22px">&#11054;</span> Ellipse', value: 'ellipse', shape: "&#11054;" },
              { title: '<span class="font-bold mr-2 text-danger" style="font-size:25px">&#9645;</span> Transparent Rectangle', value: 'rectangle', shape: "&#9645;" },
              { title: "<p class='w-100 border-bottom'></p>", value: 4, no_btn: true},
              { title: '<span class="font-bold mr-2" style="font-size:25px">&#8283;</span> Four Point Polygone', value: 'poly_four', shape: "&#8283;" },
              { title: "<p class='w-100'></p>", value: 4, no_btn: true},
          ],
          open: false,
          type: "shapes"
      },
      strokes : {
          list: [
              { title: "<p class='w-100 p-3 border-bottom font-bold'>Stroke Width</p>", value: 4, no_btn: true},
              { title: 1, value: 1, },
              { title: 2, value: 2, },
              { title: 3, value: 3, },
              { title: 4, value: 4, },
              { title: 5, value: 5, },
              { title: 6, value: 6, },
              { title: 7, value: 7, },
              { title: 8, value: 8, },
              { title: 9, value: 9, },
              { title: 10, value: 10, },
              { title: 11, value: 11, },
              { title: "<p class='w-100'></p>", value: 4, no_btn: true},
          ],
          open: false,
          type: "stroke"
      },

    }
  },
  methods: {
    $upload_img() {
      EventBus.$emit('$upload_img')
    },
    $switch_shape(obj) {
      this.a_shape = obj.shape
      this.a_draw = null
      EventBus.$emit('$draw', obj.value)
    },
    $draw(d) {
      this.a_draw = d
      EventBus.$emit('$draw', d)
    },
    $more_options(e, arr) {
      let { list } = arr
      let { items } = $simple_dropdown(e, list, false)
      for(let i=0; i<items.length; i++) {
        items[i].click(() => {
          if(arr.type === "shapes") {
            let { value, shape } = list[i]
            this.$switch_shape({ value, shape})
          }
        })
      }
    }
  },
  mounted() {
  }
}
</script>

<style>
.font-12 {
    font-size: 12px;
}
</style>