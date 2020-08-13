<template>
    <div class=" folder-popup-container flex align-self-center">
        <div class="card">
            <div class=" header">
                <h1 class="title ">New Folder</h1>
                <button class="" @click="remove_popup()"><span class="icon-close"></span></button>
            </div>
            <div class="flex new-folder-input-container">
                &nbsp;
                <input type="text" name="" class="new-folder-input" v-model="folder_name">
                <button @click="toggle_info($event)"><span class="icon-info"></span></button>
            </div>
            <div class=" text-align-right">
                <button @click="remove_popup()">Cancel</button>
                <button class="dark-btn" @click="create_folder()">Create</button>
            </div>
        </div>
        <div class="info-card display-none">
            <div class="flex flex-start"><span class="icon-info light-color font-20px"></span><p><b>Info</b></p></div>
            <p class="font-bold font-11px no-border">This folder will be created in the directory in which your are currently located</p>
        </div>
    </div>
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
export default {
    data() {
        return {
            folder_name: "Untitled Project"
        }
    },
    methods: {
        toggle_info(e) {
            let parent = $(".folder-popup-container .card")
            let info_card = $(".info-card")
            let target = $(e.target)
            console.log(parent.offset(), target.offset())
            info_card.css({
                left: parent.offset().left + parent.outerWidth(),
                top: target.offset().top
            })
            info_card.toggleClass("display-none")
        },
        remove_popup() {
            $(".folder-popup-container").remove()
        },
        create_folder() {
            EventBus.$emit("$_CREATE_PROJECT", this.folder_name)
        }

    },
    mounted() {
        setTimeout(function () { $(".new-folder-input").select(); }, 100);
    }

}
</script>

<style>
.font-20px {
    font-size: 25px;
}
.light-color {
    color: rgba(0, 0, 0, 0.555)
}
.font-bold {
    font-weight: bold;
}
.font-11px {
    font-size: 11px
}
.text-align-center {
    text-align: center;
}
.folder-popup-container {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.555);
}
.folder-popup-container .card {
    background: white;
    min-width: 420px;
    min-height: 100px;
    border-radius: 5px;
    padding: 10px;
}
.title {
    font-size: 20px;
}
.folder-popup-container .header {
    display: flex;
    width: 95%;
    margin: auto;
    margin-bottom: 20px;
}

.new-folder-input-container {
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.0525);
    box-shadow: 0px 1px 5px 0px #ebebeb;
    border: 1px solid rgba(0, 0, 0, 0.025);
    border-radius: 50px;
    margin-bottom: 20px;
}
.new-folder-input {
    border: transparent !important;
    background: transparent !important;
    width: 90%;    
    padding: 5px !important;
    background: transparent;
    border-right: 1px solid rgba(0, 0, 0, 0.225);
    font-size: 13px;
    font-weight: bold;
    /* letter-spacing: 1px; */
}
.folder-popup-container [class ^="icon"] {
    padding: 2px;
    /* font-size: 16px; */
}
.info-card {
    background: white;
    border-radius: 5px;
    width: 220px;
    margin: 5px;
    /* box-shadow: 0px 1px 5px 0px #ebebeb; */
    border: 1px solid rgba(0, 0, 0, 0.025);
    padding: 10px;
    position: absolute;
    transition: 0.3s;
}

</style>