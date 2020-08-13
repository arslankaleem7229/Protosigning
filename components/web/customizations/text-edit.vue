<template>
    <div>
    <div class="customizations-parent-container-2" ref='parent'>
        <div class="customizations-child-container-2 flex p-0" ref="child">
        <span id="my-badge" class="p-2 ml-2 mr-2 badge badge-primary align-self-center">{{tag}}</span>           
        <button @click="edit()" class="btn btn-light"><span class="icon-edit-pencil"></span></button>
        </div>
    </div>
    <div class="container-fluid display-none justify-content-center" id="edit-component-container" ref="edit-container">
        <div class="align-self-center p-2 bg-light row w-25" id="edit-component">
            <button @click="close_edit()" class="col-md-12 text-right mt-2"><span class="icon-close"></span></button>
            <h6 class="col-md-12 ml-2">Text</h6>
            <div class="form-group col-md-12 mt-1">
                <textarea @blur="change_text($event)" @mouseup="get_selected_text($event)" @keyup="get_selected_text($event)" class="form-control" id="" rows="3" :value="my_text"></textarea>
                <button @click="remove_all_html()" class="col-md-12 text-right btn">Remove all &nbsp; <b>HTML </b><code><b></b></code></button>
            </div>
            <div class="container" v-if="string.selected !== null && string.selected !== '' ">
                <p>Wrap in:</p>
                <button @click="wrap_in('span')" type="button" class="badge badge-pill badge-primary p-2 mt-2">Span</button>
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
export default {
    props: {
        e: {
            required: true
        }
    },
    data() {
        return {
            display_text: false,

            my_text: null,
            selected_text: null,
            tag: null,
            container: null,
            child_container: null,
            string : {
                start: null, end: null, selected: null
            }
        }
    },
    methods: {
        remove_all_html() {
            let p = $("<p>")
            p.html(this.my_text)
            this.my_text = p.text()
        },
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
            $(this.e.target).html(this.my_text)
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
            $('.customizations-parent-container-2').remove()
        },
        
    },
    mounted() {
        this.tag = $(this.e.target).prop('tagName').toLowerCase()
        let $this = this,
            offset = $($this.e.target).offset(),
            height = $($this.e.target).outerHeight(),
            container_height = null
        this.$nextTick(function() {
            // $this.close_customizations()
            $this.container = $($this.$refs['parent'])
            $this.child_container = $($this.$refs['child'])
            $this.my_text = $($this.e.target).html()
            $($this.e.target).hasClass("display-1") || $($this.e.target).hasClass("display-2") ? $this.display_text = true : ""
            container_height = $($this.container).outerHeight()
            
            $($this.e.target).mouseleave((e) => (e.relatedTarget !== $this.container.get(0) ? $($this.container.remove()) : "" ))
            $this.container.mouseleave((e) => $this.container.remove() )

            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top - container_height) + 'px'
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
.customizations-parent-container-2 {
    position: absolute;
    padding: 5px;
    border: 1px solid rgba(0, 134, 230, 0.111);
    z-index: 2000;
}
.customizations-child-container-2 {
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    background: #f7f7f7;
    border-radius: 2.5px;
    /* display: flex; */
    flex-wrap: wrap;
    padding: 0px;
    /* padding: 5px; */
}
</style>