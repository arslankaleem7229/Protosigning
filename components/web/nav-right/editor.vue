<template>
    <div class="container" ref="container">
        <div ref="editor" id="editor">
            <!-- &lt;h1&gt; hey there i am using ace editr &lt;/h1&gt;&lt;h1&gt; hey there i am using ace editr &lt;/h1&gt;
            &lt;h1&gt; hey there i am using ace editr &lt;/h1&gt;&lt;h1&gt; hey there i am using ace editr &lt;/h1&gt;
            &lt;h1&gt; hey there i am using ace editr &lt;/h1&gt;&lt;h1&gt; hey there i am using ace editr &lt;/h1&gt; -->
            Loading...
        </div>
        
        <div class="row box-shadow bg-light floating-div" id="tabs">
            <button ref="tab_html" :class="{'btn-primary box-shadow': tab === 1 }" class="btn p-3 font-weight-bold"><i class="fa fa-code font-bold"></i> HTML</button>
            <button ref="tab_css"  :class="{'btn-primary': tab === 2 }" class="btn p-3 font-weight-bold"><i class="fa fa-css3 font-bold"></i> CSS</button>
        </div>
        <div class="row box-shadow bg-light floating-div" id="controls">
            <button @click="save()" class="btn material-icons btn-hov">save_alt</button>
            <button class="btn material-icons btn-hov" ref="close">clear</button>
        </div>

    </div>
</template>

<script>
let prettify = require('prettify-html')
import JSZip from 'jszip'

export default {
    data() {
        return {
            editor: null,
            html: {
                raw: null,
                non_compiled: null,
            },
            css: {
                raw: "",
                obj: {}
            },
            components: [],
            close: null,
            container: null,
            tab: 1,
            page: 0,
            uid: null
        }
    },
    methods: {
        save() {            
            let data = this.compile_html()
            var zip = new JSZip();
            zip.file('HTML' + ".html", data.html);
            zip.file('CSS' + ".css", data.css);
            zip.generateAsync({
                type: "base64"
            }).then(function(content) {
                window.location.href = "data:application/zip;base64," + content;
            });       

        },
        close_editor() {
            this.container.remove()
            let children = $('.workspace').find("*")
            for(let i=0; i<children.length; i++) {
                let child = $(children[i])
                !child.is("div") ? child.attr("component", "true") : ""
                if(child.attr("id")) {
                    let id = child.attr("id")
                    if(this.css.obj[id]) {
                        child.attr("style", this.css.obj[id])
                        child.removeAttr("id")
                    }
                }
                child.attr("component", "true")
            }
        },
        switch_tab(tab) {
            this.tab = tab
            if(tab === 1) {
                this.editor.setValue(this.html.raw)
                this.editor.session.setMode("ace/mode/html");  
            }
            else {
                this.editor.setValue(this.css.raw)
                this.editor.session.setMode("ace/mode/css");  
            }
        },
        editor_updated() {
            let data = this.editor.getSession().getValue()
            this.tab === 1 ? this.html.raw = data : this.css.raw = data
            this.tab === 1 ? $(".workspace").html(data) : ""
        },
        compile_html() {
            let children = this.html.non_compiled.find("*")
            let counter = {}
            for(let i=0; i<children.length; i++) {
                let child = $(children[i])
                let obj = {
                    node: child,
                    removed_attr: [],
                    removed_class: null
                }

                if(child.attr("style")) {
                    let tag = child.prop('tagName').toLowerCase(),
                        id = null
                    counter[tag] ? counter[tag] += 1 : counter[tag] = 1
                    id = tag + "-"+counter[tag]
                    this.css.raw += "#"+ id + "{" + child.attr("style") + "}"
                    this.css.obj[id] = child.attr("style")
                    child.removeAttr("style")
                    child.attr("id", id)
                }

                if(child.attr('component')) {
                    obj.removed_attr.push({name: "component", value: child.attr('component')})
                    child.removeAttr('component')
                }
                child.hasClass("connectedSortable") ? child.removeClass("connectedSortable") : ""
                child.hasClass("ui-sortable") ? child.removeClass("ui-sortable") : ""
                child.hasClass("ui-sortable-handle") ? child.removeClass("ui-sortable-handle") : ""
                child.hasClass("component-active") ? child.removeClass("component-active") : ""
                child.attr("class") === "" ? child.removeAttr("class") : ""
                child.attr("to-be-inserted") ? child.removeAttr("to-be-inserted") : ""
                child.attr("container-type") ? child.removeAttr("container-type") : ""

                this.components.push(obj)
            }
            let start = `
            <html>
                <head>
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
                </head>
            <body>`
            let end = "</body></html>"
            this.html.raw = prettify( start + this.html.non_compiled.html() + end)
            this.css.raw = this.beautify_css(this.css.raw)
            this.editor.setValue(this.html.raw)

            return {
                html: this.html.raw,
                css: this.css.raw
            }
        },
        beautify_css(css) {
            var beautified = cssbeautify(css, {
                indent: '  ',
                openbrace: 'separate-line',
                autosemicolon: true
            });             
            return beautified
        }
    },
    mounted() {
        let $this = this
        let editor_ref = this.$refs['editor']
        this.close = $(this.$refs['close'])
        this.container = $(this.$refs['container'])

        this.$nextTick(function() {
            $this.editor = ace.edit(editor_ref);
            $this.html.non_compiled = $('.workspace').clone()
            $this.html.raw = $('.workspace').html()
            
            $this.editor.setTheme("ace/theme/monokai");
            $this.editor.session.setMode("ace/mode/html");  
            $this.editor.getSession().on('change', (e) => {
                $this.editor_updated()
            })
            this.compile_html()

            $this.close.click(() => $this.close_editor())
            $($this.$refs['tab_html']).click(() => $this.switch_tab(1))
            $($this.$refs['tab_css']).click(() => $this.switch_tab(2))
        })

        
        if(!this.getCookie("proto-page")) {
            this.setCookie("proto-page", 0, 14)
            this.page = 0
        } else {
            this.page = this.getCookie("proto-page")
        }        
    }
}
</script>

<style>
#editor { 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    font-size: 20px;
}
.floating-div {
    /* width: 300px; */
    position: absolute;
    z-index: 1000;
    border-radius: 50px;
}
.floating-div button:first-child {
    border-radius: 50px 0px 0px 50px;
}
.floating-div button:last-child {
    border-radius: 0px 50px 50px 0px;
}
#tabs {
    right: 75px;
    top: 50px;
}
#controls {
    right: 75px;
    bottom: 75px;
}
</style>