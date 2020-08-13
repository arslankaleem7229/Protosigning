<template>
<div ref="root" :style="root.style" class="bg-white box-shadow p-absolute animated faster fadeIn p-3" @mouseleave="root.$.remove()">
    <div>
        <p class="text-small font-weight-bold">Owner</p>
        <div class="d-flex">
            <img :src="svg.computer" width="50" alt="">
            <button class="btn no-btn text-left">
                <span class="font-weight-bold">Kamran Khan</span> <br>
                <span class="text-small">kamrankpk1998@gmail.com</span>
            </button>
        </div>
    </div>
    <div class="mt-3 pt-3 bd-top">
        <p class="text-small font-weight-bold">Collaborators</p>
        <div class="d-flex justify-content-between align-items-center border">
            <div>
                <img :src="svg.computer" width="50" alt="">
                <button class="btn no-btn text-left">
                    <span class="font-weight-bold">Kamran Khan</span> <br>
                    <span class="text-small">kamrankpk1998@gmail.com</span>
                </button>
            </div>
            <button class="btn material-icons">expand_more</button>
        </div>
    </div>

</div>
</template>

<script>
import computer from '@/assets/svg/computer.svg'
export default {
    props: {
        offset: { required: true },
        uid: { required: true }
    },
    data() {
        return {
            svg: {
                computer: computer
            },
            root: { $: null, w: null, h: null, t: null, r: null, style: { 
                width: "350px", 
                top: null,
                zIndex: 10000
            }},
            project: {
                owner: { uname: null, email: null},
                collaborators: []
            }
        }
    },
    methods: {
        $init() {
            this.root.$ = $(this.$refs['root'])
            this.$api_fetch('users/'+this.uid, (item, title) => console.log(item, title, 'item-title'))
            this.$xy()
        },
        $xy() {
            this.root.style.top = this.offset.top + 'px'
            this.root.style.left = (this.offset.left + parseInt(this.root.style.width)) > $(window).width() ? ($(window).width() - parseInt(this.root.style.width) - 20) + 'px' : this.offset.left + 'px'
        }
    },
    mounted() {
        this.$init()
        $(window).resize(() => this.root.$.remove())
    }

}
</script>

<style>

</style>