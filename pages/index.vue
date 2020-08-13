<template>
  <div class="container-fluid">
    <!-- HEADER -->
    <div class="row p-3 justify-content-between" ref="header">
      <div>
        <button class="btn text-primary font-weight-bold">ProtoSigning</button>
      </div>
      <div>
        <button @click="$router.push('/signin')" class="btn">Signin</button>
        <button @click="$router.push('/signup')" class="btn">Signup</button>
      </div>
    </div>
    <!-- HEADER -->

    <!-- LANDING INTRO -->
    <div class="row pl-5 pr-5 border-bottoms" :style="{height: heights.site_intro + 'px'}">
      <div class="col-md-7 m-auto">
        <h4 class="w-100 mb-3 ls-2 text-center font-weight-normal animated fadeInUp slow">The best place to gave your buisness it's own identity and Style</h4>
        <p class="w-100 text-center  mt-1 ls-1 animated fadeInUp delay-1s slow">Protosigning is the best place for new starup buisnesses to gave
          identity to their buisnesses by creating their own site and buisness Logo
          totally free of cost. We have a huge variety of collections that our designers
          are working on it everyday to make our valuable users happy and continue their
          buisnesses.
        </p>
        <!-- <div class="col-md-12 text-center pt-5">
          <button class="btn"><span class="material-icons">keyboard_arrow_down</span></button>
        </div> -->
      </div>
    </div>
    <!-- LANDING INTRO -->

    <!-- CONTENT-1 -->
    <div class="row mt-1 pl-5 pr-5 justify-content-around bg-light-2" :style="{height: heights.window + 'px'}">
      <div class="col-md-4  align-self-center" data-aos="fade-up">
        <h1 class="ls-2 mb-3">Extracting Logo From Image</h1>
        <h4 class="font-weight-normal ls-1">With our powerfull algorithms, you can now extract a logo from an image, extracting a logo from image means
          that you can generate the source file (SVG) of that logo. After that you can do many changes to it like changing their colors, paths, points all sorts of stuff.
        </h4>
      </div>
      <div class="col-md-5  overflow-hidden text-center align-self-center">
        <img :src="svg.computer" width="500px" alt="" data-aos="fade-left">
      </div>
    </div>
    <!-- CONTENT-1 -->

    <!-- CONTENT-2 -->
    <div class="row mt-1 pl-5 pr-5 justify-content-around" :style="{height: heights.window + 'px'}">
      <div class="col-md-5  overflow-hidden text-center align-self-center">
        <img :src="svg.web" width="500px" alt="" data-aos="fade-right">
      </div>
      <div class="col-md-4  align-self-center" data-aos="fade-up">
        <h1 class=" ls-2 mb-3">Code Generation</h1>
        <h2 class="font-weight-normal ls-1">Not only you can create your web prototypes with drag and drop, you can also be able to get their front-end code in <strong>.html</strong>,
        <strong>.css</strong> formats.</h2>
      </div>
    </div>
    <!-- CONTENT-2 -->
    
    <!-- CONTENT-3 -->
    <div class="row mt-1 pl-5 pr-5 justify-content-around bg-light-2" :style="{height: heights.window + 'px'}">
      <div class="col-md-4  align-self-center" data-aos="fade-up">
        <h1 class=" ls-2 mb-3">Responsive Designs</h1>
        <h2 class="font-weight-normal ls-1">You can create your prototypes in a responsive way, which will help you to be able to see, how your prototype desing looks
          on different devices such as <strong>Desktop, PC, Tablets and Phones</strong>
        </h2>
      </div>
      <div class="col-md-5  overflow-hidden text-center align-self-center">
        <img :src="svg.responsive_design" width="500px" alt="" data-aos="fade-left">
      </div>
    </div>
    <!-- CONTENT-3 -->

    <!-- CONTENET-4 -->
    <div class="row mt-1 pl-5 pr-5 justify-content-around" :style="{height: heights.window + 'px'}">
      <div class="col-md-5  overflow-hidden text-center align-self-center" data-aos="fade-right">
        <img :src="svg.list" width="500px" alt="">
      </div>
      <div class="col-md-4  align-self-center" data-aos="fade-up">
        <h1 class=" ls-2 mb-3">Create Logo By giving a set of details</h1>
        <h2 class="font-weight-normal ls-1">Not only you can create your own logo from scratch, but you can use our artifical neural network to create a unique by providing some
          set of information such as <strong>logo name, color combinations, field etc.</strong> and on the basis of this info, our system will generate a unique logo for you.
          The results will shock you, try it!</h2>
      </div>
    </div>
    <!-- CONTENET-4 -->
    
    <!-- CONTENT-5 -->
    <div class="row mt-1 pl-5 pr-5 justify-content-around bg-light-2" :style="{height: heights.window + 'px'}">
      <div class="col-md-4  align-self-center" data-aos="fade-up">
        <h1 class=" ls-2 mb-3">Our SVG tool</h1>
        <h2 class="font-weight-normal ls-1">Use our powerful SVG tool to create beautiful and unique designs and logos and export them into the source file</h2>
      </div>
      <div class="col-md-5  overflow-hidden text-center align-self-center">
        <img :src="svg.tools" width="500px" alt="" data-aos="fade-left">
      </div>
    </div>
    <!-- CONTENT-5 -->
    
    <!-- CONTENT-6 -->
    <div class="row mt-1 pl-5 pr-5 justify-content-around" :style="{height: heights.window + 'px'}">
      <div class="col-md-5 overflow-hidden text-center align-self-center">
        <img :src="svg.business" width="500px" alt="" data-aos="fade-right">
      </div>
      <div class="col-md-4  align-self-center" data-aos="fade-up">
        <h1 class=" ls-2 mb-3">Team Collaboration - Share your projects with your colleagues</h1>
        <h2 class="font-weight-normal ls-1">With team Collaboration, you can be able to share you projects with colleagues, and can also edit their priviledges such as only viewing as well as 
          viewing and editing. You can speed up your workflow with team Collaboration and done your project with a very fast rate.
        </h2>
      </div>
    </div>
    <!-- CONTENT-6 -->


    <!-- FOOTER -->
    <div class="row bg-light-2 justify-content-center mt-5 p-3 bd-top">
      <button disabled class="btn  mr-3">2020 Protosign, All Rights Reserved.</button>
      <button class="btn">DMCA</button>
      <button class="btn">Terms and Conditions</button>
      <button class="btn">About us</button>
      <button class="btn">Policies</button>
      <button class="btn">Contact us</button>
    </div>
    <!-- FOOTER -->
  </div>
</template>

<script>
import tools from '@/assets/svg/tools.svg'
import web from '@/assets/svg/web.svg'
import responsive_design from '@/assets/svg/responsive-design.svg'
import list from '@/assets/svg/list.svg'
import computer from '@/assets/svg/computer.svg'
import business from '@/assets/svg/business.svg'
export default {
  data() {
    return {
      heights: {
        site_intro: 200,
        window: 200
      },
      svg: {
        tools: tools,
        web: web,
        responsive_design: responsive_design,
        list: list,
        computer: computer,
        business: business
      }
    }
  },
  methods: {
    $init() {
      this.$def_w_h()
    },
    $def_w_h() {
      let header = $(this.$refs['header'])

      this.heights.site_intro = $get_window_based_height(header)
      this.heights.window = $(window).height()
    }
  },
  mounted() {
    this.$init()
    AOS.init();
    $(window).resize(() => this.$def_w_h())
  }
}
</script>

<style>

</style>