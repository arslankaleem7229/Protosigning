<template>
    <div class="container" component='true'>
        <h2 component='true'>Basic List Group</h2>
        <ul component='true' class="list-group p-2" ref="list-container">
            <li component='true' class="list-group-item">First item</li>
            <li component='true' class="list-group-item">Second item</li>
            <li component='true' class="list-group-item">Third item</li>
        </ul>
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