<template>
    <div class="cust-parent" ref="parent">
        <div class="cust-child d-flex align-content-center" ref="child">
            <button class="btn btn-light" @click="add_new(false)"><span class="icon-add-solid"></span></button>
            <button class="btn btn-light" @click="add_new(true)"><span class="icon-content_copy"></span></button>
            <button class="btn btn-light" @click="delete_component()"><span class="icon-delete"></span></button>
        </div>
    </div>
  
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
import {v4 as uuid} from 'uuid'
export default {
    props: {
        target: {
            required: true
        }
    },
    data() {
        return {
            tag: null,
            container: null,
            child_container: null,
           
        }
    },
    methods: {
        delete_component() {
            this.close_customizations()
            $(this.target).remove()            
        },
        add_new(dup) {
            let clone = $(this.target).clone(),
                target = $(this.target),
                id = uuid()
            
            console.log('target', target.get(0))
            clone.find("label").attr("for", id)

            if(target.hasClass("checkbox-container")) {
                clone.find("input[type='checkbox']").attr("id", id)
                clone.find("input[type='checkbox']").attr("name", uuid())
            } 
            else if(target.hasClass("radio-container")) {
                clone.find("input[type='radio']").attr("id", id)
            }

            !dup ? clone.find("label").text('New Button') : ""
            clone.insertAfter(target)
        },
       
    },
    mounted() {
        this.tag = $(this.target).prop('tagName').toLowerCase()
        let $this = this,
            offset = $($this.target).offset(),
            height = $($this.target).outerHeight()
        this.$nextTick(function() {
            $this.container = $(".cust-parent")
            $this.child_container = $('.cust-child')

            // $($this.target).mouseleave((e) => (e.relatedTarget !== $this.container.get(0) ? $($this.container.remove()) : "" ))
            $this.container.mouseleave((e) => $this.container.remove())
            
            $this.container.css({
                left: offset.left + 'px',
                top: (offset.top + height - 5) + 'px',
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