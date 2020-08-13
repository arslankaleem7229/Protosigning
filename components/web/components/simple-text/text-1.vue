<template>
    <ul component-type='container' class="list-component-container connectedSortable" @click="text_container_clicked($event)">
        <li class="text-1-container" component-type='text-container'>
            <textarea class="text-1-title-text" text-type='title-text' component-type='text'>JANE BLOGLIFE</textarea>
        </li>
    </ul>
</template>

<script>

export default {
    methods: {
        text_container_clicked(e) {
            if($(e.target).attr('component-type') === 'container') {
                $containerCustomization(e.target)
            }
        },
        makeItFocus(e) {
            $(e.target).focus()
        }
    },
    mounted() {
    }
}
</script>

<style>

.text-1-container {
    /* width: 360px; */
    height: auto;
    display: flex;
    margin: 10px;
    border: 2px solid rgba(0, 0, 0, 0.025);
    overflow: hidden;
    flex-direction: column;
    padding: 15px;
}
.text-1-title-text
{
    width: 100%;
    height: 60px;
    min-height: 30px;
    text-align: center;
    align-self: center;
    font-size: 40px;
    font-weight: bold;
    overflow: hidden;
    font-family: "Segoe UI",Arial,sans-serif;
    font-family: "Helvetica Neue", Helvetica, Arial;
    border: transparent;
    border: 2px solid rgba(0, 0, 0, 0.025);
    padding-left: 5px;
    resize: none;
}
.text-1-title-text:hover {
    resize: both
}
.text-1-container:hover,
.text-1-title-text:hover
{
    border: 2px solid #4285f4 !important;
}

</style>