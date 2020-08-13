<template>
    <ul component-type='container' class="list-component-container connectedSortable" @click="list_container_clicked($event)">
        <ul component-type='list-container'>
            <li component-type='list-item' contenteditable="true">Oranges</li>
            <li component-type='list-item' contenteditable="true">Potatoes</li>
            <li component-type='list-item' contenteditable="true">Onions</li>
            <li component-type='list-item' contenteditable="true">Cuecumber</li>
        </ul>
    </ul>
</template>

<script>

export default {
    methods: {
        list_container_clicked(e) {
            if($(e.target).attr('component-type') === 'container') {
                $containerCustomization(e.target)
            }
        }
    },
    mounted() {
        $(document).ready(function() {
            $('[component-type="list-item"]').on('click', function(e) {
                $(e.target).focus()
            })
        })
    }
}
</script>

<style>
ul[component-type='list-container'] {
    display: flex;
    /* display: block; */
    flex-direction: column;
    border: 2px solid rgba(0, 0, 0, 0.025);
    margin: 10px;
    background-color: rgba(0, 0, 0, 0.025);
    border-radius: 3px;
    background-color: white;
    list-style-type: disc;
    padding: 10px;
    padding-left: 30px;
    width: auto;
    height: auto;
    position: relative;
    /* overflow: auto; */
    /* max-height: 250px; */
    /* height: auto; */
}
ul[component-type='list-container'] li[component-type='list-item'] {
    padding: 5px 10px;
    margin: 5px;
    font-size: 15px;
    border-radius: 3px;
    align-self: flex-start;
    width: calc(100% - 27.5px);
    min-width: 100px;
    font-weight: bold;
    text-align: left;
    border: 2px solid rgba(0, 0, 0, 0.015) !important;

}
ul[component-type='list-container'] li[component-type='list-item']:hover,
ul[component-type='list-container']:hover {
    border: 2px solid #4285f4 !important;
}

</style>