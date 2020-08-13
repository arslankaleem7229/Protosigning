
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Protosigning - Design anything',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", rel: "stylesheet"},
      { href:"https://unpkg.com/aos@next/dist/aos.css", rel: "stylesheet"},
      { href: "http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css", rel: "stylesheet"},
      { href: 'http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css', rel: "stylesheet"},
      // { href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css", rel: "stylesheet"},
      // { href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css", rel: "stylesheet"},
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"},
      { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"},
      { src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"},
      { href:"https://fonts.googleapis.com/icon?family=Material+Icons", rel: "stylesheet"},

    ],
    script: [
      { src: "/pngtosvg/jquery-3.3.1.min.js"},
      { src: "/js/jquery-ui.min.js"},
      { src: "/pngtosvg/raphael-2.1.0.js"},
      { src: "/pngtosvg/popper.min.js"},
      { src: "/pngtosvg/color-thief.js"},
      { src: "/pngtosvg/all_5_4.js"},
      { src: "/pngtosvg/appfree.js"},
      { src: "/pngtosvg/CanvasEffects.worker.js"},
      { src: "/pngtosvg/worker.js"},
      { src: "/pngtosvg/Blob.js"},
      { src: "/js/include.js"},
      { src: "/js/dip/FILTER.js"},
      { src: "/js/dip/IMG_FUNCTIONS.js"},
      { src: "/js/dip/EDGE_DETECTOR.js"},
      { src: "/js/css-beautify.js"},
      { src:"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ace.js"},
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"},
      { src: "https://unpkg.com/aos@next/dist/aos.js"},
      {src: "https://cdn.jsdelivr.net/npm/indent@0.0.2/index.min.js"},
      {src:"https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ace.js"},
      {src: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-beautify.js"},
      {src: "https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0/dist/svg.min.js"},
      {src: "https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"},
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/bootstrap-ext.css',
    '~assets/bootstrap-ext.css',
    '~assets/css/animate-css.css',
    '~assets/icon/style.css',    
    // '~assets/font-icon/style.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/fetch-api.js', '~/plugins/user-api.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  router: {
    middleware: ["authenticated"]
  },
  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api/index.js'
    }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
