<template>
<div class="container-fluid p-0">
    <dashboard-header @switchTab="switch_tab" />
    <dashboard-search @search="search_keywords" @keywords="keyupwords" />
    <dashboard-mywork  v-if="tab==0" :keywords="keyupwords_" />
    <dashboard-logomaker  v-if="tab==1" :keywords="keywords" />
    <dashboard-elements  v-if="tab==2"  />
    <dashboard-shared  v-if="tab==3"  />
</div>
</template>

<script>
import dashboard_header from '@/components/dashboard-header.vue'
import dashboard_search from '@/components/dashboard-search.vue'
import dashboard_mywork from '@/components/dashboard-mywork.vue'
import dashboard_logomaker from '@/components/dashboard-logomaker.vue'
import dashboard_elements from '@/components/dashboard-elements.vue'
import dashboard_shared from '@/components/dashboard-shared.vue'
const axios = require('axios')
const cheerio = require('cheerio')
export default {
    components: {
        "dashboard-header": dashboard_header,
        "dashboard-search": dashboard_search,
        "dashboard-mywork": dashboard_mywork,
        "dashboard-logomaker": dashboard_logomaker,
        "dashboard-elements": dashboard_elements,
        "dashboard-shared": dashboard_shared
    },    
    head () {
        return {
            title: "Protosigning - The Most awaited designing tool in the market is here.",
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },   
    data() {
        return {
            tab: 0,
            keywords: "",
            keyupwords_: ""
        }
    },
    methods: {
        keyupwords(keywords) {
            this.keyupwords_ = keywords
        },
        search_keywords(keywords) {
            this.keywords = keywords
        },
        switch_tab(i) {
            this.tab = i
            switch (i) {
                case 0: 
                    
                    break;
            
                default:
                    break;
            }
        },
        async fetchHTML() {
        }
    },
    async mounted() {
        let $ = await this.fetchHTML()
    }
}
</script>

<style>

</style>