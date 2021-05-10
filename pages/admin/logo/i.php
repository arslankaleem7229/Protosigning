<?php
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
  if(!isset($_COOKIE['dishsatinfo'])) {
    include_once("../../../include/config.php");
    header("Location: " . $root);  
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
<div class="border mb-5" v-if="visible" id="admin-software">
  <h2 class="text-center bd-bottom p-4 w-100">Insert A Logo.</h2>
  <br>
  <div class="w-50 m-auto">
    <button :class="thumbnail ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{thumbnail ? 'check' : 'close'}}</span> <span>Thumbnail</span></button>
    <button :class="title ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{title ? 'check' : 'close'}}</span> <span>Title</span></button>
    <button :class="type ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{type ? 'check' : 'close'}}</span> <span>Type</span></button>
  </div>
  <br>
  <form class='w-50 m-auto' method='POST' @submit="$event.preventDefault()" enctype="multipart/form-data" ref="img_form" id="post-form">
    <div class="mb-2 mt-2">
        <p>Add Logo File (SVG)</p>
        <div class="custom-file mb-3">
          <input name='thumbnail' type="file" class="custom-file-input" v-model="thumbnail" @change="check(thumbnail, 'thumbnail')">
          <label class="custom-file-label" for="customFile">Choose Thumbnail</label>
        </div>
    </div>
    <div class="w-100 m-auto">
      <div class="form-group mb-4">
        <label for="title">Title:</label>
        <input type="text" name="title" class="form-control" v-model="title" id="title" placeholder="PC title i.e. AMD G" @keyup="trim()">
      </div>

      <div class="form-group mb-4">
        <label for="type">Specify type (Category):</label><br>
        <textarea name="type" id="type" cols="30" rows="10" class="w-100" v-model="type"></textarea>
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
            type: null,
            thumbnail: null,
            visible: true,
            valid_extensions: ["svg"]
        }
    },
    methods: {
        trim() {
            this.title = regex.title(this.title)
        },
        check(file, type) {
            let extension = imgExtension(file)
            
            if(type == "thumbnail" && !this.valid_extensions.includes(extension)) {
                this.thumbnail = null
                alert("Try to choose valid image present in .svg format")
            }
        },
      upload() {
        if(this.type && this.title && navigator.onLine) {
          this.loading=true        
          let form = new FormData(document.getElementById('post-form'))
          axios({
            method: "POST",
            url: DOMAIN + `/pages/admin/logo/db-i.php`,
            data: form,
            headers: { 'enctype': 'multipart/form-data'}
          })
          .then(res => {
            if(res.data == "ALREAD_CREATED") {
              alert("The Post That you are trying to create is already been created.")
            } else {
                if(res.data == "SUCCESS") {
                    alert("Post Successfully created.")
                }
                else {
                    alert("ERROR OCCURED.")
                    console.log(res, 'res')
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