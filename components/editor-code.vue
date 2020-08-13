<template>
<div ref="container" class="bg-white box-shadow p-absolute animated fadeInUp faster" style="left:20px;right:20px;top:20px;bottom:0px;z-index:5000">
    <button @click="$close()" class="btn btn-block material-icons p-0">expand_more</button>
    <div id="code-editor" class="w-100" ref="code-editor"></div>
</div>
</template>

<script>
let prettify = require('prettify-html')
export default {
    props: {
        code: { required: true }
    },
    data() {
        return {
            editor: { $: null},
            container: null
        }
    },
    methods: {
        $close() {
            this.container.addClass('fadeOutDown')
            setTimeout(() => {
                this.container.remove()
            }, 500);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.container = $(this.$refs['container'])
            this.editor.$ = ace.edit(this.$refs['code-editor'])
            this.editor.$.session.setMode("ace/mode/html");  
            // this.editor.$.setTheme("ace/theme/monokai");
            this.editor.$.setValue(prettify(this.code))
        })
    }
}
</script>

<style>
#code-editor {
    font-size: 14px;
    height: calc(100% - 25px);
}
</style>