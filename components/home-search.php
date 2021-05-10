<?php
    if(!isset($_GET['type'])) {        
        $type = "all";
    }
    else {
        $type = preg_replace('/[^a-z0-9\- ]/i', '', $_GET['type']);
    }
?>
<head>
    <style>
        @media only screen and (max-width: 658px) {
            .search-description,.search-field {
                width: 100% !important;
            }
        }
    </style>
</head>
<div class="mt-5 container bg-light-2 text-center" id="search">
    <h1 class="text-black font-weight-bold ls-1">Welcome To Proto-Signing</h1>
    <p class="search-description w-75 m-auto small">        
        Create instant designs and prototypes with Proto-Signing and share with your colleagues
        to faster the workflow. Use hundereds of thousands of our templates in your projects
        and make your projects and designs look stunning.
    </p>
    <br>
    <div class="input-group m-auto w-75 border bd-round bg-white search-field transition">
        <div class="input-group-prepend">
            <span class="input-group-text material-icons bg-none bd-none">search</span>
        </div>
        <input @focus="focus=true; $event.target.select()" @blur="blur()" type="text" v-model="keywords" @keyup="search(keywords, $event)" class="form-control bd-none bg-none text-sm" placeholder="Search for your favourite design or protoype here">
    </div>    
    <br>
    <div class="w-75 m-auto" style="max-height:420px;overflow:auto;" v-if="records.length > 0 && focus">
        <div v-if="!loading">
            <p class="text-left mb-4">(<b class="text-primary">{{records.length}}</b>) Posts Found</p>
            <a :href="record.url" class="btn btn-block bd-bottom bd-radius-0 d-flex justify-content-between hov" v-for="(record, i) in records">
                <span class="text-sm" v-html="highlight(record.title)"></span>
            </a>
        </div>
        <p v-else>
            <span class="spinner-border spinner-border-sm text-primary mb-1 small"></span><br>
            <span class="small">Loading</span>
        </p>
    </div>
    <p v-else-if="focus && records.length == 0 && keywords.length > 2" class="small bd-bottom pb-5">
        <span></span><br>
        <span>Nothing found, try different keywords</span>
    </p>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
var v_search = new Vue({
    el: "#search",
    data: {
        keywords: "",
        cache: "",
        loading: false,
        focus: false,
        list: [
            { title: "General", value: "HOME" },
            { title: "Keys", value: "HOME" },
            { title: "Satellite Section", value: "HOME" },
            { title: "Satellite List", value: "HOME" },
            { title: "Webmaster", value: "HOME" },
            { title: "Sports Section", value: "HOME" },
            { title: "All Receiver Software", value: "RECEIVER_SOFTWARE" },
        ],
        records: []
    },
    methods: {
        clicked(item, e) {
            if(item) {
                let buttons = dropdown(item, e)
            }
        },
        highlight(str) {
            return str.toUpperCase().split(this.keywords.toUpperCase()).join(`<b class="text-primary">${this.keywords.toUpperCase()}</b>`)
        },
        blur() {
            setTimeout(() => {
                this.focus = false                
            }, 500);
        },
        search(keywords, e) {
            keywords = keywords.trim()
            keywords = keywords.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_')
            if(keywords.length < 1 || keywords.length > 100 || this.cache == keywords) {
                return
            }
            
            let type = $(e.target).attr("data-type").toUpperCase()
            this.loading = true

            axios.get(DOMAIN + `/api/search.php?keywords=${keywords}&type=${type}&table=posts`)
            .then(res => {
                this.records = []
                if(res.status == 200) {            
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            this.records.push({
                                title: res[i].title,
                                url: DOMAIN + "/pages/post.php?title="+res[i].title
                            })
                        }
                        this.loading = false
                    }
                }
            })




            this.cache = keywords
        }
    },
    mounted() {
    },
})
</script>
