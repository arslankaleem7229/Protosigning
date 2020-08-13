<template>
  <div class="customizations-parent-container" ref='parent'>
      <div class="customizations-child-container flex">
          <button @click="backgrounds_dropdown($event, backgrounds)"><span>{{backgrounds.active}}</span> &nbsp; &nbsp; &#9662;</button>
          <button @click="alignment_dropdown($event, alignments)"><span v-html="alignments.active"></span> &nbsp; &#9662;</button>
          <button @click="delete_component()"><span class="icon-delete"></span></button>
          <button @click="text_drop_down($event, components)"><span class="icon-add-solid"></span></button>
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
            backgrounds: {
                active: 'Dark Background',
                list: null,
                open: false,
            },
            components: {
                list: ["Button", "Text", "Image"],
                open: false,
                active: null
            },
            alignments: {
                list: [
                    "<span class='icon-format_align_left'></span>", 
                    "<span class='icon-format_align_center'></span>",
                    "<span class='icon-format_align_right'></span>",
                ],
                align: ['h-left', 'h-center', 'h-right','align-justified', 'v-top', 'v-center', 'v-bottom'],
                open: false,
                active: "<span class='icon-format_align_left'></span>"
            },
            layouts: {
                list: [
                    "<span class='icon-layout10'></span>", 
                    "<span class='icon-layout11'></span>",
                ],
                align: ['column', 'row'],
                open: false,
                active: "<span class='icon-layout'></span>"
            },
        }
    },
    methods: {
        alignment_dropdown(ev, obj) {
            let $this = this
            let target = $($this.e.target)
            let { align } = obj
            let list_buttons = $createList(ev, obj)
            for(let i=0; i<list_buttons.length; i++) {
                list_buttons[i].click(() => {
                    $(ev.target).find("span").html(list_buttons[i].html())
                    if(align[i].includes('h-')) {
                        target.removeClass('justify-content-start justify-content-end justify-content-center justify-content-between justify-content-around')
                        if(align[i] === "h-left") {
                            target.addClass('justify-content-start')
                        } else if(align[i] === "h-center") {
                            target.addClass('justify-content-center')
                        } else if(align[i] === "h-right") {
                            target.addClass('justify-content-end')
                        }
                    } else if(align[i].includes('v-')) {
                        // target.find("*").removeClass('align-content-start align-content-end align-content-center')
                            if(align[i] === "v-top") {
                                target.find("*").css('align-self', 'flex-start')
                            } else if(align[i] === "v-center") {
                                target.find("*").css('align-self', 'center')
                            } else if(align[i] === "v-bottom") {
                                target.find("*").css('align-self', 'flex-end')
                            }

                    }
                })
            }
        },
        backgrounds_dropdown(ev, obj) {
            let $this = this
            obj.list = $backgrounds
            let {list_buttons, parent} = this.create_background_list(ev, obj)
            for(let i=0; i<list_buttons.length; i++) {
                list_buttons[i].click(() => {
                    obj.active = $backgrounds[i].name
                    obj.list = $backgrounds[i].list
                    let other_list_buttons = this.create_background_list(ev, obj).list_buttons
                    parent.remove()
                    for(let j=0; j<other_list_buttons.length; j++) {
                        other_list_buttons[j].click(() => {
                            $($this.e.target).css($backgrounds[i].list[j].css)
                        })
                    }
                })
            }
        },
        create_background_list(ev, obj) {
            if(obj.open) return
            let { list } = obj
            list.open = true
            let $this = this
            let parent = $('<div class="customizations-parent-container"></div>')
            let child = $('<div class="customizations-child-container flex align-center"></div>')
            let offset = $(ev.target).offset(),
                height = $(ev.target).outerHeight()
            let list_buttons = []
            for(let i=0; i< list.length; i++) {
                let div = $("<div>")
                div.addClass('customization-background-list')
                div.css(list[i].css)
                child.append(div)
                list_buttons.push(div)
            }
            parent.append(child)
            $(document.body).append(parent)

            parent.css({
                left: offset.left + 'px',
                top: (offset.top + height) + 'px',
                width: "500px",
                maxHeight: "300px",
                overflow: "auto"
            })
            parent.mouseleave(() => {
                parent.remove()
                obj.open = false
            })
            return {
                list_buttons,
                parent
            }
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
                    else if(this.components.list[i] === "Text") {
                        EventBus.$emit('$insert_text', {
                            target: this.e.target
                        })
                    }
                    else if(this.components.list[i] === "Image") {
                        EventBus.$emit('$insert_image', {
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
            $this.colors = $addColors($this.e.target)
            $this.child_container.prepend($this.colors)
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