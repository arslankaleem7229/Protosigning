<?php
    include_once("../include/config.php");
    include_once("../include/connection.php");
    if(isset($_GET['u']) && isset($_GET['p'])) {

        $username = $_GET['u'];
        $password = $_GET['p'];        

        setcookie("proto_username", $username, time() + (86400 * 30 * 30 * 30), "/"); // 86400 = 1 day      
        setcookie("proto_password", $password, time() + (86400 * 30 * 30 * 30), "/"); // 86400 = 1 day
        header("Location: " . $root . "/pages/dashboard.php");  
        exit();
    }
    else if(isset($_COOKIE["proto_username"])) {
        $username = $_COOKIE["proto_username"];
        $password = $_COOKIE["proto_password"];
        $sql = $conn->query("SELECT * FROM users where LOWER(username) = LOWER('$username') AND LOWER(password) = LOWER('$password')  LIMIT 1");
        if($sql) {
            $row = $sql->fetch_assoc();
            $exits = json_encode($row);
            if($exits != "null") {
                header("Location: " . $root . "/pages/dashboard.php");
                exit();
            }
        }
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
        .img-container {
            width: 160px;
            height: 120px;
            overflow: hidden;
        }
        #home-posts table td {
            border: 1px solid black !important;
            padding: 0.75rem;
        }
        @media only screen and (max-width: 1019px) {
            #home-posts {
                width: 100% !important;
            }
            #home-posts .d-flex {
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
<body class='d-none'>
    <?php include_once('../components/header.php');  ?>
    <?php include_once('../components/home-search.php');  ?>

    <div class="container mt-5">
        <div class="d-flex justify-content-between flex-wrap">
            <div class="w-75 p-4" id="home-posts">
                <!-- LOGO -->
                <div class='mt-4 pt-4 bd-bottom pb-4' v-if="logo.length > 0">
                    <h4>Popular Logo</h4>
                    <p>(<span class="text-primary font-weight-bold">{{logo.length}}</span>) Logo's Found</p>
                    <br>
                    <div class="d-flex flex-wrap justify-content-center">
                        <div v-for="(item, i) in logo">
                            <div style="width:220px;height:220px" class="border d-flex align-items-center justify-content-center btn-hov mr-4 mb-4 dropdown-btn">
                                <img :src="item.url" :alt="item.title" width="100%" @click="open_logo(item.url)" class="dropdown-btn">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DESIGNS -->
                <div class='mt-4 pt-4 bd-bottom pb-4' v-if="logo.length > 0">
                    <h4>Popular Designs</h4>
                    <p>(<span class="text-primary font-weight-bold">{{design.length}}</span>) Designs Found</p>
                    <br>
                    <div class="d-flex flex-wrap justify-content-center">
                        <div v-for="(item, i) in design">
                            <div style="width:220px;height:220px;overflow:auto" class="border d-flex align-items-center justify-content-center btn-hov p-3 mr-4 mb-4 dropdown-btn">
                                <img :src="item.url" :alt="item.title" width="100%" @click="open_logo(item.url)" class="dropdown-btn">
                            </div>
                        </div>
                    </div>
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
new Vue({
    el: "#home-posts",
    data: {
        logo: [],
        design: []
    },
    methods: {
        open_logo(url) {
            window.location.href = DOMAIN + "/pages/svgedit-master/src/editor/svg-editor.html?url=" + url

        },
        fetch(table, callback) {
            let array = []
            axios.get(DOMAIN+`/api/popular.php?table=${table}`)
                .then(res => {        
                    if(res.data.length > 0) {
                        res = res.data
                        for(let i=0; i<res.length; i++) {
                            if(res[i].title != "Converted SVG") {
                                array.push({
                                    title: res[i].title,
                                    url: DOMAIN + '/uploads/'+table+'/' + res[i].thumbnail
                                })
                            }
                        }
                        callback(array)
                    }        
                })
        },

    },
    mounted() {        
        this.fetch('logos', (data) => {
            this.logo = data
        })
        this.fetch('designs', (data) => {
            this.design = data
        })
    }
})

window.onload = function() { $(document.querySelector("body")).removeClass("d-none") }

</script>    
</body>
</html>