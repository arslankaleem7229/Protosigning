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
        <div>
            <div>
                <div class='w-100 text-center pb-4 mb-4'>
                    <h1 class="mb-2 display-3 font-weight-bold text-warning animate__animated  animate__fadeInUp animate__faster"><span class="bd-bottom">PROTO</span></h1>
                    <h1 class="mt-0 ls-1 font-weight-normal animate__animated  animate__fadeInUp">PNG TO SVG</h1>
                </div>
                <br>
                <div class="text-center">
                    <button class="btn material-icons border text-primary btn-hov text-xl mt-2 mb-4" style="border-radius:50%; width:100px;height:100px">add</button>
                    <p class="small w-25 m-auto text-center">Upload an Image from your local directory and we will convert it into <strong class="text-primary">SVG</strong> format</p>
                </div>
            </div>
        </div>
        <br><br>
        <div class='mt-5 pt-5 bd-top'>
            <h4>Popular Converted Images</h4>
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
                                    if(!this.tags.includes(tags[i])) {
                                        this.tags.push(tags[i].trim())
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
    }
})

window.onload = function() { $(document.querySelector("body")).removeClass("d-none") }

</script>    
</body>
</html>