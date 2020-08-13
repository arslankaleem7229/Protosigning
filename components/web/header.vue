<template>
  <div class="container-fluid m-0 p-0">
    <div class="header-parent">
      <div class="workspace-sec1 display-flex space-between">
        <div class="display-flex align-self-center">
          <p class="font-20" contenteditable="true">{{project_title}}</p>
        </div>
        <div class="display-flex">
          <!-- <button class="btn"><span class="icon-undo p-0" style="font-size:15px;"></span></button> -->
          <!-- <button class="btn"><span class="icon-redo p-0" style="font-size:15px;"></span></button> -->
          <button @click="preview()" class="btn hover-effect"><span class="icon-mobile-devices"></span></button>
          <button class="btn btn-light ml-3"> Save</button>
          <button @click="export_func($event, export_)" class="dropdown-btn btn btn-light ml-1"> Export &nbsp;&#9207;</button>
          <button class="btn btn-primary ml-3 pl-4 pr-4" @click="visible=true">Share</button>
        </div>
      </div>
    </div>

    <div class="container-fluid justify-content-center d-flex" id="edit-component-container" ref="edit-container" style="z-index:1000" v-if="visible">
        <div class="align-self-center p-2 pt-5 pb-4 bg-light row w-40 box-shadow" style="max-width:720px" id="edit-component">
            <h5 class="col-md-12 mb-0 font-weight-bold">Share With Others</h5>
            <p class="col-md-12 mt-0 mb-0 small">Invite your colleagues to work in parallel and fasten your work flow</p>
            <p class="col-md-12 mt-0 small"><strong>Note:</strong> Maximum of 3 colleagues can be invited in the free version</p>

            <p class="col-md-12 font-bold small mt-2 mb-1" v-if="emails.length > 0">All Collaborators</p>
            <div v-for="(item, index) in emails" :key="index" ref="email-register-container" class="d-flex align-center w-100 pl-4 pr-4 justify-content-between border border-top-0 border-left-0 border-right-0">
              <h6 class="oveflow-hidden mt-2 small font-weight-bold">{{item.email}}</h6>
              <p class="small text-info">{{item.restriction}}</p>
              <button @click="edit(item)" class="btn btn-light"><span class="icon-edit-pencil" style="font-size:14px"></span></button>
              <button class="btn btn-light"><span class="icon-close" style="font-size:14px"></span></button>
            </div>
            
            <div ref="input_field_container" class="input-group p-2 mt-2">
              <input v-model="email" type="email" class="form-control box-shadow" placeholder=" Enter Email Address" id="usr" name="User Email">
              <div class="input-group-append">
                  <button @click="$drop_down($event, 'restrictions', restrictions )" class="input-group-text btn box-shadow ml-2 mr-4 border-0 no-radius"><span class="icon-edit-pencil" style="font-size:14px"></span> <span class="text">{{restrictions.active}}</span> &nbsp; &#9662;</button>
              </div>
              <div class="input-group-append">
                  <button @click="invite_user()" class="input-group-text btn ml-2 border-0"><span class="icon-user-add text-primary"></span></button>
              </div>
            </div>        
            <p class="col-md-12 text-danger font-bold small mb-2">{{err_msg}}</p>    
            <div class="col-md-12 text-align-right mt-5">
              <button class="btn btn-primary pl-4 pr-4 pt-2 pb-2 box-shadow" @click="visible=false">Done</button>
            </div>
        </div>
    </div>        

  </div>
</template>

<script>
import vue from 'vue'
import dropdown from '@/components/website/dropdown.vue'
import dropdown_list from '@/components/dropdown-list.vue'
import { db } from '@/services/firebase'
import JSZip from 'jszip'
let prettify = require('prettify-html')
export default {
  components: {
    dropdown,
    dropdown_list,
  },
  data() {
    return {
      project_title: "unknown",
      restrictions: {
        list: [
            { title: "Can Edit", value: 'edit' },
            { title: "Can View only", value: 'view_only' },
        ],
        active: "Can Edit",
      },
      email: null,
      emails: [],
      valid_emails: [],
      visible: false,
      err_msg: null,
      project_key: null,
      uid: null,
      export_: [
          { title: "Export in HTML/CSS", value: 'HTML/CSS' },
          { title: "Export Project", value: 'ZIP' },

      ],
      container: null,
      html: {
          raw: null,
          non_compiled: null,
      },
      css: {
          raw: "",
          obj: {}
      },

    }
  },
  methods: {
    compile_code() {
        let children = this.html.non_compiled.find("*")
        let counter = {}
        for(let i=0; i<children.length; i++) {
            let child = $(children[i])
            let obj = {
                node: child,
                removed_attr: [],
                removed_class: null
            }

            if(child.attr("style")) {
                let tag = child.prop('tagName').toLowerCase(),
                    id = null
                counter[tag] ? counter[tag] += 1 : counter[tag] = 1
                id = tag + "_"+counter[tag]
                this.css.raw += "#"+ id + "{" + child.attr("style") + "}"
                this.css.obj[id] = child.attr("style")
                child.removeAttr("style")
                child.attr("id", id)
            }

            if(child.attr('component')) {
                obj.removed_attr.push({name: "component", value: child.attr('component')})
                child.removeAttr('component')
            }
            child.hasClass("connectedSortable") ? child.removeClass("connectedSortable") : ""
            child.hasClass("ui-sortable") ? child.removeClass("ui-sortable") : ""
            child.hasClass("ui-sortable-handle") ? child.removeClass("ui-sortable-handle") : ""
            child.hasClass("component-active") ? child.removeClass("component-active") : ""
            child.attr("class") === "" ? child.removeAttr("class") : ""
            child.attr("to-be-inserted") ? child.removeAttr("to-be-inserted") : ""
            child.attr("container-type") ? child.removeAttr("container-type") : ""

            // this.components.push(obj)
        }
        let start = `
        <html>
            <head>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
            </head>
        <body>`
        let end = "</body></html>"
        this.html.raw = prettify( start + this.html.non_compiled.html() + end)
        this.css.raw = this.beautify_css(this.css.raw)
        // this.editor.setValue(this.html.raw)

        return {
          html: this.html.raw,
          css: this.css.raw
        }
    },
    beautify_css(css) {
        var beautified = cssbeautify(css, {
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
        });             
        return beautified
    },

    export_func(e, list) {          
        let { html, instance } = this.component(dropdown_list, { e, list, width:250 } )
        instance.$on("select", payload => {
          switch(payload.value) {
            case "HTML/CSS":
              $("#code-btn").click()
              break
            case "ZIP":
              let project_id = this.$route.params.id.split("prj-id=")[1]
              let ref = "projects/web/"+this.uid+"/"+project_id

              this.api_fetch(ref, (payload) => { 
                if(payload) {
                  payload = payload.pages
                  var zip = new JSZip();
                  for (var i = 0; i < payload.length; i++) {
                    
                    if(payload[i].title) {
                      $(".workspace").html(payload[i].workspace)
                      
                      this.html.non_compiled = $('.workspace').clone()
                      this.html.raw = $('.workspace').html()
                      this.css.raw = ""
                      this.css.obj = {}

                      let compiled = this.compile_code()
                      zip.file(payload[i].title + ".html", compiled.html);
                      zip.file(payload[i].title + ".css", compiled.css);
                    }
                  }
                  zip.generateAsync({
                      type: "base64"
                  }).then(function(content) {
                      window.location.href = "data:application/zip;base64," + content;
                  });       
                }
              })
              break
          }
        })
        document.body.append(html)  

    },
    component(component, props = null) {
        let ComponentClass = vue.extend(component)
        let instance = new ComponentClass({ propsData: props })
        instance.$mount()
        return {
            html: instance.$el,
            instance
        }
    },
    edit(obj) {
      this.email = obj.email
      delete this.emails[this.email]
      this.restrictions.active = obj.restriction
    },
    remove_email(email) {
      delete this.emails[email]
      this.email = email
    },
    async invite_user() {
      this.err_msg = null
      let $this = this
      let valid = true

      for(let j=0; j<this.emails.length; j++) {
        if(this.email == this.emails[j].email) {
          valid = false
          this.err_msg = "This user is already been added."
          return
        }
      }
      for(let i=0; i<this.valid_emails.length; i++) {
        if(this.email == this.valid_emails[i].email) {
          await db.ref("projects/web/"+this.uid+"/"+this.project_key+"/collaborators")
          .push({
              uid: this.valid_emails[i].uid,
              opt: this.restrictions.active         
          })
          db.ref("users/"+this.valid_emails[i].uid+"/"+this.valid_emails[i].key+"/collaborator")
          .push({
            project: this.project_key,
            owner: this.uid
          })
          valid = true
          this.err_msg = "User Added Successfully"
          break
        }
      }
      !valid ? this.err_msg = "Could not find user with that email" : ''

      return

      for(let i=0; i< this.valid_emails.length; i++) {
        console.log(this.valid_emails[i].email, 'my email')
        valid = false
        if(this.email == this.valid_emails[i].email) {
          valid = true
          await db.ref("projects/"+this.project_key+"/collaborators").once('value')
            .then((data) =>
            {
                const obj = data.val()
                for(let key in obj) {
                  if($this.email == obj[key].email) {
                    $this.err_msg = "This User is already been added"
                    valid = false
                  }
                }
                if(valid) {
                  let obj = {
                    ...this.valid_emails[i],
                    restriction: this.restrictions.active 
                  }
                  db.ref("Projects/"+this.project_key+"/collaborators").push(obj)
                    .then((data) => {
                      this.emails.push(obj)
                      console.log(data, 'my data')
                      $this.err_msg = "User Added Successfully"
                    }).catch((err) => {})                  
                }
            })
            .catch((error) =>{})
            break
        }
      }

      if(!valid) {
        this.err_msg = "Invalid Email or this user do not have an account or user Already added"
      }



      


    },
    $drop_down(e, type, arr) {
      let target = $(e.target)
      !target.hasClass("btn") ? target = target.parent() : ""
      let { list } = arr
      let { items } = $simple_dropdown(e, list)

      for(let i=0; i<items.length; i++) {
        items[i].click(() => {
          let { value, title } = list[i]
          arr.active = title
        })
      }

    },
    preview() {
      this.$store.dispatch("website-state/WORKSPACE_preview", true)
      $('.workspace-container').css('width', '100%')
      $('.work-area-parent').css('height', '95vh')
      $('#exit-preview-container').css("display", "block")
    },
    $collaborators() {
      let $this = this
      this.project_key = this.$router.currentRoute.params.id.split("&")[1].split("=")[1]
      db.ref("projects/web/"+this.uid+'/'+this.project_key+"/collaborators").once("value")
      .then((data) => {
        const obj = data.val()
        for(let key in obj) {
          db.ref("users/"+obj[key].uid).once("value")
          .then((data) => {
            this.emails.push(Object.values(data.val())[0])
          })
        }
      })
    },
    async $valid_mails() {
      await db.ref("users").once("value")
      .then((data) => {
        const obj = data.val()
        for(let key in obj) {
          let user = Object.values(obj[key])[0]
          this.valid_emails.push({ email: user.email, key: Object.keys(obj[key])[0], uid: key })
        }    
        this.$collaborators()
      })
    }
  },
  mounted() {
    let $this = this
    let title = this.$router.currentRoute.params.id.split("&")
    this.project_title = title[0].split("=")[1]
    if(this.$router.currentRoute.params.id.split("&")[2]) {
        this.uid = this.$router.currentRoute.params.id.split("&")[2].split("=")[1]
    } else {
        this.uid = this.$store.state.user.uid
    }

    this.$valid_mails()
  
  }
}
</script>

<style>
.header-parent {
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  margin-bottom: 10px;
  padding: 5px 0px;
}
</style>