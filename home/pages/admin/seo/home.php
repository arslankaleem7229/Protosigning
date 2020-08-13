<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    if(!isset($_COOKIE['dishsatinfo'])) {
      include_once("../../../include/config.php");
      header("Location: " . $root);  
    }
    
    if(isset($_POST['page'])) {
        include_once("../../../include/connection.php");
        if($conn->connect_error) {
            die("Connection Failed". $conn->connect_error);
        }
        $page = $_POST['page'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $keywords = $_POST['keywords'];
    
        $sql = $conn->query(
            "UPDATE meta_tags SET title = '$title', description = '$description', keywords = '$keywords' where page = '$page'"
        );
    
        if($sql) {
            echo "SUCCESS";
            exit();
        } else {
            echo $sql;
            exit();
        }    
    }
?>

<html lang="en">
<head>
    <title>Create a Post</title>
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
<div class="border mb-5" id="admin-software">
  <h2 class="text-center bd-bottom p-4 w-100">Update Page Meta Tags.</h2>
  <form class='w-50 m-auto' method='POST' @submit="$event.preventDefault()" enctype="multipart/form-data" ref="img_form" id="post-form">
    <div class="w-100 m-auto">

      <div class="form-group mb-4">
        <label for="model">Page:</label>
        <select class="custom-select" v-model="page" name="page">
            <option :value="t.title" v-for="(t, i) in pages">{{t.title}}</option>
        </select>      
      </div>
      <div class="form-group mb-4">
        <label for="title">Title:</label>
        <input type="text" name="title" class="form-control" v-model="title" id="title" placeholder="PC title i.e. AMD G">
      </div>


      <div class="form-group mb-4">
        <label for="description">Description</label><br>
        <textarea name="description" id="description" cols="30" rows="10" class="w-100" v-model="description"></textarea>
      </div>
      <div class="form-group mb-4">
        <label for="keywords">Keywords</label><br>
        <textarea name="keywords" id="keywords" cols="30" rows="10" class="w-100" v-model="keywords"></textarea>
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
var v_admin_software = new Vue({
    el: "#admin-software",
    data() {
        return {
            loading: false,
            title: null,
            description: null,
            keywords: null,
            pages: [
                { title: "home", value: "home"},
                { title: "software", value: "software"}
            ],
            page: null,
        }
    },
    methods: {
      upload() {
        if(this.page && this.title && this.keywords && this.description && navigator.onLine) {
          this.loading=true        
          let form = new FormData(document.getElementById('post-form'))
          axios({
            method: "POST",
            url: DOMAIN + `/pages/admin/seo/home.php`,
            data: form,
            headers: { 'enctype': 'multipart/form-data'}
          })
          .then(res => {
            if(res.data == "ALREAD_CREATED") {
              alert("The Post That you are trying to create is already been created.")
            } else {
                if(res.data == "SUCCESS") {
                    alert("UPDATED SUCCESSFULLY.")
                }
                else {
                    alert("ERROR OCCURED." + res.data)
                }
            }
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
    }

})    
</script>
</body>
</html>