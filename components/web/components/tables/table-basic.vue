<template>
    <div class="col-md-8 connectedSortable" component='true' ref='table-container' container-type='inner-container'>
    <h2 component='true' style="color:red; border-radius:20px; background: yellow">Table Basic</h2>
    <p component='true' class="col-md-12" style="line-height:20px;text-decoration:underline;border-left:2px solid red">You can delete the above table heading as well as this paragraph as well</p>            
    <table class="table" component='true'>
    <thead component='true'>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody component='true'>
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
            // $($this.$refs['table-container']).sortable()
            // $($this.$refs['table-rows']).sortable()
            // $($this.$refs['table']).resizable()
        })
    }
}
</script>

<style>

</style>