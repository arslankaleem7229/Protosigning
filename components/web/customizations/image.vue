<template>
  <div class="customizations-parent-container" ref='parent'>
      <div class="customizations-child-container flex">
          <button @click="upload_image()"><span class="icon-upload"></span></button>
          <button><span class="icon-filter"></span></button>
          <button @click="wrap_in_container()"><span class="icon-insert-template"></span></button>
          <button @click="delete_component()"><span class="icon-delete"></span></button>
          <button @click="close_customizations()"><span class="icon-cross-cancel"></span></button>
      </div>
  </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
export default {
    props: {
        e: {
            required: true
        }
    },
    data() {
        return {
            container: null,
            child_container: null,
            colors: null,
            text_types: {
                list: ["Normal Text", "Title", "Heading", 'Subheading', 'small'],
                open: false,
                active: "Heading"
            }
        }
    },
    methods: {
        upload_image() {
            $uploadImgFile(this.e.target)
        },
        wrap_in_container() {
            let target = $(this.e.target)
            // let display = target.css("display")
            let wrapper = $("<div>")
            wrapper.attr("component", "true")
            wrapper.attr("container-type", 'inner-container')
            // wrapper.css("display", display)
            wrapper.addClass("d-flex flex-wrap justify-content-center  sortable ui-sortable-handle connectedSortable p-2")
            target.wrap(wrapper)
        },
        component_list() {
            
        },
        delete_component() {
            this.close_customizations()
            $(this.e.target).remove()            
        },
        close_customizations() {
            $('.customizations-parent-container').remove()
        },
        text_drop_down(ev, obj) {
            let list_buttons = this.create_simple_list(ev, obj)
            for(let i=0; i<list_buttons.length; i++) {
                list_buttons[i].click(() => {
                    if(this.components.list[i] === "Button") {
                        EventBus.$emit('$insert_button', {
                            target: this.e.target
                        })
                    }
                })
            }
        },
        create_simple_list(ev, obj) {
            if(obj.open) return
            let { list } = obj
            list.open = true
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
                    list.active = list[i]
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
        let $this = this,
            offset = $($this.e.target).offset(),
            height = $($this.e.target).outerHeight()
        this.$nextTick(function() {
            $this.container = $(".customizations-parent-container")
            $this.child_container = $('.customizations-child-container')
            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top + height) + 'px'
            })

        })
    }
}
</script>

<style>
.customization-simple-list {
    width: 100%;
    display: block;
    font-size: 14px;
    text-align: left;
    padding: 5px 20px;
    font-weight: 600;
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