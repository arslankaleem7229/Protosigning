import Vue from 'vue'
import { auth, db, storage } from '@/services/firebase'
import Cookie from 'js-cookie'


Vue.mixin({
    methods:{
        $api_signout(callback) {
            Cookie.set('access_token', null)
            auth.signOut().then(function() {
                callback()
            }).catch(err => console.log(err, 'signing out err.'))
        }
    }
})