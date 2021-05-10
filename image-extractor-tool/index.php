<!DOCTYPE html>
<html lang="en-US">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/main_5_4_2.css">
    <link rel="stylesheet" href="./css/colorpicker.css">
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> -->
    <script src="./libs/jquery-3.3.1.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../editor/minified/themes/content/default.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/bootstrap.css" rel="stylesheet" />


</head>

<body id="blog" class="home page-template-default page page-id-1545 edd-test-mode pmpro-body-has-access">
    <?php include_once('../components/header.php');  ?>
    <div class="container pt-5 pb-5">
        <div>
            <div>
                <div class='w-100 text-center pb-4 mb-4'>
                    <h1 class="mb-2 display-3 font-weight-bold text-warning animate__animated  animate__fadeInUp animate__faster"><span class="bd-bottom">PROTO</span></h1>
                    <h1 class="mt-0 ls-1 font-weight-normal animate__animated  animate__fadeInUp">PNG TO SVG</h1>
                </div>
                <br>
                <div class="text-center">
                    <button onclick="upload_file()" class="btn material-icons border text-primary btn-hov text-xl mt-2 mb-4" style="border-radius:50%; width:100px;height:100px">add</button>
                    <p class="small w-25 m-auto text-center">Upload an Image from your local directory and we will convert it into <strong class="text-primary">SVG</strong> format</p>
                </div>
                <br>
                <div class="d-none" id="img-wrapper">
                    <canvas id="canvas"></canvas>
                    <canvas id="effectcanvas"></canvas>
                    <div class="image-row row">
                        <div id="imageContainer" class="col-sm-6">
                            <div class="text-left clearfix m-h-80 m-l-10">
                                <div class="pull-left m-10 m-b-0 m-t-20">
                                    <span class="break">Colors</span>
                                    <button class="range-btn-left btn box-shadow mr-2 bd-round btn-dark material-icons" onclick="changeRange(-1)">remove</button>
                                    <input class="color-range-input border bg-light" id="colorRange" type="text" value="5" readonly="">
                                    <button class="range-btn-right btn box-shadow ml-2 bd-round btn-dark material-icons" onclick="changeRange(+1)">add</button>
                                </div>
                                <div class="pull-left m-r-10">
                                    <form class="m-b-0 m-t-20"
                                        onchange="onDitherChange(event)">

                                    </form>
                                </div>
                                <div class="pull-left m-10 m-b-0 m-t-20">
                                    <span class="break">Simplify</span>
                                    <button class="range-btn-left btn box-shadow mr-2 bd-round btn-dark material-icons" onclick="changeSimplify(-1)">remove</button>
                                    <input class="color-range-input border bg-light" id="simplifyRange" type="text" value="0" readonly="">
                                    <button class="range-btn-right btn box-shadow ml-2 bd-round btn-dark material-icons" onclick="changeSimplify(1)">add</button>
                                </div>

                                <div class="pull-left m-10 m-b-0 m-t-20">
                                    <span class="break">Palette</span>
                                    <ul id="pickedcolorlist" class="pickedcolors"></ul>
                                </div>
                                <div class="smallhorad" id="smallhorad">
                                </div>
                            </div>
                            <div class="settingsPanel">
                                <div class="settingsHalf">
                                    <span>Gamma:</span><br>
                                    <input type="range" min="0" max="200" value="100"
                                        steps="5" class="slider" id="gammaSldr"
                                        oninput="gammaChange(event)">
                                    <br><span>Contrast:</span><br>
                                    <input type="range" min="-200" max="200" value="0"
                                        step="5" class="slider" id="contrastSldr"
                                        oninput="contrastChange(event)">
                                </div>
                                <img id="resetBtn" src="./images/reseticon.png"
                                    onclick="resetEffects()">
                                <div class="settingsHalf">
                                    <span>Hue:</span><br>
                                    <input type="range" min="0" max="360" value="0" step="5"
                                        class="slider" id="hueSldr"
                                        oninput="hueChange(event)">
                                    <br><span>Saturation:</span><br>
                                    <input type="range" min="-100" max="100" value="0"
                                        step="5" class="slider" id="satSldr"
                                        oninput="greyscaleChange(event)">
                                </div>
                            </div>
                            <button class="btn btn-danger material-icons box-shadow text-md bd-round" onclick="settings();">settings</button>
                            <img id="originalImg" onload="onOriginalImgLoad()" class="box-shadow bd-radius-5 bd-none bg-light" style="border:1px solid transparent !important">
                            <div class="w-100 text-center p-4">
                                <button class="btn-primary inline-block align-top pl-4 pr-4 box-shadow bd-round" onclick="generate(); alertmsg('Generating SVG File', 'info')">Generate</button>
                                <div id="loadingMsg">Generating Vector..</div>
                            </div>
                        </div>
                        <div class="svg-wrap col-sm-6">
                            <div class="text-left clearfix m-h-80">
                                <div class="pull-left">
                                    <span class="break">Colors</span>
                                    <ul id="colorList" class="colors"></ul>
                                    <br>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <button id="download-btn" style="display:none;" class="btn btn-hov text-lg align-top pl-3 pr-3 bd-round mt-4 mb-4 material-icons">save_alt</button>                            
                                        <button onclick="open_in_editor()" id="edit-btn" style="display:none;" class="btn material-icons text-lg text-info align-top pl-3 pr-3 bd-round btn-hov mt-4 mb-4">create</button>                            
                                    </div>
                                </div>
                            </div>
                            <div id="svgContainer" style="display: none!important;">
                            </div>
                            <div id="ConvertedSVGContainer" class="border m-0 bg-light">
                                <canvas id="svgWithAspectRatio" width="400" height="400"></canvas>
                            </div>
                        </div>
                    </div>

                </div>
                
                
        <div class="page-area d-none" id="svg-cut-wrapper">
            <div class="row">
            <div class="post-1545 page type-page status-publish has-post-thumbnail hentry pmpro-has-access">
                        <div class="single-wrap col-md-12">
                            <div class="main-content-page">
                                <div class="entry-content">
                                </div>
                                <div class="page-wrap">
                                    <div class="container main-container">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="row d-none" id="browsepanel">
                                                    <div class="col-sm-3">
                                                        <div id="holder" class="select-box">
                                                            <input type="file" name="file" id="file" class="inputfile">
                                                            <label for="file">Choose a file</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="split-panel pt-0 mt-0 pl-3 pr-3 pb-3">
                                                    <span>For Cricut and Silhouette Cutting Machines (With
                                                        registration marks)</span>
                                                        <hr>
                                                    <div id="splitSVGContCanvas" class="row">
                                                        <canvas id="splitSVGcanvas" width="1070" height="400"
                                                            style="display:none;"></canvas>
                                                        <button id="splitSVGDownload" type="button"class="btn bd-round box-shadow ml-4 mt-2 pl-4 pr-4 btn-primary">Download Cut SVG</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
            </div>            
        </div>

            </div>
        </div>
        <br><br>
        <div class='mt-5 pt-5 bd-top' id="logo-makers">
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

    <div class="container main-container" role="main" id="logo-makers">
    </div><!-- end main-container -->
    </div><!-- end page-area -->




<script src="./libs/raphael-2.1.0.js"></script>
<script src="./libs/popper.min.js"></script>
<script src="./libs/color-thief.js"></script>
<script src="./libs/all_5_4.js"></script>
<!--<script src="../libs/apppay.min.js"></script>-->
<script src="./libs/appfree.js"></script>
<script src="./libs/CanvasEffects.worker.js"></script>
<script src="./libs/worker.js"></script>
<script src="./libs/Blob.js"></script>    
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/widgets.js"></script>
<script>

function upload_file() {
    $("#file").click()
}
$("#file").change(() => {
    $("#img-wrapper").removeClass("d-none")
    alertmsg("Loading the Image", "info")
})
function open_in_editor() {
    window.location.href = DOMAIN + "/pages/svgedit-master/src/editor/svg-editor.html?url=" + editurl
}
let editurl = "javascript:void(0)"
let logo_vue = new Vue({
    el: "#logo-makers",
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
                            if(res[i].title != "Converted SVG") {
                                this.popular.push({
                                    title: res[i].title,
                                    url: DOMAIN + '/uploads/logos/' + res[i].thumbnail
                                })
                            }
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
        },
        loaded(data) {
            var file = new File([data], Date.now() + " - converted.svg", {type: "image/svg+xml"});
            let formData = new FormData()
            formData.append("thumbnail", file)
            axios({
                method: "POST",
                url: DOMAIN + `/api/converted-svg.php`,
                data: formData,
                headers: { 'enctype': 'multipart/form-data'}
            })
            .then(res => {
                editurl = res.data
                console.log(res, 'my response')
            })
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
<!--[selectron:done]-->