<template>
    <nav class="navbar flex flex-wrap navbar-expand-sm" div-type='navigation' component='true'>
            <a class="navbar-brand full-width flex align-center" href="#" component='true'>
                <img component='true' component-type='logo' src="~/assets/images/dice.svg" width="60px" alt="">
                <span component='true' class="n-1-logo-text"> Dice</span>
            </a>    
            <ul class="navbar-nav n-2-links-container" component='true' ref="n-2-links-container">
                <li class="nav-item" component='true'>
                    <a class="nav-link" href="#">Link 1</a>
                </li>
                <li class="nav-item" component='true'>
                    <a class="nav-link" href="#">Link 2</a>
                </li>
                <li class="nav-item" component='true'>
                    <a class="nav-link" href="#">Link 3</a>
                </li>
            </ul>
    </nav>
</template>

<script>
export default {
    methods: {
        test(e) {
        }
    },
    mounted() {
    let $this = this
    this.$nextTick(function() {
        $($this.$refs['n-2-links-container']).sortable()
    })
}
}
</script>

<style>
.n-2-links-container {
    margin: 20px 0px;
    padding: 5px;
}
.n-2-links-container a{
    font-size: 15px;
    font-weight: 500;
}
</style>