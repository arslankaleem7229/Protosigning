<template>
  <div class="customizations-parent-container">
      <div class="customizations-child-container flex">         
        <span id="my-badge" class="p-2 ml-2 mr-2 border badge ">{{tag}}</span> 
        <button v-if="tag !== 'a' " class="border border-top-0 border-bottom-0 p-2 round-0" @click="text_drop_down($event, list_alignment)"><span>{{list_alignment.active}}</span> &nbsp; &nbsp; &#9662;</button>
        <button @click="new_list_item()"><span class="icon-list-add"></span></button>  
        <button><span class="icon-edit-pencil"></span></button>
        <!-- <button @click="wrap_in_container()"><span class="icon-insert-template"></span></button> -->
        <button @click="delete_component()"><span class="icon-delete"></span></button>
        <button @click="close_customizations()"><span class="icon-cross-cancel"></span></button>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        e: {
            required: true
        }
    },
    data() {
        return {
            tag: null,
            container: null,
            child_container: null,
            colors: null,
            list_alignment: {
                active: "Vertical",
                list: ['Horizontal', 'Vertical'],
                open: false
            }
        }
    },
    methods: {
        new_list_item() {
            let target = $(this.e.target)
            if(target.hasClass("list-group-item")) {
                target = target.parent()
            } else if(!target.hasClass("list-group")) {
                console.log('ul is not selected')
                return
            }
            let clone = null
            
            if(target.find('li').get(0)) {
                clone = target.find('li').first().clone()
            } else {
                clone = target.find('a').first().clone()
            }

            clone.css('background', 'rgba(219, 75, 75, 0.225)')
            target.append(clone)
        },
        wrap_in_container() {
            let target = $(this.e.target)
            let wrapper = $("<div>")
            wrapper.attr("container", "true")
            wrapper.attr('container-type', 'inner-container')
            wrapper.addClass("col-md-3 p-3 my-auto text-center")
            let c_list = target.attr('class').split(" ")
            for(let i=0; i<c_list.length; i++) {
                if(c_list[i].includes('col-md')) {
                    target.removeClass(c_list[i])
                    target.addClass('col-md-12')
                }
                // console.log(c_list[i].includes('col-md'))
            }
            // console.log(, 'my class list')
            target.wrap(wrapper)

        },
        delete_component() {
            this.close_customizations()
            $(this.e.target).remove()            
        },
        close_customizations() {
            $('.customizations-parent-container').remove()
        },
        text_drop_down(ev, obj) {
            let target = $(this.e.target)
            target.hasClass("list-group-item") ? target = target.parent() : ""
            if(!target.hasClass("list-group")) {
                console.log('ul is not selected')
                return
            }

            let list_buttons = this.create_simple_list(ev, obj)
            for(let i=0; i<list_buttons.length; i++) {
                list_buttons[i].click(() => {
                    if(obj.list[i] === "Horizontal") {
                        target.addClass("list-group-horizontal flex-wrap")
                        console.log('vertically align')
                    }
                    else if(obj.list[i] === "Vertical") {
                        target.removeClass("list-group-horizontal")
                        console.log('horizontally align')
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
        }
    },
    mounted() {
        // if($(this.e.target).is("li")) {
        //     this.e.target = $(this.e.target).parent()
        // } else if(!$(this.e.target).is("ul")) {
        //     console.log('ul is not selected')
        //     return
        // }
        // console.log('current selection', this.e.target.get(0))
        this.tag = $(this.e.target).prop('tagName').toLowerCase()
        let $this = this,
            offset = $($this.e.target).offset(),
            height = $($this.e.target).outerHeight()
        this.$nextTick(function() {
            $this.container = $(".customizations-parent-container")
            $this.child_container = $('.customizations-child-container')
            $this.colors = $addColors($this.e.target)
            $this.colors.insertAfter("#my-badge")
            // $this.child_container.prepend($this.colors)

            // console.log($(window).width(), 'my width')
            // console.log(offset.left, 'my offset left')
            // console.log($this.container.outerWidth())
            if(offset.left + $this.container.outerWidth() > $(window).width()) {
                offset.left -= (offset.left + $this.container.outerWidth() - $(window).width())
            }
            console.log(offset.left + $this.container.outerWidth(), $(window).width())
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
    padding: 7px;
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