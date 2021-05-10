<?php
    if(isset($_GET['name'])) {
        $name = $_GET['name'];
    } else {
        $name = null;
    }
?>
<html lang="en">
<head>
    <title>Protosigning</title>
    <meta charset="UTF-8">
    <meta name="Description" content="">    
    <meta name="Keywords" content="">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link data-n-head="ssr" rel="icon" type="image/x-icon" href="../images/favicon.PNG">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../editor/minified/themes/content/default.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <style>
    </style>   
</head>
<body class='d-none'>
    <?php include_once('../components/header.php');  ?>
    <div class="container pt-5 pb-5" id="logo-maker">
        <div v-if="logo.length == 0">
            <div v-if="!loading">
                <div class='w-100 text-center pb-3 mb-3'>
                    <h1 class="mb-2 display-3 font-weight-bold text-danger animate__animated  animate__fadeInUp animate__faster"><span class="bd-bottom">PROTO</span></h1>
                    <h2 class="mt-0 ls-2 font-weight-normal animate__animated  animate__fadeInUp">LOGO MAKER</h2>
                </div>
                <br>
                <!-- <h2 class="ls-2 text-center font-weight-normal text-shadow">FREE LOGO GENERATOR</h2> -->
                <p class="small w-100 text-center">You can also try to look for different color names such <strong> <span class="text-danger">Red</span>, <span class="text-primary">Blue</span> or <span class="text-success">Green</span></strong></p>
                <div class="w-75 m-auto" v-if="tags.length > 1">
                    <h4 class="pb-3 pt-3">Popular Tags</h4>
                    <button class="btn border bd-round mr-3 mb-2 pl-4 pr-4 btn-hov text-primary" v-for="(item, i) in tags" @click="name=item">
                        {{item}}
                    </button>
                </div>
                <div class="form-group mt-5 border pt-2 pb-2 bg-white" style="border-radius:100px 100px 100px 100px">
                    <input type="text" class="form-control bg-none bd-none text-center text-md ls-1" name="logo-name" placeholder='Try "Apple & Oranges"' v-model="name">
                </div>
                <div class="w-100 d-flex justify-content-center mt-4">
                    <button @click="search()" type="button" class="btn bd-round box-shadow pl-5 pr-5 text-md btn-primary ls-1 d-flex align-items-center">
                        Search
                    </button>
                </div>
            </div>
            <div v-else>
                <p class="w-100 text-center pt-5">
                    <span class="spinner-grow spinner-grow-sm text-primary"></span>
                    <br><br>
                    <span class="text-xl pt-5 w-100">Please Wait</span>
                </p>
                <p class="m-auto text-center w-50 small">
                    We are looking some unique and beautiful logo's for you            
                </p>
            </div>
        </div>
        <div v-else class="d-flex flex-wrap justify-content-center">
            <div class="text-center w-100 pb-4">
                <h2>{{name.toUpperCase()}}</h2>
                <p>(<span class="text-primary">{{logo.length}}</span>) Logos Found <a href="./logo-maker.php" class="small">Search Again</a></p>
            </div>
            <div v-for="(item, i) in logo">
                <div style="width:325px;height:325px" class="border d-flex align-items-center justify-content-center btn-hov mr-4 dropdown-btn">
                    <img :src="item.url" :alt="item.title" width="100%" @click="logo_opt($event, item.url, item)" class="dropdown-btn">
                </div>
            </div>
        </div>
        <br><br><br>

        <div class='mt-4 pt-4'>
            <h4>Popular Logo</h4>
            <br>
            <div class="d-flex flex-wrap justify-content-center">
                <div v-for="(item, i) in popular">
                    <div style="width:325px;height:325px" class="border d-flex align-items-center justify-content-center btn-hov mr-4 mb-4 dropdown-btn">
                        <img :src="item.url" :alt="item.title" width="100%" @click="logo_opt($event, item.url, item)" class="dropdown-btn">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include_once('../components/footer.php');  ?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/widgets.js"></script>

<script>
let name = '<?php echo $name; ?>'
new Vue({
    el: "#logo-maker",
    data: {
        loading: false,
        name: null,
        logo: [],
        opts: [
            { title: "Edit This Logo", value: "EDIT" },
            { title: "Download This Logo", value: "DOWNLOAD" },
        ],
        tags: [],
        popular: []
    },
    methods: {
        logo_opt(e, url, item) {
            let buttons = dropdown(this.opts, e)

            for(let i=0; i<buttons.length; i++) {
                buttons[i].click(() => {
                    let opt = this.opts[i].value

                    switch(opt) {
                        case "EDIT":
                            window.location.href = DOMAIN + "/pages/svgedit-master/src/editor/svg-editor.html?url=" + url
                            break
                        case "DOWNLOAD":
                            downloadURI(url, item.title + '.svg')
                            break
                    }
                })
            }
        },
        popular_logo() {
            axios.get(DOMAIN+`/api/popular.php?table=logos`)
                .then(res => {        
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            this.popular.push({
                                title: res[i].title,
                                url: DOMAIN + '/uploads/logos/' + res[i].thumbnail
                            })
                        }
                        console.log(this.popular, 'pop')
                    }        
                })
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
                        if(this.tags.length > 12) {
                            this.tags.length = 12
                        }
                    }        
                })
        },
        search() {
            if(this.name) {            
                this.loading = true
                axios.get(DOMAIN+`/api/find-by-type.php?type=${this.name}&table=logos`)
                .then(res => {        
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            this.logo.push({
                                title: res[i].title,
                                url: DOMAIN + '/uploads/logos/' + res[i].thumbnail
                            })
                        }
                    }        
                    else {
                        alertmsg("No Logo found ):", "danger")
                    }
                    this.loading = false
                })

            }
            else {
                alertmsg("Enter your brand name")
            }
        }
    },
    mounted() {        
        this.get_tags()
        this.popular_logo()
        if(name) {
            this.name = name
            this.search()
        }
    }
})

window.onload = function() { $(document.querySelector("body")).removeClass("d-none") }

</script>    
</body>
</html>