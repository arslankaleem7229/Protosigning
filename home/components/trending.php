<head>
    <style>
        @media only screen and (max-width: 1019px) {
            #trending {
                width: 100% !important;
            }
        }
    </style>
</head>
<div id="trending" class="w-25 p-1 right">
    <div class="w-100" v-if="popular.length > 0">
        <h3 class="mb-3 font-weight-bold">Popular Designs</h3>
        <a :href="DOMAIN + '/pages/svgedit-master/src/editor/svg-editor.html?url=' + item.url" class="btn btn-block btn-hov d-flex justify-content-between text-sm bd-bottom bd-radius-0" v-for="(item, i) in popular">
            <span>{{item.title}}</span>
        </a>
        <br><br>        
    </div>
    <div class="w-100">
        <h3 class="mb-3 font-weight-bold">Popular Tags</h3>
        <a :href="DOMAIN + '/pages/logo-maker.php?name=' + item" class="btn border bd-round mr-2 text-sm mb-3 pl-4 pr-4 btn-hov text-primary" v-for="(item, i) in tags" @click="name=item">
            {{item}}
        </a>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>
new Vue({
    el: "#trending",
    data: {
        popular: [],
        tags: []
    },
    methods: {
        hide_img(e) {
            e.target.src = DOMAIN + '/images/default.jpg'
        },
        img_loaded(e) {
            $(e.target).parent().find("button").remove() 
            $(e.target).addClass("animate__animated animate__fadeIn animate__faster").removeClass("d-none")
        },
        get_tags() {
            axios.get(DOMAIN+`/api/find-by-type.php?type= &table=logos`)
                .then(res => {        
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            let tags = res[i].type.split(",")
                            if(tags.length > 1) {
                                for(let i=0; i<tags.length; i++) {
                                    tags[i] = tags[i].trim()
                                    if(!this.tags.includes(tags[i])) {
                                        this.tags.push(tags[i])
                                    }
                                }
                            }
                        }
                        if(this.tags.length > 20) {
                            this.tags.length = 20
                        }
                    }        
                })
        },
        fetch(table, callback) {
            let array = []
            axios.get(DOMAIN+`/api/popular.php?table=${table}`)
                .then(res => {        
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            array.push({
                                title: res[i].title,
                                url: DOMAIN + '/uploads/'+table+'/' + res[i].thumbnail
                            })
                        }
                        callback(array)
                    }        
                })
        },
    },
    mounted() {
        this.fetch('designs', (data) => {
            this.popular = data
        })
        this.get_tags()
    },
})
</script>