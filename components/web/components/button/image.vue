<template>
    <ul component-type='container' class="list-component-container connectedSortable" @click="list_container_clicked($event)">
        <li component-type='image-container' class="image-component-placeholder align-self-center flex-center" ref="img-placeholder">
            <button @click="upload_image($event)" component-type='upload-image' class="rounded-btn"><span class="icon-plus1" style="font-size:14px;padding:0px;margin:0px;"></span></button>
            <input class="display-none" id="upload-img-btn" type="file">
            <img component-type='image' class="display-none" src="~/assets/images/1.png" alt="" width="100%">
        </li>
    </ul>
</template>

<script>

export default {
    data() {
        return {
            img_placeholder: null
        }
    },
    methods: {
        list_container_clicked(e) {
            if($(e.target).attr('component-type') === 'container') {
                $containerCustomization(e.target)
            }
        },
        upload_image(upload_btn) {
            let $this = this
            let input = null
            if($(upload_btn.target).parent().attr("component-type") === 'upload-image') {
                input = $(upload_btn.target).parent().next()
            } else {
                input = $(upload_btn.target).next()
            }
            input.click()
            input.change(function(e) {
                $this.readURL(this, upload_btn.target)
            })

        },
        readURL(input, upload_btn) {
            let $this = this
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    if($(input).next().attr("component-type") === 'image') {
                        if($(upload_btn).parent().attr("component-type") === 'upload-image') {
                            $(upload_btn).parent().addClass("display-none")
                        } else {
                            $(upload_btn).addClass("display-none")
                        }
                        let img_tag = $(input).next()
                        img_tag.attr('src', e.target.result)
                        img_tag.removeClass('display-none')
                        $($this.$refs['img-placeholder']).removeClass('image-component-placeholder')
                    }
                }                
                reader.readAsDataURL(input.files[0]);
            }
        }
    },
    mounted() {
        let $this = this
        $(document).ready(function() {

        })
    }
}
</script>

<style>

li[component-type='image-container'] {
    width: 300px;
    height: 200px;
    list-style-type: none;
    display: flex;
    /* box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2); */
    margin: 10px;
    overflow: hidden;
    padding: 10px;
    border: 2px solid transparent;
}
button[component-type='upload-image'] {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    border: 1px solid rgba(0, 0, 0, 0.125);
    padding: 0px;
    margin: 0px;
}
.image-component-placeholder {
    background-color: #f7f7f7;
    border: 2px dashed rgba(0, 0, 0, 0.125);

}
li[component-type='image-container']:hover {
    border: 2px solid #4285f4 !important;
}
button[component-type='upload-image']:hover {
    background: rgba(154, 212, 253, 0.225);
}
button[component-type='upload-image']:hover * {
    color: #4285f4;
}


</style>