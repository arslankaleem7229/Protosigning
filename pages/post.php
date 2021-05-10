<?php
    include_once("../include/config.php");
    include_once("../include/connection.php");
    if(!isset($_GET['title']) || !$_GET['title']) {        
        header('Location: '. $root);
        exit();
    } else {
        $p_title = $_GET['title'];
        $p_title = preg_replace('/[\']/i', '"', $p_title);
        $p_description = "";
        $p_post = array();                
        $p_comments = array();

        $sql1 = $conn->query("SELECT * FROM posts where LOWER(title) = LOWER('$p_title') LIMIT 1");
        if($sql1) {
            while($p_row = $sql1->fetch_assoc()) {
                array_push($p_post, $p_row);
            }       
            if(sizeof($p_post) == 0) {
                header('Location: '. $root);
                exit();
            }
            $sql1 = $conn->query("SELECT * from comments WHERE LOWER(post) =  LOWER('$p_title') order by id desc");
            if($sql1) {
                while($p_row = $sql1->fetch_assoc()) {
                    array_push($p_comments, $p_row);
                }                    
            }
            $p_description = $p_post[0]["description"];   
            $p_description = preg_replace('/[\'\<\>]/i', '"', $p_description);
            $p_post = json_encode($p_post);     
            $p_comments = json_encode($p_comments);   
        }   
    
    }
?>
<html lang="en">
<head>
    <title><?php echo $p_title . " - Dish Satellite Information"; ?></title>
    <meta charset="UTF-8">
    <meta name="description" content="<?php echo $p_description; ?>">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link data-n-head="ssr" rel="icon" type="image/x-icon" href="../images/favicon.PNG">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>    
    <link rel="stylesheet" href="../editor/minified/themes/content/default.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <style>
        #post table td {
            border: 1px solid black !important;
            padding: 0.75rem;
        }
        #comments > div {
            position:relative;
            overflow:auto;
        }
        #post img {
            margin: 5px;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2) !important;
        }
        @media only screen and (max-width: 1040px) {
            #post {
                flex-wrap: wrap !important;
            }
            #post .left,
            #post .right {
                width: 100% !important;
                padding: 0px !important;
            }
        }
    </style>
</head>
<body>
    <?php include_once('../components/header.php');  ?>
    <div class="container mt-5">
        <div class="w-100 d-flex" id="post">
            <div class="w-75 pr-5 left" id="post-comments">
                <div class="w-100 d-flex">
                    <div v-if="post.thumbnail" class="w-50 pr-2 pb-2 flex-shrink-0 left d-none">
                        <img :src="post.thumbnail" :alt="post.title" width="100%" class="box-shadow bd-radius-5">
                    </div>
                    <div class="w-100 right">
                        <h2 class="font-weight-bold mb-1 bg-primary text-white bd-radius-5 box-shadow pl-3 pr-3 pt-3 pb-3 text-white">{{post.title}}</h2>
                        <p class="text-primary d-none font-weight-bold small">Created {{post.date}}</p>
                        <p class="small d-none" v-html="post.description"></p>
                    </div>
                </div>
                <div class="mt-2" v-if="comments.length > 0" id="comments">
                    <div v-for="(item, i) in comments" class="mb-2 pl-3 pr-3 pt-3 pb-3 bd-radius-5 bg-white border hov-box-shadow transition" style="max-height:1000px;overflow:auto">
                        <h3 class="font-weight-bold mb-1 text-danger" v-if="item.title">{{item.title}}</h3>
                        <p class="text-primary small font-weight-bold bd-bottom pb-2 default-font">Posted {{item.date}}</p>
                        <div v-html="item.description" class="mb-0"></div>

                        <div v-if="item.images.length > 1" class="mt-4 pt-3 bd-top d-none">
                            <div class="d-flex align-items-center flex-wrap">
                                <img @click="gallery(img, item.images)" v-for="(img, j) in item.images" :src="img" width="120px" class="mr-3 mb-3 box-shadow bd-radius-5" :alt="item.title">
                            </div>
                        </div>
                    </div>
                </div>
                <p v-else class="small text-center w-100 p-5">
                    No Comments on this Post
                </p>
            </div>
            <?php include_once('../components/trending.php'); ?>
        </div>

    </div>
    <?php include_once('../components/footer.php');  ?>

<script src="../js/functions.js"></script>
<script>
let post = JSON.parse(<?php echo json_encode($p_post); ?>)[0],
    comments = JSON.parse(<?php echo json_encode($p_comments); ?>) || {};

new Vue({
    el: "#post-comments",
    data() {
        return {
            post: {
                thumbnail: null, date: null, description: null, title: null
            },
            comments: []
        }
    },
    methods: {
        gallery(preview, list) {
            gallery(preview, list)
        },
        set_post() {
            this.post.title = post.title
            // this.post.thumbnail = DOMAIN + "/uploads/posts/"+post.thumbnail
            this.post.date = posted(post.date)
            this.post.description = replace(post.description, "\r\n", "<br>")
        },
        set_comments() {
            for(let i=0; i<comments.length; i++) {
                let datetime = timestamp(comments[i].datetime)
                this.comments.push({
                    title: comments[i].title,
                    date: timeDifference(datetime),
                    description: comments[i].description,
                    // description: replace(comments[i].description, "\r\n", "<br>"),
                    images: comments[i].images.split("\r\n")
                })
            }
        }
    },
    mounted() {
        this.set_post()
        this.set_comments()
    }
})

</script>
</body>
</html>