<template>
<div class="p-absolute bg-white box-shadow animate__animated  animate__fadeIn animate__faster pt-2 pb-2" :style="styling" ref="container" @mouseleave="remove($event)" @mouseenter="keep()">
    <button @click="$emit('back')" :class="!back ? 'd-none': ''" class="btn btn-hov btn-block text-primary bd-bottom material-icons text-left p-2 font-weight-bold">chevron_left</button>
    <button @click="select($event, item)" :class="selected == item.title.replace(' ', '-') ? 'bg-primary text-white box-shadow': ''" class="btn btn-block btn-hov text-left p-2 pl-3 pr-3" v-for="(item, i) in list" :key="i" >
        {{(keys.includes(item.value)) ? item.title + " " + year : item.title }}
    </button>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    props: {
        list: {
            required: true
        },
        e: {
            required: true
        },
        width: {
            required: true
        },
        selected: {
            required: false
        },
        back: {
            required: false,
            default: false
        }
    },
    data() {
        return {
            styling: {
                width: this.width + 'px',
                top: "0px",
                left: "0px",
                position: "absolute",
                borderRadius: '.25rem',
                zIndex: 1000
            },
            state: null,
            keys: ["BISS_KEYS", "POWERVU", "SATELLITE_KEYS"],
            year: new Date().getFullYear()
        }
    },
    methods: {
        select(e, item) {
            this.$emit('select', item)
            setTimeout(() => {
                // $(this.$refs.container).remove()            
            }, 250);
        },
        remove(e) {
            this.state = setTimeout(() => {
                $(e.target).remove()            
            }, 250);
        },
        keep() {
            clearTimeout(this.state)
        }
    },
    mounted() {
        let top = $(this.e.target).offset().top,
            left = $(this.e.target).offset().left,
            container = $(this.$refs.container),
            w = $(window).width(),
            h = $(window).height(),
            w_ = $(container).width(),
            h_ = $(container).height()
        if(top+h_ > h) {
            this.styling.top = (h - h_ - 10) + 'px'            
        } else {
            this.styling.top = (top + 10) + 'px'
        }
        if(left+w_ > w) {
            this.styling.left = (w - w_ - 10) + 'px'
        } else {
            this.styling.left = (left) + 'px'
        }

        $(window).resize(() => container.remove())
        $(window).click((e) => {
            if(e.target.parentNode != container[0] && !$(e.target).hasClass('dropdown-btn') && e.target !== container[0]) {
                container.remove()
            }
        })

    }
}
</script>

<style>

</style>