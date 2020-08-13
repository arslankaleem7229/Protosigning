<template>
  <div class="nav-left-container" >
        <div class="flex tabs-container" style="width:100%">
            <button class="btn" @click="active.tab = 0" :class="{ 'btn-primary': active.tab == 0}">Insert</button>
            <button class="btn" @click="active.tab = 1" :class="{ 'btn-primary': active.tab == 1}">Formatting</button>
            <button class="btn" @click="active.tab = 2" :class="{ 'btn-primary': active.tab == 2}">Pages</button>
        </div>

      <div v-if="active.tab== 0" style="width:100%;" class="insert-component-container">
        <button @click="this_component_types($event, 'Text', text)" @dblclick="addComponent('text')" style="width:48%" class="btn btn-light border"><span class="icon-text_fields"></span><br>Text</button>
        <button @click="this_component_types($event, 'Image', img)" @dblclick="addComponent('img')" style="width:48%" class="btn btn-light border"><span class="icon-image"></span><br> Img</button>
        <button @click="this_component_types($event, 'Table', table)" style="width:48%" class="btn btn-light border"><span class="icon-table"></span><br> Table</button>
        <button @click="this_component_types($event, 'List', list)"  style="width:48%" class="btn btn-light border"><span class="icon-list2"></span><br>List</button>
        <div class="border-bottom"></div>
        <div>
            <div class="flex flex-start">
            <p class="small-heading" style="font-size:16px;margin-left:20px;text-align:center;">BUTTONS</p>    
            </div>   
            <div class="flex">
                <button @click="this_component_types($event, 'Button', button)" style="width:48%" class="btn btn-light border"><span class="icon-link"></span><br>Linked Button</button>
                <button @dblclick="addComponent('input_radio')" style="width:48%" class="default-borders btn btn-light border"><span class="icon-radio-checked"></span><br> Radio</button>
                <button @dblclick="addComponent('input_checkbox')" style="width:48%" class="default-borders btn btn-light border"><span class="icon-checkbox-checked"></span><br>checkbox</button>

            </div>
        </div>
        <div class="border-bottom"></div>
        <div class="flex flex-wrap" style="flex-direction:column">
            <button @click="this_component_types($event, 'Container', containers)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-profile"></span><span>Container</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Divider', divider)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-layout"></span><span>Layouts</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Form', forms)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-profile"></span><span>Forms</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Divider', divider)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-page-break"></span><span>Divider</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Header', header)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-insert-template"></span><span>Header</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Header', header)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-chrome_reader_mode"></span><span>Side Navigations</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Navigation', navigation)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-bars"></span><span>Top Navigations</span></span> <span class="icon-cheveron-right"></span></button>
            <button @click="this_component_types($event, 'Input Field', input_field)" style="text-align:left;padding:10px 20px;" class="btn btn-light border flex align-center space-between"><span class="flex align-center"><span class="icon-minus-outline" style="font-size:40px"></span><span>Input Field</span></span> <span class="icon-cheveron-right"></span></button>
        </div>
      </div>

      <div v-else-if="active.tab== 1 ">
          <formatting />
      </div>

    <pages v-else-if="active.tab === 2" />    
      <!-- <div v-if="active.tab== 2" class="default-borders" style="height:90%;position:relative">
          <br>
          <div class="pages-container default-borders" >
              <div class="flex flex-start align-center"
              style="justify-content:space-between"
              :class="{ 'blue-colored-btn': i === active.page}"
              @click="switch_page(item, i)"
              v-for="(item, i) in $store.getters['website-state/WORKSPACE_all_pages']"
              :key="i">
                    <span>&#128196;</span>
                    <p style="width:100%" @click="makeItFocus($event)" @blur="change_page_name(i, $event)" contenteditable="true">{{item.title}}</p>
                <button @click="remove_page(i)" class="pages-delete-btn"><span class="icon-close"></span></button>
              </div> 
          </div>
          <button @click='$store.dispatch("website-state/WORKSPACE_insert_blank_page", "")' class="add-page-btn"><span class="icon-plus"></span></button>
      </div> -->
  </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
import formatting from './formatting'
import pages from './pages'

import list_1 from '../components/list/list-1.vue'
import list_horizontal from '../components/list/list-horizontal.vue'
import list_linked from '../components/list/list-linked.vue'
import list_badges from '../components/list/list-badges.vue'
import list_flush from '../components/list/list-flush.vue'

import table_1 from '../components/tables/table-1.vue'

import container_2 from '../components/container/container-2.vue'
import container_default from '../components/container/container-default.vue'
import container_border from '../components/container/container-border.vue'
import container_dark from '../components/container/container-dark.vue'
import container_primary from '../components/container/container-primary.vue'

import text_1 from '../components/texts/text-1.vue'
import text_title from '../components/texts/text-title.vue'
import text_heading from '../components/texts/text-heading.vue'
import text_subheading from '../components/texts/text-subheading.vue'
import text_normal_text from '../components/texts/text-normal.vue'
import text_large_text from '../components/texts/text-large.vue'
import text_small_text from '../components/texts/text-small.vue'
import text_blockquote from '../components/texts/text-blockquote.vue'
import text_code from '../components/texts/text-code.vue'

import input_type_checkbox from '../components/inputs/type-checkbox.vue'
import input_type_radio from '../components/inputs/type-radio.vue'
import header_3 from '../components/headers/header-3.vue'
import header_4 from '../components/headers/header-4.vue'
import header_5 from '../components/headers/header-5.vue'

import button_component from '../components/buttons/button-primary.vue'

import image_round_corners from '../components/images/image-round-corners.vue'
import image_circle from '../components/images/image-circle.vue'
import image_thumbnail from '../components/images/image-thumbnail.vue'
import image_simple from '../components/images/image-simple.vue'

import simple_dark_navigation from '../components/navigations/navigation-3'
import essential_navigation from '../components/navigations/navigation-4'
import logo_block_navigation from '../components/navigations/navigation-5.vue'

import  table_basic from '../components/tables/table-basic.vue'
import  table_stripped from '../components/tables/table-stripped'
import  table_bordered from '../components/tables/table-bordered'
import  table_hover_rows from '../components/tables/table-hover-rows'
import  table_dark from '../components/tables/table-dark'
import  table_dark_stripped from '../components/tables/table-dark-stripped'
import  table_borderless from '../components/tables/table-borderless'
import  table_header_color from '../components/tables/table-header-color'
import  table_responsive from '../components/tables/table-responsive'
import  table_small from '../components/tables/table-small'

import  divider_line from '../components/dividers/divider-line'
import  divider_text from '../components/dividers/divider-text'

import  input_text from '../components/input-fields/input-text'
import  input_email from '../components/input-fields/input-email'
import  input_password from '../components/input-fields/input-password'
import  input_number from '../components/input-fields/input-number'

import form_signup from '../components/forms/form-signup'
import form_login from '../components/forms/form-login.vue'

export default {
    components: {
        formatting,
        pages,
        
        list_1,
        list_horizontal,
        list_linked,
        list_badges,
        list_flush,

        text_title,
        text_heading,
        text_subheading,
        text_normal_text,
        text_blockquote,
        text_code,

        input_text,
        input_type_checkbox,
        input_type_radio,
        header_3,
        header_4,
        header_5,

        button_component,

        image_round_corners,
        image_circle,
        image_thumbnail,
        image_simple,

        simple_dark_navigation,
        essential_navigation,
        logo_block_navigation,

        table_basic,
        table_stripped,
        table_bordered,
        table_hover_rows,
        table_dark,
        table_dark_stripped,
        table_borderless,
        table_header_color,
        table_responsive,
        table_small,

        container_primary,
        container_default,
        container_border,
        container_dark,

        divider_text,
        divider_line,

        input_text,
        input_email,
        input_password,
        input_number,
        form_signup,
        form_login
    },
    data() {
        return {
            container: null,
            active: {
                tab: 0,
                page: 0
            },
            pages: null,
            forms: [
                { title: "Signup Form", value: 'signup' },
                { title: "Login Form", value: 'login' },

            ],
            input_field: [
                { title: "Input Text", value: 'text' },
                { title: "Password", value: 'password' },
                { title: "Email", value: 'email' },
                { title: "Number", value: 'number' },

            ],
            divider: [
                { title: "Text", value: 'text' },
                { title: "Horizontal Line", value: 'line' },
            ],
            containers : [
                { title: "Shadowed", value: 'default' },
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: "Bordered", value: 'bordered' },
                { title: "Dark", value: 'dark' },
                { title: "Primary", value: 'primary' },

            ],
            table: [
                { title: "Table Basic", value: 'basic' },
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},

                { title: "Table Stripped", value: 'stripped' },
                { title: "Table Hover Rows", value: 'hover_rows' },
                { title: "Table Header Color", value: 'header_color' },
                { title: "Table Responsive", value: 'responsive' },
                { title: "Table Small", value: 'small' },
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},

                { title: "Table Dark", value: 'dark' },
                { title: "Dark Stripped", value: 'dark_stripped' },
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},

                { title: "Bordered", value: 'bordered' },
                { title: "Borderless", value: 'borderless' },
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},


            ],
            navigation: [
                { title: "Simple Dark", value: 'simple_dark' },
                { title: "Essential", value: 'essential' },
                { title: "Logo Block", value: 'logo_block' },
            ],
            img: [
                { title: "Simple", value: "simple"},
                { title: "Round Corners", value: "round"},
                { title: "Circle", value: "circle"},
                { title: "Thumbnail", value: "thumbnail"},
            ],
            list: [
                { title: "Vertical", value: "basic"},
                { title: "Horizontal", value: "horizontal"},
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: "Linked List", value: "list_linked_items"},
                { title: "List with Badges", value: "list_badges"},
                { title: "Flush List", value: "list_flush"},
            ],
            text: [
                { title: "Title", value: "title"},
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: "Heading", value: "heading"},
                { title: "Subheading", value: "subheading"},
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: "Normal Text", value: "normal-text"},
                { title: "small Text", value: "small-text"},
                { title: "Large Text", value: "large-text"},
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: "Code", value: "code"},
                { title: "Blockquote", value: "blockquote"},
            ],
            header: [
                { title: "Simple", value: 1},
                { title: "Aristotle", value: 2},
                { title: "Experience", value: 3},
                { title: "Diplomate", value: 4},
                { title: "Vision", value: 5},
                { title: "Level", value: 6},
                { title: "Impression", value: 7},
            ],
            button: [
                { title: 'Primary Button', value: 'simple-btn', $class: "btn-primary  pl-4 pr-4 pb-2 pt-2", html: "Primary Button"},
                { title: 'Outline Button', value: 'simple-btn', $class: "btn-outline-primary  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Round Button', value: 'rounded-btn', $class: "btn-primary btn-circle btn-xl pt-3 font-weight-bold", html: "W"},
                { title: 'Icon Button', value: 'icon-btn', $class: "btn-danger btn-circle pt-3 btn-xl", html: '<i class="fa fa-heart white-color"></i>'},
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: 'Large Button', value: 'simple-btn', $class: "btn btn-primary btn-lg  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Small Button', value: 'simple-btn', $class: "btn btn-primary btn-sm  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Block Level Button', value: 'simple-btn', $class: "btn btn-primary btn-block  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Disabled Button', value: 'disabled-btn', $class: "btn btn-primary  pl-4 pr-4 pb-2 pt-2"},
                { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                { title: 'Secondry Button', value: 'simple-btn', $class: "btn btn-secondary  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Success Button', value: 'simple-btn', $class: "btn btn-success  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Danger Button', value: 'simple-btn', $class: "btn btn-danger  pl-4 pr-4 pb-2 pt-2"},
                { title: 'Warning Button', value: 'simple-btn', $class: "btn btn-warning pl-4 pr-4 pb-2 pt-2"},
                { title: 'Info Button', value: 'simple-btn', $class: "btn btn-info pl-4 pr-4 pb-2 pt-2"},
                { title: 'Light Button', value: 'simple-btn', $class: "btn btn-light pl-4 pr-4 pb-2 pt-2"},
                { title: 'Dark Button', value: 'simple-btn', $class: "btn btn-dark pl-4 pr-4 pb-2 pt-2"},
                { title: 'Link Button', value: 'simple-btn', $class: "btn btn-link pl-4 pr-4 pb-2 pt-2"},
            ]
        }
    },
    methods: {
        form_components(type) {
            let { value } = type
            switch(value) {
                case "login":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: form_login } )
                    break
                case "signup":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: form_signup } )
                    break
            }

        },
        input_components(type) {
            let { value } = type
            switch(value) {
                case "text":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: input_text } )
                    break
                case "password":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: input_password } )
                    break
                case "email":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: input_email } )
                    break
                case "number":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: input_number } )
                    break
            }
        },
        divider_components(type) {
            let { value } = type
            switch(value) {
                case "text":
                    EventBus.$emit('$insert_component', { target: null, container: false, component: divider_text } )
                    break
                case "line":
                    EventBus.$emit('$insert_component', { target: null, container: false, component: divider_line } )
                    break
            }
        },
        container_components(type) {
            let { value } = type
            switch(value) {
                case "default":
                    EventBus.$emit('$insert_component', { target: null, container: false, component: container_default } )
                    break
                case "bordered":
                    EventBus.$emit('$insert_component', { target: null, container: false, component: container_border } )
                    break
                case "dark":
                    EventBus.$emit('$insert_component', { target: null, container: false, component: container_dark } )
                    break
                case "primary":
                    EventBus.$emit('$insert_component', { target: null, container: false, component: container_primary } )
                    break

            }
        },
        table_components(type) {
            let { value } = type
            switch(value) {
                case "basic":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_basic } )
                    break
                case "dark":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_dark } )
                    break
                case "dark_stripped":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_dark_stripped } )
                    break
                case "bordered":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_bordered } )
                    break
                case "borderless":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_borderless } )
                    break
                case "stripped":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_stripped } )
                    break
                case "hover_rows":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_hover_rows } )
                    break
                case "header_color":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_header_color } )
                    break
                case "responsive":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_responsive } )
                    break
                case "small":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: table_small } )
                    break
            }
        },
        navigation_components(type) {
            let { value } = type
            switch(value) {
                case "simple_dark":
                    EventBus.$emit('$insert_component', { target: "#navigation-container", container: false, component: simple_dark_navigation } )
                    break
                case "essential":
                    EventBus.$emit('$insert_component', { target: "#navigation-container", container: false, component: essential_navigation } )
                    break
                case "logo_block":
                    EventBus.$emit('$insert_component', { target: "#navigation-container", container: false, component: logo_block_navigation } )
                    break

            }
        },
        text_components(type) {
            let { value } = type
            switch(value) {
                case "title": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_title } )
                    break
                case "heading": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_heading } )
                    break
                case "subheading": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_subheading } )
                    break
                case "normal-text": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_normal_text } )
                    break
                case "small-text": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_small_text } )
                    break
                case "large-text": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_large_text } )
                    break
                case "code": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_code } )
                    break
                case "blockquote": 
                    EventBus.$emit('$insert_component', { target: null, container: true, component: text_blockquote } )
                    break
            }
        },
        list_components(type) {
            let { value } = type
            switch(value) {
                case "basic":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: list_1 } )
                    break
                case "horizontal":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: list_horizontal } )
                    break
                case "list_linked_items":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: list_linked } )
                    break
                case "list_badges":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: list_badges } )
                    break
                case "list_flush":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: list_flush } )
                    break

            } 
        },
        image_components(type, btn) {
            let { value } = type
            switch(value) {
                case "round":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: image_round_corners } )
                    break
                case "circle":
                    btn.html('<p class="small"><strong>Note:</strong> Circle images works perfectly when they are in same <b>width</b> and <b>height</b> <span class="insert-here"></span></p>')
                    let proceed_btn = $('<span>')
                    proceed_btn.addClass('btn badge badge-primary p-2 m-1')
                    proceed_btn.html("Okay")
                    btn.find('.insert-here').append(proceed_btn)
                    proceed_btn.click(() => {
                        EventBus.$emit('$insert_component', { target: null, container: true, component: image_circle } )
                        btn.parent().remove()
                    })
                    break
                case "thumbnail":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: image_thumbnail } )
                    break
                case "simple":
                    EventBus.$emit('$insert_component', { target: null, container: true, component: image_simple } )
                    break
            }
        },
        header_components(type) {
            let { value } = type
            
            switch(value) {
                case 1: 
                    EventBus.$emit('$insert_component', { target: "#header-container", container: false, component: header_3 } )
                    break
                case 2: 
                    EventBus.$emit('$insert_component', { target: "#header-container", container: false, component: header_4 } )
                    break
                case 3: 
                    EventBus.$emit('$insert_component', { target: "#header-container", container: false, component: header_5 } )
                    break
                                    
            }
        },
        button_components(type) {
            console.log(type, 'btn type')
            let { value, $class, html } = type
            EventBus.$emit('$insert_component', { target: null, container: true, component: button_component, props: { $class, html } } )
        },
        this_component_types(e, type, arr) {
            
            let offset = $(e.target).offset()
            let container = $('<div>')
            let list_group = $('<div>')
            let heading = $("<h6>")
            container.addClass('position-absolute container-fluid')
            list_group.addClass('list-group bg-white box-shadow')
            list_group.css({
                maxHeight: "450px",
                overflow: "auto"
            })
            heading.addClass('p-3 pl-3 bg-light text-dark')
            heading.html(type + "'s Templates")
            list_group.append(heading)

            for(let i=0; i<arr.length; i++) {
                let btn = $("<button>")
                btn.addClass('list-group-item btn pt-2 pb-2 pl-4 pr-4 border-0 text-left m-0 hover-effect')
                btn.html(arr[i].title)
                arr[i].no_btn ? list_group.append(arr[i].title) : list_group.append(btn)

                btn.click(() => {
                    if(arr[i].no_btn) return
                    switch(type) {
                        case "Form":
                            this.form_components(arr[i])
                        case "Input Field":
                            this.input_components(arr[i])
                            break
                        case "Divider":
                            this.divider_components(arr[i])
                            break
                        case "Image":
                            this.image_components(arr[i], btn)
                            break
                        case "Header":
                            this.header_components(arr[i])
                            break
                        case "Button":
                            this.button_components(arr[i])
                            break
                        case "List":
                            this.list_components(arr[i])
                            break
                        case "Text":
                            this.text_components(arr[i])
                        case "Navigation":
                            this.navigation_components(arr[i])
                        case "Table":
                            this.table_components(arr[i])
                        case "Container":
                            this.container_components(arr[i])
                    }
                })
            }

            container.append(list_group)
            this.container ? this.container.remove() : ""
            $(document.body).append(container)
            this.container = container
            

            container.outerHeight() + offset.top > $(window).height() ? offset.top = $(window).height() -  container.outerHeight() - 20 : "" 

            container.css({
                top: offset.top,
                left: offset.left + $(e.target).width(),
                width: '250px'
            })
            

            container.mouseleave(() => container.remove())
        },
        makeItFocus(e) {
            $(e.target).focus()
        },
        remove_page(index) {
            this.$store.dispatch('website-state/WORKSPACE_remove_page', index)

        },
        switch_page(data, index) {
            $(".workspace").html(data.data)
            $workspace_active_page = index
            this.active.page = $workspace_active_page
        },
        change_page_name(index, newName) {
            this.$store.dispatch('website-state/WORKSPACE_rename_page', {
                index,
                newName: $(newName.target).html()
            })
        },
        getComponent(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return instance.$el
        },
        addComponent(type) {
            if(type == 'button')
                EventBus.$emit('$insert_component', { target: null, container: true, component: button_1 } )
            else if(type == 'list')
                EventBus.$emit('$insert_component', { target: null, container: true, component: list_1 } )
            else if(type == 'img') 
                EventBus.$emit('$insert_image', { target: null, container: true } )
            else if(type == 'text')
                EventBus.$emit('$insert_component', { target: null, container: true, component: text_1 } )
            else if(type == 'header')
                EventBus.$emit('$insert_component', { target: null, container: false, component: header_3 } )
            else if(type == 'container')
                EventBus.$emit('$insert_component', { target: null, container: false, component: container_2})
            else if(type == 'table')
                EventBus.$emit('$insert_component', { target: null, container: true, component: table_1})
            else if(type == 'navigation')
                EventBus.$emit('$insert_navigation', { target: 1})
            else if(type == "input_text") {
                EventBus.$emit('$insert_component', { target: null, container: true, component: input_type_text})
            }
            else if(type == "input_checkbox") {
                EventBus.$emit('$insert_component', { target: null, container: true, component: input_type_checkbox})
            }
            else if(type == "input_radio") {
                EventBus.$emit('$insert_component', { target: null, container: true, component: input_type_radio})
            }
        },
    },
    mounted() {
        this.pages = this.$store.getters["website-state/WORKSPACE_all_pages"]
        $('.pages-container').sortable()
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();   
        });

    }
}
</script>

<style>
.add-page-btn {
    position: absolute;
    left: calc(50% - 30px);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    bottom: 0px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background-color: rgba(48, 137, 201, 0.125);
}
.add-page-btn span {
    color: rgba(48, 137, 201, 1);
    font-size: 30px;
    font-weight: bold;
}
.pages-container p {
    font-size: 14px;
    font-weight: bold;
}
.pages-container div {
    border-bottom: 1px solid rgba(0, 134, 230, 0.125);
    padding: 5px 10px;
}
.pages-delete-btn {
    opacity: 0;
    background-color: rgba(255, 0, 0, 0.455);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 0px;
    font-weight: lighter;
    flex-shrink: 0;
    /* background-color: red; */
}
.pages-delete-btn span {
    color: white;
    font-size: 12px;
    margin: 0px;
    padding: 0px;
}
.pages-container div:hover .pages-delete-btn {
    transition: 0.3s;
    opacity: 1;
}
.pages-container div:hover {
    border: 1px solid rgba(0, 134, 230, 0.125);
    transition: 0.3s;
    background-color: rgba(0, 134, 230, 0.05);
}
.pages-container div:active {
    transition: 0.1s;
    background-color: rgba(0, 134, 230, 0.125);
}
.nav-left-container {
    width: 450px;
    background-color: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    overflow: auto;
}
.insert-component-container button{
    border: 1px solid transparent;
    color: rgba(0, 0, 0, 0.75);
}
.insert-component-container button:hover {
    transition: 0.3s;
    border: 1px solid rgba(0, 134, 230, 0.125);
    background: rgba(0, 134, 230, 0.05);
}
.insert-component-container button:active {
    transition: 0.1s;
    background: rgba(0, 134, 230, 0.125);
}
.nav-left-container 
.tabs-container {
    width: 100%;
    border-bottom: 1px solid rgba(0, 134, 230, 0.125);
}
.tabs-container button {
    width: 50%
}
</style>