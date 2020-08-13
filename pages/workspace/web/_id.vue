<template>
    <div class="root">
        <workspace-header v-if="!$store.state['website-state']['WORKSPACE']['hidden']['top_navigation']" />
        <div class='work-area-parent'>
            <nav-left :class="defaultBorder" v-if="!$store.state['website-state']['WORKSPACE']['hidden']['left_nav']" />
            <workspace :class="defaultBorder" />
            <nav-right v-if="!$store.state['website-state']['WORKSPACE']['hidden']['right_nav']" />
        </div>
        

        <div id="exit-preview-container" class="container bg-light box-shadow col-md-2 p-2 border align-right" style="display:none; position:absolute; right:50px; bottom:50px; border-radius:50px">
            <button class="btn mr-3 hover-effect " style="font-size:25px;"><i class="fa fa-laptop"></i></button>
            <button class="btn mr-3 hover-effect" style="font-size:25px;"><i class="fa fa-tablet"></i></button>
            <button class="btn mr-3 hover-effect" style="font-size:25px;"><i class="fa fa-mobile"></i></button>
            <button @click="exit_preview()" class="btn btn-light p-2 mr-2 border-right-0 border-top-0 border-bottom-0 no-radius border"><span class="icon-close font-weight-bold"></span></button>
        </div>

    </div>
</template>

<script>
import header__ from '@/components/web/header.vue'
import nav_left__ from '@/components/web/nav-left/container.vue'
import workspace__ from '@/components/web/workspace.vue'
import nav_right__ from '@/components/web/nav-right/nav-right.vue'
import '@/assets/font-icon/style.css'
export default {
    components: {
        "nav-left": nav_left__,
        "workspace-header": header__,
        "workspace": workspace__,
        "nav-right": nav_right__
    },
    data() {
        return {
            defaultBorder: "default-borders",
            nav_left_hidden: false,
            nav_right_hidden: false,
            top_hidden: false,
        }
    },
    methods: {
        exit_preview() {
            this.$store.dispatch("website-state/WORKSPACE_preview", false)
            $('.workspace-container').css('width', '80%')
            $('.work-area-parent').css('height', 'calc(100% - 90px)')
            $('#exit-preview-container').css("display", "none")
        }
    },
    mounted() {
    }
}
</script>

<style>
.root {
    /* border: 2px solid red; */
    height: 97vh;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.025);
}
body {
    margin: 0px;
    padding: 0px;
}
.work-area-parent {
    height: calc(100vh - 90px);
    /* border: 2px solid blue; */
    display: flex;
}
</style>