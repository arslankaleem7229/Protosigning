<template>
    <div class="p-absolute bg-white box-shadow animated fadeInUp faster" ref="parent-container" id="parent-container">
        <!-- CLOSE BTN -->
        <div class="row m-0 mb-2 justify-content-center" ref="close-btn-container">
            <button @click="$close()" class="btn font-weight-bold bd-round material-icons">expand_more</button>
        </div>
        <!-- CLOSE BTN -->
        
        <div class="row m-0" :style="{height: height.container + 'px'}">
            <div class="pr-4 border-rights align-self-center" style="width:300px">
                <button @click="tab = $switch_tab(item.value)" v-for="(item, i) in tabs" :key="i+0.1" :class="tab==item.value ? class_.tab : ''" class="btn btn-block p-3 text-left bd-round-r d-flex">
                    <span class="material-icons ml-2 mr-3">{{item.icon}}</span><span>{{item.title}}</span>
                </button>
            </div>


            <div class="p-3 overflow-auto" :style="{width: width.content_area+ 'px', height: height.container + 'px'}">
                <!-- SEARCH -->
                <div class="w-100 text-center input-group bd-round">
                    <input type="text" class="bd-round box-shadow bd-0 form-control bg-light p-4 mr-3 align-self-center" style="min-width:200px" placeholder="Search for Prototypes" v-model="keywords">
                    <div class="input-group-prepend align-items-center bd-round bg-primary box-shadow pl-2 pr-2">
                        <button @click="search()" class="btn text-white"><span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span> Search</button>
                        <button v-for="(item, i) in (selected.search_by)" :key="i" class="btn no-btn animated fadeInRight faster text-small d-none">
                            <span class="mr-2">{{item.title}}</span> &#9207;
                        </button>
                        <!-- <button class="btn ml-2 d-flex animated fadeInRight faster text-small d-none" v-if="tab=='logos'">
                            <span class="align-self-center mr-2">Color</span><span class="round-md"></span>
                        </button> -->
                    </div>
                </div>
                <!-- SEARCH -->
                <!-- SEARCH TAGS -->
                <div class="row m-0 mt-3">
                    <button v-for="(item, i) in serach_tags" :key="i+0.2" class="btn btn-primary text-sm mr-2 bd-round d-flex box-shadow" @click="$remove_keyword($event)">
                        {{item.title}}
                    </button>
                </div>
                <!-- SEARCH TAGS -->
            
            <div class="w-100 text-center" v-if="loading">
                <button class="btn">
                    <span class="spinner-border spinner-border-sm"></span> Loading...
                </button>
            </div>
            <div class="mt-5" v-for="(obj, key) in data[tab]" :key="key" :class="obj['data'].length == 0 ? 'd-none': ''">
                <h4>{{obj.title}}</h4>
                <div class="d-flex flex-wrap justify-content-center">
                    <div @click="new_project(key, '')" class="m-3 border bg-light d-flex" style="width:300px">
                        <p class="w-100 align-self-center text-center small">Blank</p>
                    </div>
                    <div @click="new_project(key, nested.img_url, $event)" v-for="(nested, i, j) in obj['data'].slice(0, obj.slice)" :key="j" class="m-3 bg-light box-shadow p-relative">
                        <img @load="$img_loaded($event)" :src="nested.img_url" alt="" width="300px">
                        <div style="width:300px;height:200px;top:0px" class="bg-light p-absolute d-none justify-content-center align-items-center">
                            <span class="spinner-border spinner-border-sm mr-2"></span>
                            <span>Processing...</span>
                        </div>
                        <p class="text-small p-2">{{nested.title}}</p>
                    </div>
                </div>
                <button v-if="data[tab][key]['data'].length > data[tab][key]['slice']" @click="data[tab][key]['slice'] += 24" class="btn btn-block border material-icons">expand_more</button>
            </div>


            </div>
        </div>

    </div>
</template>

<script>
import {EventBus} from '@/globals/event-bus.js'

import tools from '@/assets/svg/tools.svg'
import web from '@/assets/svg/web.svg'
import responsive_design from '@/assets/svg/responsive-design.svg'
import list from '@/assets/svg/list.svg'
import computer from '@/assets/svg/computer.svg'
import business from '@/assets/svg/business.svg'
import new_file from "@/assets/svg/new-file.svg"
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'

export default {
    props: {
        e: {
            required: false
        },
        uid: {
            required: true
        }
    },
    data() {
        return {
            loading: false,
            tab: "designs",
            keywords: "bold",
            tabs: [
                // { icon: "home", title: "Prototypes", value: "prototypes"},
                { icon: "ac_unit", title: "Logos", value: "logos"},
                { icon: "home", title: "Design & Art", value: "designs"},
            ],
            class_: {
                tab: 'font-weight-bold btn-primary animated fadeIn box-shadow'
            },
            selected: {
                search_by: null,
                content: null
            },
            search_by: {
                logo: [
                    { title: "Category"},
                    { title: "Personality"},
                    { title: "Name Sets"},
                ],
                designs: [                    
                    { title: "Category"},
                ],
                prototypes: [                    
                    { title: "Category"},
                ]
            },
            serach_tags: [
                // { title: "Birthday", },
                // { title: "design", },
                // { title: "art", },
            ],
            parent_container: null,           
            height: {
                container: 500
            },
            width: {
                content_area: 200
            },
            data: {
                designs: {
                    poster: { title: "Poster", data: [], slice: 8 },
                    facebookPost: { title: "Facebook Post", data: [], slice: 8 },
                    socialMedia: { title: "Social Media", data: [], slice: 8 },
                    food: { title: "Food", data: [], slice:8 },
                    objects: { title: "Objects", data: [], slice: 8 },
                    symbols: { title: "Symbols", data: [], slice: 8 },
                    pieChart: { title: "Pie Chart",data: [], slice: 8 },
                    arrows: { title: "Arrows", data: [], slice: 8 },
                    flowchart: { title: "Flowchart", data: [], slice: 8 },
                    animals: { title: "Animals", data: [], slice: 8 },
                    cardsAndChess: { title: "Cards & Chess", data: [], slice: 8 },
                    dialogBallons: { title: "Dialog Ballons", data: [], slice: 8 },
                    electronics: { title: "Electronics", data: [], slice: 8 },
                    mathematical: { title: "Mathematical", data: [], slice: 8 },
                    music: { title: "Music", data: [], slice: 8 },
                    miscellaneous: { title: "Miscellaneous", data: [], slice: 8 },
                },
                templates: {},
                logos: {
                    logo: { title: "Logo", data:[], slice:8 }
                }
            },
            url: "http://localhost:5000/logo/"
        }
    },
    methods: {
        async search() {
            let $this = this
            this.loading = true
            const res = await axios.get(this.url + this.keywords)
            const data = $(res.data)
            this.data.logos.logo.data = []
            data.each(function() {
                $this.data.logos.logo.data.push({
                    img_url: $(this).find("img").attr("src")
                })
            })
            this.tab="logos"
            this.data.logos.logo.title = this.keywords
            this.loading = false
        },
        search_logo(keywords) {
            const proxyurl = "https://cors-anywhere.herokuapp.com/"
            this.url += keywords
            return fetch(proxyurl + this.url )
                .then(response => response.text())
        },
        open_logo(url) {
            const proxyurl = "https://cors-anywhere.herokuapp.com/"
            return fetch(proxyurl + url )
                .then(response => console.log(response, 'res'))

        },
        new_project(category, data, e) {
            $(e.currentTarget).find("div").removeClass("d-none").addClass("d-flex")
            setTimeout(() => {
                if(data) {
                    let ref = 'projects/'+this.uid,
                        metadata = {
                            date: $datetime(),
                            title: 'Blank',
                            data,
                            owner: this.uid,
                            collaborators: [],
                            category,
                            type: this.tab,
                        }                    
                    this.api_insert(ref, metadata, (key) => {
                        let file = new Blob([''], {type: 'text/plain'}),
                            uri = new Blob([''], {type: 'text/plain'})

                        this.api_insert_storage(ref+'/'+key, { file, uri }, (file_url, uri_url) => {
                            this.api_update(ref+'/'+key, {'file_url': file_url, 'uri_url': uri_url}, () => {
                                this.$close()
                                setTimeout(() => this.$emit('$goto', '/editor/svg/'+key) , 500);
                            })
                        })                    
                    })
                }
                
            }, 100);
        },
        $open(id, workspace) {
            // 0 => PROTOTYPING WORKSPACE
            // 1 => SVG WORKSPACE
            let url = null
            this.$close()
            switch(workspace) {
                case 0:
                    break
                case 1:
                    url = '/editor/svg/'+id
                    this.$emit('$goto', url)
                    break
            }
        },
        $switch_tab(tab) {
            switch(tab) {
                case "prototypes":
                    this.selected.search_by = this.search_by.prototypes
                    this.selected.content = this.prototypes
                    break
                case "logos":
                    this.selected.search_by = this.search_by.logo
                    this.selected.content = this.logos
                    this.search()
                    break
                case "designs":
                    this.selected.search_by = this.search_by.designs
                    this.selected.content = this.designs
                    break
            }
            return tab
        },
        $close() {
            this.parent_container.addClass("animated fadeOutDown faster")
            setTimeout(() => {
                this.parent_container.remove()            
            }, 500);
        },
        $def_w_h() {
            let close_btn = $(this.$refs['close-btn-container'])
            this.height.container = $get_window_based_height(close_btn) - 70
            this.width.content_area = $(window).width() - 300 - 40
        },
        $remove_keyword(e) {
            e = $(e.target)
            e.is("button") ? e.remove() : e.parent().remove()
        },
        $img_loaded(e) {
            e = $(e.target)
            let preview_box = e.parent(),
                previous = e.prev()
            preview_box.css({
                minHeight: e.height() + 'px',
            })
            setTimeout(() => {
                e.removeClass("v-hidden").addClass("animated fadeIn")
                previous.removeClass("d-none")
                preview_box.removeClass("preview-box")                
            }, 500);
        },
        $fetch(tab = this.tab) {
            this.$api_fetch(tab, (item, title) => this.data[tab][title]["data"] = item)
        },
    },
    mounted() {
        
        this.$def_w_h()
        this.$switch_tab(this.tab)
        this.$fetch()
        this.parent_container = $(this.$refs['parent-container'])
        this.$refs['parent-container'].addEventListener("animationend", () => this.parent_container.removeClass("animated fadeInUp faster"))
        $(window).resize(() => this.$def_w_h())        
        console.log(this.uid, 'uid')
    }
}
</script>

<style>
#parent-container {
    top: 25px;
    left: 15px;
    right: 15px;
    bottom: 0px;
    z-index: 1000;
    border-radius: 10px 10px 0px 0px;
}
.hover-effect-1:hover img {
    transition: 0.5s;
    transform: scale(1.1);
    filter: blur(2px);
}
.hover-effect-1:hover .hover-effect-1-overlay {
    transition: 0.5s;
    z-index: 100;
    background-color: rgba(0,0,0,0.75) !important;
}
.hover-effect-1:hover button {
    opacity: 1;
}
.horizontal-scroll-btn {
    z-index: 1000;
    top: calc(50% - 30px);
    border-radius: 50%;
    /* position: absolute; */
}
</style>