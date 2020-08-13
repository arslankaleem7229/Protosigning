<?php
    if(!isset($_GET['type'])) {        
        include_once("../include/config.php");

        header('Location: '. $root);
    } else {
        include_once("../include/connection.php");
        $type = $_GET['type'];
        $type = preg_replace('/[^a-z0-9\- ]/i', '', $type);
        $meta = array();  
        
        $sql = $conn->query("SELECT * FROM meta_tags where page = 'software' LIMIT 1");
        if($sql) {            
            while($row = $sql->fetch_assoc()) {
                array_push($meta, $row);
            }       

            $title = $meta[0]["title"];
            $description = $meta[0]["description"];
            $keywords = $meta[0]["keywords"];
        }
    }
?>

<html lang="en">
<head>
    <title><?php echo $type . " - " . $title; ?></title>
    <meta charset="UTF-8">
    <meta name="Description" content="<?php echo $description; ?>">    
    <meta name="Keywords" content="<?php echo $keywords; ?>">     
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
        .img-container {
            width: 160px;
            height: 120px;
            overflow: hidden;
        }
        @media only screen and (max-width: 1019px) {
            #software-posts {
                width: 100% !important;
                padding: 5px !important;
            }
            #software-posts .d-flex {
                flex-wrap: wrap !important;
            }
            .img-container {
                width: 120px;
                max-height: 120px !important;
                height: auto !important;
                margin-bottom: 1rem;
            }
        }
    </style>   
</head>
<body class="d-none">
    <?php include_once('../components/header.php');  ?>
    <?php include_once('../components/software-search.php');  ?>

    <div class="container mt-5">
        <div class="d-flex justify-content-between flex-wrap">
            <div class="w-75 p-4" id="software-posts">
                <div v-if="posts.length > 0">
                    <div v-for="(item, i) in posts" class="d-flex mb-2 border bg-white bd-radius-5 p-3 hov-img hov-box-shadow transition">
                        <div class="img-container flex-shrink-0 mr-3 d-flex align-items-center justify-content-center bd-radius-5 box-shadow">
                            <button class="btn"><span class="spinner-border spinner-border-sm text-sm text-primary"></span></button>
                            <img :src="item.thumbnail" @load="img_loaded($event)" :alt="item.title" width="100%" class="d-none img-zoom transition">
                        </div>
                        <div class="w-100">
                            <h2 class="font-weight-bold mb-1 text-danger">{{item.title}}</h2>
                            <p class="small text-primary font-weight-bold">Posted {{item.date}}</p>
                            <p class="small" :title="item.description" v-html="item.description.substr(0, 250) + (item.description.length > 250 ? '...': '')"></p>
                            <div class="w-100 text-right d-flex align-items-center justify-content-end">
                                <a @click="update_download(item)" :href="item.software" class="btn btn-primary pl-4 pr-4 d-flex align-items-center box-shadow">
                                    <span class="material-icons text-md">get_app</span>
                                    <span class="text-sm ml-2">Download</span>
                                </a>
                                <button class="btn align-items-center ml-2 d-none">
                                    <span class="material-icons mr-1 text-danger">local_fire_department</span>
                                    <span class="small">{{item.download || 0}}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else-if="posts.length == 0" class="w-100 text-center p-5">
                    <p class="small">
                        <span v-if="loading">
                            <span class="text-primary mb-2 spinner-border spinner-border-sm"></span> <br>
                            <span>Please wait</span>
                        </span>
                        <span v-else>
                            <span class="material-icons display-4 text-primary text-lg">sentiment_very_dissatisfied</span><br>
                            <span>No Post Found!</span>
                        </span>
                    </p>
                </div>
                <div class="w-100" v-if="posts.length > 0 && posts.length >= limit">
                    <button v-if="!loading_more" @click="more()" class="btn btn-block btn-hov font-weight-bold mt-3 mb-3 material-icons">expand_more</button>
                    <p class="small w-100 text-center p-5" v-else>
                        <span>
                            <span class="text-primary mb-2 spinner-border spinner-border-sm"></span> <br>
                            <span>Loading</span>
                        </span>
                    </p>
                </div>
            </div>
            <?php include_once('../components/trending.php'); ?>
        </div>
    </div>

    <?php include_once('../components/footer.php');  ?>


<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/functions.js"></script>
<script>
let type =  "<?php echo $_GET['type']; ?>"
var v_software_posts = new Vue({
    el: "#software-posts",
    data: {
        limit: 0,
        loading: false,
        loading_more: false,
        posts: []
    },
    methods: {
        update_download(software) {
            software.download += 1
            // axios.get(`http://localhost/projects/dishsatinfo.com/api/update-download.php?id=${software.id}&download=${software.download}`)
            // .then(res => {
            //     console.log(res, 'response...')
            // })
        },
        img_loaded(e) {
            $(e.target).parent().find("button").remove()
            $(e.target).addClass("animate__animated animate__fadeIn animate__faster").removeClass("d-none")                
        },
        more() {
            this.fetch(type)
        },
        fetch(type) {            
            this.loading_more = true
            this.loading = true
            axios.get(DOMAIN+`/api/list.php?limit=${this.limit}&type=${type.toUpperCase()}&table=softwares`)
            .then(res => {                
                if(res.status == 200) {
                    res = res.data
                    if(res.length > 0) {
                        for(let i=0; i<res.length; i++) {
                            let datetime = timestamp(res[i].datetime)
                            this.posts.push({
                                id: res[i].id,
                                date: timeDifference(datetime),
                                title: res[i].title,
                                description: replace(res[i].description, "\r\n", "<br>"),
                                thumbnail: DOMAIN+'/uploads/softwares/'+res[i].thumbnail,
                                software: DOMAIN+'/uploads/softwares/'+res[i].software,
                                downlaod: res[i].download
                            })
                        }
                        this.limit += 20
                    }
                }
                this.loading = false
                this.loading_more = false
            })
        }
    },
    mounted() {        
        this.fetch(type)
    },
})
window.onload = function() { $(document.querySelector("body")).removeClass("d-none") }
</script>    
</body>
</html>