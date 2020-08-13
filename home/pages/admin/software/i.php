<?php
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
  if(!isset($_COOKIE['dishsatinfo'])) {
    include_once("../../../include/config.php");
    header("Location: " . $root);  
  }
?>
<html lang="en">
<head>
    <title>Dish Satellite Information</title>
    <meta charset="UTF-8">
    <meta data-hid="description" name="description" content="Dish Satellite Information">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link data-n-head="ssr" rel="icon" type="image/x-icon" href="/favicon.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../../css/bootstrap.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
<div class="border mb-5" v-if="visible" id="admin-software">
  <h2 class="text-center bd-bottom p-4 w-100">Adding Software Data Entry Page.</h2>
  <br>
  <div class="w-50 m-auto">
    <button :class="software ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{software ? 'check' : 'close'}}</span> <span>Software File</span></button>
    <button :class="thumbnail ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{thumbnail ? 'check' : 'close'}}</span> <span>Thumbnail</span></button>
    <button :class="title ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{title ? 'check' : 'close'}}</span> <span>Title</span></button>
    <button :class="type ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{type ? 'check' : 'close'}}</span> <span>Type</span></button>
    <button :class="description ? 'text-success' : 'text-danger'" class="btn text-left btn-block align-items-center d-flex"><span class="material-icons mr-2">{{description ? 'check' : 'close'}}</span> <span>Description</span></button>
  </div>
  <br>
  
  <form class='w-50 m-auto' method='POST' enctype="multipart/form-data" ref="img_form" id="software-form">
    <div class="mb-2 mt-2">
        <p>Add Source File And Thumbnail</p>
        <div class="custom-file mb-3">
          <input name='software' type="file" class="custom-file-input" v-model="software" @change="check(software, 'software')">
          <label class="custom-file-label" for="customFile">Choose Software File</label>
        </div>
        <div class="custom-file mb-3">
          <input name='thumbnail' type="file" class="custom-file-input" v-model="thumbnail" @change="check(thumbnail, 'thumbnail')">
          <label class="custom-file-label" for="customFile">Choose Thumbnail</label>
        </div>
    </div>
    <div class="w-100 m-auto">
      <div class="form-group mb-4">
        <label for="title">Title:</label>
        <input type="text" name="title" class="form-control" v-model="title" id="title" placeholder="PC title i.e. AMD G">
      </div>

      <div class="form-group mb-4">
        <label for="model">Type:</label>
        <select class="custom-select" v-model="type" name="type">
            <option :value="t.title" v-for="(t, i) in types">{{t.title}}</option>
        </select>      
      </div>


      <div class="form-group mb-4">
        <label for="description">Description:</label><br>
        <textarea name="description" id="description" cols="30" rows="10" class="w-100" v-model="description"></textarea>
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
<script>
var v_admin_software = new Vue({
    el: "#admin-software",
    data() {
        return {
            loading: false,
            title: null,
            description: null,
            types: [
                { title: "Neosat Receiver Software", value: "NEOSAT_RECEIVER_SOFTWARE" },
                { title: "China Receiver Software", value: "CHINA_RECEIVER_SOFTWARE" },
                { title: "Startrack Receiver Software", value: "STARTRACK_RECEIVER_SOFTWARE" },
                { title: "Echolink Receiver Software", value: "ECHOLINK_RECEIVER_SOFTWARE" },
                { title: "Other Brand Software", value: "OTHER_BRAND_SOFTWARE" },
            ],
            type: null,
            software: null,
            thumbnail: null,
            visible: true,
            valid_extensions: ["jpg", "png", "webp", "jpeg", "gif"]
        }
    },
    methods: {
        check(file, type) {
            let extension = imgExtension(file)
            
            if(type == "thumbnail" && !this.valid_extensions.includes(extension)) {
                this.thumbnail = null
                alert("Try to choose valid image present in .jpg, .png, .webp, .jpeg or .gif format")
            }
            else if(type == "software" && this.valid_extensions.includes(extension)) {
                this.software = null
                alert("The Software file that you selected is not valid and it may be an image that you are trying to upload as software file.")
            }
        },
            
        upload() {
            if(this.type && this.title && this.thumbnail && this.software && this.description && navigator.onLine) {
            this.loading=true        
            let form = new FormData(document.getElementById('software-form'))
            axios({
                method: "post",
                url: DOMAIN + `/pages/admin/software/db-i.php`,
                data: form,
                headers: { 'enctype': 'multipart/form-data'}
            })
            .then(res => {
              console.log(res, 'my response.')
              if(res.data == "INSERT_SUCCESS") {
                alert("Inserted Successfully")
              } else {
                alert(res.data)
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