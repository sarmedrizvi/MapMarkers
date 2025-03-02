export default {
  loading: {
    color: "blue",
    height: "5px"
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in"
  },
  transition: {
    name: 'test',
    mode: 'out-in'
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Save SMB" || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  vendor: ["vue2-google-maps"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vue2-location" }, "~/plugins/vue-bar"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt"
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
