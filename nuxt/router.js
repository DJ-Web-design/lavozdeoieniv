import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _1a634f87 = () => import('..\\..\\src\\pages\\test.vue' /* webpackChunkName: "pages_test" */).then(m => m.default || m)
const _4ccd3798 = () => import('..\\..\\src\\pages\\nosotros.vue' /* webpackChunkName: "pages_nosotros" */).then(m => m.default || m)
const _a89fb118 = () => import('..\\..\\src\\pages\\equipo.vue' /* webpackChunkName: "pages_equipo" */).then(m => m.default || m)
const _7c4bb0aa = () => import('..\\..\\src\\pages\\admin.vue' /* webpackChunkName: "pages_admin" */).then(m => m.default || m)
const _41298b56 = () => import('..\\..\\src\\pages\\radio.vue' /* webpackChunkName: "pages_radio" */).then(m => m.default || m)
const _764d65aa = () => import('..\\..\\src\\pages\\Galeria\\videos.vue' /* webpackChunkName: "pages_Galeria_videos" */).then(m => m.default || m)
const _764f7ae4 = () => import('..\\..\\src\\pages\\Galeria\\videos\\_youtube.vue' /* webpackChunkName: "pages_Galeria_videos__youtube" */).then(m => m.default || m)
const _440cb40d = () => import('..\\..\\src\\pages\\Galeria\\fotos.vue' /* webpackChunkName: "pages_Galeria_fotos" */).then(m => m.default || m)
const _4adc5cad = () => import('..\\..\\src\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/test",
			component: _1a634f87,
			name: "test"
		},
		{
			path: "/nosotros",
			component: _4ccd3798,
			name: "nosotros"
		},
		{
			path: "/equipo",
			component: _a89fb118,
			name: "equipo"
		},
		{
			path: "/admin",
			component: _7c4bb0aa,
			name: "admin"
		},
		{
			path: "/radio",
			component: _41298b56,
			name: "radio"
		},
		{
			path: "/Galeria/videos",
			component: _764d65aa,
			name: "Galeria-videos",
			children: [
				{
					path: ":youtube?",
					component: _764f7ae4,
					name: "Galeria-videos-youtube"
				}
			]
		},
		{
			path: "/Galeria/fotos",
			component: _440cb40d,
			name: "Galeria-fotos"
		},
		{
			path: "/",
			component: _4adc5cad,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
