<?php
    include_once("../include/config.php");
    if(isset($_GET['logout'])) {
        setcookie('proto_username', null, -1, '/'); 
        header("Location: " . $root . "/pages/home.php");  
        exit();
    }
    else {
        if(!isset($_COOKIE["proto_username"]) || !isset($_GET['id']) || !isset($_GET['title']) || !isset($_GET['owner'])) {
            header("Location: " . $root . "/pages/dashboard.php");  
            exit();
        }
        
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
        include_once("../include/connection.php");
        $result = array();
        $title = $_GET['title'];
        $id = $_GET['id'];
        $owner = $_GET['owner'];
        $self = $_GET['self'];
        if($conn->connect_error) {
            die("Connection Failed". $conn->connect_error);
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
    <link rel="stylesheet" href="./minified/themes/default.min.css" />
    <script src="./development/sceditor.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@shopify/draggable@1.0.0-beta.6/lib/draggable.bundle.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <style>
        #tools {
            width: 250px;
        }
        #editor-container {
            width: calc(100% - 250px);
        }
        #editor {
            min-width: 500px !important;
            max-width: 100% !important;
            min-height: 500px !important;
            background-color: #29e;
            font-size: 20px;
            font-family: sans-serif;
            border-radius: 8px;
            padding: 20px;
            touch-action: none;
        }
        #editor *:focus {
            outline: none; 
        }
    </style>   
</head>
<body class='d-none'>
    <?php include_once('../components/editor-header.php');  ?>

    <div class="container-fluid" id="vue">
        <div class="p-absolute">
            <button :id="'user-'+item" class="btn text-md" :class="'text-' + colors[i]" v-for="(item, i) in collaborators" :title="item">
                <span class="material-icons">pan_tool</span><br>
                <span class="text-sm">{{item}}</span>
            </button>
        </div>
        <br>
        <div class="d-flex">
            <div class="flex-shrink-0" id="tools">
                <div class="mb-5">
                    <h4 class="mb-3 font-weight-bold ls-1">Components</h4>
                    <button @click="insert(item.title)" class="btn btn-block text-left pl-3 pr-3 btn-hov d-flex align-items-center" v-for="(item, i) in components">
                        <span class="material-icons mr-3" :class="'text-' + item.color">{{item.icon}}</span>
                        <span>{{item.title}}</span>
                    </button>
                </div>
            </div>
            <div class="flex-shrink-0 p-relative" id="editor-container">
                <div class="w-100 d-flex justify-content-between align-items-center p-2">
                    <div>
                        <button @click="format(item.title, $event, item)" class="btn pl-1 pr-1 hov" v-for="(item, i) in formatting">
                            <span v-if="item.icon" class="material-icons text-md" :class="item.active ? 'text-primary bg-light' : '' ">{{item.icon}}</span>
                            <span v-if="item.class" :class="item.class"></span>
                            <span v-if="item.text" class="font-weight-bold">{{item.text}}</span>
                        </button>
                    </div>
                    <div>
                        <input type="text" class="border bd-radius-5 bg-white pt-1 pb-1 pl-2 pr-2 text-sm" placeholder="Text will show here" name="" id="text" v-model="text" @keyup="change_text()">
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-center border p-2">
                    <div class="bg-white border draggable" id="editor" style="500px;height:500px"></div>
                </div>
            </div>
        </div>
    </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../js/functions.js"></script>
<script type="module" src="../js/draggable.js">
</script>
<script>
let project_owner = '<?php echo $owner; ?>',
    project_title = '<?php echo $title; ?>',
    project_id = '<?php echo $id; ?>',
    project_self = '<?php echo $self; ?>'

new Vue({
    el: "#vue",
    data: {
        text: null,
        active: null,
        bold: false,
        // editing: true,
        updating_project: false,
        colors: ["primary", "success", "danger", "dark", "info", "warning"],
        collaborators: [],
        containered: ["BUTTON"],
        formatting: [
            { icon: "format_bold", title: "bold", active: false},
            { icon: "format_italic", title: "italic", active: false},
            { icon: "format_underline", title: "underline", active: false},
            { icon: "strikethrough_s", title: "line-through", active: false},
            { icon: "format_clear", title: "clear-format"},
            { class: "bd-left pl-2"},
            { icon: "text_format", title: "color" },
            { icon: "brush", title: "background-color"},
            { class: "bd-left pl-2"},
            { title: "row", text:"row" },
            { title: "col", text: "col"},
            { class: "bd-left pl-2"},
            { icon: "delete", title: "delete" },
            { icon: "content_copy", title: "copy"},
            { class: "bd-left pl-2"},
            { icon: "format_align_left", title: "align-left" },
            { icon: "format_align_center", title: "align-center"},
            { icon: "format_align_right", title: "align-right"},
        ],
        components: [
            { title: "Rounded Button", icon: "toggle_on", color: "primary"},
            { title: "Loader", icon: "hourglass_bottom", color: "primary"},
            { title: "List Items", icon: "list", color: "primary"},
            { title: "Text Field", icon: "view_quilt"},
            { title: "Paragraph", icon: "grading", color: "primary"},
            { title: "Heading", icon: "power_input", color: "primary"},
            { title: "Checkbox", icon: "check_box", color: "primary"},
            { title: "Radio Button", icon: "radio_button_checked", color: "primary"},
            { title: "Container", icon: "wysiwyg", color: "primary"},
            { title: "Table", icon: "table_chart", color: "primary"},
            { title: "Card", icon: "credit_card", color: "primary"},
            { title: "Modal", icon: "view_quilt"},
        ],
    },
    methods: {
        change_text() {
            this.active.text(this.text)
        },
        format(type, e, obj) {
            if(!this.active) {
                alertmsg("Select A Component", "info")
                return
            }

            let offset = $(e.target).offset()
            switch(type) {
                case "align-left":
                    this.active.removeClass("text-left text-center text-right")
                    this.active.toggleClass("text-left")
                    break
                case "align-right":
                    this.active.removeClass("text-left text-center text-right")
                    this.active.toggleClass("text-right")
                break
                case "align-center":
                    this.active.removeClass("text-left text-center text-right")
                    this.active.toggleClass("text-center")
                break
                case "row":
                    this.active.removeClass("bd-blue")
                    let duplicate = this.active.clone()
                    duplicate.insertAfter(this.active)
                    break
                case "col":
                    this.active.removeClass("bd-blue")
                    this.active = this.active.parent()
                    let dup_col = this.active.clone()
                    dup_col.insertAfter(this.active)
                    break
                case "copy":
                    let copy = this.active.clone()
                    make_it_draggable(copy)    
                    $("#editor").append(copy)            
                    break
                case "delete":
                    this.active.remove()
                    this.active = null
                    break
                case "color":
                case "background-color":
                    this.fg_bg(type, offset)
                    break
                case "bold":
                    this.active.toggleClass("font-weight-bold")
                    obj.active = !obj.active
                    break
                case "italic":
                    this.active.toggleClass("text-italic")
                    obj.active = !obj.active
                    break
                case "underline":
                    this.active.toggleClass("text-underline")
                    obj.active = !obj.active
                    break
                case "line-through":
                    this.active.toggleClass("text-line-through")
                    obj.active = !obj.active
                    break
                case "clear-format":
                    this.active.removeClass("font-weight-bold text-italic text-underline text-line-through")
                    this.formatting[0].active = this.formatting[1].active = this.formatting[2].active = this.formatting[3].active = false
                    break
            }
            this.save_project()
        },
        fg_bg(type, offset) {
            let palette = $(`<div class="sceditor-dropdown sceditor-color-picker"><div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #000000" data-color="#000000" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #44B8FF" data-color="#44B8FF" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #1E92F7" data-color="#1E92F7" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #0074D9" data-color="#0074D9" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #005DC2" data-color="#005DC2" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #00369B" data-color="#00369B" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #b3d5f4" data-color="#b3d5f4" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #444444" data-color="#444444" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #C3FFFF" data-color="#C3FFFF" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #9DF9FF" data-color="#9DF9FF" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #7FDBFF" data-color="#7FDBFF" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #68C4E8" data-color="#68C4E8" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #419DC1" data-color="#419DC1" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #d9f4ff" data-color="#d9f4ff" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #666666" data-color="#666666" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #72FF84" data-color="#72FF84" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #4CEA5E" data-color="#4CEA5E" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #2ECC40" data-color="#2ECC40" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #17B529" data-color="#17B529" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #008E02" data-color="#008E02" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #c0f0c6" data-color="#c0f0c6" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #888888" data-color="#888888" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FFFF44" data-color="#FFFF44" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FFFA1E" data-color="#FFFA1E" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FFDC00" data-color="#FFDC00" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #E8C500" data-color="#E8C500" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #C19E00" data-color="#C19E00" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #fff5b3" data-color="#fff5b3" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #aaaaaa" data-color="#aaaaaa" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FFC95F" data-color="#FFC95F" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FFA339" data-color="#FFA339" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FF851B" data-color="#FF851B" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #E86E04" data-color="#E86E04" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #C14700" data-color="#C14700" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #ffdbbb" data-color="#ffdbbb" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #cccccc" data-color="#cccccc" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FF857A" data-color="#FF857A" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FF5F54" data-color="#FF5F54" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FF4136" data-color="#FF4136" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #E82A1F" data-color="#E82A1F" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #C10300" data-color="#C10300" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #ffc6c3" data-color="#ffc6c3" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #eeeeee" data-color="#eeeeee" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FF56FF" data-color="#FF56FF" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #FF30DC" data-color="#FF30DC" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #F012BE" data-color="#F012BE" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #D900A7" data-color="#D900A7" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #B20080" data-color="#B20080" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #fbb8ec" data-color="#fbb8ec" unselectable="on"></a></div><div class="sceditor-color-column" unselectable="on"><a href="#" class="sceditor-color-option" style="background-color: #ffffff" data-color="#ffffff" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #F551FF" data-color="#F551FF" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #CF2BE7" data-color="#CF2BE7" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #B10DC9" data-color="#B10DC9" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #9A00B2" data-color="#9A00B2" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #9A00B2" data-color="#9A00B2" unselectable="on"></a><a href="#" class="sceditor-color-option" style="background-color: #e8b6ef" data-color="#e8b6ef" unselectable="on"></a></div></div></div>`)
            palette.css({
                top: offset.top,
                left: offset.left
            })
            palette.find("a").click((e) => {
                this.active.css(type, $(e.target).attr("data-color"))                                
            })
            palette.mouseleave(() => palette.remove())
            $(document.body).append(palette)
        },
        insert(type) {
            let component = null
            switch(type) {
                case "Card":
                    component = $(`
                        <div class="card draggable" style="width:400px" type="card">
                            <div class="card-body" type="card">
                            <h4 class="card-title" style="z-index:1000" type="Heading">John Doe</h4>
                            <p class="card-text" type="Paragraph">Some example text some example text. John Doe is an architect and engineer</p>
                            <a href="#" type="button" class="btn btn-primary stretched-link">See Profile</a>
                            </div>
                        </div>                    
                    `)
                    break
                case "Container":
                    component = $(`
                        <div class="container p-3 my-3 draggable" type="container">
                        <h1 type="Heading">My First Bootstrap Page</h1>
                        <p type="Paragraph">This container has a border and some extra padding and margins.</p>
                        </div>                    
                    `)
                    break
                case "Radio Button":
                    component = $(`
                        <div class="custom-control draggable custom-radio d-flex align-items-center justify-content-center" type="radio-button">
                        <input type="radio" class="custom-control-input" id="customRadio" name="example1">
                        <label class="custom-control-label" for="customRadio"></label>
                        </div>                        
                    `)
                    break
                case "Checkbox":
                    component = $(`
                        <div class="custom-control draggable custom-checkbox d-flex align-items-center justify-content-center" type="checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck" name="example1">
                            <label class="custom-control-label" for="customCheck"></label>
                        </div>                    
                    `)
                    break
                case "Table":
                    component = $(`
                        <table class="table draggable" contenteditable="true" type="table">
                            <thead contenteditable="true">
                                <tr contenteditable="true">
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody contenteditable="true">
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>john@example.com</td>
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td>Moe</td>
                                <td>mary@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                            </tr>
                            </tbody>
                        </table>                    
                    `)
                    break
                case "List Items":
                    component = $(`
                        <ul contenteditable="true" type="ul" class="border draggable">
                        <li contenteditable="true" class="draggable">List Item 1</li>
                        <li contenteditable="true">List Item 2</li>
                        <li contenteditable="true">List Item 3</li>
                        <li contenteditable="true">Add another List Item</li>
                        </ul>                      
                    `)                    
                    break
                case "Loader":
                    component = $(`<button class="btn draggable pl-4 pr-4"><span type="loader" class="spinner-border spinner-border-lg"></span></button>`)                    
                    break
                case "Rounded Button":
                    component = $(`<button type="button" class="text-md draggable box-shadow bd-round bd-none btn btn-success pl-4 pr-4">Edit This Text</button>`)
                    break
                case "Paragraph":
                    component = $(`<p type="paragraph" class="border draggable p-2 text-center" contenteditable="true">This Text is default Paragraph text and you can change it by clicking the edit button from the tool bar</p>`)
                    break
                case "Heading":
                    component = $(`<h1 type="heading" class="border draggable p-2 text-center display-2" contenteditable="true">This Is A Heading</h1>`)
                    break
            }
            $("#editor").append(component)        
            this.save_project()
        },
        save_project() {
            if(this.updating_project) return
            axios.get(DOMAIN + "/api/project.php?id=" + project_id)
            .then(res => {
                let formData = new FormData()
                let html = {}                
                if(res.data.html_file) {
                    html = JSON.parse(res.data.html_file)
                }
                if(html["owner"]) {
                    this.save_project_data(html["owner"], () => {
                        let url = DOMAIN + '/uploads/projects/' + html["owner"] 
                        read_file(url, (text) => {
                            $("#editor").html(text)
                            this.editing = false
                        })
                    })
                }
                else if(!html["owner"]) {
                    let path = Date.now() + " - html.txt"
                    this.save_project_data(path)
                    this.editing = false
                }
            })
        },
        save_project_data(path, callback) {
            let changes = {}
            changes["owner"] = path

            var file = new File([$("#editor").html()], path , {type: "plain/text"});
            let formData = new FormData()                    
            
            formData.append("file", file)
            formData.append("html_file", JSON.stringify(changes))
            formData.append("project_id", project_id)
            formData.append("path", path)
            axios({
                method: "POST",
                url: DOMAIN + `/api/update-project.php`,
                data: formData,
                headers: { 'enctype': 'multipart/form-data'}
            })
            .then(res => {
                alertmsg("Changes Saved", "success")
                this.editing = false
                callback()
            })

        },
        update_cursor(e) {
            let user = $("#user-" + project_self),
                cursor = {}
            user.css({
                // left: (e.clientX) + 'px',
                // top: (e.clientY) + 'px',
                // position: "absolute",
                // zIndex: "100000"
            })
            cursor[project_self] = { left: e.clientX, top: e.clientY }

            let formData = new FormData()      
            formData.append("cursor", JSON.stringify(cursor))    
            formData.append("project_id", project_id)          
            axios({
                method: "POST",
                url: DOMAIN + `/api/update-cursor.php`,
                data: formData,
                headers: { 'enctype': 'multipart/form-data'}
            })
            .then(res => {
                this.update_other_cursor()
                // alertmsg("Cursor Updated", "success")
            })
        },
        update_other_cursor() {
            axios.get(DOMAIN + "/api/get-cursor.php?id=" + project_id )
            .then(res => {
                if(res.data) {
                    let cursors = JSON.parse(res.data.cursor_location)
                    // console.log(cursors, 'my cursors')
                }
            })
        },
        update_project() {
            axios.get(DOMAIN + "/api/project.php?id=" + project_id)
            .then(res => {
                let html = {}                
                if(res.data.html_file) {
                    html = JSON.parse(res.data.html_file)
                }
                if(html["owner"]) {
                    let url = DOMAIN + '/uploads/projects/' + html["owner"] 
                    read_file(url, (text) => {
                        $("#editor").html(text)
                        alertmsg("Project Updated on other screens", "info")
                        this.updating_project = false
                    })

                }
            })   
        }
    },
    mounted() {    
        $(document.body).click((e) => {
            if(has_parent_id(e.target, "editor") && $(e.target).attr("id") !== "editor") {
                if(this.active) {
                    this.active.removeClass("bd-blue")
                }
                this.active = $(e.target)
                this.active.addClass("bd-blue")
                this.text = this.active.text()                
            }
        })
        $("#editor-container").mousedown(e => { this.editing = true})
        $("#editor-container").dblclick(e => { 
            this.updating_project = true
            this.update_project()
         })
        $("#editor-container").mouseup(e => { setTimeout(() => {
            // this.save_project()
        }, 1000); })
        $("#editor").mousemove(e => {
            setTimeout(() => {
                this.update_cursor(e)
            }, 100);
        })
        axios.get(DOMAIN + "/api/project.php?id=" + project_id)
        .then(res => {
            let html = {}                
            if(res.data.html_file) {
                html = JSON.parse(res.data.html_file)
            }
            if(html["owner"]) {
                let url = DOMAIN + '/uploads/projects/' + html["owner"] 
                read_file(url, (text) => {
                    $("#editor").html(text)
                })
            }
        })        
        axios.get(DOMAIN + "/api/project.php?id="+ project_id)
        .then(res => {
            this.collaborators = JSON.parse(res.data.collaborators)
            this.collaborators.push(project_owner)
        })

        setInterval(() => {
            // this.update_project()
        }, 1000);
    }
})
window.onload = function() { $(document.querySelector("body")).removeClass("d-none") }
</script>    
</body>
</html>