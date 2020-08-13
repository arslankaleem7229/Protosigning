<template>
    <ul style="padding:0px;" component-type='container' container-type='header-container'  class="list-component-container align-self-flex-start connectedSortable" @click="text_container_clicked($event)">
    </ul>
</template>

<script>

export default {
    methods: {
        text_container_clicked(e) {
            if($(e.target).attr("container-type") === "header-container") {
                $headerCustomizations(e)
            }
        },
    },
    mounted() {
    }
}
</script>

<style>
ul[container-type='header-container'] {
    min-height: 500px;
    list-style-type: none;
    /* background: radial-gradient(circle at 16% 83%, rgba(148, 148, 148,0.06) 0%, rgba(148, 148, 148,0.06) 50%,rgba(63, 63, 63,0.06) 50%, rgba(63, 63, 63,0.06) 100%),radial-gradient(circle at 68% 87%, rgba(66, 66, 66,0.06) 0%, rgba(66, 66, 66,0.06) 50%,rgba(105, 105, 105,0.06) 50%, rgba(105, 105, 105,0.06) 100%),radial-gradient(circle at 38% 50%, rgba(123, 123, 123,0.06) 0%, rgba(123, 123, 123,0.06) 50%,rgba(172, 172, 172,0.06) 50%, rgba(172, 172, 172,0.06) 100%),linear-gradient(90deg, hsl(18,0%,1%),hsl(18,0%,1%)); */
    background-color: transparent;
    justify-content: center;
}

</style>