Vue.component('menu-item', { 
    props: ["index", "radio", "fotos", "videos", "nosotros", "logo"], 
    template: `<div><div class="menu-cel" @click="openMenu()">
    <img :src="logo" alt="">
    <span class="icon-menu"></span></div>
    <div class="sombra" :style="styleSombra" @click="openMenu()"></div>
    <nav class="menu" :style="document.body.clientWidth < 950 ? styleMenu: ''">
    <figure><a v-bind:href="index">
    <img v-bind:src="logo" alt=""></a></figure>
    <ul><li><a v-bind:href="index" class="ocultar-escritorio">Inicio</a></li><li>
    <a v-bind:href="radio" class="borderanim"><span>Radio Online</span></a></li>
    <li class="submenu"><a href="#" class="borderanim"><span>Galeria</span></a>
    <ul class="children"><li><a v-bind:href="fotos" class="borderanim">Fotos
    <span class="icon-dot"></span></a></li>
    <li><a v-bind:href="videos" class="borderanim">Videos<span class="icon-dot "></span></a></li></ul>
    </li><li><a v-bind:href="nosotros" class="borderanim"><span>Nosotros</span></a></li></ul></nav>
    </div>` }); 
    var menu = new Vue({
    el: "#menu", 
    data:{
        styleMenu: {
            left: "-100%",
            transition:"ease .6s"
        },
        styleSombra: {
            opacity: 0,
            display: "none",
            transition:"ease .6s"
        },
    },
    methods: {
        openMenu: function () {
            if (this.open === false) {
                this.styleMenu.left = 0;
                this.styleSombra.display = "block";
                console.log("Display block");

                setTimeout(() => {
                    this.styleSombra.opacity = 1;
                    console.log("opacity 1");

                }, 20);
                this.open = true;
            } else {
                this.styleMenu.left = "-100%";
                this.styleSombra.opacity = 0;
                console.log("opacity 0");
                setTimeout(() => {
                    this.styleSombra.display = "none";
                    console.log("display none");
                }, 600)
                this.open = false;
            }
        } 
    }
})