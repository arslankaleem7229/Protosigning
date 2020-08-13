<template>
    <div class="p-relative" :style="{width: w + 'px'}">
        <p class="text-sm pb-1 m-0">{{title}}</p>
        <button @click="show = !show" class="btn no-btn bg-light-2 box-shadow pt-1 pb-1 pr-1 w-100 d-flex justify-content-between align-items-center">
            <span class="small">{{font_selected}}</span>
            <span class="btn p-0 material-icons">arrow_drop_down</span>
        </button>
        <div ref="list" v-if="show" class="border p-absolute bg-light-2 box-shadow animated faster fadeIn overflow-auto" style="z-index:10000;max-height:250px" :style="{width: w + 'px'}">
            <button @click="$select(item)" class="btn btn-block text-small p-1 pl-2 text-left" v-for="(item, i) in list" :key="i" :style="item.style">
                {{item.title}}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            required: false
        },
        title: {
            required: true
        },
        w: {
            required: false
        },
        selected: {
            required: false
        }
    },
    data() {
        return {
            show : false,
            font_selected:  null

        }
    },
    methods: {
        $select(item) {
            this.font_selected = item.title
            this.$emit("item_selected", {...item, type: this.title})
        }
    },
    mounted() {
        this.font_selected = this.selected
    }
}
</script>

<style>

</style>