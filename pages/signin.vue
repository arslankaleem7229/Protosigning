<template>
    <div class="container-fluid" :style="{height: heights.container + 'px'}">
        <button @click="$router.push('/')" class="btn p-absolute p-0 mt-2 d-flex bd-round material-icons">chevron_left</button>
        <div class="row col-md-10 m-auto" :style="{height: heights.container + 'px'}">
            <div class="col-md-6 align-self-center p-5">
                <h4 class="">Benefits of having a free account</h4>
                <p class="mb-5">Well without an account, our application is useless. There are so many things that you can do with having a free account.</p>
                <ul>
                    <li class="mb-3 small">Your Project work will be upto dated, it will be autosaved and you can easily resume your work from the place where you paused</li>
                    <li class="mb-3 small">You can collaborate your projects with your colleagues with some priviledges</li>
                    <li class="mb-3 small">You can be able to access your dashboard where you can manage all your projects work and much more</li>
                    <li class="mb-3 small">You can create unlimted new projects and have them view in your dashboard</li>
                    <li class="mb-2 small">You can Search for items in much more rich way.</li>
                </ul>
            </div>
            <div class="col-md-6 align-self-center p-5 bg-white box-shadow">
                <!-- SIGNUP WITH GOOGLE OR FACEBOOK -->
                <div class="row justify-content-around mb-2 pl-5 pr-5">
                    <button class="btn bd-round bg-light-2 box-shadow p-2 mb-2"><img class="ml-2" :src="svg.google" width="30px" alt=""><span class="ml-3 mr-2">Login with Google</span></button>
                    <button class="btn bd-round bg-light-2 box-shadow p-2 mb-2"><img class="ml-2" :src="svg.facebook" width="30px" alt=""><span class="ml-3 mr-2">Login with Facebook</span></button>
                </div>
                <div class="row text-center mb-3">
                    <p class="w-100 font-weight-bold bd-top pt-2 text-center">or</p>
                </div>
                <!-- Email -->
                <div class="input-group">
                    <input @blur="$validate()" type="email" class="form-control bg-light-2 box-shadow p-4 mr-2 bd-round bd-0 " placeholder="Email" v-model="form.email">
                </div>                        
                <div class="w-100 mb-3 ml-3 mt-2 row">
                    <p class="small text-danger font-weight-bold">{{error.email}}</p>
                </div>
                <!-- Email -->

                <!-- Password -->
                <div class="input-group">
                    <input @blur="$validate()" type="password" class="form-control bg-light-2 box-shadow p-4 bd-round bd-0 " placeholder="Password" v-model="form.p1">
                </div>                        
                <div class="w-100 mb-3 ml-3 mt-2 row">
                    <p class="small text-danger font-weight-bold">{{error.password}}</p>
                </div>
                <!-- Password -->

                <div class="row pl-3 pr-3 justify-content-end">
                    <button @click="$router.push('/signup')"  class="btn mr-2 bd-round text-primary">Signup instead</button>
                    <button  @click="$signin()" class="btn btn-primary box-shadow bd-round p-2 pl-3 pr-3">
                        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                        <span v-else>Sign In</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import google from '@/assets/svg/google.svg'
import facebook from '@/assets/svg/facebook.svg'
export default {
    data() {
        return {
            svg: {
                google: google,
                facebook: facebook
            },
            heights: {
                container: 200
            },
            form: {
                email: "",
                p1: "",
            },
            error: {
                password: "",
                email: ""
            },
            loading: false
        }
    },
    methods: {
        $def_w_h() {
            this.heights.container = $(window).height()
        },
        $signin() {
            let validate = this.$validate()
            if(validate && !this.loading) {
                this.loading = true
                let signin = this.$store.dispatch("user/signin", { email: this.form.email, password: this.form.p1 })
                signin.then((data) => {
                  this.loading = false
                  let message = this.$store.state.user.message                  
                  message ? this.$show_msg(message) : this.$router.push("/dashboard")
                })
            }
        },
        $show_msg(msg) {
          switch(msg) {
            case "auth/user-not-found":
              this.error.email = "This email do not exisit"
              break
            case "auth/wrong-password":
              this.error.password = "Password is not correct."
              break
          }
        },
        $validate() {
            let error = false,
                email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          this.error.password = this.error.email = ""

            if(!email_pattern.test(this.form.email)) {
                this.error.email = "The Email format is Invalid"
                error = true
            }
            return !error
        }
    },
    mounted() {
        this.$def_w_h()
        $(window).resize(() => this.$def_w_h())

    }
}
</script>

<style>

</style>