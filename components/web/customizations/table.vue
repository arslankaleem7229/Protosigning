<template>
    <div class="cust-parent" ref="parent">
        <div class="cust-child d-flex align-content-center" ref="child">
            <button class="btn btn-light"><span class="icon-content_copy"></span></button>
            <button class="btn btn-light" @click="delete_component()"><span class="icon-delete"></span></button>
            <button @click="$dropdown($event, 'more_options', more_options)" class="btn btn-light border border-right-0 border-bottom-0 border-top-0 no-radius ml-3 pl-1 pr-1"><span class="pl-1 pr-1 icon-dots-horizontal-triple"></span></button>
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
            more_options: {
                list: [
                    { title: "New Row", value: 'row' },
                    { title: "New Column", value: 'col' },
                    { title: "<p class='border-bottom w-100'></p>", value: 4, no_btn: true},
                    { title: "Stripped Table", value: 'stripped' },
                    { title: "Colored Header", value: 'colored_header' },
                    { title: "Dark Theme", value: 'dark' },
                    { title: "Basic", value: 'light' },
                ],
                open: false,
                active: "Heading"
            },
            string : {
                start: null, end: null, selected: null
            }
        }
    },
    methods: {
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
            let table_node = target.parents('table')
            let thead_node = target.parents("thead")
            for(let i=0; i<items.length; i++) {
                items[i].click(() => {
                    let { value } = list[i]
                    switch(value) {
                        case "col":
                            if(target.is("td")) {
                                let parent = target.parent()
                                let clone = parent.clone()
                                clone.insertAfter(parent)
                            } else if(target.is("th")) {
                                item[i].attr("disabled", true)
                            }
                            break
                        case "row":
                            if(target.is("td") || target.is("th")) {
                                let clone = target.clone()
                                clone.insertAfter(target)
                            }
                            break
                        case "stripped":
                            table_node.attr("class", "table table-striped")
                            break;
                        case "colored_header":
                            thead_node.attr("class", "thead-dark")
                            break;
                        case "dark":
                            table_node.attr("class", "table table-dark")
                            break;
                        case "light":
                            table_node.attr("class", "table")
                            break;
                    }
                })
            }
        }
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