<template>
<div class="container">
  <h5 class="mt-5 mb-5">Shared With me</h5>
  <div class="list-group" v-if="projects.length > 0 && !loading">
      <div @click="open(item)" v-for="(item, i) in projects" :key="i">
        <a class="list-group-item list-group-item-action font-weight-bold" v-if="item.title">
                <span>{{item.title}}</span> <br>
                <span class="text-sm font-weight-normal text-primary">{{item.created}}</span>
        </a>
      </div>
  </div>
  <p class="w-100 text-center small" v-if="loading">
      <span class="spinner-border spinner-border-sm text-primray"></span> <br>
      <span>Loading...</span>
  </p>
</div>

</template>

<script>
import { auth, db } from '@/services/firebase'
export default {
    data() {
        return {
            uid: null,
            projects: [],
            loading: false
        }
    },
    methods: {
        open(project) {
            this.$router.push('/workspace/web/prj-t='+project.title+"&prj-id="+project.key+"&owner="+project.owner)
        },
        fetch() {
            this.loading = true
            db.ref("users/"+this.uid).once("value")
            .then(data => {
                let user = Object.values(data.val())[0],
                    key = Object.keys(data.val())[0]
                if(user.collaborator) {
                    this.projects = []
                    for(let key in user.collaborator) {
                        let c = user.collaborator[key]
                        db.ref("projects/web/"+c.owner+"/"+c.project).once("value")
                        .then(data => {
                            this.projects.push({...data.val(), key: data.key, owner: c.owner})
                        })
                    }
                }
                this.loading = false
            })

        }
    },
    mounted() {        
        this.uid = this.$store.state.user.uid
        this.fetch()
    }
}
</script>

<style>

</style>