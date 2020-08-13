<template>
    <div class="formatting-container">
        <div class="container-fluid  pb-3 mb-1">
            <div class="row justify-content-start pl-2 pr-2">
                <h2 class="mt-2 mb-1"><b>Alignment:</b> &nbsp; </h2>
                <button @click="$text_align('left')"  :class="{'btn-primary': text_align === 'left'}" class="col-md-2 mr-2 btn border">Left</button>
                <button @click="$text_align('center')" :class="{'btn-primary': text_align === 'center'}" class="col-md-2 mr-2 btn border">Center</button>
                <button @click="$text_align('right')" :class="{'btn-primary': text_align === 'right'}" class="col-md-2 mr-2 btn border" >Right</button>
            </div>
            <div class="row justify-content-center pl-2 pr-2 mt-3">
                <button @click="$bold()" :class="{'btn-primary': bold }" class="col-md-2 btn border">Bold</button>
                <button @click="$underline()" :class="{'btn-primary': underline }" class="col-md-3 btn border">Underline</button>
                <button @click="$line_through()" :class="{'btn-primary': line_through}" class="col-md-3 btn border">L-Through</button>
            </div>
        </div>
        <div class="container-fluid border border-top-0 border-left-0 border-right-0 mb-3">
            <div class="row align-center mb-3">
                <p class="col-md-2"><b>Spacing:</b></p>
                <input @change="$spacing($event)" :disabled="!selected" type="range" class="col-md-3 custom-range width-range" name="points1" min="0" max="20" :value="spacing">
                <p class="col-md-3"><b>Line Height:</b></p>
                <input @change="$line_height($event)" :disabled="!selected" type="range" class="col-md-3 custom-range width-range" id="customRange" name="points1" min="10" max="100" :value="line_height">
            </div>
            <div class="row justify-content-center mb-3">
                <p class="">Background:</p>
                <button @click="$color('bg')" class="p-2 btn align-self-center mr-4 box-shadow" :style="{backgroundColor: color.bg}"></button>

                <p class="">Foreground:</p>
                <button @click="$color('fg')" class="p-2 btn align-self-center mr-4 box-shadow" :style="{backgroundColor: color.fg}"></button>

                <p class="">Border:</p>
                <button @click="$color('bd')" class="p-2 btn align-self-center box-shadow" :style="{backgroundColor: color.bd}"></button>
            </div>
        </div>

        <div class="container-fluid border border-top-0 border-left-0 border-right-0 pb-3 mb-3">
            <div class="row justify-content-center">
                <select @change="$font_size($event)" name="cars" class="custom-select col-md-3 mr-2">
                    <option>{{font_size}}</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="19">19</option>
                    <option value="21">21</option>
                    <option value="23">23</option>
                    <option value="25">25</option>
                    <option value="28">28</option>
                    <option value="31">31</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="43">43</option>
                    <option value="46">46</option>
                    <option value="52">52</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                </select>
                <select @change="$font_style($event)" name="cars" class="custom-select col-md-4 mr-2">
                    <option selected>{{font_style.substr(0, 20)}}</option>
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                </select>
                <select @change="$font_family($event)" name="cars" class="custom-select col-md-4 mr-2">
                    <option selected>{{font_family}}</option>
                    <option style="font-family:Helvetica" value="helvetica">Helvetica</option>
                    <option style="font-family:Arial" value="arial">Arial</option>
                    <option style="font-family:Montserrat" value="montserrat">Montserrat</option>
                    <option style="font-family:Calibri" value="calibri">Calibri</option>
                </select>
            </div>            
        </div>
        <div class="container-fluid border border-top-0 border-left-0 border-right-0 pb-3 mb-3">
            <div class="row align-center">
                <p class="col-md-2"><b>Width:</b></p>
                <input :disabled="!selected" @change="$width($event)" type="range" class="col-md-3 custom-range width-range" id="customRange" :value="width" name="points1" min="1" max="12">
                <p class="col-md-2"><b>Height:</b></p>
                <input :disabled="!selected" @change="$height($event)" type="range" class="col-md-3 custom-range width-range" id="customRange" :value="height" name="points1" min="1" :max="total_height">

                <div class="w-100 mb-3"></div>

                <p class="col-md-2"><b>Padding:</b></p>
                <input :disabled="!selected" @change="$padding($event)" type="range" class="col-md-2 custom-range width-range" :value="padding" min="1" max="100">
                <button :class="{'blue-bg-2' : more_padding }" @click="more_padding = !more_padding" type="button" class="col-md-1 p-0"><span class="icon-cheveron-down"></span></button>
                <p class="col-md-2"><b>Margin:</b></p>
                <input :disabled="!selected" @change="$margin($event)" type="range" class="col-md-2 custom-range width-range" :value="margin" min="1" max="100">
                <button :class="{'blue-bg-2' : more_margin }" @click="more_margin = !more_margin" type="button" class="col-md-1 p-0"><span class="icon-cheveron-down"></span></button>

                <div v-if="more_padding" class="container-fluid mt-3 bg-light box-shadow">
                    <div class="row align-center ">
                        <p class="col-md-3"><b>Top/Bottom:</b></p>
                        <input :disabled="!selected" @change="$padding_TB($event)" type="range" class="col-md-2 custom-range padding-range" :value="padding_TB" min="0" max="100">
                        <p class="col-md-3"><b>Left/Right:</b></p>
                        <input :disabled="!selected" @change="$padding_LR($event)" type="range" class="col-md-2 custom-range padding-range" :value="padding_LR" min="0" max="100">
                    </div>
                </div>
                <div v-if="more_margin" class="container-fluid mt-3 bg-light box-shadow">
                    <div class="row align-center ">
                        <p class="col-md-3"><b>Top/Bottom:</b></p>
                        <input :disabled="!selected" @change="$margin_TB($event)" type="range" class="col-md-2 custom-range padding-range" :value="margin_TB" min="0" max="100">
                        <p class="col-md-3"><b>Left/Right:</b></p>
                        <input :disabled="!selected" @change="$margin_LR($event)" type="range" class="col-md-2 custom-range padding-range" :value="padding_LR" min="0" max="100">
                    </div>
                </div>

            </div>
        </div>
        
        <div class="container-fluid border border-top-0 border-left-0 border-right-0 pb-3 mb-3">
                <div class="custom-control custom-checkbox d-flex align-center mt-1">
                    <input @change="$box_shadow($event)" type="checkbox" class="custom-control-input" id="--box-shadow" name="box-shadow" :checked="box_shadow">
                    <label class="custom-control-label" for="--box-shadow">Box shadow</label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-center mt-1">
                    <input @change="$border($event)" type="checkbox" class="custom-control-input" id="--border" name="border" :checked="border">
                    <label class="custom-control-label" for="--border">Border</label>
                </div>
                <div class="custom-control custom-checkbox d-flex align-center mt-1">
                    <input @change="$bg_opaque($event)" type="checkbox" class="custom-control-input" id="--bg-transparent" name="bg-transparent" :checked="bg_opaque">
                    <label class="custom-control-label" for="--bg-transparent">Opaque Background</label>
                </div>
        </div>


        <div class="container-fluid border border-top-0 border-left-0 border-right-0 pb-3 mb-3">
            <div class="row align-center justify-content-center">
                <p class="col-md-12"><b>Justify Content:</b></p>
                <button @click="$justify_content('start')" :class="{'btn-primary': justify_content === 'start'}" class="col-md-2 btn border">Start</button>
                <button @click="$justify_content('center')" :class="{'btn-primary': justify_content === 'center'}" class="col-md-2 btn border">Center</button>
                <button @click="$justify_content('end')" :class="{'btn-primary': justify_content === 'end'}" class="col-md-2 btn border">End</button>
                <button @click="$justify_content('between')" :class="{'btn-primary': justify_content === 'between'}" class="col-md-3 btn border">Between</button>
                <button @click="$justify_content('around')" :class="{'btn-primary': justify_content === 'around'}" class="col-md-2 btn border">Around</button>
            </div>
            <div class="row align-center justify-content-center mt-2">
                <p class="col-md-12"><b>Align Content:</b></p>
                <button @click="$align_content('start')" :class="{'btn-primary': align_content === 'start'}" class="col-md-2 btn border">Start</button>
                <button @click="$align_content('center')" :class="{'btn-primary': align_content === 'center'}" class="col-md-2 btn border">Center</button>
                <button @click="$align_content('end')" :class="{'btn-primary': align_content === 'end'}" class="col-md-2 btn border">End</button>
                <button @click="$align_content('between')" :class="{'btn-primary': align_content === 'between'}" class="col-md-3 btn border">Between</button>
                <button @click="$align_content('around')" :class="{'btn-primary': align_content === 'around'}" class="col-md-2 btn border">Around</button>
            </div>
        </div>        

        <div class="container-fluid border border-top-0 border-left-0 border-right-0 pb-3 mb-3">
            <h2 class="mb-3 p-1"><b>Border</b></h2>
            <div class="row align-center mb-3">
                <p class="col-md-2"><b>Radius:</b></p>
                <input @change="$border_radius($event)" :disabled="!selected" type="range" class="col-md-3 custom-range width-range" :value="border_radius" min="1" max="100">
                <p class="col-md-2"><b>Width:</b></p>
                <input @change="$border_width($event)" :disabled="!selected" type="range" class="col-md-3 custom-range width-range" :value="border_width" min="1" max="100">

            </div>
            <div class="row justify-content-center">
                <select @change="$border_style($event)" name="cars" class="custom-select col-md-4 mr-2">
                    <option selected>{{border_style}}</option>
                    <option value="dashed">Dashed</option>
                    <option value="solid">Solid</option>
                    <option value="dotted">Dotted</option>
                </select>
                <button @click="$border_LRTB('l')" class="btn border" :class="{ 'btn-primary': border_left }">Left</button>
                <button @click="$border_LRTB('r')" class="btn border" :class="{ 'btn-primary': border_right }">Right</button>
                <button @click="$border_LRTB('t')" class="btn border" :class="{ 'btn-primary': border_top }">Top</button>
                <button @click="$border_LRTB('b')" class="btn border" :class="{ 'btn-primary': border_bottom }">Bottom</button>
            </div>
        </div>
  
    </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
export default {
    data() {
        return {
            selected: null,
            font_bold: null,
            font_underline: null,
            font_line_through: false,
            text_format: null,
            more_padding: false,
            more_margin: false,

            color: {
                bg: "red",
                fg: "orange",
                bd: "blue"
            },
            spacing: 0,
            line_height: 0,
            bold: false,
            underline: false,
            line_through: false,
            text_align: null,
            font_size: "Size",
            font_family: "font family",
            font_style: "Style",
            width: 0,
            height: 0,
            total_height: 0,
            padding: 0,
            padding_LR: 0,
            padding_TB: 0,
            margin: 0,
            margin_TB: 0,
            margin_LR: 0,
            box_shadow: false,
            border: false,
            bg_opaque: false,
            justify_content: null,
            align_content: null,
            border_radius: 0,
            border_width: 0,
            border_style: "Border Style",
            border_left: false,
            border_right: false,
            border_top: false,
            border_bottom: false
        }
    },
    methods: {
        $text_align(align) {
            switch(align) {
                case "left":
                    this.selected.css("text-align", "left")
                    break
                case "center":
                    this.selected.css("text-align", "center")
                    break
                case "right":
                    this.selected.css("text-align", "right")
                    break
            }
            this.set_props(this.selected)
        },
        $bold() {
            parseInt(this.selected.css("font-weight")) > 500 ? this.selected.css("font-weight", 500) : this.selected.css("font-weight", "bold")
            this.set_props(this.selected)
        },
        $underline() {
            this.selected.css("text-decoration").includes("underline") ? this.selected.css("text-decoration", "none") : this.selected.css("text-decoration", "underline")
            this.set_props(this.selected)
        },
        $line_through() {
            this.selected.css("text-decoration").includes("line-through") ? this.selected.css("text-decoration", "none") : this.selected.css("text-decoration", "line-through")
            this.set_props(this.selected)
        },
        $spacing(e) {
            e = $(e.target)
            this.selected.css("letter-spacing", e.val() + "px")
            this.set_props(this.selected)
        },
        $line_height(e) {
            e = $(e.target)
            this.selected.css("line-height", e.val() + "px")
            this.set_props(this.selected)
        },
        $color(type) {
            let color = null
            let palette = $createColorPalette()   
            let $this = this
            palette.change(function() {
                color = palette.val()
                palette.remove()
                switch(type) {
                    case "bd":
                        let width = $this.selected.css("border-width")
                        let style = $this.selected.css("border-style")
                        $this.selected.css("border", width + " " + style + " " + color)
                        break
                    case "bg":
                        $this.selected.css("background-color", color)
                        break
                    case "fg":
                        $this.selected.css("color", color)
                        break
                }
                $this.set_props($this.selected)
            })
        },
        $font_size(e) {
            e = $(e.target)
            this.selected.css("font-size", e.val() + "px")
            this.set_props(this.selected)
        },
        $font_style(e) {
            e = $(e.target).val()
            this.selected.css("font-style", e)
            this.set_props(this.selected)
        },
        $font_family(e) {
            e = $(e.target).val()
            this.selected.css("font-family", e)
            this.set_props(this.selected)
        },
        $width(e) {
            e = $(e.target).val()
            let col_md = $getGlobalClass(this.selected, 'col-md-')
            this.selected.removeClass(col_md).addClass('col-md-'+e)
            this.set_props(this.selected)
        },
        $height(e) {
            e = $(e.target).val()
            this.selected.css("height", e + "px")
            this.set_props()
        },
        $padding(e) {
            e = $(e.target).val()
            this.selected.css("padding", e+"px")
            this.set_props()
        },
        $margin(e) {
            e = $(e.target).val()
            this.selected.css("margin", e+"px")
            this.set_props()
        },
        $padding_LR(e) {
            e = $(e.target).val()
            this.selected.css("padding-left", e+"px").css("padding-right", e+"px")
            this.set_props()
        },
        $padding_TB(e) {
            e = $(e.target).val()
            this.selected.css("padding-top", e+"px").css("padding-bottom", e+"px")
            this.set_props()
        },
        $margin_LR(e) {
            e = $(e.target).val()
            this.selected.css("margin-left", e+"px").css("margin-right", e+"px")
            this.set_props()
        },
        $margin_TB(e) {
            e = $(e.target).val()
            this.selected.css("margin-top", e+"px").css("margin-bottom", e+"px")
            this.set_props()
        },
        $box_shadow(e) {
            e = $(e.target).prop("checked")
            e ? this.selected.addClass("box-shadow") : this.selected.removeClass("box-shadow")
            this.set_props()
        },
        $border(e) {
            e = $(e.target).prop("checked")
            this.selected.removeClass("component-active")
            e ? this.selected.css("border", "2px solid red") : this.selected.css("border", "none")
            this.set_props()
        },
        $bg_opaque(e) {
            e = $(e.target).prop("checked")
            this.color.bg == "rgba(0, 0, 0, 0)" ? this.color.bg = "rgba(0, 255, 0, 0.125)" : ""
            e ? this.selected.css("background", "rgba(0,0,0,0)") : this.selected.css("background", this.color.bg)
            this.set_props()
        },
        $justify_content(justify) {
            let jc = $getGlobalClass(this.selected, 'justify-content-')
            this.selected.removeClass(jc).addClass('justify-content-'+justify)
            this.set_props()
        },
        $align_content(align) {
            let ac = $getGlobalClass(this.selected, 'align-content-')
            this.selected.removeClass(ac).addClass('align-content-'+align)
            this.set_props()
        },
        $border_radius(e) {
            e = $(e.target).val()
            this.selected.css("border-radius", e + "px")
            this.set_props()
        },
        $border_width(e) {
            e = $(e.target).val()
            this.selected.removeClass("component-active")
            this.selected.css("border-width", e + "px")
            this.set_props()
        },
        $border_style(e) {
            e = $(e.target).val()
            this.selected.css("border-style", e)
            this.selected.removeClass("component-active")
            this.set_props()

        },
        $border_LRTB(side) {
            let width = this.selected.css("border-width")
            let style = this.selected.css("border-style")
            let color = this.selected.css("border-color")
            let concat = width + " " + style + " " + color
            color.includes("rgba(0, 0, 0, 0)") ? concat = "2px solid blue" : ""
            this.selected.removeClass('component-active')
            switch(side) {
                case "l":
                    this.border_left = !this.border_left
                    this.border_left ? this.selected.css("border-left", concat) : this.selected.css("border-left", "transparent")
                    break
                case "r":
                    this.border_right = !this.border_right
                    this.border_right ? this.selected.css("border-right", concat) : this.selected.css("border-right", "transparent")
                    break
                case "t":
                    this.border_top = !this.border_top
                    this.border_top ? this.selected.css("border-top", concat) : this.selected.css("border-top", "transparent")
                    break
                case "b":
                    this.border_bottom = !this.border_bottom
                    this.border_bottom ? this.selected.css("border-bottom", concat) : this.selected.css("border-bottom", "transparent")
                    break
            }
            this.set_props()
        },

        set_props(elem = this.selected) {
            this.color.fg = elem.css("color")
            this.color.bg = elem.css("backgroundColor")
            this.color.bd = elem.css("border-left-color")
            this.spacing = parseInt(elem.css("letter-spacing"))
            this.line_height = parseInt(elem.css("line-height"))
            parseInt(elem.css("font-weight")) > 500 ? this.bold = true : this.bold = false
            elem.css("text-decoration").includes("underline") ? this.underline = true : this.underline = false
            elem.css("text-decoration").includes("line-through") ? this.line_through = true : this.line_through = false

            elem.css("text-align").includes("left") ? this.text_align = "left" : ""
            elem.css("text-align").includes("center") ? this.text_align = "center" : ""
            elem.css("text-align").includes("right") ? this.text_align = "right" : ""

            this.font_size = parseInt(elem.css("font-size"))
            this.font_style = elem.css("font-style")
            this.font_family = elem.css("font-family")
            $getGlobalClass(elem, 'col-md-') === 'col-md-' ? this.width = 12 : this.width =  $getGlobalClass(elem, 'col-md-').split('-')[2]
            this.height = parseInt(elem.css("height"))
            this.total_height = parseInt(elem.parent().css("height"))
            this.padding = parseInt(elem.css("padding-left"))
            this.padding_LR = parseInt(elem.css("padding-left"))
            this.padding_TB = parseInt(elem.css("padding-top"))
            this.margin = parseInt(elem.css("margin-left"))
            this.margin_LR = parseInt(elem.css("margin-left"))
            this.margin_TB = parseInt(elem.css("margin-top"))
            elem.hasClass("box-shadow") ? this.box_shadow = true : this.box_shadow = false
            elem.css("border") ? this.border = true : this.border = false
            elem.css("background-color") == "rgba(0, 0, 0, 0)" ? this.bg_opaque = true : this.bg_opaque = false

            elem.hasClass("justify-content-start") ? this.justify_content = "start" : ""
            elem.hasClass("justify-content-end") ? this.justify_content = "end" : ""
            elem.hasClass("justify-content-center") ? this.justify_content = "center" : ""
            elem.hasClass("justify-content-between") ? this.justify_content = "between" : ""
            elem.hasClass("justify-content-around") ? this.justify_content = "around" : ""

            elem.hasClass("align-content-start") ? this.align_content = "start" : ""
            elem.hasClass("align-content-end") ? this.align_content = "end" : ""
            elem.hasClass("align-content-center") ? this.align_content = "center" : ""
            elem.hasClass("align-content-between") ? this.align_content = "between" : ""
            elem.hasClass("align-content-around") ? this.align_content = "around" : ""

            this.border_radius = parseInt(elem.css("border-radius"))
            this.border_width = parseInt(elem.css("border-width"))
            this.border_style = elem.css("border-style")


        }
    },
    mounted() {
        let $this = this
        EventBus.$on('$component_selected', (data) => {
            this.selected = data
            this.set_props(this.selected)
        })
    }
}
</script>

<style>
.formatting-dropdown-parent {
    position: absolute;
    padding: 5px;
    border: 1px solid rgba(0,0,0,0.0555);
} 
.formatting-dropdown-child {
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);    
} 
.formatting-dropdown-child button {
    display: block;
    padding: 5px 20px;
    width: 100%;
    text-align: left;
}
.formatting-dropdown-child button:hover {
    background: rgba(0,0,0,0.0555);
}
.formatting-container {
    padding: 10px;
}
.formatting-container *{
    font-size: 11px;
}
.formatting-container button i{
    font-size: 22px;
    /* padding: 10px; */
    /* color: rgba(0, 0, 0, 0.75); */
    /* color: red; */
    /* background: red; */
}
</style>