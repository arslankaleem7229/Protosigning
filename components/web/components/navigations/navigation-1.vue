<template>
    <nav class="navbar navbar-expand-sm border d-flex justify-content-between" div-type='navigation' component='true'>
        <a class="navbar-brand" href="#" component='true'>
            <img component='true' component-type='logo' src="~/assets/images/dice.svg" width="60px" alt="">
            <span component='true' class="n-1-logo-text"> Dice</span>
        </a>    
        <ul class="navbar-nav p-1" component='true'>
            <li class="nav-item" component='true'>
                <a class="nav-link" href="#">Link 1</a>
            </li>
            <li class="nav-item " component='true'>
                <a class="nav-link" href="#">Link 2</a>
            </li>
            <li class="nav-item " component='true'>
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
    }
}
</script>

<style>
.navigation-1-component {
    /* background-color: rgba(0, 0, 0, 0.75); */
    background: rgba(0, 0, 0, 0.0125);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    display: flex;
    padding: 10px;
    justify-content: space-between;
}
.navigation-1-component img {
    padding: 0px;
}
.navigation-1-component a,
.navigation-1-component div span {
    /* color: white; */
    text-decoration: none;
    padding: 0px 10px;
    font-weight: bold;
}
.n-1-logo-text {
    font-size: 22px;
    font-weight: bold;
}
.n-1-links-container {
    position: relative;
    /* overflow: hidden; */
    padding: 5px;
}
</style>