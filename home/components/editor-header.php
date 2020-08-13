<head>
    <style>
    </style>
</head>
<div class="container-fluid pl-0 pr-0 pt-3 bg-white" id="header">
    <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center p-2">
            <div class="d-flex align-items-center">
            <a :href="DOMAIN" class="btn text-center btn-hov logo">
                <span class="text-dark ls-2 text-lg bd-bottom font-weight-bold">PROTO</span><br>
                <span class="text-sm ls-1">PROTOTYPING</span>
            </a>
            <h4 contenteditable="true" class="bd-bottom ml-4 pb-2 text-primary hov"><?php echo $_GET['title']; ?></h4>
            </div>
            <div class="logo-name d-flex">
                <button class="btn d-flex align-items-center dropdown-btn">
                    <span class="material-icons text-lg pr-2 text-primary">face</span>
                    <span class="text-info font-weight-bold text-sm bd-right pr-2 mr-2"><?php echo $_GET['owner']; ?></span>
                    <span v-if="invited.length > 0" title="collaborators">
                        <span v-for="(user, i) in invited" :title="user" class="text-sm font-weight-bold btn-hov" @click="remove_invitation(i)">{{user + (i != invited.length-1 ? ',' : '')}}</span>
                    </span>
                </button>
                <button @click="invitation=true" class="btn btn-primary box-shadow material-icons flex-shrink-0 mr-3 ml-2 text-md" style="border-radius:50%">person_add</button>
                <a :href="DOMAIN + '/pages/dashboard.php?logout=true'" class="btn btn-hov bd-left bd-radius-0 mr-2 ml-2 pl-4 pr-4">
                    <span class="text-primary font-weight-bold">Logout</span>
                </a>
            </div>
        </div>
    </div>
    <hr>
    <div class="container-fluid animate__animated animate__fadeIn animate__faster" v-if="invitation">
        <div class="w-100 text-right">
            <button class="btn material-icons btn-hov" @click="invitation=false">clear</button>
        </div>
        <div class="w-50 m-auto">
            <h2 class="ls-1 w-100 text-center mt-4 mb-4 font-weight-bold">INVITE YOUR TEAMMATES</h2>
            <div class="input-group d-flex align-items-center">
                <input @focus="search(keywords, $event)" @keyup="search(keywords, $event)"  type="text" class="form-control bd-round text-sm pl-3 pr-3" placeholder="Enter username of your teammate" name="username" v-model="keywords">
                <div class="input-group-append">
                    <span class="input-group-text bg-none bd-none">
                        <button @click="search(keywords, $event)" class="btn btn-primary box-shadow material-icons" style="border-radius:50%">search</button>
                    </span>
                </div>
            </div>   
            <div class="w-100 mt-2" v-if="usernames.length > 0">
                <h6 class="mt-3 mb-3">(<span class="text-primary font-weight-bold">{{usernames.length}}</span>) users found</h6>
                <button @click="invite_user(item)" v-for="(item, i) in usernames" class="btn btn-block bd-bottom text-sm bd-radius-0 text-left p-1 btn-hov d-flex align-items-center">
                    <span class="material-icons text-md mr-3 text-primary">person_adds</span>
                    <span v-html="highlight(item)"></span>
                </button>
            </div>          
        </div>
        <br>   
        <br>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/widgets.js"></script>
<script src="../js/config.js"></script>
<script>
let owner = '<?php echo  $_GET['owner']; ?>',
    id = '<?php echo $_GET['id']; ?>'

var v_header = new Vue({
    el: "#header",
    data: {
        invitation: false,
        loading: false,
        keywords: "",
        usernames: [],
        invited: [],
        tags: [],
        project: {},
        links: [
            { title: "<span class='text-danger font-weight-bold'>Logo Maker</span>", value: "LOGO_MAKER", href: "./logo-maker.php"},
            { title: "<span class='text-warning font-weight-bold'>PNG To SVG</span>", value: "PNG_TO_SVG", href: "./png-to-svg.php"},
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
        remove_invitation(i) {
            this.invited.splice(i, 1)                
            this.update_collaborators(this.invited)
        },
        highlight(str) {
            return str.split(this.keywords).join(`<b class="text-primary">${this.keywords}</b>`)
        },
        invite_user(user) {
            if(this.invited.length > 5) {
                alertmsg("You have to reached to maximu invitations", "info")
            }
            else if(!this.invited.includes(user) && owner != user ) {
                this.invited.push(user)
                this.update_collaborators(this.invited)

            }
        },
        update_collaborators(users) {
            let formData = new FormData()
                formData.append("collaborators", JSON.stringify(users))
                formData.append("id", id)
                axios({
                    method: "POST",
                    url: DOMAIN + `/api/update-collaborators.php`,
                    data: formData,
                    headers: { 'enctype': 'multipart/form-data'}
                })
                .then(res => {
                    console.log(res, 'my response')
                })
        },
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
        search(keywords, e) {
            keywords = keywords.trim()
            keywords = keywords.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_')
            if(keywords.length < 1 || keywords.length > 100 || this.cache == keywords) {
                return
            }            
            this.loading = true

            axios.get(DOMAIN + `/api/usernames.php?keywords=${keywords}`)
            .then(res => {
                this.usernames = []
                if(res.status == 200) {            
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {                            
                            if(!this.invited.includes(res[i].username)) {
                                this.usernames.push(res[i].username)
                            }
                        }
                    }
                    this.loading = false
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
        // console.log(project, 'my project')
        this.invited.push(owner)
        this.logo_tags((data) => {
            for(let i=0; i<data.length; i++) {
                this.links[3].list.push({
                    title: data[i].toUpperCase(),
                    value: data[i].toUpperCase(),
                    href: "./dashboard.php?table=logos&type="+ data[i]
                })
            }
        })

        axios.get(DOMAIN + "/api/project.php?id="+ id)
        .then(res => {
            this.invited = JSON.parse(res.data.collaborators)
        })
    },
})
$(document).ready(function(){     

})

</script>