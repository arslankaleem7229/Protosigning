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
<div class="border mb-5" id="admin-software">
  <h2 class="text-center bd-bottom p-4 w-100">Upload An Image.</h2>
  <form class='w-50 m-auto' method='POST' @submit="$event.preventDefault()" enctype="multipart/form-data" ref="img_form" id="post-form">
    <div class="w-100 m-auto">

    <div class="mb-2 mt-2">
        <p>Add Image</p>
        <div class="custom-file mb-3">
          <input name='image' type="file" class="custom-file-input" v-model="image" @change="check(image)">
          <label class="custom-file-label" for="customFile">Choose Image File</label>
        </div>
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
            image: null,
            valid_extensions: ["jpg", "png", "webp", "jpeg", "gif"]
        }
    },
    methods: {
        check(file) {
            let extension = imgExtension(file)
            
            if(!this.valid_extensions.includes(extension)) {
                this.img = null
                alert("Try to choose valid image present in .jpg, .png, .webp, .jpeg or .gif format")
            }
        },
      upload() {
        if(this.image && navigator.onLine) {
          this.loading=true        
          let form = new FormData(document.getElementById('post-form'))
          axios({
            method: "POST",
            url: DOMAIN + `/pages/admin/upload/db-img.php`,
            data: form,
            headers: { 'enctype': 'multipart/form-data'}
          })
          .then(res => {
            this.loading = false
            prompt("IMG URL (Copy This)", res.data)
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