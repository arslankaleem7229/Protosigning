<template>
<div class="w-100 bg-white bd-bottom d-flex m-0 p-2 justify-content-between">
    <div class="d-flex align-items-center">
        <div>
            <button class="btn">
                <span class="text-primary material-icons btn pr-0">add</span>
                <span class="text-primary btn pl-0"><b>Protosigning</b></span>
            </button>
        </div>
        <div class="">
            <button v-for="(item, i) in links" :key="i" class="btn" @click="active=i" :class="active==i ? 'font-weight-bold' : ''">
                {{item}}
            </button>
        </div>
    </div>
    <div class="align-self-center p-relative">
        <button @click="dropdown=!dropdown" class="btn text-lg p-2 border bd-round btn-primary" style="width:59px;height:59px"><b>{{user.info.uname.charAt(0).toUpperCase() }}</b></button>
        <div class="p-2 p-absolute" style="right:0px;min-width:300px;" v-if="dropdown" @mouseleave="dropdown=false">
            <div class="w-100 p-3 animated fadeIn faster bg-light box-shadow">
                <div class="w-100 text-center">
                    <img :src="svg.computer" width="125px" alt="">
                </div>
                <button class="btn btn-block mt-2 mb-4" :class="user.info.uname ? '' : 'bg-light-2'" >
                    <span class="font-weight-bold">{{user.info.uname}}</span> <br>
                    <span class="text-sm" >{{user.info.email}}</span> 
                </button>
                <button class="btn btn-block text-left p-1 d-none" v-for="(item, i) in user.dropdown" :key="i">
                    <span :class="'icon-'+item.icon"></span>
                    <span class="ml-3 text-small">{{item.title}}</span>
                </button>
                <button @click="$signout()" class="btn btn-block btn-primary bd-round box-shadow mt-4">
                    <span v-if="user.signout" class="spinner-border spinner-border-sm"></span>
                    <span>Sign out</span>
                </button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import computer from '@/assets/svg/computer.svg'
export default {
    data() {
        return {
            dropdown: false,
            active: 0,
            svg: {
                computer: computer
            },
            links: ["My Projects", "Logo Finder", "Elements", "Shared With Me"],
            user: {
                uid: null,
                signout: false,
                info: {
                    uname: "Unknown",
                    email: null,
                    password: null,
                },
                dropdown: [
                    { icon: 'settings', title: 'Account Settings'},
                    { icon: 'help', title: 'Help'},
                    { icon: 'feedback', title: 'Send Feedback'}
                ],
            }
        }
    },
    watch: {
        active(n, o) {
            this.$emit('switchTab', n)
        }
    },
    methods: {
        $signout() {
            this.user.signout = true
            this.$api_signout(() => {
                this.user.signout = false
                this.user.show = false
                window.location.href = "/"
            })
        },
        user_info(user) {
            this.api_fetch('users/'+user.uid, (payload) => {
                payload = Object.values(payload)[0]
                this.user.info = payload
                
            })
        }
    },
    mounted() {
        this.user.uid = this.$store.state.user.uid
        let get_info = this.$store.dispatch("user/info", this.user.uid)
        get_info.then(() => {
            this.user.info = this.$store.state.user.info
        })
    }
}
</script>

<style>

</style>