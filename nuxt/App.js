import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'


let layouts = {

  "_admin": () => import('..\\..\\src\\layouts\\admin.vue'  /* webpackChunkName: "layouts_admin" */).then(m => m.default || m),

  "_default": () => import('..\\..\\src\\layouts\\default.vue'  /* webpackChunkName: "layouts_default" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"La Voz de OIENIV Radio | Emisora Cristiana En Venezuela","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"property":"og:type","content":"website"},{"property":"og:image","content":"https:\u002F\u002Fwww.lavozdeoieniv.tk\u002Fimages\u002Fimage.jpg"},{"property":"og:image:width","content":"851px"},{"property":"og:image:height","content":"315px"},{"property":"fb:app_id","content":"126968564676905"},{"property":"og:image:alt","content":"Emisora Cristiana La Voz de OIENIV"},{"name":"twitter:card","content":"summary"},{"name":"twitter:site","content":"@lavozdeoieniv"}],"script":[{"src":"\u002Fjs\u002Ffb-button.js"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"canonical","href":"https:\u002F\u002Fwww.lavozdeoieniv.tk"},{"rel":"stylesheet","href":"\u002Fcss\u002Fpage.css"}],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

