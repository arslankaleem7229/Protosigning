<?php
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
  if(!isset($_COOKIE['dishsatinfo'])) {
    include_once("../../../include/config.php");
    header("Location: " . $root);  
  }
    include_once("../../../include/connection.php");
    $sql = $conn->query("SELECT * FROM posts ");
    $post = array();
    if($sql) {
        while($row = $sql->fetch_assoc()) {
            array_push($post, $row);
        }        
        $post = json_encode($post);     
        $conn->close();    
    }

?>
<html lang="en">
<head>
    <title>Add A comment</title>
    <meta charset="UTF-8">
    <meta data-hid="description" name="description" content="Dish Satellite Information">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link data-n-head="ssr" rel="icon" type="image/x-icon" href="/favicon.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../../../css/bootstrap.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
<div class="border mb-5" v-if="visible" id="admin-software">
  <h2 class="text-center bd-bottom p-4 w-100">Add A comment To A Post.</h2>
  <br>
  <div class="w-50 m-auto">
    <button :class="post ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{post ? 'check' : 'close'}}</span> <span>Post</span></button>
    <button :class="description ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{description ? 'check' : 'close'}}</span> <span>Description</span></button>
  </div>
  <br>
  <form class='w-50 m-auto' method='POST' @submit="$event.preventDefault()" enctype="multipart/form-data" ref="img_form" id="post-form">
    <div class="w-100 m-auto">
      <div class="form-group mb-4">
        <label for="title">Title (Optional)</label>
        <input type="text" name="title" class="form-control" v-model="title" id="title" placeholder="PC title i.e. AMD G">
      </div>

      <div class="form-group mb-4">
        <div class="form-group">
            <label for="post">Post:</label>
            <input type="text" name="post" class="form-control" v-model="post" id="post" placeholder="PC title i.e. AMD G" @blur="check_post()">
        </div>
        <label for="model">Select Post:</label>
        <select class="custom-select" v-model="post" name="abcd" id="post">
            <option :value="t.title" v-for="(t, i) in posts">{{t.title.toUpperCase()}}</option>
        </select>      
      </div>


      <div class="form-group mb-4">
        <label for="description">Description:</label><br>
        <textarea name="description" id="description" cols="30" rows="10" class="w-100" v-model="description"></textarea>
      </div>
      <div class="form-group mb-4">
        <label for="images">Images:</label><br>
        <textarea name="images" id="images" cols="30" rows="10" class="w-100" v-model="images"></textarea>
      </div>

      <button type="button" class="btn btn-primary" v-if="loading"><span class="spinner-border spinner-border-sm"></span> <span> Uploading...</span></button>
      <button type="button" class="btn btn-primary" @click="upload($event)" :class="loading ? 'd-none': '' ">{{ loading ? 'Please Wait...' : 'Upload' }}</button>
    </div>
  </form>
  <br><br><br>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="../../../js/functions.js"></script>
<script src="../../../js/config.js"></script>
<script src="../../../js/variables.js"></script>
<script>
let posts = JSON.parse(<?php echo json_encode($post); ?>)

var v_admin_software = new Vue({
    el: "#admin-software",
    data() {
        return {
            post: null,
            posts: [],
            loading: false,
            title: null,
            description: null,
            thumbnail: null,
            visible: true,
            type: null,
            valid_extensions: ["jpg", "png", "webp", "jpeg", "gif"],
            images: null,
        }
    },
    methods: {
        check_post() {
            let $this = this
            if(this.post) {
                let available = this.posts.filter(function(el) {
                    return el.title == $this.post
                })
                if(available.length == 0) {
                    this.post = null
                }
            }
        },
      upload() {
        if(this.post && this.description && navigator.onLine) {
          this.loading=true        
          let form = new FormData(document.getElementById('post-form'))
          axios({
            method: "POST",
            url: DOMAIN + `/pages/admin/comment/db-i.php`,
            data: form,
            headers: { 'enctype': 'multipart/form-data'}
          })
          .then(res => {
              alert(res.data, 'this is the response.')
            this.loading = false
          })          
        }
        else {
          if(!navigator.onLine) {
            alert("Check your internet connection, internet conectivity problem")
          } else {
            alert("One Or More Field is Empty.")
          }
        }
      }
    },
    mounted() {
        this.posts = posts
    }

})    
</script>
</body>
</html>