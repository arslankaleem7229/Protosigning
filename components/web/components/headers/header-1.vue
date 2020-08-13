<template>
    <ul component-type='container'>
        <li component-type='text-container' class="header-1-text-container">
            <textarea class="header-1-text" text-type='heading-text' component-type='text'>EXPERIENCE / INTERFACE DESIGNER</textarea>
            <textarea class="header-1-text header-1-normal-text" text-type='normal-text' component-type='text'>ROMAN LEINWATHER</textarea>
            <textarea class="header-1-text header-1-small-text" text-type='small-text' component-type='text'>PROUD TOPTAL MEMBER - TOP 3% OF INTERNET TALENT</textarea>
        </li>
    </ul>
</template>

<script>

export default {
    methods: {
    },
    mounted() {
    }
}
</script>

<style>
.header-1-text-container {
    display: flex;
    width: 768px;
    border: 2px solid rgba(0, 0, 0, 0.025);
    justify-content: center;
    flex-wrap: wrap;
    padding: 15px;
}
.header-1-text
{
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 30px;
    overflow: hidden;
    font-family: "Helvetica Neue", Helvetica, Arial;
    color: rgba(255,255,255,0.75);
    letter-spacing: 10px;
    background-color: transparent;
    border: 2px solid transparent;
    resize: none;
}
.header-1-small-text {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.325);
    letter-spacing: 5px;
}
.header-1-normal-text {
    font-size: 20px;
    color: white;
}
.header-1-text:hover {
    resize: both
}
.header-1-text-container:hover,
.header-1-text:hover
{
    border: 2px solid #4285f4 !important;
}

</style>