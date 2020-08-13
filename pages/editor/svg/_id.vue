<template>
<div class="d-flex" id="root" ref="root" :style="{height: root['h']+'px'}">
    <!-- LEFT -->
    <div class="bg-white box-shadow overflow-auto" ref="left" :style="{width: left['w']+'px', height: left['h']+'px'}">
        <div class="w-100 text-right">
            <button class="btn material-icons p-2">chevron_left</button>
        </div>
        <div class="ml-4 mr-4 mt-2 mb-2 bd-bottom" v-for="(obj, key) in left['data']" :key="key">
            <button @click="left[key] = !left[key]" class="btn no-btn p-0 mt-2 mb-1">
                <span :class="left[key] ? 'font-weight-bold' : ''">{{key}}</span>
                <span class="material-icons btn p-0 text-md transition-3" :style="left[key] ? {transform: 'rotate(90deg)'} : {transform: 'rotate(0deg)'}">chevron_right</span>
            </button>
            <div v-if="left[key]" class="animated fadeInRight faster">
                <div v-for="(nested, key) in obj" :key="key">
                    <div class="d-flex" :class="nested[0]['heading'] ? 'mt-4 mb-2' : 'mb-3 justify-content-between'">
                        <div v-for="(item, i) in nested" :key="i">
                            <w-range v-if="item['range']" :title="item['text']" :dropdown="item['dropdown']" 
                                @position="toolkit($event, item['text'])"/>
                            <w-dropdown v-else-if="item['dropdown']" :title="item['text']" :w="item['w']" :selected="item['selected']" :list="item['list']" @item_selected="$dropdown_ev" />
                            <w-toggle v-else-if="item['toggle']" :title="item['text']" />
                            <w-inputValue v-else-if="item['input']" :title="item['text']"  :width="item['width']" :icon="item['icon']" 
                                @color="toolkit($event, item['text'])" 
                                @fill="toolkit($event, item['text'])" 
                                @stroke="toolkit($event, item['text'])" 
                            />     
                            <div v-else-if="item['button']">
                                <p v-if="item['title']" class="w-100 text-center text-sm pb-1 m-0">{{item['title']}}</p>
                                <button class="w-100 btn p-1 m-0" :class="'icon-'+item['code']"></button>
                            </div>                                           
                            <p class="w-100 m-0 p-0 font-weight-bold text-sm" v-else-if="item['heading']">{{item['text']}}</p>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    </div>

    <!-- RIGHT  -->
    <div class="p-1 m-0" ref="right" :style="{width: right['w']+'px', height: right['h']+'px'}">
        <!-- TOP -->
        <div class="d-flex justify-content-between" ref="top">
            <div>
                <p v-if="save" class="text-small pl-2">Saving...</p>
            </div>
            <div class="d-none">
                <button class="btn material-icons">chevron_left</button>
                <button class="btn no-btn border bd-2 pl-3 pr-3 pt-1 pb-1 bg-white">1 / 5</button>
                <button class="btn material-icons">chevron_right</button>
            </div>
            <div class="d-flex p-relative">
                <button @click="more_vert.other.show = !more_vert.other.show" class="btn material-icons">more_vert</button>
                <div v-if="more_vert.other.show" class="p-absolute bg-light bd-round-2 p-2 box-shadow" style="top:25px;right:10px;min-width:200px;z-index:5000" @mouseleave="more_vert.other.show=false">
                    <button @click="top_right_dp(item)" class="btn btn-block text-left p-2" v-for="(item, i) in more_vert.other.list" :key="i">
                        {{item}}
                    </button>
                </div>
            </div>
        </div>
        <!-- WORKAREA -->
        <div class="p-5 transition-3 w-100 d-flex overflow-auto" ref="workarea" :style="{height: workarea['h'] + 'px'}">
            <div id="svg-container" :style="{width: '100%', height: '100%'}" class="border bd-2 p-relative hov-elem" @mouseleave="more_vert.canvas.dropdown = false">
                <!-- PROPS -->
                <div class="p-absolute hov-tg scale-0" ref="canvas-props" :style="more_vert.canvas.style">
                    <button @click="more_vert.canvas.dropdown = !more_vert.canvas.dropdown" class="btn text-white bg-primary p-1 box-shadow bd-round material-icons transition-3" :class="more_vert.canvas.dropdown ? 'rotate-45 bg-danger' : 'rotate-0'">{{more_vert.canvas.dropdown ? 'add': 'more_vert'}}</button>
                    <div class="bg-white mt-2 box-shadow p-2 animated fadeIn faster w-100" v-if="more_vert.canvas.dropdown" style="min-width:200px">
                        <button @click="$canvas(item['title'])" class="btn btn-block text-dark text-left" v-for="(item, i) in more_vert.canvas.list" :key="i" :class="item.break ? 'bd-bottom p-0' : 'p-2'">
                            <span v-if="!item.break">
                                <span class="mr-4" :class="'icon-'+item['icon']"></span>
                                <span>{{item.title}}</span>
                            </span>
                        </button>
                    </div>
                </div>
                <svg
                    id="svg" ref="svg"
                    width="100%" height="100%">
                    <rect id="canvas-bg" width="100%" height="100%" fill="#ffffff" x="0" y="0" stroke-width='2'></rect>
                </svg>
            </div>
        </div>
    </div>

    <!-- TOOLS -->
    <div ref="tools" class="p-absolute bd-round p-1 box-shadow bg-white z-1000 transition-3" :style="{left: tools['l'] + 'px', top: tools['t'] + 'px' }">
        <button @click="$draw($event, item, i)" v-for="(item, i) in tools['data']" :key="i" 
            class="btn no-btn btn-block p-3 bd-round text-lg" :class="['icon-'+item['class'], item['class'] == draw['type'] ? 'bg-primary border text-white box-shadow' : '']">
        </button>
        <button @click="$templates()" class="btn btn-block bd-round">
            <span class="icon-horizontal-more"></span>
        </button>
    </div>

    <!-- ADD -->
    <div class="p-absolute" style="right:25px;bottom:25px">
        <div class="bg-white box-shadow bd-round animated zoomIn faster" v-if="add.show">
            <button @click="$add(item.value)" v-for="(item, i) in add.list" :key="i" :class="'icon-'+item['icon']" class="btn btn-block text-lg p-3 bd-round">
                <span class="text-lg" v-for="(sub, j) in item['paths']" :key="j" :class="sub"></span>
            </button>
        </div>
        <button @click="add.show = !add.show" class="btn text-lg transition-3 mt-3 btn-block text-white p-3 box-shadow bd-round icon-add" :class="add.show ? 'rotate-45 bg-danger' : 'rotate-0 bg-primary'"></button>
    </div>

    <!-- loading  -->
    <button v-if="loading.$" class="btn btn-primary p-2 pl-3 pr-3 animated fadeInUp faster p-absolute z-1300 text-white bd-round box-shadow transition-3" style="left:25px; bottom:25px">
        <span class="spinner-border spinner-border-sm"></span>
        <span class="text-small ml-2">{{loading.msg}}</span>
    </button>

    <!-- <c-group :g="draw.$ ? draw.$.node : ''" /> -->


    <div v-if="more_vert.selector.show" class="p-absolute animated zoomIn faster" :style="more_vert.selector.style">
        <button id="selector-more-vert" @click="more_vert.selector.dropdown = !more_vert.selector.dropdown" class="btn text-white p-1 box-shadow bd-round material-icons bg-primary-2">more_vert</button>
        <div class="bg-white mt-2 box-shadow p-2 animated fadeIn faster w-100" v-if="more_vert.selector.dropdown">
            <button @click="more_vert.selector.select(item.title)" class="btn btn-block text-dark text-left" v-for="(item, i) in more_vert.selector.list" :key="i">
                <span class="mr-4" :class="'icon-'+item['icon']"></span>
                <span>{{item.title}}</span>
            </button>
        </div>
    </div>

    <canvas width="1000" height="1000" class="border p-absolute d-none"></canvas>
</div>
</template>

<script>
import vue from 'vue'

import profile from '@/assets/svg/computer.svg'
import w_range from '@/components/widgets/range.vue'
import w_toggle from '@/components/widgets/toggle.vue'
import w_inputValue from '@/components/widgets/input-value.vue'
import w_dropdown from '@/components/widgets/dropdown.vue'
import w_popup_v from '@/components/widgets/popup-vertical.vue'

import c_draw from '@/components/editor-draw.vue'
import c_zoom_overlay from '@/components/editor-zoom-overlay.vue'
import c_templates from '@/components/editor-templates.vue'
import c_layers from '@/components/editor-layers.vue'
import c_code from '@/components/editor-code.vue'
import c_collaborators from '@/components/editor-collaborators.vue'
import c_pngtosvg from '@/components/editor-pngtosvg.vue'
import { SVG } from '@svgdotjs/svg.js'

import JSON_editor from '@/assets/json/editor.json'
import Canvg, { compressSpaces } from 'canvg';
import rotate_ico from '@/assets/svg/rotate.svg'
import rotate_png from '@/assets/png/rotate.png'
import {v4 as uuid} from 'uuid'
let v = null
let c_ID = null
let ID = {
    c: null,
    p: null,
    u: null
}

// CLASSES
import Draw from '@/static/classes/Draw.js'
import Select from '@/static/classes/Select.js'
let draw = null
let select = null
import fetch from 'node-fetch'
export default {
    components: {
        "w-range": w_range,
        "w-toggle": w_toggle,
        "w-inputValue": w_inputValue,
        "w-dropdown": w_dropdown,
        w_popup_v,
        c_draw,
        c_templates,
        c_code,
        c_collaborators,
        c_pngtosvg,
    },    
    head () {
        return {
            title: "Protosigning",
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },   
    data() {
        return {
            save: false,
            uid: null,
            add: { list:[], show: false },
            loading: { $: false, msg: ""},
            window: { w: 0, h: 0},
            root: { node: null, w: 0, h: 0, },
            left: { node: null, w: 360, h: 0, data: null, "Text": false, "Size & Rotation": false, "Alignment":false, "Shape": false  },
            right: { node: null, w: 0, h: 0, list: [] },
            top: { node: null, w:0, h: 38 },
            workarea: { node: null, w:0, h:0 },
            tools: { node: null, l:0, t:0, data: null, show: false },
            draw: { $: null, array: [], init: false, hasPlots: false, template: null , type: "select", C: null },
            textarea: {node: null, resize: null, fontsize: 50, x: 0, y:0, w:100,h:100},
            canvas: { node: null, $: null, w: 1920, h: 1020 },
            more_vert: {
                canvas: {
                    $: null,
                    list: [],
                    show: true,
                    dropdown: false,
                    style: { right: '-16px', top: '-16px', textAlign: 'right'} 
                },
                other: {
                    list: ["Go to DASHBOARD", "Signout"],
                    show: false
                },
                selector: {
                    $: null,
                    list: [],
                    show: false,
                    dropdown: false,
                    style: { zIndex: 10000 },
                    select: (item) => {
                        this.more_vert.selector.dropdown = false
                        this.more_vert.selector.show = false
                        switch(item) {
                            case "Convert to SVG":
                                select.node.remove()
                                this.insert._pngToSvg(select.node.attr("href"))
                                break
                            case "Copy SVG Code":
                                let svg = $parent(select.node.node, "svg")
                                if(svg.tagName.toUpperCase() == "SVG") {
                                    this.loading.$ = true
                                    this.loading.msg = "Copying Code to Clipboard"
                                    var textArea = document.createElement("textarea");
                                    textArea.value = svg.innerHTML;
                                    document.body.append(textArea)
                                    textArea.focus();
                                    textArea.select();
                                    document.execCommand("copy")
                                    setTimeout(() => {
                                        this.loading.$ = false   
                                        $(textArea).remove()
                                    }, 1000);
                                }
                                break
                        }
                    }
                }
            },
            DOMRect: { component: null, canvas: null },
            components: {},
            component: { count: {}, type: ["textarea", "polyline", "polygon", "path", "square", "rectangle", "circle", "ellipse", "pencil", "draw-line"] },
            page: {
                i: 1,
                list: []
            },
            ev: {
                mousedown: false,
                ctrl: false,
                _mousedown: (e) => {
                    this.ev.mousedown = true
                    draw.type = select.type = this.draw.type

                },
                _mouseup: () => {
                    this.ev.mousedown = false
                    if(select.node) {
                        this.update._selectorMoreVert(select.node)
                    }                    
                },
                _keydown: (e) => {
                    switch(e.keyCode) {
                        case 17:
                            this.ev.ctrl = true
                            break
                        case 46:
                            select.node.remove()
                    }
                    if(this.ev.ctrl) {
                        switch(e.keyCode) {
                            case 83:
                                e.preventDefault()
                                select.remove()
                                this.update.project()
                                break
                        }
                    }
                }
            },
            insert: {
                _template: (data) => {
                    data = $validateSVG(data, uuid())
                    console.log(data, 'template-data')
                    this.draw.$ = SVG(data)
                    this.canvas.$.add(data)
                    this.init._component(this.draw.$)
                    let g = $(data).children()
                    g.length == 1 ? g.css('transform', 'scale(0.50)') : ''
                },
                _pngToSvg: (src) => {
                    // let src = png.attr("href")
                    this.loading.$ = true
                    this.loading.msg = "It will take a while"
                    $img_wh(src, (data) => {
                        if(data.width < 0 || data.height < 1) {
                            location.reload()
                            return
                        }
                        let { html, instance } = this.$component(c_pngtosvg, { img: {...data, dataURL: src } } )
                        html = $(html)
                        instance.$on('$primary-svg', (payload) => {
                            // png.remove()
                            payload = $validateSVG(payload, uuid())
                            console.log(payload, 'png-to-svg')
                            // png = SVG(payload).clone()
                            this.canvas.$.add(payload)
                            this.loading.msg = ""
                            this.loading.$ = false
                        })
                        html.addClass('d-none')
                        $(document.body).append(html[0])
                    })
                }
            },
            init: {
                _assign: () => {
                    // window.location.reload(false)
                    let $this = this
                    ID.u = this.$store.state.user.uid
                    ID.p = this.$route.params.id

                    this.more_vert.selector.list = JSON_editor.more_vert.selector['g']
                    this.more_vert.canvas.list = JSON_editor.more_vert['canvas']

                    draw = new Draw(SVG(this.$refs.svg))
                    select = new Select(SVG(this.$refs.svg))
                    this.api_fetch_one('projects/'+ID.u, ID.p, (payload) => {
                        if(payload) {
                            if(payload.data) {
                                this.loading.$ = true
                                this.loading.msg = "Please wait..."
                                if(payload.data.match(/https:\/\/www.brandbucket.com/g).length > 0) {
                                    const proxyurl = "https://cors-anywhere.herokuapp.com/"
                                    fetch(proxyurl + payload.data)
                                    .then((response) => {
                                        let img = new Image();
                                        img.crossOrigin = "anonymous"
                                        img.src = response.url
                                        console.log(img.src, 'image')
                                        img.onload = function() {
                                            let canvas = document.querySelector("canvas")
                                            let ctx = canvas.getContext("2d")
                                            ctx.drawImage(img, 0, 0)
                                            let pngURL = canvas.toDataURL();
                                            $this.insert._pngToSvg(pngURL)
                                        }
                                    })
                                }
                            }
                            $readFile(payload.file_url, (filedata) => {
                                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                $(svg).attr('viewBox', '0 0 800 800')
                                $(svg).html(filedata)
                                this.canvas.$.add(svg)
                            })
                        }
                    })
                },
                _component: (c) => {
                    ID.c =  c.type +"-"+ (this.component.count[c.type] ? this.component.count[c.type] +=1 : this.component.count[c.type] = 1)
                    c.attr("c-id", ID.c)
                    this.components[ID.c] = {
                        id: ID.c,
                        clone: $(c.node).clone(),
                        node: c.node,
                        type: c.type,
                        fontsize: 50,
                        text: c.type == "text" ? c.text() : null
                    }
                },
            },
            hide: {
                _selector: () => this.selector.$.hide(),
            },
            update: {
                _selectorMoreVert: (node) => {
                    let parent = $parent(node.node, 'svg'),
                        type = node.type
                    this.more_vert.selector.show = true

                    if($(parent).attr("template-id")) {
                        this.more_vert.selector.list = JSON_editor.more_vert.selector['template']
                    }
                    else {
                        type !== 'image' ? type = 'basic' : ''
                        this.more_vert.selector.list = JSON_editor.more_vert.selector[type]
                    }
                    this.more_vert.selector.style.left = select.more_vert().left + 'px'
                    this.more_vert.selector.style.top = select.more_vert().top + 'px'  

                },
                project: async () => {
                    this.loading.$ = true
                    this.loading.msg = "Saving your project, Do not close this window"
                    let ref = 'projects/'+ID.u + '/'+ID.p,
                        canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d')
                        canvas.width = this.canvas.w
                        canvas.height = this.canvas.h
                    v = await Canvg.from(ctx, $("#svg")[0].outerHTML)
                    v.start()
                    this.api_update_src_txt_file(ref, { uri: canvas.toDataURL(), file: this.canvas.node.html() }, () => {
                        this.api_update('projects/'+ID.u+'/'+ID.p, {data: null}, () => {
                            this.loading.$ = false
                        })
                    } )
                }
            }
        }
    },
    methods: {
        top_right_dp(item) {
            switch(item) {
                case 'Go to DASHBOARD':
                    this.$router.push('/dashboard2')
                    break
                case "Signout":
                    this.$api_signout(() => {
                        window.location.href = "/"
                    })
                    break
            }
        },
        $collaborators(e) {
            let { html, instance } = this.$component(c_collaborators, {offset: $(e.target).offset(), uid: this.uid })
            $(document.body).prepend(html)

        },
        toolkit(payload, type) {
            console.log(type, 'type')
            switch(type) {
                case "TEXT":
                    select.node.font({
                        fill: payload
                    })
                    break
                case "Fill":
                    select.node.attr({
                        fill: payload
                    })
                    break
                case "Stroke":
                    select.node.stroke({
                        color: payload
                    })
                    break
                case "LETTER-SPACING":
                    break
                case "Stroke-Width":
                    console.log(payload, 'stroke-width')
                    select.node.stroke({width: payload})
                    break
            }
        },
        $dropdown_ev(payload) {
            switch(payload.type) {
                case "Font-Family":
                    select.node.font("family", payload.style.fontFamily)
                    break
                case "Size":
                    select.node.font("size", payload.style.size)
                    break
            }
        },
        async $save() {
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');            
            v = await Canvg.from(ctx, $("#svg-container > svg")[0].outerHTML);
            // $(canvas).removeClass("d-none")
            v.start();
            var link = document.createElement('a');
            link.download = 'filename.png';
            link.href = canvas.toDataURL()
            link.click();
            
        },
        $canvas(p) {
            console.log(p, 'hello')
            switch(p) {
                case "Download In SVG":
                    let junk = $("#svg").find("title")
                    if(junk) {
                        junk = junk.parent()
                        junk.remove()
                    }
                    this.download_svg("SVG.svg", $("#svg")[0].outerHTML)
                    break
                case "Download":
                    this.$save()
                    break
                case "Delete/Clear":
                    this.canvas.node.html("")
                    break
                case "SVG Code":
                    let { html, instance } = this.$component(c_code, { code: this.canvas.node[0].outerHTML})
                    $(document.body).prepend(html)
                    break
            }
        },
        $templates() {
            let { html, instance } = this.$component(c_templates, { w: this.left['w'] })
            instance.$on("$select", (payload) => {
                this.loading.msg = "Please wait while the file is ready"
                this.loading.$ = true
                if(payload.type == "elements" || payload.type == "logos") {
                    let file = payload['file_url']
                    setTimeout(() => {
                        $readFile(file, (data) => {
                            this.insert._template(data)
                            this.loading.msg = ""
                            this.loading.$ = false
                        })                        
                    }, 500);
                }
            })
            $(document.body).prepend(html)
        },
        $draw(e, elem, i) {
            this.draw.$ = null
            this.draw.type = elem.class
            if(elem.more) {
                let { html, instance } = this.$component(c_draw, { e, shapes: elem.data })
                instance.$on("$draw", (payload) => {
                    this.tools['data'][i]['class'] = this.draw.type = payload
                    this.draw.type = payload
                })
                $(document.body).prepend(html)
            }
        },
        $add(item) {
            switch(item) {
                case "image":
                    this.draw.type = "image"
                    $("#svg").mousedown()
                    break
            }
        },
        $init() {
            this.root.node = $(this.$refs['root'])
            this.left.node = $(this.$refs['left'])
            this.right.node = $(this.$refs['right'])
            this.top.node = $(this.$refs['top'])
            this.tools.node = $(this.$refs['tools'])
            this.canvas.$ = SVG("#svg")
            this.canvas.node = $(this.$refs['svg'])
            this.canvas.resolution = $(this.$refs['resolution'])
            this.canvas.full_screen = $(this.$refs['full-screen'])
            this.add.list = JSON_editor['add']
            this.right.list = JSON_editor['right']

            this.left.data = JSON_editor['left']
            this.tools.data = JSON_editor['tools']

            this.right.workarea = $(this.$refs['workarea'])
            console.log(JSON_editor.people, 'people')

            this.$w_h()
        },
        $w_h() {
            this.window.w = $(window).width()
            this.window.h = $(window).height()
            this.root['h'] = this.window.h
            this.left['h'] =this.window.h
            this.right['h'] =this.window.h
            this.right['w'] = this.window.w - this.left['w']
            setTimeout(() =>  this.workarea['h'] = this.window.h - this.top.node.outerHeight() - 10 , 1)
            this.$x_y(this.window)
        },
        $x_y({ w, h }) {
            this.tools['l'] = this.left['w'] + 10
            setTimeout(() =>  this.tools['t'] = (h - this.tools.node.outerHeight())/2 , 100)
        },
        $component(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                html: instance.$el,
                instance
            }
        },
        $m_down(e) {
            if(!$hasParentId(e.target, "svg")) return
            this.ev.mousedown = true
            this.coords.down.x = e.offsetX 
            this.coords.down.y = e.offsetY
            this.DOMRect.canvas = this.canvas.node[0].getBoundingClientRect()
            let { x, y } = this.coords.down
            let pointArray = ["polyline", "path", "polygon"],
                no_styling = ["text", "select", "textarea", "template"],
                DOMRect = null,
                $this = this
            switch(this.draw.type) {
                case "text":
                    x -= this.textarea.fontsize/2
                    y -= this.textarea.fontsize/2
                    this.textarea.node = $("<textarea></textarea>")
                    this.textarea.node.addClass("p-absolute transition-3")
                    this.textarea.node.css({
                        left: e.clientX-(this.textarea.fontsize/2), 
                        top: e.clientY-(this.textarea.fontsize/2),
                        width: this.textarea.w,
                        height: this.textarea.h,
                        fontSize: this.textarea.fontsize,
                        resize: "none",
                        textAlign:"center"
                    })
                    $(document.body).append(this.textarea.node)
                    setTimeout(() => this.textarea.node.focus() , 100)

                    this.textarea.node.keyup(() => {
                        this.draw.$ ? this.draw.$.remove() : ""
                        this.draw.$ = this.canvas.$.text(this.textarea.node.val()).move(x, y).font({ size: this.textarea.fontsize}).opacity(0)
                        DOMRect = this.draw.$.node.getBoundingClientRect()
                        this.textarea.node.css({
                            width: DOMRect.width + this.textarea.w,
                            height: DOMRect.height + this.textarea.h
                        })
                    })
                    this.draw.type = "textarea"
                    break
                case "textarea":
                    this.textarea.node.remove()
                    this.draw.$.opacity(1)
                    break
            }
        },
    },
    mounted() {
        $(window).resize(() => this.$w_h())
        $(window).mousedown((e) => this.ev._mousedown(e))
        $(window).mousemove((e) => {
            if(this.ev.mousedown) {
                this.more_vert.selector.show  = false
            }
        })

        $(window).mouseup((e) => this.ev._mouseup(e))
        $(window).keydown((e) => this.ev._keydown(e))
        // $(window).dblclick((e) => this.ev._dblclick(e))
        this.$init()     
        this.init._assign()                
    }
}
</script>

<style>
.active-elem {
    background-color:rgba(0, 123, 255, 1) !important;
    color:rgb(0, 123, 255) !important;
    color: white !important
}
.z-1300 {
    z-index: 1300;
}
.rotate-90 {
    transform: rotate(90deg) !important;
}
.rotate-0 {
    transform: rotate(0deg) !important;
}
.rotate-45 {
    transform: rotate(135deg) !important;
}
#root * {
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
}
</style>