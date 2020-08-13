<template>
<div class="container-fluid p-4 border">
    <p class="text-center p-4 text-small">
        <span v-if="loading.state" class="spinner-border spinner-border-sm mr-2"></span>         
        <span v-html="loading.msg"></span>
    </p>
    <div class="d-flex flex-wrap justify-content-center">
        <div v-for="(item, i) in list" :key="i" class="box-shadow bg-white m-4 p-relative" @dblclick="open($event, item)">
            <img :src="item.img" width="500px" alt="" class="">
            <p class="m-2 p-3 mb-0 pb-0 bd-top font-weight-bold">{{item.desc}}</p>
            <button class="btn p-4 d-none p-absolute btn-block bg-white box-shadow" style="bottom:0px;">
                <span class="spinner-border spinner-border-sm"></span>
                <span>Processing...</span>         
            </button>
        </div>
    </div>
</div>
</template>

<script>
import fetch from 'node-fetch'
const axios = require('axios')

export default {
    props: {
        keywords: {
            required: true
        }
    },
    data() {
        return {
            uid: null,
            url: "http://localhost:5000/logo/",
            list: [],
            loading: {
                state: false,
                msg: ""
            }
        }
    },
    watch: {
        keywords(n, o) {
            this.fetch(n)
        }
    },
    methods: {
        open(e, item) {
            $(e.currentTarget).find('button').removeClass('d-none')
            let ref = 'projects/'+this.uid,
                metadata = {
                    date: $datetime(),
                    title: item.desc,
                    data: item.img,
                    collaborators: []
                }
                this.api_insert(ref, metadata, (key) => {
                    let file = new Blob([''], {type: 'text/plain'}),
                        uri = new Blob([''], {type: 'text/plain'})

                    this.api_insert_storage(ref+'/'+key, { file, uri }, (file_url, uri_url) => {
                        this.api_update(ref+'/'+key, {'file_url': file_url, 'uri_url': uri_url}, () => {
                            this.$router.push('/editor/svg/'+key)
                        })
                    })                    
                })

        },
        async fetch(keyword) {
            if(keyword.length < 3) {
                this.loading.state = false
                this.loading.msg = "No logo found"
                return
            }
            this.loading.state = true
            this.loading.msg = "Searching for logo's related to keyword <b>"+keyword.toUpperCase()+"</b>" 
            let $this = this
            const res = await axios.get('/api/logo/'+keyword)
            if(res.status == 200 && res.statusText == "OK") {
                const data = $(res.data)

                this.list = []
                setTimeout(() => {
                    data.each(function() {
                        let split = $(this).find("img").attr("alt").split(".com")
                        let desc = $(this).find("img").attr("alt")
                        if(split.length > 0) {
                            desc = split[0]
                        }
                        $this.list.push({
                            img: $(this).find("img").attr("src"),
                            desc: desc.toUpperCase()
                        })
                    })
                    this.loading.state = false
                    this.loading.msg = `<b>${keyword.toUpperCase()} </b> &#149; ${this.list.length} logo has been found.`                
                }, 100)
            } else {
                this.loading.state = true
                this.loading.msg = res.statusText
            }
            
        }
    },
    mounted() {
        this.fetch(this.keywords)
        this.uid = this.$store.state.user.uid
    }
}
</script>

<style>

</style>