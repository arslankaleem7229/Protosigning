<template>
<div class="container" component='true' ref='table-container'>
  <h2>Responsive Table</h2>
  <p>The .table-responsive class creates a responsive table which will scroll horizontally on screens that are less than 992px wide (if needed). When viewing on anything larger than 992px, there is no difference:</p>                                                                                      
  
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
          <th>City</th>
          <th>Country</th>
          <th>Sex</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody ref="table-rows">
        <tr>
          <td>1</td>
          <td>Anna</td>
          <td>Pitt</td>
          <td>35</td>
          <td>New York</td>
          <td>USA</td>
          <td>Female</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
      </tbody>
    </table>
  </div>
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