<template>
    <div class="container" component='true' ref='table-container'>
    <h2 component='true'>Table Heading</h2>
    <p component='true'>You can delete the above table heading as well as this paragraph as well</p>            
    <table class="table table-borderless">
        <thead>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
        </tr>
        </thead>
        <tbody ref="table-rows">
        <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
        </tr>
        <tr>
            <td>Mary</td>
            <td>Moe</td>
            <td>mary@example.com</td>
        </tr>
        <tr>
            <td>July</td>
            <td>Dooley</td>
            <td>july@example.com</td>
        </tr>
        </tbody>
    </table>    
  </div>
  
</template>

<script>
export default {
    mounted() {
        let $this = this
        this.$nextTick(function() {
            $($this.$refs['table-container']).sortable()
            $($this.$refs['table-rows']).sortable()
            // $($this.$refs['table']).resizable()
        })
    }
}
</script>

<style>

</style>