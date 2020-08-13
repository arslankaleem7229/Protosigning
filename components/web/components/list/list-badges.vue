<template>
    <div class="container" component='true'>
        <h2 component='true'>Basic List Group</h2>
            <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Inbox
                <span class="badge badge-primary badge-pill">12</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Ads
                <span class="badge badge-primary badge-pill">50</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                Junk
                <span class="badge badge-primary badge-pill">99</span>
                </li>
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