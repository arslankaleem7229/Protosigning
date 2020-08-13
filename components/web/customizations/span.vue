<template>
    <div>
    <div class="customizations-parent-container" ref='parent'>
        <div class="customizations-child-container flex">
        <span id="my-badge" class="p-2 ml-2 mr-2 border badge ">{{tag}}</span>           
        <button @click="edit()"><span class="icon-edit-pencil"></span></button>
        <button @click="delete_component()"><span class="icon-delete"></span></button>
        <button @click="close_customizations()"><span class="icon-cross-cancel"></span></button>
        </div>
    </div>
    <div class="container-fluid display-none justify-content-center" id="edit-component-container" ref="edit-container">
        <div class="align-self-center p-2 bg-light row w-25" id="edit-component">
            <button @click="close_edit()" class="col-md-12 text-right mt-2"><span class="icon-close"></span></button>
            <h6 class="col-md-12">Text</h6>
            <div class="form-group col-md-12 mt-1">
                <textarea @blur="change_text($event)" @mouseup="get_selected_text($event)" @keyup="get_selected_text($event)" class="form-control" id="exampleFormControlTextarea4" rows="3" :value="my_text"></textarea>
            </div>
            <div class="container" v-if="string.selected !== null && string.selected !== '' ">
                <p>Wrap in:</p>
                <button @click="wrap_in('b')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Bold</button>
                <button @click="wrap_in('i')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Italic</button>
                <button @click="wrap_in('u')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Underline</button>
                <button @click="wrap_in('mark')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Highlight</button>
                <button @click="wrap_in('code')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Code</button>
                <button @click="wrap_in('kbd')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Keyboard Shortcut</button>
            </div>            
        </div>
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
            preview_text: null,
            my_text: null,
            selected_text: null,
            tag: null,
            container: null,
            child_container: null,
            colors: null,
            string : {
                start: null, end: null, selected: null
            }
        }
    },
    methods: {
        wrap_in(type) {
            let { selected, start, end } = this.string
            selected = '<' + type + '>' + selected + '</'+type+'>'
            this.my_text = start + selected + end
            $(this.e.target).html(this.my_text)
        },
        change_text(e) {
            $(this.e.target).html(this.my_text)
        },
        get_selected_text(e) {
            let original_string = $(e.target).val()
            let start = e.target.selectionStart
            let end = e.target.selectionEnd
            
            this.my_text = original_string
            this.string.start = original_string.substring(0, start)
            this.string.end = original_string.substring(end, original_string.length)
            this.string.selected = original_string.substring(start, end)

            
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
            $(this.e.target).remove()            
        },
        close_customizations() {
            $('.customizations-parent-container').remove()
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
            $this.my_text = $($this.e.target).html()
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