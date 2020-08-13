<template>
  <div id="svg-container" class="border p-3 col-md-10 bg-light d-flex justify-content-center">
    <!-- <div id="svg" class="bg-white mt-2 mb-2 box-shadow"> -->
        <!-- <p>This is svg workspace</p> -->
        <svg 
            id="svg" 
            class="bg-white mt-2 mb-2 box-shadow svg-workspace" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            version="1.1" ></svg>
   <!-- </div> -->
  </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
import vue from 'vue'
import uuid from 'uuid'
export default {
    components: {
    },
    data() {
        return {
            SVG: null,
            draw: null,
            shape: null,
            mousedown: false,
            move: null,
            initial: {
                x: 0, y: 0
            },
            current: {
                x: 0,
                y: 0
            },
            poly_arr: [],
            poly_index: 0,
            drawing: false,
            controls: null
            // rect: null
        }
    },
    methods: {       
        $draw(s) {
            switch(s) {
                case "rectangle":

                    break
            }
        },
        $upload_img() {
        },
        draggablePolygon(polygon) {
            var points = polygon.points;
            var svgRoot = $(polygon).closest("svg");
            
            for (var i = 0; i < points.numberOfItems; i++) {
            (function (i) { // close over variables for drag call back
                var point = points.getItem(i);

                var handle = document.createElement("div");
                handle.className = "handle";
                document.body.appendChild(handle);

                var base = svgRoot.position();
                // center handles over polygon
                var cs = window.getComputedStyle(handle, null);
                base.left -= (parseInt(cs.width) + parseInt(cs.borderLeftWidth) + parseInt(cs.borderRightWidth))/2; 
                base.top -= (parseInt(cs.height) + parseInt(cs.borderTopWidth) + parseInt(cs.borderBottomWidth))/2; 

                handle.style.left = base.left + point.x + 7 + "px";
                handle.style.top = base.top + point.y + 7 + "px";

                $(handle).draggable({
                drag: function (event) {
                    setTimeout(function () { // jQuery apparently calls this *before* setting position, so defer
                    point.x = parseInt(handle.style.left) - base.left;
                    point.y = parseInt(handle.style.top) - base.top;
                    },0);
                }
                });
            }(i));
            }
        },
        $polygone() {
            this.draggablePolygon(this.draw.node)
            console.log(this.draw.node, 'my node element')
            return
            let $this = this
            if(this.controls) {
                this.controls.remove()
            }
            this.controls = this.SVG.group()

            for(let i=0; i<this.poly_arr.length; i++) {
                let axis = {
                    x: this.poly_arr[i][0] - 5,
                    y: this.poly_arr[i][1] - 5
                }
                let circle = this.SVG.circle(10).move(axis.x, axis.y).fill("lime").stroke("rgb(34, 34, 204)")
                circle.attr("style", "cursor:n-resize")
                circle.addClass("resizer")
                circle.click(function(e) {
                    console.log($this.draw, 'my drawing shape.')
                    console.log(e.target, 'my target.')
                })
                this.controls.add(circle)
            }

        }
    },
    created() {
    },
    mounted() {


        let $this = this
        let svg = SVG("#svg")
        this.SVG = SVG("#svg")
        let rect = svg.circle(120)
        rect.attr({ fill: '#f06', stroke: "black", "stroke-width": 5 })
        rect.move(50, 70)

        EventBus.$on('$draw', (payload) => { this.shape = payload })
        EventBus.$on('$upload_img', () => {  
            $uploadImgSVG((data) => {
                EventBus.$emit('$img_extracting')
                this.draw = svg.image(data)
                this.draw.size(320, 320).move(0, 0)
                __P._IMAGE_LOAD(data, (f_data) => 
                {   
                    EDGE._IMAGE_EXTRACT(f_data, (output) => {
                        EventBus.$emit('$image_extracted', output)
                    })
                });
            })
        })

        $(document.body).mousedown((e) => {  
            if($(e.target).hasClass("resizer")) {
                return
            }
            let tag = e.target.tagName
            if(!this.drawing && !this.shape) {
                this.draw = SVG(e.target)
                switch(tag) {
                    case "polyline":
                        this.poly_arr = this.draw.array()
                        this.$polygone()
                        this.shape = false
                        break
                }
            }
            else if($hasTag(e.target, 'svg') && this.shape) {
                if(!this.drawing && tag === "polyline") {
                    this.$polygone()
                    this.shape = false
                    return
                }
                this.mousedown = true
                let target = $(e.target),
                    offset = target.offset()
                this.move = {
                    x: Math.floor(e.clientX - offset.left),
                    y: Math.floor(e.clientY - offset.top)
                }
                this.initial = {
                    x: e.clientX,
                    y: e.clientY
                }
                if(this.drawing) {
                    switch(this.shape) {
                        case "polyline":
                            let init_points = {
                                x: this.poly_arr[0][0],
                                y: this.poly_arr[0][1]
                            }
                            this.poly_arr = this.draw.array()
                            this.poly_index++
                            if(Math.abs((init_points.x - this.current.x)) < 5 && Math.abs((init_points.y - this.current.y)) < 5) {
                                this.drawing = false
                                this.poly_index = 0
                                this.draw.fill("red")
                                this.poly_arr.push([init_points.x, init_points.y])
                            } else {
                                this.poly_arr.push([this.current.x, this.current.y])
                            }
                            break
                    }
                } else {
                    switch(this.shape) {
                        case "polyline":
                            if(!this.drawing) {
                                this.drawing = true
                                this.draw = svg.polyline([this.move.x, this.move.y])
                                this.draw.fill('none')
                                this.draw.stroke({ color: 'red', width: 4, linecap: 'round', linejoin: 'round' })
                                this.draw.attr("id", uuid())
                                this.poly_arr = this.draw.array()
                                this.poly_index++
                                this.poly_arr.push([this.move.x, this.move.y])

                            }
                            break
                        case "rectangle":
                            this.draw = svg.rect(0, 0).move(this.move.x, this.move.y)
                            this.draw.attr({
                                fill: "none",
                                stroke: "red",
                                'stroke-width': 2
                            })
                            break
                        case "square":
                            this.draw = svg.rect(0, 0).move(this.move.x, this.move.y)
                            this.draw.attr({
                                fill: "#F7630C",
                                stroke: "#000",
                                'stroke-width': 2
                            })
                            break
                        case "circle":
                            this.draw = svg.circle(2).move(this.move.x, this.move.y)                        
                            this.draw.attr({
                                fill: "#16C60C",
                                stroke: "#000",
                                'stroke-width': 2
                            })
                            break
                        case "diamond":
                        case "poly_four":
                            this.draw = svg.polygon('0,0 2,2 0,4 -2,2 0,0')
                            .move(this.move.x, this.move.y)
                            this.draw.attr({
                                fill: "#0078D7",
                                stroke: "#000",
                                'stroke-width': 2
                            })
                            break
                        case "triangle":
                            this.draw = svg.polygon('0,0 0,0 -0,0, 0,0')
                            // this.draw = svg.polygon('0,0 50,50 -50,50, 0,0')
                            .move(this.move.x, this.move.y)
                            this.draw.attr({
                                fill: "red",
                                stroke: "#000",
                                'stroke-width': 2
                            })
                            break
                    }
                }
                
            }
        })

        $(document.body).mousemove((e) => {
            let x = e.clientX - this.initial.x,
                y = e.clientY - this.initial.y,
                top = null, right = null, left = null, bottom = null, r2 = null
            if(this.mousedown) {
                switch(this.shape) {
                    case "rectangle":
                        this.draw.attr("width", x < 0 ? 0 : x)
                        this.draw.attr("height", y < 0 ? 0 : y)
                        break
                    case "square":
                        let xy = x > y ? y: x
                        this.draw.attr("width", xy < 0 ? 0 : xy)
                        this.draw.attr("height", xy < 0 ? 0 : xy)
                        break
                    case "circle":
                        let r = x > y ? y : x
                        this.draw.radius(r*2)
                        break
                    case "triangle":
                        top = {x: this.move.x, y: this.move.y }
                        right = {x: top.x + x, y: top.y + y }
                        left = {x: top.x - x, y: top.y + y } 
                        this.draw.plot(`${top.x}, ${top.y}, ${right.x},${right.y}, ${left.x}, ${left.y}, ${top.x}, ${top.y}`) 
                        break
                    case "diamond":
                        r2 = x > y ? y : x
                        top = {x: this.move.x, y: this.move.y }
                        right = {x: top.x + x, y: top.y + y }
                        bottom = {x: top.x, y: top.y + (y*2) }
                        left = {x: top.x - x, y: right.y }
                        this.draw.plot(`${top.x}, ${top.y}, ${right.x},${right.y}, ${bottom.x}, ${bottom.y}, ${left.x}, ${left.y}, ${top.x}, ${top.y}`) 
                        break
                    case "poly_four":
                        r2 = x > y ? y : x
                        top = {x: this.move.x, y: this.move.y }
                        right = {x: top.x + x, y: top.y + y }
                        bottom = {x: top.x, y: top.y + (r2*2) }
                        left = {x: top.x - x, y: right.y }
                        this.draw.plot(`${top.x}, ${top.y}, ${right.x},${right.y}, ${bottom.x}, ${bottom.y}, ${left.x}, ${left.y}, ${top.x}, ${top.y}`) 
                        break
                }
            } 
            else if(this.drawing) {
                this.current.x = e.clientX - this.initial.x + this.poly_arr[this.poly_index-1][0]
                this.current.y = e.clientY - this.initial.y + this.poly_arr[this.poly_index-1][1]
                switch(this.shape) {
                    case "polyline":
                        this.poly_arr[this.poly_index] = [this.current.x, this.current.y]
                        this.draw.plot(this.poly_arr)
                        break
                }
            }
        })
        $(document.body).mouseup((e) => {
            this.mousedown = false
        })
    }
}
</script>

<style>
#svg {
    width: 768px;
    height: 500px;
}
.handle {
    position: absolute;
    border: 0.1em solid rgb(34, 34, 204);
    border-radius: 50%;
    background: lime;
    width: 14px;
    height: 14px;
}
</style>