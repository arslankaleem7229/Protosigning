<template>
    <ul component-type='container' class="btn1-component-container connectedSortable" @click="btn1_container_mouseenter($event)">
        <li component-type='button-container' class="btn-container btn-1-container"><span class="btn-1"  component-type='button' >Button</span></li>
    </ul>
</template>

<script>

export default {
    methods: {
        btn1_container_mouseenter(e) {
            if($(e.target).attr('component-type') === 'container') {
                $containerCustomization(e.target)
            }
        }
    },
    mounted() {}
}
</script>

<style>
.btn-container {
    border: 2px solid rgba(0, 0, 0, 0.025);
    list-style-type: none;
    padding: 10px;
    margin: 5px;
    overflow: hidden;
}
.btn-1-container {
    min-width: 100px;
}
.btn-container:hover {
    border: 2px solid #4285f4;
}
.btn-1-container .btn-1 {
    font-size: 13px;
    font-family: "Roboto",sans-serif;
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.125);
    border-radius: 3px;
    padding: 8px 0px;
    background-color: rgb(0, 134, 230);
    color: white;
    display: inline-block;
    width: 100%;
    /* font-size: 50px; */
    /* height: 100% */
    /* height: calc(100%- 10px); */
}
</style>