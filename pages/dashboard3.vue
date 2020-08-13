<template>
    <div class="row p-0 m-0" :style="{height: heights.window + 'px'}">
        <div class="border d-flex w-100 h-100 p-absolute" style="top:0px;left:0px;z-index:500000" v-if="choose">
            <div class="w-50 h-100 text-center d-flex justify-content-center bg-primary">
                <button class="btn align-self-center text-white text-lg" @click="choose=false">
                    <span class="material-icons" style="font-size:50px">eco</span> <br>
                    <span style="font-size:25px" class="ls-2">Logo</span>
                </button>
            </div>
            <div class="w-50 h-100 text-center d-flex justify-content-center" style="background:#125fb3">
                <button class="btn align-self-center text-white text-lg" @click="openLink('http://localhost:63447/dashboard')">
                    <span class="material-icons" style="font-size:50px">phonelink</span> <br>
                    <span style="font-size:25px" class="ls-2">Prototyping</span>
                </button>
            </div>
        </div>
        <div class="overflow-auto pb-5" :style="{height: heights.window + 'px', width: widths.left_nav + 'px'}">
            <!-- PROFILE INFO -->
            <div class="p-relative">
                <div class="d-none justify-content-between p-2 m-3">
                    <div class="row m-0">
                        <img :src="svg.computer" width="30px" alt="" class="m-1">
                        <div>
                            <button class="btn align-self-center">
                                <span v-if="user.info.uname">{{user.info.uname}}</span>
                                <span v-else class="spinner-border spinner-border-sm"></span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button @click="user.show = true" class="btn material-icons bd-round">keyboard_arrow_down</button>
                    </div>
                </div>
                <!-- DROPDOWN -->
                <button @click="user.show=!user.show" class="btn material-icons">more_vert</button>
                <div v-if="user.show" class="p-2 p-absolute w-100" @mouseleave="user.show=false">
                    <div class="w-100 p-3 animated fadeIn faster  bg-light box-shadow">
                        <div class="w-100 text-center">
                            <img :src="svg.computer" width="125px" alt="">
                        </div>
                        <button class="btn btn-block mt-2 mb-4" :class="user.info.uname ? '' : 'bg-light-2'" >
                            <span class="font-weight-bold">{{user.info.uname}}</span> <br>
                            <span class="text-sm" >{{user.info.email}}</span> 
                        </button>
                        <button class="btn btn-block text-left p-1 d-none" v-for="(item, i) in user.dropdown" :key="i">
                            <span :class="'icon-'+item.icon"></span>
                            <span class="ml-3 text-small">{{item.title}}</span>
                        </button>
                        <button @click="$signout()" class="btn btn-block btn-primary bd-round box-shadow mt-4">
                            <span v-if="user.signout" class="spinner-border spinner-border-sm"></span>
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- PROFILE INFO -->

            <!-- MENU BUTTONS -->
            <div class="d-none">
                <button @click="$new()" class="btn btn-block p-3 text-left bd-round-r d-flex font-weight-bold"><span class="material-icons ml-2 mr-3">add</span><span>New</span></button>
                <p class="bd-bottom ml-2 mr-2 mt-2"></p>
                <button class="btn btn-block p-3 text-left bd-round-r d-flex"><span class="material-icons ml-2 mr-3">home</span><span>Home</span></button>
                <button class="btn btn-block p-3 text-left bd-round-r d-flex"><span class="material-icons ml-2 mr-3">view_quilt</span><span>Templates</span></button>
                <button class="btn btn-block p-3 text-left bd-round-r d-flex "><span class="material-icons ml-2 mr-3">style</span><span>All your Designs</span></button>
                <button class="btn btn-block p-3 text-left bd-round-r d-flex "><span class="material-icons ml-2 mr-3">photo</span><span>Photos</span></button>
                <button class="btn btn-block p-3 text-left bd-round-r d-flex "><span class="material-icons ml-2 mr-3">group</span><span>Share with me</span></button>
                <button class="btn btn-block p-3 text-left bd-round-r d-flex "><span class="material-icons ml-2 mr-3">favorite</span><span>Favourite</span></button>
            </div>
            <!-- MENU BUTTONS -->
        </div>
        <div class="pl-4 overflow-auto h-100" :style="{width: widths.content_area + 'px'}">
            <!-- SEARCH CONTAINER -->
            <div class="d-none bg-white box-shadow m-0 row" :style="{height: heights.search_container + 'px'}">
                <div class="col-md-6 m-auto align-self-center text-center">
                    <h4 class="ls-2 col-md-12">Search your whole dashboard here</h4>
                    <p class="col-md-12 ls-1 small">You can search for templates, designs and your projects here.</p>
                    <div class="w-100 text-center input-group mt-4 bd-round bg-light box-shadow">
                        <input type="text" class="form-control p-4 bd-0 bg-light bd-round-l" placeholder="Search for templates or designs or logos">
                        <div class="input-group-prepend">
                            <button class="btn material-icons bd-round-r">search</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- SEARCH CONTAINER -->
            <div v-if="!loading">
                <div class="pt-4 pb-4" v-for="(obj, key) in projects.list" :key="key" :class="obj.data.length > 0 ? '': 'd-none'">
                    <h3 class="p-2">{{obj.title}}</h3>
                    <div class="d-flex">
                        <div v-for="(nested, i) in obj.data" :key="i" class="mr-3">
                            <img @dblclick="_open(nested.key)" :src="nested.uri_url" width="250px" alt="" class="hov-bd-blue box-shadow">
                            <!-- <p class="p-1 small">{{nested.title}}</p> -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center m-2">
                <button class="btn"><span class="text-small">No projects, try adding one.</span></button>
            </div>

        </div>
        <button @click="$new()" class="btn btn-primary material-icons p-2 p-absolute bd-round box-shadow" style="font-size:36px;right:25px;bottom:25px">add</button>
    </div>
</template>

<script>
import computer from '@/assets/svg/computer.svg'
import vue from 'vue'
import { EventBus } from '@/globals/event-bus.js'

// IMPORT COMPONENTS
import c_new from '@/components/dashboard-new.vue'

export default {
    components: {
        c_new
    },
    data() {
        return {
            choose: true,
            loading: true,
            uid: null,
            svg: {
                computer: computer
            },
            heights: {
                window: 100,
                search_container: 200
            },
            widths: {
                left_nav: 300,
                content_area: 500
            },
            user: {
                info: {
                    uname: null,
                    email: null,
                    password: null,
                },
                dropdown: [
                    { icon: 'settings', title: 'Account Settings'},
                    { icon: 'help', title: 'Help'},
                    { icon: 'feedback', title: 'Send Feedback'}
                ],
                show: false,
                signout: false
            },
            projects: {
                list: {
                    poster: { title: "Poster", data: [], slice: 8 },
                    facebookPost: { title: "Facebook Post", data: [], slice: 8 },
                    logo: { title: "Logo", data: [], slice: 8 },
                },
                _fetch: () => {
                    let $this = this
                    this.api_fetch('projects/'+this.uid, (payload) => {    
                        Object.keys(payload).forEach(function(key, index) {
                            let item = payload[key]
                            $readFile(item.uri_url, (data) => {
                                item.uri_url = data
                                $this.projects.list[payload[key].category].data.push({...payload[key], key})
                            })
                        })
                        this.loading = false                
                    })
                }
            }
        }
    },
    methods: {
        openLink(link) {
            window.open(link, '_blank')
        },
        $signout() {
            this.user.signout = true
            this.$api_signout(() => {
                this.user.signout = false
                this.user.show = false
                window.location.href = "/"
            })
        },
        $new() {            
            let { html, instance } = this.$component(c_new, {uid: this.uid})
            $(document.body).prepend(html)
            instance.$on('$goto', (url) => {
                this.$router.push(url)
            })
        },
        _open(id) {
            this.$router.push('/editor/svg/'+id)
        },
        $init() {
            let $this = this
            this.$def_w_h()
            this.uid = this.$store.state.user.uid
            let get_info = this.$store.dispatch("user/info", this.uid)
            get_info.then(() => {
                this.user.info = this.$store.state.user.info
            })
        },
        $def_w_h() {
            this.heights.window = $(window).height()
            this.heights.search_container = $(window).height()/2.5
            this.widths.content_area = $(window).width() - this.widths.left_nav
        },
        $component(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                html: instance.$el,
                instance
            }
        },
    },
    mounted() {
        this.$init()
        this.projects._fetch()
        $(window).resize(() => this.$def_w_h())
    }

}
</script>

<style>
body {
    overflow: hidden;
}
.hov-bd-blue {
    border: 2px solid transparent;
    transition: 0.3s;
}
.hov-bd-blue:hover {
    border: 2px solid rgb(0, 123, 255);
}
</style>