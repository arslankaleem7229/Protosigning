<template>
  <div class="header">
      <div class="center">
            <!-- <img :src="icon.logo" width="30px" height="30px" alt="logo-image">
            <p><b>Trianglo</b></p> -->
            <button class="btn" style="font-size:30px"><span class="text-primary">&#10177;</span> ProtoSigning</button>

      </div>
      <div class="default-div">
            <div class="inline flex align-center">
                <button class="dark-btn">Create</button>
                <button class="flex light-btn" @click="$router.push('/user/login')"><img :src="icon.login" width="20px" height="20px" alt=""><p>Login</p></button>
            </div>
      </div>
  </div>
</template>

<script>
import logo from '@/assets/icons/logo.svg'
import login from '@/assets/icons/user-login.svg'
export default {
    data() {
        return {
            icon: {
                logo: logo,
                login: login 
            }
        }
    },
    mounted() {
    }
}
</script>

<style>
body {
    overflow-x: hidden;
}
.header {
    width: 100%;
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
}
.header > div {
    align-self: center;
}
</style>