<template>
    <div class="cust-parent" ref="parent">
        <div class="cust-child d-flex align-content-center" ref="child">
            <button class="btn btn-light" @click="link_it()"><span class="icon-link"></span></button>
            <button class="btn btn-light" @click="wrap()"><span class="icon-checkbox-unchecked"></span></button>
            <button class="btn btn-light"><span class="icon-content_copy"></span></button>
            <button class="btn btn-light" @click="delete_component()"><span class="icon-delete"></span></button>
            <button @click="$dropdown($event, 'more_options', more_options)" class="btn btn-light border border-right-0 border-bottom-0 border-top-0 no-radius ml-3 pl-1 pr-1"><span class="pl-1 pr-1 icon-dots-horizontal-triple"></span></button>
        </div>
    </div>
  
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
import vue from 'vue'
import link_overlay from '../customizations/link.vue'
export default {
    components: {
        link_overlay
    },
    props: {
        e: {
            required: true
        },
        pages: {
            required: false
        },
        reference: {
            required: false
        }
    },
    data() {
        return {
            tag: null,
            container: null,
            child_container: null,
            more_options: {
                list: [
                    { title: "Button Filled", value: 'filled' },
                    { title: "Outline", value: 'outline' },
                    { title: "Text Only", value: 'text' },
                    { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                    { title: "Link Button", value: 'link' },
                    { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                ],
            },
        }
    },
    methods: {
        link_it() {
            let { html, instance } = this.getComponent(link_overlay, { e: this.e, pages: this.pages, reference: this.reference })
            instance.$on("link", payload => {
                this.$emit("link-it", payload)
            })
            $(document.body).append(html)
        },
        wrap() {
            let target = $(this.e.target)
            let wrapper = $("<div>")
            wrapper.attr("component", "true")
            wrapper.attr("container-type", "inner-container")
            wrapper.addClass("col-md-7 row align-content-center sortable ui-sortable-handle connectedSortable ui-sortable")
            target.wrap(wrapper)
        },
        delete_component() {
            this.close_customizations()
            $(this.e.target).remove()            
        },
        close_customizations() {
            $('.cust-parent').remove()
        },
        $dropdown(e, type, arr) {
            let { list } = arr
            let { items } = $simple_dropdown(e, list)
            arr.open = true
            
            switch(type) {
                case "more_options":
                    this.$more_options(items, list)
            }
        },
        $more_options(items, list) {
            let target = $(this.e.target)
            for(let i=0; i<items.length; i++) {
                items[i].click(() => {
                    let { value } = list[i]
                    switch(value) {
                        case "text":
                            target.attr("class", "btn text-primary")
                            break;
                        case "outline":
                            target.attr("class", "btn btn-outline-primary")
                            break;
                        case "filled":
                            target.attr("class", "btn btn-primary")
                            break;
                        case "link":
                            target.attr("class", "btn btn-link")
                            break;
                    }
                })
            }
        },
        getComponent(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                html: instance.$el,
                instance
            }

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

            // $($this.e.target).mouseleave((e) => (e.relatedTarget !== $this.container.get(0) ? $($this.container.remove()) : "" ))
            $this.container.mouseleave((e) => {
                !$this.more_options.open ? $this.container.remove() : ""
            } )
            
            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top + height - 5) + 'px',
                // minWidth: $($this.e.target).outerWidth()
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
    width: auto;

}

</style>