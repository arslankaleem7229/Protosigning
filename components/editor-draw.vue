<template>
<div class="bg-white box-shadow animated fadeInUp faster p-absolute" ref="container" id="shapes-container">
    <button @click="$select(item)" :title="item" class="btn" v-for="(item, i) in shapes" :key="i">
        <span :class="'text-lg icon-'+item"></span>
    </button>
</div>
</template>

<script>
export default {
    props: {
        shapes: {
            required: true
        },
        e: {
            required: true
        },
    },
    data() {
        return {
            container: null,
            remove: true,
            target: null
        }
    },
    methods: {
        $init() {
            this.container = $(this.$refs['container'])
            this.target = $(this.e.currentTarget)
            this.$def_w_h()

            this.container.mouseleave(() => {
                this.container.remove()
            })
        },
        $select(elem) {
            this.$emit('$draw', elem)
        },
        $def_w_h() {
            let offset = this.target.offset()
            this.container.css({
                left: offset.left + this.target.outerWidth(),
                top: offset.top
            })
        }
    },
    mounted() {
        this.$init()
        $(window).resize(() => this.$def_w_h())


    }
}
</script>

<style>
#shapes-container {
    z-index: 2000;
}
</style>