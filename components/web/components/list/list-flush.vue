<template>
    <div class="container" component='true'>
        <h2 component='true'>Flush List Group</h2>
        <ul class="list-group list-group-flush p-2">
            <li class="list-group-item">First item</li>
            <li class="list-group-item">Second item</li>
            <li class="list-group-item">Third item</li>
            <li class="list-group-item">Fourth item</li>
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