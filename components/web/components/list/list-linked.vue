<template>
    <div class="container" component='true'>
        <h2 component='true'>Basic List Group</h2>
        <div class="list-group p-2" component='true'>
            <a href="#" class="list-group-item list-group-item-action">First item</a>
            <a href="#" class="list-group-item list-group-item-action">Second item</a>
            <a href="#" class="list-group-item list-group-item-action">Third item</a>
        </div>
    </div>  
</template>

<script>
export default {
    mounted() {
        let $this = this
        this.$nextTick(function() {
            $($this.$refs['list-container']).sortable()
        })
    }

}
</script>

<style>

</style>