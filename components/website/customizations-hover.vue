<template>
  <div class="customizations align-self-center"  
    ref="hover-btn"
    :style="{ top: (myTop) + 'px', left: myLeft + 'px', background: '#f0f0f0', display: myDisplay }">
    
    <input type="color" id="bg_color" name="bg_color" value="black" class="display-none" @change="bgColor_changed()">
    <button @click="bgColor_clicked()" id="bg_color_btn"></button>
    &nbsp;
    <input type="color" id="fg_color" name="fg_color" value="white" class="display-none" @change="fgColor_changed()">
    <button @click="fgColor_clicked()" id="fg_color_btn"></button>
  </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
export default {
    props: {
        bg_color: {
            type: String,
            required: true
        },
        trigger: {
            required: false
        }
    },
    data() {
        return {
            myTop: null,
            myLeft: null,
            myDisplay: 'none',
            color: 'orange',
            layerTrigger: null,
            layerPanel: null
        }
    },
    methods: {
        triggerEntered(e) {
            if(this.myDisplay == 'block') {
                console.log('already visible customizations')
                return
            }
            console.log('hello there')
            this.layerTrigger = this.trigger
            this.myDisplay = 'block'
            let offset = this.trigger.position()
            this.myTop = (offset.top - this.trigger.height())
            this.myLeft = offset.left
        },
        triggerLeave(e) {
            let panel = this.$refs['hover-btn']
            if(panel == e.relatedTarget) {
                console.log('abort since entering panel')
                return
            }
            // console.log(panel, e.relatedTarget)
            this.myDisplay = "none"
        },
        leavePanel(e) {
            let panel = this.$refs['hover-btn']
            if(e.relatedTarget == this.trigger.get(0)) {
                console.log('abort since entering trigger')
                return;
            }
            this.myDisplay = "none"
        },
        bgColor_clicked() {
            $('#bg_color').click()
        },
        fgColor_clicked() {
            console.log('hello')
            $("#fg_color").click()
        },
        bgColor_changed() {
            let newColor = $('#bg_color').val()
            $('#bg_color_btn').css({
                backgroundColor: newColor
            })
            $(this.trigger).css({
                backgroundColor: newColor
            })
            // EventBus.$emit('ev_background_color_changed', newColor)
        },
        fgColor_changed() {
            let newColor = $('#fg_color').val()
            $("#fg_color_btn").css({
                backgroundColor: newColor
            })
            console.log($(this.trigger).find("*"), newColor, 'trigger')
            $(this.trigger).find("*").css({
                color: newColor
            })
        }
    },
    mounted() {
        $(this.trigger).on('mouseenter', this.triggerEntered)
        $(this.trigger).on('mouseleave', this.triggerLeave)
        $(this.$refs['hover-btn']).on('mouseleave', this.leavePanel)
    }
}
</script>

<style>

</style>