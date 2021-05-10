<?php
    include_once("../include/config.php");
    if(isset($_GET['logout'])) {
        setcookie('proto_username', null, -1, '/'); 
        header("Location: " . $root . "/pages/home.php");  
        exit();
    }
    else {
        if(!isset($_COOKIE["proto_username"])) {
            header("Location: " . $root . "/pages/dashboard.php");  
            exit();
        }
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
        include_once("../include/connection.php");
        $username = $_COOKIE['proto_username'];
        $result = array();
        if($conn->connect_error) {
            die("Connection Failed". $conn->connect_error);
        }
        if(isset($_GET['table'])) {
            $table = $_GET['table'];
            $type = $_GET['type'];
    
            $sql = $conn->query("SELECT * from $table WHERE LOWER(type) LIKE LOWER('%$type%') order by id desc");
            if($sql) {
                while($row = $sql->fetch_assoc()) {
                    array_push($result, $row);
                }
                json_encode($result);
                $conn->close();        
            }
            else {
                echo $sql;
            }
        }        
        else if(isset($_GET['projects'])) {
            $type = $_GET['projects'];
            $table = $_GET['projects'];

            if($type == "all") {
                $sql = $conn->query("SELECT id, title, type, datetime, owner from projects where owner = '$username' order by title");
            } 
            else if($type == "shared") {
                $sql = $conn->query("SELECT id, title, type, datetime, owner from projects order by title");
            }
            else if($type == "recent") {
                $sql = $conn->query("SELECT id, title, type, datetime, owner from projects where owner = '$username' order by datetime desc limit 10");
            }
            else {
                $sql = $conn->query("SELECT id, title, type, datetime, owner from projects WHERE LOWER(type) = LOWER('$type') AND owner = '$username' order by id desc");
            }
            if($sql) {
                while($row = $sql->fetch_assoc()) {
                    array_push($result, $row);
                }
                $conn->close();        
            } else {
                echo $sql;
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../editor/minified/themes/content/default.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <style>
    </style>   
</head>
<body class='d-none'>
    <?php include_once('../components/dashboard-header.php');  ?>

    <div class="container mt-5" id="vue">
        <div class="d-flex w-100">
            <div class="w-25 pr-2">
                <div class="mb-5">
                    <h5 class="mb-3">Overview</h5>
                    <a :href="item.href" class="btn btn-block text-left pl-3 pr-3 btn-hov d-flex align-items-center" v-for="(item, i) in overview">
                        <span class="material-icons mr-3 text-md text-primary">{{item.icon}}</span>
                        <span>{{item.title}}</span>
                    </a>
                </div>
                <div class="mb-5">
                    <h5 class="mb-3">Projects</h5>
                    <a :href="item.href" class="btn btn-block text-left pl-3 pr-3 btn-hov d-flex align-items-center" v-for="(item, i) in projects" :class="project_type == item.value ? 'bg-light text-primary font-weight-bold' : ''">
                        <span class="material-icons mr-3 text-md text-primary">{{item.icon}}</span>
                        <span :class="project_type == item.value ? 'font-weight-bold' : ''">{{item.title}}</span>
                    </a>
                </div>
                <div class="mb-5">
                    <h5 class="mb-3">Action</h5>
                    <a :href="item.href" class="btn btn-block text-left pl-3 pr-3 btn-hov d-flex align-items-center" v-for="(item, i) in action">
                        <span class="material-icons mr-3 text-md text-primary">{{item.icon}}</span>
                        <span>{{item.title}}</span>
                    </a>
                </div>
                <div class="mb-5">
                    <h5 class="mb-3">Templates</h5>
                    <a :href="item.href" class="btn btn-block bd-radius-0 text-left pl-3 pr-3 btn-hov d-flex align-items-center bd-bottom" v-for="(item, i) in templates">
                        <span class="text-primary">{{item.title}}</span>
                    </a>
                </div>
            </div>
            <div class="w-75 pl-2">
                <!-- TEMPLATES -->
                <?php if(isset($_GET['table']) && isset($_GET['type'])) { ?>
                <div v-if="preview.list.length > 0">
                    <h4><?php echo ucfirst($table); ?></h4>
                    <p>(<span class="text-primary font-weight-bold">{{preview.list.length}}</span>) <?php echo "<b class='text-shadow' style='color:$type'>".ucfirst($type) . "</b> " . ucfirst($table); ?> Found</p>
                    <br>
                    <div class="d-flex">
                        <div class="d-flex flex-wrap align-items-end">
                            <div v-for="(item, i) in preview.list">
                                <div style="width:250px;height:250px;overflow:auto" class="border d-flex align-items-center justify-content-center btn-hov p-3 mr-4 mb-4 dropdown-btn">
                                    <img :src="item.url" :alt="item.title" width="100%" @click="open_logo(item.url)" class="dropdown-btn">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-else class="p-5 mt-5 mb-5 w-100 text-center small">
                    <span class="material-icons display-1 mb-3 text-primary">sentiment_very_dissatisfied</span> <br>
                    <?php echo "No <b>" . ucfirst($type) . "</b> " . ucfirst($table) . " Found <a href='./dashboard.php?table=designs&type=quote'>Try your Luck</a>"; ?>
                </p>
                <!-- TEMPLATES -->
                <?php } else if(isset($_GET['projects'])) { ?>
                <div class="w-100">
                    <div class="bd-bottom">
                        <a href="#" class="btn btn-block text-left btn-hov d-flex align-items-center pb-3" @click="create_project=true">
                            <span class="material-icons mr-3 text-primary" style="font-size:4rem">add_circle_outline</span>
                            <span>Create New Project</span>
                        </a>
                        <div class="input-group mt-3 mb-3 animate__animated  animate__fadeInUp animate__faster" v-if="create_project">
                        <div class="input-group-prepend">
                            <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                                {{project_type}}
                            </button>
                            <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" @click="project_type='Web'">Web</a>
                            <a class="dropdown-item" href="#" @click="project_type='Design'">Design</a>
                            <a class="dropdown-item" href="#" @click="project_type='Logo'">Logo</a>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="Enter Project Title" required v-model="project_title">
                        <div class="input-group-append">
                            <button class="btn btn-primary box-shadow pl-4 pr-4 ml-4 bd-round" @click="create_project_func()">Create</button>
                        </div>
                        </div>
                    </div>
                    <br>
                    <div v-if="myprojects.length > 0">
                        <div v-for="(item, i) in myprojects" class="bd-bottom pt-3 pb-3 pl-3 pr-3 hov">
                            <a :href="item.type.toLowerCase() == 'web' ? 'http://localhost:3000/workspace/web/id=' + item.id + '&title=' + item.title + '&owner=' + item.owner + '&self=' + owner : 'http://localhost/projects/protosigning.com/pages/svgedit-master/src/editor/svg-editor.html' " ><h2 class="font-weight-normal">#{{item.id}} {{item.title}} <span class="text-md text-dark">({{item.type}})</span></h2></a>
                            <p class="text-sm">Created {{item.date}}</p>
                            <p class="mb-1"><strong>Collaborators: </strong>
                                <span v-if="item.collaborators.length > 0">
                                    <span v-for="(coll, j) in item.collaborators" class="small" :class="coll == owner ? 'text-success font-weight-bold' : 'text-dark'">{{coll + (j != item.collaborators.length-1 ? ',' : '')}} </span>
                                </span>
                                <span v-else>None</span>
                            </p>
                            <p class="mb-1 text-sm"><strong>Owner</strong>: <span class="text-info font-weight-bold">{{item.owner}}</span></p>

                            <div class="w-100 text-right">
                                <button class="btn btn-hov material-icons text-lg">visibility</button>
                                <button class="btn btn-hov material-icons text-lg">create</button>
                                <button class="btn btn-hov material-icons text-lg">delete</button>
                            </div>
                        </div>                    
                    </div>
                    <p v-else class="p-5 mt-5 mb-5 w-100 text-center small">
                        <span class="material-icons display-1 mb-3 text-primary">sentiment_very_dissatisfied</span> <br>
                        <?php echo "No <b>Projects</b> Found <a href='./dashboard.php?projects=recent'>Check for recent Projects</a>"; ?>
                    </p>
                    
                </div>
                <?php } else { ?>                
                <!-- OVERVIEW -->
                <div class="w-100 d-flex align-items-center flex-wrap justify-content-center">
                    <a :href="item.href" class="btn btn-block bg-white border btn-hov ml-2 mr-2 mb-3 d-flex align-items-center justify-content-between" v-for="(item, i) in overview_">
                        <span class="material-icons w-50" :class="'text-'+item.color" style="font-size:12rem">{{item.icon}}</span>
                        <span class="w-50 bd-left text-left p-4">
                            <h2 class="text-dark">{{item.title}}</h2>
                            <p class="small" v-html="item.description"></p>
                        </span>
                    </a>
                </div>
                <?php } ?>
                <!-- OVERVIEW -->


            </div>
        </div>
    </div>

    <?php include_once('../components/footer.php');  ?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/widgets.js"></script>

<script>
let templates = [],
    table = "",
    projects = [],
    owner = '<?php echo $_COOKIE['proto_username']; ?>'
<?php if(isset($_GET['table']) && isset($_GET['type'])) { ?>
    templates = JSON.parse('<?php echo json_encode($result); ?>') || [],
    table = '<?php echo $table; ?>' || null
<?php } else if(isset($_GET['projects'])) {?>    
    table = '<?php echo $table; ?>' || null
    projects = JSON.parse('<?php echo json_encode($result); ?>') || []
<?php } ?>

new Vue({
    el: "#vue",
    data: {
        owner: "",
        create_project: false,
        project_type: "Web",
        project_title: "",
        myprojects: [],
        project_type: "",
        preview: {
            list: [], title: null
        },
        overview_: [
            { title: "PROTOTYPING", icon: "web", color: "warning", href: "./dashboard.php?projects=web", description: "Create your prototypes either from scratch or from build-in templates, it's easy to use and fun to enjoy" },
            { title: "DESIGNING", icon: "toys", color: "dark", href: "./dashboard.php?projects=design", description: "Take your designs to the next level with our powerfull SVG tools. You can import any SVG file and make changes to it.buttondown" },
            { title: "LOGO MAKING", icon: "grass", color: "danger", href: "./logo-maker.php", description: "Logo making is now become more easy with our professional logo maker tool, type your brand-name or your favourite color and we will generate a unique templates of your requirements, <a href='./logo-maker.php'>Try Here</a>" },
            { title: "LOGO TEMPLATES", icon: "spa", color: "success", href: "./dashboard.php?table=logos&type=", description: "Choose from hundereds of unique logo's created by our expert designers and use them in your daily professional life <a href='./dashboard.php?table=logos&type='>Try Here</a>" },
            { title: "PNG TO SVG", icon: "grain", color: "primary", href: "./png-to-svg.php", description: "With our most intelligent algorithms, we bring you a PNG to SVG tool, upload any image and we will convert that image to SVG format to bring the components used in that image to Life, <a href='./png-to-svg.php'>It's Free</a>" },
            { title: "QUOTES", icon: "format_quote", color: "info", href: './dashboard.php?table=designs&type=quote', description: "Being a quote lover, you will find thousands of unique quote templates in SVG formats which you can also customize in our powerfull SVG tool, <a href='./dashboard.php?table=designs&type=quote'>Look for Quotes here</a>" },
            { title: "POSTERS", icon: "receipt_long", color: "warning", href: './dashboard.php?table=designs&type=movie poster', description: "Are you a movie director and wants to have some awesome unique posters for your moview? We got you cover, choose from hundreds of different movie posters, <a href='./dashboard.php?table=designs&type=movie poster'>it's FREE.</a>" },
            { title: "ART", icon: "brush", color: "dark", href:'./dashboard.php?table=designs&type=art', description: "Are you an artist and looking for some professional and beautiful design patterns? Look for the most beautiful and unique arts here and use them for free. <a href='./dashboard.php?table=designs&type=art'>Try your luck</a>" },
        ],
        overview: [
            { title: "Information", icon: "view_quilt", href: "./dashboard.php"}
        ],
        projects: [
            { title: "Home", icon: "home", href: "./dashboard.php?projects=all", value: "all"},
            { title: "My Web Projects", icon: "web", href: "./dashboard.php?projects=web", value: "web"},
            { title: "My Design Projects", icon: "toys", href: "./dashboard.php?projects=design", value: "design"},
            { title: "Recently Opened", icon: "watch_later", href: "./dashboard.php?projects=recent", value: "recent"},
            { title: "Shared With Me", icon: "people_alt", href: "./dashboard.php?projects=shared", value: "shared"},
        ],
        action: [
            { title: "Change Password", icon: "lock"},
            { title: "Logout", icon: "lock_open", href: "./dashboard.php?logout=true" },
        ],
        templates: [
            { title: "Flyer", value: "FLYER", href:"./dashboard.php?table=designs&type=flyer"},
            { title: "Art", value: "FLYER", href:"./dashboard.php?table=designs&type=art"},
            { title: "Movie Poster", value: "MOVIE_POSTER", href:"./dashboard.php?table=designs&type=movie poster"},
            { title: "Facebook Post", value: "FACEBOOK_POST", href:"./dashboard.php?table=designs&type=facebook post"},
            { title: "Instagram Story", value: "INSTAGRAM_STORY", href:"./dashboard.php?table=designs&type=instagram story"},
            { title: "Book Cover", value: "BOOK_COVER", href:"./dashboard.php?table=designs&type=book cover"},
            { title: "Album Art", value: "ALBUM_ART", href:"./dashboard.php?table=designs&type=album art"},
            { title: "Post", value: "POST", href:"./dashboard.php?table=designs&type=post"},
            { title: "Quote", value: "QUOTE", href:"./dashboard.php?table=designs&type=quote"}            
        ]
    },
    methods: {
        create_project_func() {
            let collaborators = JSON.stringify([])
            if(this.project_title) {
                axios({
                    method: "GET",
                    url: DOMAIN + `/api/create-project.php?title=${this.project_title}&type=${this.project_type}&owner=${owner}&collaborators=${collaborators}`,
                    headers: { 'enctype': 'multipart/form-data'}
                })
                .then(res => {
                    if(res.data == "SUCCESS") {
                        alertmsg("Project Created Successfully", "success")
                        setTimeout(() => {
                            location.reload()
                        }, 1000);

                    }
                })
               
            }
            else {
                alertmsg("Please Enter Project Title", "danger")
            }
        },
        open_logo(url) {
            window.location.href = DOMAIN + "/pages/svgedit-master/src/editor/svg-editor.html?url=" + url
        },
    },
    mounted() {  
        this.owner = owner  
        this.project_type = table
        if(table.toLowerCase() == "designs" || table.toLowerCase() == "logos" && templates.length > 0) {
            this.preview.list = templates
        }
        if(this.preview.list.length > 0) {
            for(let i=0; i<this.preview.list.length; i++) {
                this.preview.list[i].url = DOMAIN + '/uploads/' + table.toLowerCase() + '/' + this.preview.list[i].thumbnail
            }
        }
        else if(projects.length > 0) {
            for(let i=0; i<projects.length; i++) {
                let datetime = timestamp(projects[i].datetime)       
                if(table != "shared") {
                        this.myprojects.push({
                        id: projects[i].id,
                        date: timeDifference(datetime),
                        title: projects[i].title,
                        html: projects[i].html_file,
                        css: projects[i].css_file,
                        js: projects[i].js_file,
                        type: projects[i].type,
                        owner: projects[i].owner,
                        collaborators: []
                    })
                    axios.get(DOMAIN + "/api/project.php?id="+ projects[i].id)
                    .then(res => {
                        this.myprojects[i].collaborators = JSON.parse(res.data.collaborators)
                    })                
                }
                else {
                    axios.get(DOMAIN + "/api/project.php?id="+ projects[i].id)
                    .then(res => {
                        let collaborators = JSON.parse(res.data.collaborators)
                        if(collaborators.includes(owner)) {
                            this.myprojects.push({
                                id: projects[i].id,
                                date: timeDifference(datetime),
                                title: projects[i].title,
                                html: projects[i].html_file,
                                css: projects[i].css_file,
                                js: projects[i].js_file,
                                type: projects[i].type,
                                owner: projects[i].owner,
                                collaborators
                            })

                        }
                    })                
                    
                }         

            }
        }
    }
})

window.onload = function() { $(document.querySelector("body")).removeClass("d-none") }

</script>    
</body>
</html>