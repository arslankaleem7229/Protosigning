<template>
    <ul component-type='container'>
        <li component-type='header-2-container' class="header-2-container align-center">
            <div component='true' class="header-2-text-container" component-type='text-container'>
                <textarea component='true' class="header-2-text header-2-heading-text" text-type='heading-text' component-type='text'>Make Your Business More Profitable</textarea>
                <textarea component='true' class="header-2-text header-2-small-text" text-type='small-text' component-type='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, hic? Sit facere itaque quidem, dicta eius, est numquam ex blanditiis repudiandae illo quod distinctio, perspiciatis inventore accusantium vel laborum optio.</textarea>
            </div>
            <div component='true' component-type='image-container' class="header-2-img-container image-component-placeholder" ref="img-placeholder">
                    <button @click="upload_image($event)" component-type='upload-image' class="rounded-btn upload-btn"><span class="icon-plus1" style="font-size:14px;padding:0px;margin:0px;"></span></button>
                    <input class="display-none" id="upload-img-btn" type="file">
                    <img component-type='image' class="display-none" src="~/assets/images/1.png" alt="" width="100%">
            </div>
        </li>
    </ul>
</template>

<script>

export default {
    methods: {
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
    }
}
</script>

<style>
.header-2-container {
    display: flex;
    width: 80%;
    border: 2px solid rgba(0, 0, 0, 0.025);
    justify-content: center;
    padding: 15px;
    overflow-y: hidden;
}
.header-2-container div {
    align-self: center;
}
.header-2-text {
    width: 100%;
    overflow: hidden;
    font-family: "Helvetica Neue", Helvetica, Arial;
    background-color: transparent;
    border: 2px solid transparent;
}
.header-2-text-container {
    position: relative;
    padding: 20px;
}
.header-2-heading-text {
    font-size: 50px;
    font-weight: 500;
}
.header-2-small-text {
    color: #6c757d;
    font-size: 16px;
}


.header-2-img-container {
    width: 520px;
    height: 300px;
    list-style-type: none;
    display: flex;
    margin: 10px;
    overflow: hidden;
    padding: 10px;
    justify-content: center;
}
.header-2-img-container .upload-btn {
    align-self: center;
}
</style>