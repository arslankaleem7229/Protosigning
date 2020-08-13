<template>
<div class="container-fluid p-0 bg-overlay box-shadow d-flex align-items-center justify-content-center" v-if="visible">
    <div class="bg-white p-4" style="width:500px;border-radius:5px">
        <h2>Create New Project</h2>
        <p>Enter below the name that specifically suits for your project</p>
        <form action="/action_page.php">
            <div class="form-group">
            <label for="usr">Project Title:</label>
            <input type="text" class="form-control" v-model="title">
            </div>
            <button @click="$emit('create', title)" type="button" class="btn btn-primary box-shadow pl-4 pr-4">Create</button>
            <button @click="$emit('cancel')" class="btn text-primary ml-4">Cancel</button>
        </form>
    </div>
</div>
</template>

<script>
export default {
    props: {
        visible: {
            required: false,
            default: true
        },
    },
    data() {
        return {
            title: ""
        }
    }
}
</script>

<style>
.bg-overlay {
    background: rgba(0, 0, 0, 0.5) !important;
    position: absolute !important;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 10000;
}
</style>