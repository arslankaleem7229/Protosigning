<template>
<div class="m-0" ref="parent-container" :style="{height: height.parent_container + 'px'}">
    <!-- HEADER -->
    <div class="d-flex justify-content-between pt-2" ref="header">
        <div class="">
            <button class="btn d-flex"><span class="material-icons">arrow_back_ios</span><span class="align-self-center">Home</span></button>
        </div>
        <div class="text-center row flex-column hov-elem">
            <div class="">
                <button class="btn material-icons p-1">chevron_left</button>
                <input type="text" class="bg-none border bd-2 bd-round-5 p-1 text-small text-center" :value="'1 / '+ pages.length " style="width:60px">
                <button class="btn material-icons p-1">chevron_right</button>
            </div>
            <button class="btn material-icons text-small p-0 m-0 hov-tg scale-0">arrow_drop_down</button>
        </div>
        <div class="d-flex align-items-center">
            <button class="btn p-2 d-flex"><span class="material-icons">group_add</span> <span class="text-danger font-weight-bold text-sm">(9+)</span></button>
            <button class="btn p-2 material-icons">more_vert</button>
        </div>
    </div>
    <!-- HEADER -->

    <!-- TOOLS-TOP -->
    <div class="d-flex justify-content-between pt-2 pb-2" ref="top-tools">
        <div class="row m-0">
            <div class="border-right mr-2 pr-2">
                <button class="btn bd-round material-icons">undo</button>
                <button class="btn bd-round material-icons">redo</button>
            </div>
            <div class="border-right mr-2 pr-2">
                <button v-for="(item, i) in top_tools" :key="i+0.1" class="btn font-24" :class="'icon-'+item.icon"></button>
            </div>
            <div class="border-right mr-2 pr-2">
                <button class="btn">Background</button>
            </div>
            <div class="border-right mr-2 pr-2">
                <button class="btn">Clear Frame</button>
            </div>
        </div>
        <div class="m-0 row align-items-center">
            <button id="zoom-btn" class="btn scale-1 mr-1 material-icons p-0 text-white scale-0 text-small">zoom_in</button>
            <div class="hov-elem row m-0 ml-2 align-items-center">
                <input type="text" class="bg-none border bd-round-5 bd-2 pb-1 text-small text-center" v-model="canvas.w" style="width:50px">
                <span class="material-icons text-small ml-2 mr-2">close</span>
                <input type="text" class="bg-none border bd-round-5 bd-2 pb-1 text-small text-center" v-model="canvas.h" style="width:50px">
                <button class="btn text-small m-0 p-0 m-0 material-icons scale-0 hov-tg">arrow_drop_down</button>
            </div>
        </div>
    </div>
    <!-- TOOLS-TOP -->    




    <!-- NON-HEADER-CONTAINER -->
    <div class="d-flex justify-content-around" :style="{height: height.non_header_container + 'px'}">
        <!-- LEFT TOOLS -->
        <div class="overflow-auto flex-shrink-0 mt-3 mb-3" ref="left-tools" :style="{width: width.left_tools + 'px'}">
                <button @click="$select(item.icon)" class="btn no-btn btn-block d-flex bd-round-r p-0 pl-3 mt-4" v-for="(item, i) in left_tools" :key="i">
                    <span :class="draw==item.icon ? 'text-success bg-dark icon-'+item.icon : 'icon-'+item.icon" class="align-self-center p-2 font-24 bd-round"></span>
                    <span @click="$left_tools($event, item.type, i)" v-if="item.type" class="material-icons text-sm btn bd-round align-self-center p-0">arrow_right</span>
                </button>
        </div>
        <!-- LEFT TOOLS -->

        <!-- EDITOR -->
        <div class="p-relative p-2" ref="editor-container" :style="{width: width.editor_container + 'px'}">
            <!-- CANVAS -->
            <div id="svg-container" class="w-100 h-100 overflow-auto d-flex m-0 justify-content-center align-items-center">
                <svg id="svg-1" class="bg-white border bd-2 flex-shrink-0 transition-3" :width='canvas.w + "px"' :height='canvas.h + "px"' :viewBox="viewbox.string()" overflow="visible" :style="{transform: 'scale('+zoom+')'}" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
                </svg>
            </div>
            <!-- CANVAS -->
        </div>
        <!-- EDITOR -->



        <!-- RIGHT TOOLS -->
        <div class="bg-white box-shadow p-4 overflow-auto flex-shrink-0" ref="right-tools" :style="{width: width.right_tools + 'px'}">
            <div v-for="(obj, key) in right_tools" :key="key" class="border-bottom mt-3">
            <button class="btn no-btn m-0 mb-3 p-0 font-weight-bold d-flex">
                <span>{{key}}</span>
                <!-- <span v-if="selected[key]" class="text-sm text-dark align-self-center ml-2">({{selected[key]}})</span> -->
                <span class="material-icons btn p-0 ml-2 align-self-center">chevron_right</span>
            </button>
            
            <div v-for="(nested, key) in obj" :key="key" style="height:auto" class="overflow-hidden">
                <div class="w-100 mb-5" :class="!nested[0]['range'] ? 'd-flex m-0 align-items-center justify-content-around' : ''" >
                    <div v-for="(item, i) in nested" :key="i+0.112">
                        <w-range v-if="item['range']" :title="item.text" />
                        <div v-else-if="item['button']">
                            <button class="w-100 btn font-20" :class="'icon-'+item['code']"></button>
                            <p v-if="item['text']" class="w-100 text-sm font-weight-bold p-0 m-0 text-center ">{{item['text']}}</p>
                        </div>
                        <w-dropdown v-else-if="item['dropdown']" :title="item['text']" />
                        <w-toggle v-else-if="item['toggle']" :title="item['text']" />
                        <w-inputValue v-else-if="item['input']" :title="item['text']"  :width="item['width']" :icon="item['icon']" />                        
                    </div>

                </div>
                
            </div>

            </div>
        </div>
        <!-- RIGHT TOOLS -->
    </div>
    <!-- NON-HEADER-CONTAINER -->

    <!-- BOTTOM TOOLS -->
    <div id="bottom-tools" class="row p-relative justify-content-center m-0 bg-dark animated faster box-shadow-t" ref="bottom-tools">
        <button @click="$hide_call({
        target: '#bottom-tools', 
        animation: 'fadeOutDown',
        })" class="btn material-icons p-absolute bd-round-r p-0 m-0" style="left:0px;top:0px;">expand_more</button>

        <button class="btn p-2 pl-5 pr-5 text-center" v-for="(item, i) in bottom_tools" :key="i">
            <span class="material-icons">{{item.icon}}</span>
            <br>
            <span class="small">{{item.text}}</span>
        </button>
    </div>
    <!-- BOTTOM TOOLS -->    
</div>
</template>

<script>
import vue from 'vue'

import profile from '@/assets/svg/computer.svg'
import w_range from '@/components/widgets/range.vue'
import w_toggle from '@/components/widgets/toggle.vue'
import w_inputValue from '@/components/widgets/input-value.vue'
import w_dropdown from '@/components/widgets/dropdown.vue'

import c_moreShapes from '@/components/editor-draw.vue'
import c_zoom_overlay from '@/components/editor-zoom-overlay.vue'
import { SVG } from '@svgdotjs/svg.js'

import Canvg from 'canvg';
let v = null;

export default {
    components: {
        "w-range": w_range,
        "w-toggle": w_toggle,
        "w-inputValue": w_inputValue,
        "w-dropdown": w_dropdown,
        c_moreShapes
    },
    data() {
        return {
            viewbox: {
                x: 0,
                y: 0,
                w: 1000,
                h: 600,
                string: () => {
                    return this.viewbox.x + ' ' + this.viewbox.y + ' ' + this.viewbox.w + ' ' + this.viewbox.h
                }
            },
            canvas: {
                w: 1000,
                h: 600,
            },
            aspect_ratio : {
                w: 16,
                h: 9
            },
            color: {
                dark: "rgba(255, 255, 255, 0.45)"
            },
            top_tools: [
                { icon: 'code'},
                { icon: 'wireframe'},
                { icon: 'grid'},
            ],
            right_tools: {
                Parameters: {
                    r1: [{ text: "WIDTH", range: true, }],
                    r2: [{ text: "HEIGHT", range: true, }],
                    r3: [{ text: "X", range: true, }],
                    r4: [{ text: "Y", range: true, }],
                },
                Shape: {
                    r1: [
                        { text: "FILL-COLOR", input: true, width: 100, icon: 'fill' },
                        { text: "STROKE-COLOR", input: true, width: 100 },
                    ],
                    r3: [
                        { text: "STROKE-WIDTH", input: true, width: 75 },
                        { dropdown: true, width: 75, selected: 'Dashed', text: "STROKE-STYLE"},
                    ],
                    r2: [
                        { text: "CORNER-RADIUS", input: true, width: 75 },
                        { text: "STROKE", toggle: true, },
                        { text: "FILL", toggle: true, },
                    ],
                    r4: [
                        { text: "OPACITY", input: true, width: 100},
                        { text: "GUASSIAN-BLUR", input: true, width: 100},
                    ],
                },
                Text : {
                    r1: [
                        { button: true, code: 'bold'},
                        { button: true, code: 'italic'},
                        { button: true, code: 'strikethrough'},
                        { button: true, code: 'underline'},
                        { button: true, code: 'capitalize'},
                    ],
                    r4: [
                        { text: "TEXT-COLOR", input: true, width: 100, icon: 'text-color' },
                        { text: "HIGHLIGHT-COLOR", input: true, width: 100, icon: 'highlight' },                        
                    ],
                    r2: [
                        { input: true, text: 'FONT-SIZE',  icon: 'capitalize'},
                        { dropdown: true, width: 155, selected: 'Arial', text: "FONT-FAMILY", icon: 'capitalize'},
                    ],
                    r3: [
                        { text: "IDENTATION", input: true, },
                        { text: "LINE HEIGHT", input: true, },
                        { text: "LETTER SPACING", input: true, icon: "spacing" },
                    ]
                },
                ["List Style"]: {
                    r1: [
                        { text: "SIMPLE", button: true, code: 'list'},
                        { text: "BULLET", button: true, code: 'ul-list'},
                        { text: "NUMBERED", button: true, code: 'ol-list'},
                    ],
                },
                Align: {
                    r1: [                        
                        { text: "LEFT", button: true, code: 'align-left'},
                        { text: "CENTER", button: true, code: 'align-center'},
                        { text: "RIGHT", button: true, code: 'align-right'},
                        { text: "TOP", button: true, code: 'align-top'},
                        { text: "MIDDLE", button: true, code: 'align-middle'},
                        { text: "BOTTOM", button: true, code: 'align-bottom'},
                    ]
                }
            },
            left_tools : [
                { icon: 'select'},
                { icon: 'pencil', type: "pencil"},
                { icon: 'draw-line', type: "draw-line"},
                { icon: 'path',},
                // { icon: 'rectangle', type: "rectangle"},
                // { icon: 'ellipse', type: "ellipse"},
                // { icon: 'polyline'},
                // { icon: 'polygon'},
                { icon: 'shapes-lib', type: "shapes-lib"},
                { icon: 'add-image'},
                { icon: 'text'},
                { icon: 'zoom-in'},
            ],
            bottom_tools : [
                { icon: "dashboard", text: "Templates"},
                { icon: "photo_library", text: "Photos"},
                { icon: "category", text: "Elements"},
                { icon: "format_size", text: "Text"},
                { icon: "texture", text: "Backgrounds"},
                { icon: "cloud_upload", text: "Uploads"},
            ],
            icon: {
                profile,
            },
            height: {
                parent_container: 100,
                non_header_container: 300,
                bottom_tools: 100
            },
            width: {
                left_tools: 75,
                editor_container: 1000,
                right_tools: 360
            },
            
            page: "svg-1",
            pages: [
                { id: "svg-1" },
            ],
            svg: {
                ref: null,
                draw: null
            },
            coords: {
                down: { x: 0, y: 0},
                move: { x: 0, y: 0},
                up: { x: 500, y: 500},
            },
            ev: {
                mousedown: false,
                polygon: false,
                path: false
            },
            poly_arr: [],
            path_arr: [],
            path: {
                L: false,
                C: false,
                d: [],
                pop: false,
                c1: 0,
                c2: 0
            },
            draw : "path",
            controls: null,
            shapes: {
                "draw-line": ['draw-line', 'polyline', 'polygon'],
                "pencil": ['pencil', 'free-hand-rectangle', 'free-hand-ellipse'],
                "shapes-lib": {
                    Basic: ['rectangle', 'square', 'ellipse', 'circle', ] ,
                    Objects: [],
                    Symbols: [],
                    Arrows: [],
                    FlowChart: [],
                    Animals: [],
                    "Cards & Chess": [],
                    "Dialog balloons": [],
                    "Electronics": [],
                    "Mathematical": [],
                    "Music": [],
                    "Miscellaneous": [],
                    "Social Media": [],
                },
            },
            zoom: 1,
            zoom_timer: 0
        }
    },
    methods: {        
        $component(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                html: instance.$el,
                instance
            }
        },
        async $save() {
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');            
            v = await Canvg.from(ctx, $("#svg-container").html());
            v.start();
            
        },
        $select(elem) {
            this.draw = elem
        },
        $hide_call(obj) { $hide(obj, () => this.$def_w_h()) },

        $left_tools(e, shape_kind, i) {
            let { html, instance } = this.$component(c_moreShapes, {e, shapes: this.shapes[shape_kind]})
            instance.$on('$selected', (shape) => {
                this.draw = this.left_tools[i]["icon"] = shape
            })

            $(document.body).prepend(html)
        },

        $init() {
            this.$def_w_h()
            this.$init_svg()
        },
        $init_svg() {
            this.svg.ref = SVG("#"+this.page)
        },
        $draw(e) {
            if(!$has_parent_id(e.target, this.page)) return
            console.log(e.target, 'mouse click')
            this.ev.mousedown = true
            this.coords.down.x = e.offsetX
            this.coords.down.y = e.offsetY 
            let { x, y } = this.coords.down
            switch(this.draw) {
                case "rectangle":
                case "square":
                    this.svg.draw = this.svg.ref.rect(5, 5).move(x, y).fill("red").stroke({ color: "black", width: 5})
                    break
                case "ellipse":
                    this.svg.draw = this.svg.ref.ellipse(5, 5).move(x, y).fill("red").stroke({ color: "black", width: 5})
                    break
                case "circle":
                    this.svg.draw = this.svg.ref.circle(5).move(x, y).fill("red").stroke({ color: "black", width: 5})
                    break
                case "draw-line":
                    this.svg.draw = this.svg.ref.line(0, 0, 5, 0).move(x, y).fill("red").stroke({ color: "red", width: 5})
                    break
                case "polyline":
                case "polygon":
                    if(!this.ev.polygon) {
                        this.svg.draw = (this.draw == "polyline") ? this.svg.ref.polyline() : this.svg.ref.polygon()
                        this.svg.draw.plot([[0,0], [10, 10]]).move(x, y).fill("none").stroke({ color: "red", width: 5}) 
                        this.poly_arr = this.svg.draw.array()
                        this.ev.polygon = true
                    } else {
                        this.poly_arr.push([x, y])
                        this.svg.draw.plot(this.poly_arr)
                    }
                    break
                case "pencil":
                    this.svg.draw = this.svg.ref.path('M0 0 L 1 1').move(x, y).fill("none").stroke({ color: "red", width: 5, linecap: "round"})
                    this.path_arr = this.svg.draw.array()
                    break
                case "path":
                    if(!this.ev.path) {
                        this.svg.draw = this.svg.ref.path('M 0,0   C 0,0 1,1 1,1').move(x, y).fill("none").stroke({ color: "red", width: 5, linecap: "round"})
                        this.path_arr = this.svg.draw.array()
                        this.ev.path = true
                    } else {
                        let {index, value } = $get_last_index(this.path_arr)
                        value[0] == "M" ? this.path_arr.push(["C", value[1], value[2], x,y, x,y]) : this.path_arr.push(["C", value[5], value[6], x,y, x,y])
                        this.path.pop = false
                        this.svg.draw.plot(this.path_arr)
                    }
                    console.log(this.svg.draw.node, 'path')
                    break
                case "select":
                    this.svg.draw = null
                    this.$setup_controls(e.target)
                    break
            }
        },
        $ctrl_point_grip() {
            this.controls ? this.controls.remove() : ''            
            this.controls = this.svg.ref.group()
            let counter = 0
            let colors = ["#00D9E1", "green", "yellow"]
            for(let i=0; i<this.path_arr.length; i++) {
                counter = 0
                for(let j=1; j<this.path_arr[i].length; j+=2) {
                    let c = this.svg.ref.circle(7).fill("#00D9E1").move(this.path_arr[i][j], this.path_arr[i][j+1])
                    counter++
                    this.controls.add(c)
                }
            }
        },
        $setup_controls(elem) {
            elem = SVG(elem)
            console.log(elem.type, 'type')
            console.log(elem.x(), elem.y(), elem.width(), elem.height())
            this.controls ? this.controls.remove() : ''
            let radius = 10,
                gap = 5
            let x = elem.x(),
                y = elem.y(),
                w = x + elem.width(),
                h = y + elem.height()

            let points = [
                { x: x, y: y, gap: {x: -gap, y: -gap }, rs: {x: -gap-(radius/2), y: -gap-(radius/2),}, cursor: 'nw-resize'},
                { x: w, y: y, gap: {x: +gap, y: -gap }, rs: {x: +gap-(radius/2), y: -gap-(radius/2),}, cursor: 'ne-resize'},
                { x: w, y: h, gap: {x: +gap, y: +gap }, rs: {x: +gap-(radius/2), y: +gap-(radius/2),}, cursor: 'se-resize'},
                { x: x, y: h, gap: {x: -gap, y: +gap }, rs: {x: -gap-(radius/2), y: +gap-(radius/2),}, cursor: 'sw-resize'},
                { x: (x+w)/2, y: y, rs: {x: 0, y: -gap-(radius/2),}, cursor: 'n-resize'},
                { x: w, y: (y+h)/2, rs: {x: +gap-(radius/2), y: 0,}, cursor: 'e-resize'},
                { x: (x+w)/2, y: h, rs: {x: 0, y: +gap-(radius/2),}, cursor: 's-resize'},
                { x: x, y: (y+h)/2, rs: {x: -gap-(radius/2), y: 0,}, cursor: 'w-resize'},
            ]

            this.controls = this.svg.ref.group()
            
            let path = 'M '

            for(let i=0; i<points.length; i++) { //00ff8b
                let c = this.svg.ref.circle(radius).fill("#00D9E1").move(points[i].x + points[i].rs.x, points[i].y + points[i].rs.y).attr({ cursor: points[i].cursor})
                i < 4 ? path += (points[i].x+points[i].gap.x) + " " + (points[i].y+points[i].gap.y) + " " : ""
                this.controls.add(c)
                c.click(() => $resize(points[i].cursor))
            }
            path += "Z"
            this.controls.add(this.svg.ref.path(path).fill("none").stroke({color: '#00D9E1', width: 1, dasharray: "5,5"}))
            elem.width(w)
        },
        $resize(cursor) {
        },
        $drawing(e) {
            let mousedown_ignore = ["polyline", "polygon", "path"]
            if(!this.ev.mousedown && !mousedown_ignore.includes(this.draw)) return
            if(!$has_parent_id(e.target, this.page)) return
            if(!this.svg.draw) return
            if(mousedown_ignore.includes(this.draw) && (!this.ev.polygon && !this.ev.path)) return

            this.coords.move.x = e.offsetX
            this.coords.move.y = e.offsetY
            let { x, y } = this.coords.down
            let w = e.offsetX - x
            let h = e.offsetY - y
            let newX = e.offsetX,
                newY = e.offsetY
            let points = { w, h, x, y }
            let NEGATIVE_VALUES_VALID = ["rectangle", "ellipse", "square", "circle"]

            // HANDLING NEGATIVE VALUES
            if(NEGATIVE_VALUES_VALID.includes(this.draw)) {
                if(w < 0 || h < 0) {
                    points = $neg_w_h(points)
                    this.svg.draw.move(points.x, points.y)
                } 
            }

            switch(this.draw) {
                case "rectangle":
                    this.svg.draw.size(points.w, points.h)
                    break
                case "square":
                case "circle":
                    let d = points.w > points.h ? points.w : points.h
                    this.draw == "square" ? this.svg.draw.size(d, d) : this.svg.draw.radius(d)
                    break
                case "ellipse":
                    this.svg.draw.size(points.w*2, points.h*2)
                    break
                case "draw-line":
                    let A = this.svg.draw.plot()[0],
                        B = [points.w + A[0], points.h + A[1]]
                    this.svg.draw.plot([A, B])
                    break
                case "polyline":
                case "polygon":
                    let { index } = $get_last_index(this.poly_arr)
                    this.poly_arr[index] = [newX, newY]
                    this.svg.draw.plot(this.poly_arr)
                    break
                case "path":
                    let last = $get_last_index(this.path_arr)
                    let second_last = $get_index(this.path_arr, this.path_arr.length-2)
                    // if(this.coords.up.x%this.coords.down.x <= 1 && this.coords.up.y%this.coords.down.y <= 1) 
                    if(!this.ev.mousedown && !this.path.pop) {
                        console.log(1, this.path.pop)
                        if(last["value"][0] == "C") {
                            this.path_arr[last["index"]] = ["C", last["value"][5],last["value"][6],  newX,newY, newX, newY]                    
                        }
                    }
                    else if(!this.ev.mousedown && this.path.pop) {
                        console.log(3)
                        last = $get_last_index(this.path_arr)
                        this.path_arr[last["index"]][1] = this.path.c1
                        this.path_arr[last["index"]][2] = this.path.c2
                        this.path_arr[last["index"]][3] = this.coords.move.x
                        this.path_arr[last["index"]][4] = this.coords.move.y
                        this.path_arr[last["index"]][5] = this.coords.move.x
                        this.path_arr[last["index"]][6] = this.coords.move.y
                        this.path["C"] = true
                    }
                    else if(this.ev.mousedown) {
                        if(!this.path.pop) {
                            this.path.pop = true
                            this.path_arr.pop()
                            console.log('hello')
                        }
                        if(this.path.pop) {
                            last = $get_last_index(this.path_arr)
                            if(!this.path["C"]) {
                                if(second_last["value"][0] == "M") {
                                    this.path_arr[last["index"]][1] = second_last["value"][1]
                                    this.path_arr[last["index"]][2] = second_last["value"][2]
                                } else if(second_last["value"][0] == "C") {
                                    this.path_arr[last["index"]][1] = second_last["value"][5]
                                    this.path_arr[last["index"]][2] = second_last["value"][6]
                                }
                                this.path_arr[last["index"]][5] = this.coords.down.x
                                this.path_arr[last["index"]][6] = this.coords.down.y
                            }
                            this.path_arr[last["index"]][3] = this.coords.down.x-w
                            this.path_arr[last["index"]][4] = this.coords.down.y-h
                            this.path.c1 = this.coords.down.x+w
                            this.path.c2 = this.coords.down.y+h
                        }
                        console.log(this.svg.draw.node, 'path')
                        console.log(2, this.path.pop)
                        console.log(this.svg.draw.width(), this.svg.draw.x(),  'size')
                    }

                    this.$ctrl_point_grip()
                    this.svg.draw.plot(this.path_arr)
                    break


                case "pencil":
                    let { value } = $get_last_index(this.path_arr)
                    let a1 = value,
                        a2 = ["L", newX, newY]
                    if($distance(a1, a2) > 5) {
                        this.path_arr.push(["L", newX, newY])
                        this.svg.draw.plot(this.path_arr)
                    }
                    break
            }
        },
        $drawn(e) {
            this.coords.up.x = e.offsetX
            this.coords.up.y = e.offsetY
            if(this.path.pop) {
                this.path_arr.push(["C", this.coords.move.x,this.coords.move.y, this.coords.move.x,this.coords.move.y, this.coords.move.x,this.coords.move.y])
                this.path["C"] = false
                // this.path_arr[last["index"]][1] = this.coords.down.x-w
                // this.path_arr[last["index"]][2] = this.coords.down.y-h
                // this.path_arr[last["index"]][5] = this.coords.down.x+w
                // this.path_arr[last["index"]][6] = this.coords.down.y+h
                // this.path_arr.push(["C", last["value"][5],last["value"][6], this.coords.up.x,this.coords.up.y, this.coords.up.x,this.coords.up.y])
            }
            this.ev.mousedown = false
        },
        $drawing_events(e) {
            switch(e.keyCode) {
                case 27: // ESCAPE KEY
                    switch(this.draw) {
                        case "polyline":
                        case "polygon":
                            $remove_last_index(this.poly_arr)
                            this.svg.draw.plot(this.poly_arr)
                            this.ev.polygon = false
                            break
                        case "path":
                            $remove_last_index(this.path_arr)
                            this.svg.draw.plot(this.path_arr)
                            this.ev.path = false
                            break
                    }
                    break
            }
        },
        $def_w_h() {
            let h = {
                header : $(this.$refs['header']).outerHeight(),
                top_tools : $(this.$refs['top-tools']).outerHeight(),
                bottom_tools: $(this.$refs['bottom-tools']).outerHeight(),
                window: $(window).height()
            }
            let w = {
                editor_container: $(this.$refs['editor-container']).outerWidth(),
                left_tools: $(this.$refs['left-tools']).outerWidth(),
                right_tools: $(this.$refs['right-tools']).outerWidth(),
                window: $(window).width()
            }

            this.height.non_header_container = h.window - h.header - h.top_tools - h.bottom_tools
            this.height.parent_container = h.window
            this.height.bottom_tools = h.bottom_tools
            this.width.editor_container = w.window - w.left_tools - w.right_tools
        },
        $keydown_events(event) {
            // 107 Num Key  +
            // 109 Num Key  -
            // 173 Min Key  hyphen/underscor Hey
            // 61 Plus key  +/= key
            this.$zoom_control(event)
        },
        $zoom_control(event) {
            let $this = this
            if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
                event.preventDefault();
                this.$zoom(event.which)
            }
            this.$refs['parent-container'].addEventListener('mousewheel', event => {
                if (event.ctrlKey) {
                    event.preventDefault()
                    if(this.zoom_timer == 0) {
                        let zoom = 0
                        event.deltaY < 0 ? zoom = 107 : zoom = 109
                        this.$zoom(zoom)
                        this.zoom_timer++
                    }
                    clearTimeout($.data(this, 'scrollTimer'));
                    $.data(this, 'scrollTimer', setTimeout(function() {
                        console.log("Haven't scrolled in 250ms!");
                        $this.zoom_timer = 0;
                    }, 250));
                }
            })            
        },
        $zoom(z) {
            let zoom_btn = $("#zoom-btn")
            switch(z) {
                case 107:
                    this.zoom < 3 ? this.zoom += 0.1 : ''
                    break
                case 109:
                    this.zoom > 0.3 ? this.zoom -= 0.1 : ''
                    break
            }
            this.zoom < 1 ? zoom_btn.html("zoom_out") : zoom_btn.html("zoom_in")
            this.zoom == 1 ? zoom_btn.addClass("scale-0") : zoom_btn.removeClass("scale-0")
            this.$zoom_overlay(this.zoom, zoom_btn)
        },
        $zoom_overlay(zoom, zoom_btn) {
            let { html, instance } = this.$component(c_zoom_overlay, {e: zoom_btn , zoom } )
            instance.$on('$zoom', (z) => {
                console.log(z, 'zoomed')
                this.zoom = z
            })
            $(document.body).prepend(html)

        }
    
    },
    mounted() {
        this.$init()
        $(window).resize(() => this.$def_w_h())
        $(window).mousedown((e) => this.$draw(e))
        $(window).mousemove((e) => this.$drawing(e))
        $(window).mouseup((e) => this.$drawn(e))
        $(window).keyup((e) => this.$drawing_events(e))
        $(window).keydown(e => this.$keydown_events(e))  


    }
}
</script>

<style>
</style>