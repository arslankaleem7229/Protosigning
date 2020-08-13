<template>
  <div class="default-border pt-5 flex nav-right-container">
      <button ref="code-btn" id="code-btn" class="icon-code box-shadow bg-white font-weight-bold"></button>
  </div>
</template>

<script>
import editor from './editor'
import vue from 'vue'
export default {
  components: {
    editor
  },
  data() {
    return {
      code_btn : null,
      code: {
        html: null,
        css: null
      }
    }
  },

  methods: {
    open_editor() {
      this.code.html = $('.workspace').html()
      let instance = this.getComponent(editor)
      $(document.body).append(instance)
        
    },

    
    getComponent(component, props = null) {
        let ComponentClass = vue.extend(component)
        let instance = new ComponentClass({ propsData: props })
        instance.$mount()
        return instance.$el
    },
  },

  mounted() {
    let $this = this
    this.code_btn = $(this.$refs['code-btn'])


    this.$nextTick(() => {
      $this.code_btn.click(() => $this.open_editor())

      // $this.open_editor()
    })
  }

}
</script>

<style>
.nav-right-container .icon-code {
    width: 50px;
    height: 50px;
    border-radius: 50% 0px 0px 50%;
}
</style>