<head>
    <style>
    </style>
</head>
<div class="container-fluid pt-2 pl-0 pr-0" id="header">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center p-2 mb-4">
            <a href="./home.php" class="btn text-center btn-hov logo">
                <span class="text-success ls-1 text-xl bd-bottom font-weight-bold">PROTO</span><br>
                <span class="text-md ls-1">DASHBOARD</span>
            </a>
            <div class="logo-name d-flex">
                <button class="btn d-flex align-items-center dropdown-btn bd-right bd-radius-0 mr-2">
                    <span class="material-icons text-lg pr-2 text-primary">face</span>
                    <span><?php echo $_COOKIE['proto_username']; ?></span>
                </button>
                <a href="./dashboard.php?logout=true" class="btn btn-hov">
                    <span class="text-primary font-weight-bold">Logout</span>
                </a>
            </div>
        </div>
        <div class="links w-100 text-center transition" id="header-nav">
            <div>
                <a :href="item.list ? 'javascript:void(0)' : item.href" class="btn btn-hov pt-4 pb-4 pl-3 pr-3 dropdown-btn bd-radius-0" v-for="(item, i) in links" @click="clicked(item.list, $event)">
                    <span class="d-flex align-items-center dropdown-btn">
                        <span class="dropdown-btn" v-html="item.title"></span>
                        <span v-if="item.list" class="material-icons ml-1 text-md dropdown-btn">arrow_drop_down</span>
                    </span>
                </a>
            </div>
        </div>
    </div>
    <hr>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/widgets.js"></script>
<script src="../js/config.js"></script>
<script>
var v_header = new Vue({
    el: "#header",
    data: {
        tags: [],
        links: [
            { title: "<span class='text-danger font-weight-bold'>Logo Maker</span>", value: "LOGO_MAKER", href: "./logo-maker.php"},
            { title: "<span class='text-warning font-weight-bold'>PNG To SVG</span>", value: "PNG_TO_SVG", href: DOMAIN + "/image-extractor-tool"},
            { title: "Templates", value:"TEMPLATES", list: [
                { title: "Flyer", value: "FLYER", href:"./dashboard.php?table=designs&type=flyer"},
                { title: "Art", value: "FLYER", href:"./dashboard.php?table=designs&type=art"},
                { title: "Movie Poster", value: "MOVIE_POSTER", href:"./dashboard.php?table=designs&type=movie poster"},
                { title: "Facebook Post", value: "FACEBOOK_POST", href:"./dashboard.php?table=designs&type=facebook post"},
                { title: "Instagram Story", value: "INSTAGRAM_STORY", href:"./dashboard.php?table=designs&type=instagram story"},
                { title: "Book Cover", value: "BOOK_COVER", href:"./dashboard.php?table=designs&type=book cover"},
                { title: "Album Art", value: "ALBUM_ART", href:"./dashboard.php?table=designs&type=album art"},
                { title: "Post", value: "POST", href:"./dashboard.php?table=designs&type=post"},
                { title: "Quote", value: "QUOTE", href:"./dashboard.php?table=designs&type=quote"}
            ]},
            { title: "Popular Tags", value:"LOGO_TEMPLATES", list: []},
           { title: "Design", value:"DESIGN", list: [
                { title: "Design A Logo", value: "DESIGN_A_LOGO", href: "./dashboard.php?table=logos&type=" },
                { title: "Design A Book Cover", value: "DESIGN_A_BOOK_COVER", href: "./dashboard.php?table=designs&type=book cover" },
                { title: "Design An Album Art", value: "DESIGN_AN_ALBUM_ART", href: "./dashboard.php?table=designs&type=album art" },
                { title: "Design A FLYER", value: "DESIGN_A_FLYER", href: "./dashboard.php?table=designs&type=flyer" },
            ]},
            { title: "Prototyping", value:"PROTOTYPING", list: [
                { title: "Simple Prototypes", value: "SIMPLE_PROTOTYPES" },
                { title: "Portfolio Prototypes", value: "PORTFOLIO_PROTOTYPES" }
            ]}
        ]
    },
    methods: {
        logo_tags(callback) {
            let array = []
            axios.get(DOMAIN+`/api/find-by-type.php?type= &table=logos`)
                .then(res => {        
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            let tags = res[i].type.split(",")
                            if(tags.length > 1) {
                                for(let i=0; i<tags.length; i++) {
                                    tags[i] = tags[i].trim()
                                    if(!array.includes(tags[i])) {
                                        array.push(tags[i])
                                    }
                                }
                            }
                        }
                        if(array.length > 15) {
                            array.length = 15
                        }
                        callback(array)
                    }        
                })
        },
        clicked(item, e) {
            if(item) {
                let buttons = dropdown(item, e)
            }
        }
    },
    mounted() {
        this.logo_tags((data) => {
            for(let i=0; i<data.length; i++) {
                this.links[3].list.push({
                    title: data[i].toUpperCase(),
                    value: data[i].toUpperCase(),
                    href: "./dashboard.php?table=logos&type="+ data[i]
                })
            }
        })
    },
})
$(document).ready(function(){     

})

</script>