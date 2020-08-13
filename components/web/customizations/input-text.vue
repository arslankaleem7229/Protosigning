<template>
    <div>
        <div class="customizations-parent-container" ref='parent'>
            <div class="customizations-child-container flex">
                <span id="my-badge" class="p-2 ml-2 mr-2 border badge ">{{tag}}</span>           
                <button @click="edit()"><span class="icon-edit-pencil"></span></button>
                <button @click="delete_component()"><span class="icon-delete"></span></button>
                <button @click="text_drop_down($event, components)"><span class="icon-add-solid"></span></button>
                <button @click="close_customizations()"><span class="icon-cross-cancel"></span></button>
            </div>
        </div>
        <div class="container-fluid display-none justify-content-center" id="edit-component-container" ref="edit-container">
            <div class="align-self-center p-2 bg-light row w-25" id="edit-component">
                <button @click="close_edit()" class="col-md-12 text-right mt-2"><span class="icon-close"></span></button>
                <h6 class="col-md-12">Placeholder</h6>
                <div class="form-group col-md-12 mt-1">
                    <input type="text" class="form-control bg-white p-2" :value="my_placeholder" name="text2" @blur="change_placeholder($event)" >
                </div>
                <h6 class="col-md-12 mt-1">Field Type</h6>
                <div class="col-md-12 mt-1">
                    <select name="cars" class="custom-select mb-3" @change="change_input_type($event)">
                        <option value="text" selected>Text</option>
                        <option value="password">Password</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="search">Search</option>
                    </select>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
import input_type_text from '../components/inputs/type-text.vue'
import input_type_checkbox from '../components/inputs/type-checkbox.vue'
import input_type_radio from '../components/inputs/type-radio.vue'
import submit_button from '../components/buttons/submit-button.vue'
import text_1 from '../components/texts/text-1.vue'
export default {
    components: {
        input_type_checkbox,
        input_type_text,
        input_type_radio,
        submit_button,
        text_1
    },
    props: {
        e: {
            required: true
        }
    },
    data() {
        return {
            my_placeholder: null,
            tag: null,
            container: null,
            child_container: null,
            edit_container: null,
            colors: null,
            components: {
                list: ["Icon", "Button"],
                open: false,
                active: null
            },
        }
    },
    methods: {
        change_input_type(e) {
            let target = $(this.e.target) 
            let text_type = $(e.target).val()
            target.attr("type", text_type)
            console.log($(e.target).val(), 'my value')
        },
        change_placeholder(e) {
            let target = $(this.e.target)
            target.attr("placeholder", $(e.target).val())
        },
        close_edit() {
            $(this.$refs['edit-container']).addClass('display-none')
            $(this.$refs['edit-container']).removeClass('d-flex')
        },
        edit() {
            this.close_customizations()
            $(this.$refs['edit-container']).removeClass('display-none')
            $(this.$refs['edit-container']).addClass('d-flex')
        },
        delete_component() {
            this.close_customizations()
            if($(this.e.target).is('input[type="text"]')) {
                $(this.e.target).parent().remove()
            }
        },
        close_customizations() {
            $('.customizations-parent-container').remove()
        },
        text_drop_down(ev, obj) {
            let list_buttons = this.create_simple_list(ev, obj)
            let $this = this
            for(let i=0; i<list_buttons.length; i++) {
                list_buttons[i].click(() => {
                    if(obj.list[i] === "Icon") {
                        let icon = $("<span>")
                        icon.attr("class", 'icon-diamonds input-group-text')
                        $($this.e.target).prev().html(icon)
                    }
                    else if(obj.list[i] === "Button") {
                        let button = $("<button>")
                        button.attr("class", "m-0 btn btn-primary")
                        button.attr("type", "button")
                        button.html("Field Button")
                        $($this.e.target).next().html(button)
                        // console.log($($this.e.target).next(), 'my next')
                    }
                })
            }
        },
        create_simple_list(ev, obj) {
            if(obj.open) return
            let { list } = obj
            obj.open = true
            let $this = this
            let parent = $('<div class="customizations-parent-container"></div>')
            let child = $('<div class="customizations-child-container display-block"></div>')
            let offset = $(ev.target).offset(),
                height = $(ev.target).outerHeight()
            let list_buttons = []
            for(let i=0; i< list.length; i++) {
                let button = $("<button>")
                button.html(list[i])
                button.addClass('customization-simple-list')
                child.append(button)
                button.click(() => {
                    obj.active = list[i]
                })
                list_buttons.push(button)
            }
            parent.append(child)
            $(document.body).append(parent)

            parent.css({
                left: offset.left + 'px',
                top: (offset.top + height) + 'px'
            })
            parent.mouseleave(() => {
                parent.remove()
                obj.open = false
            })
            return list_buttons
        },
        
    },
    mounted() {
        this.tag = $(this.e.target).prop('tagName').toLowerCase()
        let $this = this,
            offset = $($this.e.target).offset(),
            height = $($this.e.target).outerHeight()
        this.$nextTick(function() {
            $this.container = $(".customizations-parent-container")
            $this.child_container = $('.customizations-child-container')
            $this.colors = $addColors($this.e.target)
            $this.my_placeholder = $($this.e.target).attr("placeholder")
            // $this.child_container.prepend($this.colors)
            $this.colors.insertAfter("#my-badge")
            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top + height) + 'px'
            })

        })
    }
}
</script>

<style>
.customization-background-list {
    width: 150px;
    height: 60px;
    background-color: red;
    margin: 1px;
    display: inline-block;
}
.customization-simple-list {
    width: 100%;
    display: block;
    font-size: 14px;
    text-align: left;
    padding: 5px 20px;
    font-weight: 600;
}
.customization-inline-list {
    font-size: 14px;
    text-align: left;
    padding: 5px;
    font-weight: bold;    
}
.customizations-parent-container {
    position: absolute;
    padding: 10px;
    border: 1px solid rgba(0, 134, 230, 0.111);
    z-index: 2000;
}
.customizations-child-container {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    background: #f7f7f7;
    border-radius: 2.5px;
    /* display: flex; */
    flex-wrap: wrap;
    padding: 0px;
    /* padding: 5px; */
}
.customizations-child-container button {
    border: 1px solid transparent;
}
.customizations-child-container button span {
    font-size: 16px;
}
.customizations-child-container button:hover {
    transition: 0.3s;
    border: 1px solid rgba(0, 134, 230, 0.125);
    background: rgba(0, 134, 230, 0.05);
}
.customizations-child-container button:active {
    transition: 0.1s;
    background: rgba(0, 134, 230, 0.125);
}
.customizations-child-container * {
    align-self: center;
}
</style>