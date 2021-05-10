<?php
    $type = preg_replace('/[^a-z0-9\- ]/i', '', $_GET['type']);
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
    <h1 class="text-black font-weight-bold ls-1"><?php echo $type; ?></h1>
    <p class="search-description w-50 m-auto small">
        Welcome to our site here you will find latest & updated dish receiver softwares.
        You can search your satellite dish receiver software by brand name.
        Download Free of cost receiver software to enjoy free channels.
    </p>
    <br>
    <div class="input-group m-auto w-75 border bd-round bg-white search-field transition">
        <div class="input-group-prepend">
            <span class="input-group-text material-icons bg-none bd-none">search</span>
        </div>
        <input @focus="focus=true; $event.target.select()" @blur="blur()" type="text" v-model="keywords" @keyup="search(keywords, $event)" class="form-control bd-none bg-none text-sm" placeholder="Look for <?php echo $type; ?> here" data-type="<?php echo $type; ?>">
        <div class="input-group-append">
            <span @click="dropdown(list, $event)" class="dropdown-btn input-group-text bg-none bd-none material-icons btn btn-hov bd-round">arrow_drop_down</span>
        </div>
    </div>    
    <br>
    <div class="w-75 m-auto" style="max-height:420px;overflow:auto;" v-if="records.length > 0 && focus">
        <div v-if="!loading">
            <p class="text-left mb-4">(<b class="text-primary">{{records.length}}</b>) Softwares Found</p>
            <button class="btn btn-block bd-bottom bd-radius-0 d-flex justify-content-between hov" v-for="(record, i) in records">
                <span class="text-sm" v-html="highlight(record.title)"></span>
                <a :href="record.software" class="material-icons btn btn-hov text-primary">get_app</a>
            </button>
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
            { title: "All Receiver Software", value: "ALL_RECEIVER_SOFTWARE" },
            { title: "Neosat Receiver Software", value: "NEOSAT_RECEIVER_SOFTWARE" },
            { title: "China Receiver Software", value: "CHINA_RECEIVER_SOFTWARE" },
            { title: "Startrack Receiver Software", value: "STARTRACK_RECEIVER_SOFTWARE" },
            { title: "Echolink Receiver Software", value: "ECHOLINK_RECEIVER_SOFTWARE" },
            { title: "Other Brand Software", value: "OTHER_BRAND_SOFTWARE" },
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

            axios.get(DOMAIN + `/api/search.php?keywords=${keywords}&type=${type}&table=softwares`)
            .then(res => {
                this.records = []
                if(res.status == 200) {
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            this.records.push({
                                title: res[i].title,
                                software: DOMAIN + "/uploads/softwares/"+res[i].software,
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
