<template>
  <div class="container-fluid w-100  p-0 text-center">
    <div v-if="!page_clicked">
        <button @click="new_page()" class="btn col-md-10 btn-success m-2 pt-2 pb-2  mt-3 box-shadow font-weight-bold"><i class="fa fa-file"></i> &nbsp; New Page</button>
        <div class="mt-2 align-center justify-content-between p-3 d-flex" v-if="pages.length > 0">
            <h4 class="font-weight-bold ">Pages</h4>
        </div>
        <div v-if="!loading && pages.length == 0" class="mt-5">
            <span class="icon-info text-info"></span>
            <p class="col-md-12 small"> No Pages, create one</p>
        </div>
        <div v-if="loading">
            <button class="btn mt-5 col-md-12">
                <span class="spinner-border spinner-border-sm mr-2"></span>
                Loading...
            </button>
            <!-- <button @click="update_pages()" class="btn border mt-4 box-shadow">Refresh</button> -->
        </div>
        <div @click="active_page(i, active)" class="m-2" v-for="(item, i) in pages" :key="i" :class="{'blue-bg-2 box-shadow': i === active && item.title }">
            <div v-if="item.title" class=" border border-left-0 border-right-0 border-top-0 hover-effect d-flex justify-content-between">
                <p @blur="change_title(i, $event)" class="btn col-md-10 text-left pl-4 font-14" contenteditable="true">{{item.title}}</p>
                <button @click="page_opt($event, i)" class="btn col-md-1"><i class="fa fa-ellipsis-v"></i></button>
            </div>
        </div>          
    </div>

    <div v-if="page_clicked">
        <h5 class="border font-weight-light text-left ml-2 mr-2 p-2 mt-2 mb-3 pb-3 border-left-0 border-right-0 border-top-0"> <i @click="page_clicked=false" class="fa fa-arrow-left btn btn-light"></i> <b class="btn">{{pages[active].title}}</b></h5>
        <div component='true' @mouseleave="node_mouseleave(item)" @mouseenter="node_mouseenter($event, item)" class="m-2 pl-2 text-left justify-content-between border border-left-0 border-right-0 border-top-0 hover-effect-3" v-for="(item, i) in nodes" :key="i">
            <p class="small pb-0"><strong class="text-dark">{{item.tag}}</strong><strong class="text-primary">.{{item.class}}</strong><strong class="text-info">#{{item.id}}</strong></p>
            <p class="small pt-0"><strong>innerText: </strong>{{item.text}}</p>
        </div>          
        <div class="mt-5" v-if="nodes.length < 1">
            <span class="icon-info text-info"></span>
            <p class="small font-weight-bold"> Workspace is empty &nbsp;<span class="text-primary text-decoration-underline" @click="page_clicked=false">Go back</span></p>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            contain_pages: 1,
            key: null,
            uid: null,
            ref: null,
            project_id: null,
            pages: [],
            nodes: [],
            more_options: {
                list: [
                    { title: "<span class='icon-load-balancer'></span>", value: 'nodes' },
                    // { title: "<span class='icon-content_copy'></span>", value: 'copy' },
                    { title: "<span class='icon-delete mt-2 pt-2'></span>", value: 'delete' },
                ],
                open: false,
            },
            node_options: {
                list: [
                    // { title: "<span class='icon-edit-pencil'></span>", value: 'edit' },
                    // { title: "<span class='icon-content_copy'></span>", value: 'duplicate' },
                    { title: "<span class='icon-delete mt-2 pt-2'></span>", value: 'delete' },
                ],
                open: false,
            },
            active: 0,
            workspace: null,
            page_clicked: false
        }
    },
    methods: {
        page_opt(e, j) {
            let items = this.$dropdown(e, 'more_options', this.more_options, true, j)
            for(let i=0; i< items.length; i++) {
                items[i].click(() => {
                    let { value } = this.more_options.list[i]
                    switch(value) {
                        case "delete":
                            if(this.pages.length > 1) {
                                this.pages[j].title = null
                            }
                            break
                        case "nodes":
                            this.nodes = $get_children(this.workspace)
                            this.page_clicked = true
                            break
                    }
                })
            }   
        },
        node_mouseleave(node) {
            let { ref } = node
            ref.removeClass("component-active")
        },
        node_mouseenter(e, node) {
            let $this = this
            let { ref } = node
            ref.addClass("component-active")
            let list = this.$dropdown(e, 'nodes', this.node_options, true)
            
            for(let i=0; i< list.length; i++) {
                list[i].click(() => {
                    let { value } = this.node_options.list[i]
                    switch(value) {
                        case "delete":
                            ref.remove()
                            this.nodes = $get_children(this.workspace)
                            break
                    }
                })
            }            
        },
        active_page(i, active) {
            if(this.pages[active]) {
                this.pages[active].workspace = this.workspace.html()
            }
            this.workspace.html(this.pages[i].workspace)
            this.active = i
            this.setCookie("proto-page", this.active, 14)
            this.api_update(this.ref, { pages: this.pages }, (payload) => {})

        },
        new_page() {
            console.log(this.pages, 'pages')
            this.pages.push({
                title: "Page " + this.pages.length,
                workspace: `
                    <div id="navigation-container"></div>
                    <div id="header-container"></div>
                `,
                nodes: "<div></div>",
                id: this.project_id
            })
            this.api_update(this.ref, { pages: this.pages }, (payload) => {})
        },
        change_title(i, e) {
            let count = 0
            for(let j=0; j<this.pages.length; j++) {
                if(this.pages[j].title) {
                    if(this.pages[j].title == e.target.innerText && j !== i) {
                        count += 1
                    }
                }
            }
            if(count > 0) {
                this.pages[i].title = e.target.innerText + " copy (" + count + ")"
                e.target.innerText += " copy (" + count + ")"
            } else {
                this.pages[i].title = e.target.innerText            
            }
            this.api_update(this.ref, { pages: this.pages }, (payload) => {})
        },
        $more_options(items, list, j) {
            let $this = this

            for(let i=0; i<items.length; i++) {
                items[i].click(() => {
                    let { value } = list[i]
                    switch(value) {
                        case "nodes": 
                            this.nodes = $get_children(this.workspace)
                            this.page_clicked = true
                            break
                    }
                })
            }
        },
        $dropdown(e, type, arr, horizontal = null, i = null) {
            let { list } = arr
            let { items } = $simple_dropdown(e, list, horizontal)
            arr.open = true
            
            switch(type) {
                case "more_options":
                    this.$more_options(items, list, i)
            }

            return items
        },
    },
    mounted() {
        this.workspace = $(".workspace")
        if(this.$router.currentRoute.params.id.split("&")[2]) {
            this.uid = this.$router.currentRoute.params.id.split("&")[2].split("=")[1]
        } else {
            this.uid = this.$store.state.user.uid
        }
        if(!this.getCookie("proto-page")) {
            this.setCookie("proto-page", 0, 14)
        }
        this.project_id = this.$route.params.id.split("prj-id=")[1]
        if(this.project_id) {
            this.ref = "projects/web/"+this.uid+"/"+this.project_id
            this.api_fetch(this.ref, (payload) => {
                if(payload) {
                    this.pages = []
                    console.log('hello')
                    for(let key in payload.pages) {
                        this.pages.push(payload.pages[key])
                    }
                    this.active = this.getCookie("proto-page")
                    if(this.pages[this.active]) {
                        this.pages[this.active].workspace = this.workspace.html()
                    }
                }
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>