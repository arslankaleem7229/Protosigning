<template>
  <div class="container">
    <div class="custom-file m-5">
        <input type="file" class="custom-file-input" id="customFile" ref="upload-file">
        <label class="custom-file-label" for="customFile">Choose file</label>
    </div>
    <div class="custom-file m-5">
        <input type="file" class="custom-file-input" id="customFile" ref="upload">
        <label class="custom-file-label" for="customFile">Choose Image</label>
        <input type="text" class="mt-3 w-100 bg-dark p-3 bd-round border" placeholder="File Title" v-model="title">
        <select v-model="category" class="custom-select">
            <option v-for="(item, i) in elements" :key="i" :value="item['value']">
                {{item['title']}}
            </option>
            <option value="poster" selected>Poster</option>
            <option value="facebookPost">facebook Post</option>
            <option value="card">Card</option>
        </select>        
        <input type="text" class="mt-3 w-100 bg-dark p-3 bd-round border" placeholder="Category" v-model="sub_category">
        <button @click="insertIntoStorage()" class="btn btn-block btn-success p-3 bd-round border mt-3">Upload</button>
        <button @click="generateUUID()" class="btn btn-block btn-success p-3 bd-round border mt-3">Generate UUID</button>

        <p>{{uid}}</p>
    </div> 
  </div>
</template>

<script>
import { auth, db, storage } from '@/services/firebase'
import {v4 as uuid} from 'uuid'
export default {
    data() {
        return {
            uid: null,
            elements: [
                { value: "basic", title: "Basic"},
                { value: "graphical", title: "Graphical"},
                { value: "food", title: "Food"},
                { value: "socialMedia", title: "Social Media"},
                { value: "pieChart", title: "Pie Chart"},
                { value: "objects", title: "Objects"},
                { value: "symbols", title: "Symbols"},
                { value: "arrows", title: "Arrows"},
                { value: "flowchart", title: "Flowchart"},
                { value: "animals", title: "Animals"},
                { value: "cardsAndChess", title: "Cards & Chess"},
                { value: "dialogBallons", title: "Dialog ballons"},
                { value: "electronics", title: "Electronics"},
                { value: "mathematical", title: "Mathematical"},
                { value: "music", title: "Music"},
                { value: "miscellaneous", title: "Miscellaneous"},
            ],
            title: "My Title",
            category: "",
            src: null,
            width: 0,
            height: 0,
            img_extension: "",
            text_extention: "",
            img_file: null,
            text_file: null,
            sub_category: "Corona Virus Facebook post",
            key: null,
            img_url: null,
            file_url: null,
            _uuid: null
        }
    },
    methods: {
        generateUUID() {
            this.uid = uuid()
        },
        insertIntoStorage() {
            try {
                let $this = this
                $this._uuid = uuid()

                storage.ref("elements/"+$this.category +"/"+$this._uuid + "/img"+$this.img_extension).put($this.img_file).then(function(snapshot) {
                    snapshot.ref.getDownloadURL().then(url => {
                        $this.img_url = url
                        storage.ref("elements/"+$this.category +"/"+$this._uuid+ "/source"+$this.text_extention).put($this.text_file).then(function(snapshot) {
                            snapshot.ref.getDownloadURL().then(url2 => {
                                $this.file_url = url2
                                $this.insertIntoDatabase()
                            })
                        })
                    })
                })
            } catch(err) {

            }
        },
        insertIntoDatabase() {
            try {
                let $this = this
                db.ref("elements/"+this.category).push({
                    width: this.width,
                    height: this.height,
                    title: this.title,
                    category: this.sub_category,
                    img_url: this.img_url,
                    file_url: this.file_url,
                    date: $datetime()
                })
                .then((record) => {
                    $this.key = record.key
                    // $this.insertIntoStorage()
                })
            } catch(err) {
                console.log(err)
            }
            
        },
        createImgFile(input) {
            let file = input.files[0]
            let $this = this
            if (input.files && input.files[0]) {
                var reader = new FileReader();    
                reader.onload = function(e) {
                        let img = new Image()
                        img.src = e.target.result
                        img.onload = () => {
                            let c = document.createElement('canvas');
                            let ctx = c.getContext('2d');
                            c.width = 200;
                            c.height = 200;
                            ctx.drawImage(img, 0, 0, c.width, c.height);
                            document.body.appendChild(c)
                            $this.width = img.width,
                            $this.height = img.height
                            $this.img_extension = file.name.match(/\.[0-9a-z]+$/i)[0]
                            $this.img_file = file
                        }
                }                
                reader.readAsDataURL(input.files[0]);
            }       
        },
        createTextFile(input) {
            let file = input.files[0]
            let $this = this
            if (input.files && input.files[0]) {
                var reader = new FileReader();    
                reader.onload = function(e) {
                    $this.text_extention = file.name.match(/\.[0-9a-z]+$/i)[0]
                    $this.text_file = file
                }                
                reader.readAsDataURL(input.files[0]);
            }       

        }
    },
    mounted() {
        let $this = this
        let thumbnail = $(this.$refs['upload'])
        let file = $(this.$refs['upload-file'])
        this.src = $(this.$refs['preview'])

        thumbnail.change(function() {
            $this.createImgFile(this)
        })
        file.change(function() {
            $this.createTextFile(this)
        })

    }
}
</script>

<style>

</style>