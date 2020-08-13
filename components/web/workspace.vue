<template>
  <div style="width:80%;" class="workspace-container">
    <p class="small col-md-12 text-right" id="test1234">Not Editing</p>
    <div class="workspace" component='true'>
        <div id="navigation-container"></div>
        <div id="header-container"></div>
   </div>

   <button class="animated  fadeInUp faster  btn bd-round p-absolute btn-primary pl-4 pr-4 pt-2 pb-2 box-shadow" v-if="loading.start" style="bottom:15px;left:15px">
      <span class="spinner-border spinner-border-sm mr-1 text-sm"></span>
      <span class="text-sm">{{loading.msg}}</span>
   </button>
  </div>
</template>

<script>
import io from "socket.io-client"
import vue from 'vue'
import { EventBus } from '@/globals/event-bus.js'
import {v4 as uuid} from 'uuid'

import navigation_customizations from './customizations/navigation.vue'
import button_customizations from './customizations/button.vue'
import container_customizations from './customizations/container.vue'
import inner_container_customizations from './customizations/inner-container.vue'
import header_customizations from './customizations/header.vue'
import logo_customizations from './customizations/logo.vue'
import text_customizations from './customizations/text.vue'
import span_customizations from './customizations/span.vue'
import image_customizations from './customizations/image.vue'
import list_customizations from './customizations/list.vue'
import form_customizations from './customizations/form.vue'
import input_text_customizations from './customizations/input-text.vue'
import text_edit_customizations from './customizations/text-edit.vue'
import table_customizations from './customizations/table.vue'
import radio_btn_customizations from './customizations/radio-button'
import container_2 from './components/container/container-2'

import table_basic from './components/tables/table-basic'
import { auth, db } from '@/services/firebase'


export default {
    components: {
        button_customizations,
        container_customizations,
        text_customizations,
        image_customizations,
        logo_customizations,
        list_customizations,
        inner_container_customizations,
        form_customizations,
        input_text_customizations,
        span_customizations,
        header_customizations,
        text_edit_customizations,
        table_customizations,
        radio_btn_customizations,

        container_2,
        table_basic
    },
    data() {
        return {
            loading: {
                start: false,
                msg: ""
            },
            socket: {},
            border_display: "block",
            mouseup: true,
            selected: null,
            customizations: null,
            workspace: null,
            key: null,
            uuid: null,
            project_id: null,
            mypages: [],
            ref: null
        }
    },
    methods: {       
        getComponent(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return instance.$el
        },
        getComponent2(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                instance, html: instance.$el
            }
        },
        
        insert_component({ component, target, container, props = null}) {
            // console.log(.attr("class"), 'my container 2 component')
            // let test = $(this.getComponent(container_2))
            
            // console.log(test.attr("class"), 'mymtestasda')

            let my_container = $(this.getComponent(container_2))
            let inst = this.getComponent(component, props)

            if(container) {
                // my_container.find('[to-be-inserted="true"]').html(inst)
                my_container.html(inst)
                target ? $(target).append(my_container) : $('.workspace').append(my_container)
            } else {
                $(inst).is("form") ? inst = $(inst).html() : ""

                if($(inst).attr("div-type") === "header" || $(inst).attr("div-type") === "navigation") {
                    target ? $(target).html(inst) : $('.workspace').html(inst)
                } else {
                    target ? $(target).append(inst) : $('.workspace').append(inst)
                }
            }

            let ref = "projects/web/"+this.uid+"/"+this.project_id
            this.api_fetch(ref, (payload) => {
                if(payload) {
                    let pages = payload.pages
                    let active = this.getCookie("proto-page")

                    console.log(pages, active)
                    if(pages[active]) {
                        pages[active].workspace = this.workspace.html()
                        console.log(pages[active], active)
                        this.api_update(ref, { pages }, (payload) => { console.log(payload, 'payload')})
                    }
                }
            })


        },

        makeItSortable(elem) {
            $(elem).sortable({
                connectWith: ".connectedSortable"   
            }).disableSelection()
        },
        
        appendCustomizations(cust) {
            this.customizations = cust
            $(document.body).append(cust)
        }
    },
    created() {
        this.socket = io("https://team-collaboration.herokuapp.com/")
    },
    mounted() {
        let $this = this
        this.workspace = $('.workspace')
        this.key = this.$router.currentRoute.params.id.split("&")[1].split("=")[1]
        this.loading.start = true
        this.loading.msg = "Loading Workspace"

        if(this.$router.currentRoute.params.id.split("&")[2]) {
            this.uid = this.$router.currentRoute.params.id.split("&")[2].split("=")[1]
        } else {
            this.uid = this.$store.state.user.uid
        }

        
        this.project_id = this.$route.params.id.split("prj-id=")[1]

        if(this.project_id) {            
            let ref = "projects/web/"+this.uid+"/"+this.project_id
            this.ref = ref
            this.api_fetch(ref, (payload) => {
                this.loading.msg = "Almost there"
                if(payload) {
                    this.mypages = payload.pages
                    let active = this.getCookie("proto-page")
                    if(active && payload.pages[active]) {
                        this.workspace.html(payload.pages[active].workspace)
                    }
                }
                this.loading.start = false
            })
            
        }

        // this.socket.on("workspace", data => {
        //     if(this.mouseup) {
        //         console.log('socket data', data)
        //         // setTimeout(() => {
        //             this.workspace.html(data)        
        //             $("#test1234").html("Editing Completed")

        //         // }, 2000)
        //     }
        // })
        // this.socket.on('editing', data => {
        //     $("#test1234").html(data)
        //     // console.log('editing', data)
        // })

        // this.insert_component({
        //     component: table_basic,
        //     target: null,
        //     container: true  
        // })
        
        console.log(this.uid, 'my user id.')

        $('.workspace').mousemove(() => {
            setTimeout(() => {
                this.socket.emit("workspace", this.workspace.html())            
            }, 100);
            if(this.mouseup) return 
            this.socket.emit('editing', 'Currently Editing')
        })
        $('.workspace').mouseup(() => {
            this.mouseup = true
            this.socket.emit("workspace", this.workspace.html())
        })
        this.socket.on('editing', data => {
            $("#test1234").html(data)
        })
        this.socket.on("workspace", data => {
            $("#test1234").html("Workspace Updated")
            data !== 0 ? this.workspace.html(data) : this.workspace.append('<p component="true" class="col-md-12 text-center">initial data is empty</p>')
        })


        this.$store.dispatch('website-state/$pages', this.key)

        EventBus.$on('$insert_component', (obj) => {
            this.insert_component(obj)
            setTimeout(() => {
                this.workspace.mouseup()
            }, 1000);
            
        })
        
        $(document.body).mouseup((e) => { 
            if($hasParentClass(e.target, 'workspace')) {
                let active = this.$store.getters['website-state/$w_active_page']
                let pages = this.$store.getters['website-state/$w_pages']
                
                let nodes = $get_children(this.workspace),
                    db_data = {
                        title: pages[active.i].title || "Blank",
                        raw: this.workspace.html()
                    }
                // db.ref("projects/web/"+this.uid+"/"+this.key+"/pages/"+active.fb).set(db_data)
                // .then((e) => this.$store.dispatch("website-state/update_page", {nodes, raw: this.workspace.html()}) )    


                // socket.io
                // setTimeout(() => {
                //     this.socket.emit("update", this.workspace.html())
                // }, 1000)
            }
        })


        $(document.body).mousedown((e) => {            
            if($hasParentClass(e.target, 'workspace')) {
                $this.mouseup = false
                let target = $(e.target)
                $this.makeItSortable($('.workspace').find("div"))
                $this.makeItSortable($('.workspace').find("form"))
                $('.workspace').find("tbody").sortable()

                if(target.is("div") && (target.parent().is("div") && !target.hasClass("workspace")) || target.is("form") && target.parent().is("div")) {
                    target.sortable("destroy")
                }
                
                if($this.selected) {
                    $($this.selected).removeClass('component-active')
                }
                if(target.attr("component") === "true") {
                    target.addClass('component-active')
                    $this.selected = target
                    EventBus.$emit('$component_selected', $this.selected)
                }
                $this.customizations ? ($this.customizations).remove() : ""

                if(target.is('button') || (target.is("a") && target.attr("type") === "button")) {
                    let pages = this.$store.state['website-state']['WORKSPACE']['pages']
                    let { instance, html } = this.getComponent2(button_customizations, {e, reference: this.ref })
                    instance.$on("link-it", payload => {
                        if(target.attr("href")) {
                            target.attr("href2", payload)
                        }
                    })
                    let text_edit_instance = this.getComponent(text_edit_customizations, {e})
                    this.appendCustomizations(html)
                    this.appendCustomizations(text_edit_instance)
                }
                else if(target.attr('container-type') === "inner-container") {
                    let instance = this.getComponent(inner_container_customizations, {e})
                    this.appendCustomizations(instance)

                }
                else if(target.attr('div-type') === "navigation") {
                    let instance = this.getComponent(navigation_customizations, {e})
                    this.appendCustomizations(instance)
                }
                else if(target.attr('div-type') === "header") {
                    let instance = this.getComponent(header_customizations, {e})
                    this.appendCustomizations(instance)
                }
                else if(target.attr("component-type") === "logo") {
                    let component_instance = this.getComponent(logo_customizations, {e})
                    this.appendCustomizations(component_instance)
                }
                else if(target.is('li') || target.is('ul')) {
                    let component_instance = this.getComponent(list_customizations, {e})
                    this.appendCustomizations(component_instance)
                }
                else if(target.parent().is("li") && target.is("a")) {
                    e.target = target.parent().get(0)
                    let component_instance = this.getComponent(list_customizations, {e})
                    this.appendCustomizations(component_instance)
                }
                else if(target.is("h1") || target.is("h2") || target.is("h3") || target.is("h4") || target.is("h5") || target.is("h6") || target.is("p") || target.is("code") || target.is ("blockquote")) {
                    let text_edit_instance = this.getComponent(text_edit_customizations, {e})
                    let component_instance = this.getComponent(text_customizations, {e})
                    this.appendCustomizations(component_instance)
                    this.appendCustomizations(text_edit_instance)
                    // console.log('this is text customizations')
                }
                else if(target.is('input[type="text"]') || target.is('input[type="password"]') || target.is('input[type="email"]') || target.is('input[type="search"]') || target.is('input[type="number"]')) {
                    let component_instance = this.getComponent(input_text_customizations, {e})
                    this.appendCustomizations(component_instance)
                }
                else if(target.is("form")) {
                    let component_instance = this.getComponent(form_customizations, {e})
                    this.appendCustomizations(component_instance)
                } else if(target.is("span")) {
                    let component_instance = this.getComponent(span_customizations, {e})
                    this.appendCustomizations(component_instance)
                }
                else if(target.is("img")) {
                    let component_instance = this.getComponent(image_customizations, {e})
                    this.appendCustomizations(component_instance)
                }
                else if((target.is("a") && target.hasClass("list-group-item")) || (target.is("div") && target.hasClass("list-group"))) {
                    let text_edit_instance = this.getComponent(text_edit_customizations, {e})
                    let component_instance = this.getComponent(list_customizations, {e})
                    this.appendCustomizations(component_instance)
                    this.appendCustomizations(text_edit_instance)
                }
                else if(target.is("td") || target.is("th")) {
                    let text_edit_instance = this.getComponent(text_edit_customizations, {e})
                    let table_instance = this.getComponent(table_customizations, { e })
                    this.appendCustomizations(text_edit_instance)
                    this.appendCustomizations(table_instance)
                }
                else if(target.hasClass('radio-container')) {
                    let radio_instance = this.getComponent(radio_btn_customizations, { target: e.target })

                    e.target = $(e.target).find("label").get(0)
                    let text_edit_instance = this.getComponent(text_edit_customizations, {e})

                    this.appendCustomizations(text_edit_instance)
                    this.appendCustomizations(radio_instance)
                }
                else if(target.hasClass('checkbox-container')) {
                    let radio_instance = this.getComponent(radio_btn_customizations, { target: e.target })

                    e.target = $(e.target).find("label").get(0)
                    let text_edit_instance = this.getComponent(text_edit_customizations, {e})

                    this.appendCustomizations(text_edit_instance)
                    this.appendCustomizations(radio_instance)
                }
                // else if() {
                //     let instance = this.getComponent(button_customizations, {e})
                //     this.appendCustomizations(instance)
                //     let text_edit_instance = this.getComponent(text_edit_customizations, {e})
                //     this.appendCustomizations(text_edit_instance)
                // }
            } else {
                if($this.selected) {
                    // $($this.selected).removeClass('component-active')
                }
            }

        })
        
    }
}
</script>

<style>
.component-active {
    border: 2px solid #4285f4 !important;
    /* box-shadow: 0 2px 2px 0 rgba(0, 134, 230, 0.14), 0 3px 1px -2px rgba(0, 134, 230, 0.12), 0 1px 5px 0 rgba(0, 134, 230, 0.2); */
}
.workspace-container {
    overflow: auto;
    padding: 10px;
}
.workspace {
    margin: auto;
    padding: 0px;
    flex-shrink: 0;
    width: calc(100% - 4px);
    min-height: 500px;
    height: auto;
    background-color: white;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
}
</style>