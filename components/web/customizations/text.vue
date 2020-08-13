<template>
    <!-- <div>
        <div class="cust-parent" ref='parent'>
            <div class="cust-child flex">
            <span id="my-badge" class="p-2 ml-2 mr-2 border badge ">{{tag}}</span>           
            <button v-if="!display_text" @click="text_drop_down($event, text_types)"><span>{{text_types.active}}</span> &nbsp; &nbsp; &#9662;</button>
            <button @click="wrap_in_container()"><span class="icon-insert-template"></span></button>
            <button @click="delete_component()"><span class="icon-delete"></span></button>
            <button @click="close_customizations()"><span class="icon-cross-cancel"></span></button>
            </div>
        </div>
    </div> -->
    <div class="cust-parent" ref="parent">
        <div class="cust-child d-flex align-content-center" ref="child">
            <button v-if="!display_text" @click="text_drop_down($event, text_types)" class="btn btn-light"><span>{{text_types.active}} </span>&nbsp; &nbsp; &#9662;</button>
            <button class="btn btn-light border border-right-0 border-top-0 border-bottom-0 no-radius" @click="wrap_in_container()"><span class="icon-insert-template"></span></button>
            <button class="btn btn-danger" @click="delete_component()"><span class="icon-delete"></span></button>
            <!-- <button @click="close_customizations()"><span class="icon-cross-cancel"></span></button> -->
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
            display_text: false,

            preview_text: null,
            tag: null,
            container: null,
            child_container: null,
            colors: null,
            text_types: {
                list: ["Normal Text", "Title", "Heading", 'Subheading', 'small'],
                open: false,
                active: "Heading"
            },
            string : {
                start: null, end: null, selected: null
            }
        }
    },
    methods: {
        close_edit() {
            $(this.$refs['edit-container']).addClass('display-none')
            $(this.$refs['edit-container']).removeClass('d-flex')
            $(this.e.target).html(this.my_text)
        },
        edit() {
            this.close_customizations()
            $(this.$refs['edit-container']).removeClass('display-none')
            $(this.$refs['edit-container']).addClass('d-flex')
        },        
        wrap_in_container() {
            let target = $(this.e.target)
            let display = target.css("display")
            let wrapper = $("<div>")
            wrapper.attr("component", "true")
            wrapper.attr("container-type", "inner-container")
            wrapper.addClass("col-md-7 row align-content-center sortable ui-sortable-handle connectedSortable ui-sortable")
            target.wrap(wrapper)
        },
        component_list() {
            
        },
        delete_component() {
            this.close_customizations()
            $(this.e.target).remove()            
        },
        close_customizations() {
            $('.cust-parent').remove()
        },
        text_drop_down(ev, obj) {
            let $this = this
            let list_buttons = this.create_simple_list(ev, obj)
            let target = $(this.e.target)
            for(let i=0; i<list_buttons.length; i++) {
                list_buttons[i].click(() => {
                    let {name, value} = $getAttrList(target)
                    let new_text = null
                    if(obj.list[i] === "Normal Text") {
                        new_text = $("<p>")
                    } else if(obj.list[i] === "Heading") {                        
                        new_text = $("<h1>")
                    } else if(obj.list[i] === "Title") {                        
                        new_text = $("<h3>")
                    } else if(obj.list[i] === "small") {                        
                        new_text = $("<p>")
                    } else if(obj.list[i] === "Subheading") {                        
                        new_text = $("<h4>")
                    } 
                    else 
                        return

                    for(let i=0; i<value.length; i++) {
                        new_text.attr(name[i], value[i])                
                    }
                    obj.list[i] === "small" ? new_text.addClass("small") : new_text.removeClass("small")
                    new_text.html(target.html())
                    new_text.insertAfter(target)
                    target.remove()
                    $this.e.target = new_text
                    target = new_text
                })
            }
        },
        create_simple_list(ev, obj) {
            if(obj.open) return
            let { list } = obj
            obj.open = true
            let $this = this
            let parent = $('<div class="cust-parent"></div>')
            let child = $('<div class="cust-child container"></div>')
            let offset = $(ev.target).offset(),
                height = $(ev.target).outerHeight()
            let list_buttons = []
            for(let i=0; i< list.length; i++) {
                let button = $("<button>")
                button.html(list[i])
                button.addClass('btn btn-light customization-simple-list-2')
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
            $this.container = $(".cust-parent")
            $this.child_container = $('.cust-child')
            $this.colors = $addColors($this.e.target)
            $this.my_text = $($this.e.target).html()
            $($this.e.target).hasClass("display-1") || $($this.e.target).hasClass("display-2") ? $this.display_text = true : ""

            $($this.e.target).mouseleave((e) => (e.relatedTarget !== $this.container.get(0) ? $($this.container.remove()) : "" ))
            $this.container.mouseleave((e) => {
                !$this.text_types.open ? $this.container.remove() : ""
            } )
            
            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top + height - 5) + 'px'
            })

        })
    }
}
</script>

<style>
.customization-simple-list-2 {
    display: block;
    text-align: left;
    width: 100%;
}
.cust-parent {
    position: absolute;
    border: 1px solid rgba(0, 134, 230, 0.111);
    z-index: 2000;
    padding: 5px;
}
.cust-child {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    background: #f7f7f7;
    max-width: 420px;
    overflow-x: auto;

}

</style>