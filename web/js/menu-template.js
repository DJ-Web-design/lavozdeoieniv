Vue.component('modal-template',{
  template:'<div class="modal">\
               <div class="modal-content">\
                  <img v-bind:src="images.images.url" alt="">\
               </div>\
            </div>'
})
Vue.component("gal-fotos", {
  props: ["titulo", "images", "href"],
  template: '<a v-bind:href="href">\
      <div id="gal">\
        <img v-bind:src="images"><div>\
				  <span id="t"><span id="txt">{{ titulo }}</span></span>\
			  </div>\
      </div>\
	</a>'
})
Vue.component('bloque-prog',{
  props:["programa", "dia", "hora", "locutor", "descripcion", "img"],
  template: '<div class="bloque-programa">\
      <div class="bloque">\
        <img class="pull-left img" v-bind:src="img" alt="">\
        <div class="">\
          <h6>{{ programa }}</h6>{{ dia }}<br>{{ hora }}<br>con {{ locutor }}<br>\
          <button class="botonMas mdl-button mdl-color--amber-800">Ver Mas\
          </button>\
          <span class="des" style="display:none">{{ descripcion }}</span><br>\
          <button class="mdl-button botonMenos mdl-color--amber-800" style="display:none">Ver Menos\
          </button>\
        </div>\
      </div>\
    </div>'

})
Vue.component('menu-item', {
  props:["index", "radio", "fotos", "videos", "nosotros", "logo"],
	template: '<div>\
			<div class="menu-cel"><img v-bind:src="logo" alt=""><span class="icon-menu"></span></div>\
      <div class="sombra"></div>\
	  <nav class="menu">\
        <figure><a v-bind:href="index"><img v-bind:src="logo" alt=""></a></figure>\
        <ul>\
          <li><a v-bind:href="index" class="ocultar-escritorio">Inicio</a></li>\
          <li><a v-bind:href="radio" class="borderanim"><span>Radio Online</span></a></li>\
          <li class="submenu"><a href="#" class="borderanim"><span>Galeria</span></a>\
            <ul class="children">\
              <li>\
                <a v-bind:href="fotos" class="borderanim">Fotos\
                  <span class="icon-dot"></span>\
                </a>\
              </li>\
              <li>\
                <a v-bind:href="videos" class="borderanim">Videos\
                  <span class="icon-dot "></span>\
                </a>\
              </li>\
            </ul>\
          </li>\
          <li><a v-bind:href="nosotros" class="borderanim"><span>Nosotros</span></a></li>\
        </ul>\
      </nav>\
		</div>'
})
Vue.component("item-footer",{
  props:["index", "logo"],
  template: '<footer class="mdl-mini-footer">\
    <div class= "mdl-mini-footer__left-section">\
      <div class="mdl-logo">\
        <a v-bind:href="index">\
          <img class="mdl-logo" v-bind:src="logo" alt="">\
        </a>\
          <span id="title">La Voz de OIENIV</span>\
            </div>\
        <ul class="mdl-mini-footer__link-list" style="display:block">\
          <li>\
            <a href="">Contactanos</a>\
          </li>\
          <li>\
            <a href="">Apoyanos</a>\
          </li>\
          <li>\
            <a href="">Vota</a>\
          </li>\
        </ul>\
      </div>\
      <div class="mdl-mini-footer__right-section">\
        <button class="mdl-mini-footer__social-btn" id="icon-face">\
          <span class="icon-facebook" style="color: rgb(59, 89, 152)"></span>\
        </button>\
        <button class="mdl-mini-footer__social-btn" id="icon-twit">\
          <span class="icon-twitter" style="color: rgb(29, 161, 242)"></span>\
        </button>\
        <button class="mdl-mini-footer__social-btn" id="icon-inst">\
          <span class="icon-instagram" style="color: rgb(205, 32, 31)"></span>\
        </button>\
        <button class="mdl-mini-footer__social-btn" id="icon-yt">\
          <span class="icon-youtube" style="color: rgb(228, 64, 95)"></span>\
        </button>\
      </div>\
    </footer>'
})
var menu = new Vue({ el: "#menu" })

var app = new Vue({
  el: "#panel",
  data:data
})
 var bloque = new Vue({
   el: ".programas"
 })

 var modal = new Vue({
   el: "#modal",
   data:data
 })
 var pie = new Vue({
   el:"#pie"
 })
var galerias = new Vue({ el: "#galerias", })

var images = new Vue({
  el: ".row",
  data:{
    showModal: false,
    indexImg: 0,
    images:[
      { id:"1", title: "Titulo 1", url:"https://i.imgur.com/BOBnmUH.jpg" },
      { id:"2", title: "Titulo 2", url:"https://i.imgur.com/dFoTZEg.jpg"},
      { id: "3", title: "Titulo 3", url: "https://i.imgur.com/VjDVz4L.jpg" },
      { id: "4", title: "Titulo 4", url: "https://i.imgur.com/voIIzxw.jpg" },

    ]
  },
  methods: {
    uno: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 1; 
      })
    },
    dos: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 2;
      })
    },
    tres: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 3;
      })
    },
    cuatro: function (images) {
      return images.filter(function (images) {
        return images.id % 4 === 0;
      })
    },
    openGal: function(n) {

      var op = document.getElementById("box")
      for(i in this.images)

      if (n == 0) {

        op.innerHTML = '<div class="lightbox" id="image">\
        <a class="close" onclick="cerrar()">X</a>\
        <img src=' + this.images[n].url + ' alt=""><span onclick="next(' + n + ')">></span>\
        </div>'

      } else if( n == i) {

        op.innerHTML = '<div class="lightbox" id="image">\
        <a class="close" onclick="cerrar()">X</a>\
        <span onclick="prev('+ n + ')"><</span><img src=' + this.images[n].url + ' alt="">\
        </div>'

      } else{

        op.innerHTML = '<div class="lightbox" id="image">\
        <a class="close" onclick="cerrar()">X</a>\
        <span onclick="prev('+ n + ')"><</span><img src=' + this.images[n].url + ' alt=""><span onclick="next(' + n + ')">></span>\
        </div>'
      }
    }
  }
})