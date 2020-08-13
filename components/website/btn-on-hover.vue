<template>
  <!-- <div> -->
      <button
      ref="hover-btn"
      :style="{ top: myTop + 'px', left: myLeft + 'px', background: '#f0f0f0', display: myDisplay }"
      class="hover-btn">{{title}}</button>
  <!-- </div> -->
</template>

<script>
export default {
    props: {
        title: {
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
                console.log('already visible')
                return
            }
            this.layerTrigger = this.trigger
            this.myDisplay = 'block'
            let offset = this.trigger.position()
            this.myTop = (offset.top + this.trigger.height()) - 1
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
        }
    },
    mounted() {
        $(this.trigger).on('mouseenter', this.triggerEntered)
        $(this.trigger).on('mouseleave', this.triggerLeave)
        $(this.$refs['hover-btn']).on('mouseleave', this.leavePanel)
        // console.log(this.trigger, 'my trigger')
        // console.log(document.getElementsByClassName(this.trigger)[0])
        // console.log($('.'+this.trigger))
        // $(document)
        // .delegate('.layer-trigger', 'mouseenter', this.enterTrigger)
        // .delegate('.layer-trigger', 'mouseleave', this.leaveTrigger)
        // console.log(this.ev.offsetTop, )
    }
}
</script>

<style>
.hover-btn {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 10px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    /* margin: 5px; */
}
</style>