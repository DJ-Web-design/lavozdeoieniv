Vue.component("item-footer",{props: ["index", "logo"],template: '<footer class="mdl-mini-footer"><div class= "mdl-mini-footer__left-section"><div class="mdl-logo"><a v-bind:href="index"><img class="mdl-logo" v-bind:src="logo" alt=""></a><span id="title">La Voz de OIENIV</span></div><ul class="mdl-mini-footer__link-list" style="display:block"><li><a href="">Contactanos</a></li><li><a href="">Apoyanos</a></li><li><a href="">Vota</a></li></ul></div><div class="mdl-mini-footer__right-section"><button class="mdl-mini-footer__social-btn" id="icon-face"><span class="icon-facebook" style="color: rgb(59, 89, 152)"></span></button><button class="mdl-mini-footer__social-btn" id="icon-twit"><span class="icon-twitter" style="color: rgb(29, 161, 242)"></span></button><button class="mdl-mini-footer__social-btn" id="icon-inst"><span class="icon-instagram" style="color: rgb(205, 32, 31)"></span></button><button class="mdl-mini-footer__social-btn" id="icon-yt"><span class="icon-youtube" style="color: rgb(228, 64, 95)"></span></button></div></footer>'});
let datos = {document:document,styleMenu:{left:"-100%",transition:"ease .6s"},styleSombra: {opacity:0,display:"none",transition:"ease .6s"},open: false}
Vue.component("menu-item",{props:["index","radio","fotos","videos","nosotros","logo"],template:`<div><div class="menu-cel" @click="openMenu()"><img :src="logo" alt=""><span class="icon-menu"></span></div><div class="sombra" :style="document.body.clientWidth < 950 ? styleSombra: ''" @click="openMenu()"></div><nav class="menu" :style="document.body.clientWidth < 950 ? styleMenu: ''"><figure><a v-bind:href="index"><img v-bind:src="logo" alt=""></a></figure><ul><li><a v-bind:href="index" class="ocultar-escritorio">Inicio</a></li><li><a v-bind:href="radio" class="borderanim"><span>Radio Online</span></a></li><li class="submenu"><a href="#" class="borderanim"><span>Galeria</span></a><ul class="children"><li><a v-bind:href="fotos" class="borderanim">Fotos<span class="icon-dot"></span></a></li><li><a v-bind:href="videos" class="borderanim">Videos<span class="icon-dot "></span></a></li></ul></li><li><a v-bind:href="nosotros" class="borderanim"><span>Nosotros</span></a></li></ul></nav></div>`,data:function(){return datos},methods: {openMenu: function () {if (this.open === false) {this.styleMenu.left = 0;this.styleSombra.display = "block";setTimeout(() => {this.styleSombra.opacity = 1;},20);this.open = true;} else {this.styleMenu.left = "-100%";this.styleSombra.opacity = 0;setTimeout(() => {this.styleSombra.display = "none";}, 600);this.open = false;}}}});
Vue.component("chat-template",{
    props:["user", "message", "pic", "date"],
    template:`<li id="plantilla" class="left clearfix"><span class="chat-img pull-left"><img :src="pic" class="img-circle userpic" /></span><div class="chat-body clearfix"><div class="header"><strong class="Nombre">{{ user }}</strong><small class="pull-right"><span class="Tiempo">{{ date }}</span></small></div><p class="Mensaje">{{ message }}</p></div></li>`,data:function(){return data},
    methods:{
    verModal: function () {
        this.display = "block";
        this.opa = 1;}}});

Vue.component('bloque-prog', {
    props: ["programa", "dia", "hora", "locutor", "descripcion", "img"], template: `
        <div class= "bloque-programa" :style="no.style.bloqueProg">
        <div class="bloque"><img class="pull-left img" :src="img" alt="" :style="style.img">
        <div class="">
                    <h6>{{ programa }}</h6>{{ dia }}
                    <br>{{ hora }}
                        <br>con {{ locutor }}
                            <br>
                            <button class="botonMas mdl-button mdl-color--amber-800" @click="viewMore($event)" :style="no.style.verMas">Ver Mas</button>
                            <span class="des" :style="no.style.des">{{ descripcion }}</span>
                            <br>
                            <button class="mdl-button botonMenos mdl-color--amber-800" :style="no.style.verMenos" @click="viewLess($event)">Ver Menos</button>
        </div>
    </div>
</div>`,
data:function(){
    return dataProg
},
    methods:{
        viewMore:function(e){
            console.log(e.target.parentElement);
            
            const that = this;
            let classParent = e.target.parentElement.parentElement.parentElement.parentElement;
            let preHeight = "340px";    
            this.no.preHeight = "150px";
            var event = e;
            let nameAnimation = "slideIn";

        

            /*if (window.screen.width <= 479) {
                if (vista == true) {*/
            classParent.style.height = "1210px";
            classParent.parentElement.style.height = "1210px";
            event.target.parentElement.parentElement.parentElement.style.height = "340px";
            event.target.parentElement.parentElement.style.animation = "slideIn ease 1s";

            this.createKeyFrames({ 
                name: nameAnimation, 
                preHeight: this.no.preHeight, 
                postHeight: preHeight,
                keys:"height"
            });
            setTimeout(() => {
                event.target.parentElement.parentElement.children[0].style.animation = "imgSlide ease 1s";
                event.target.parentElement.parentElement.children[0].style.marginTop = "125px";
                that.createKeyFrames({
                    name:"imgSlide",
                    preHeight:"35px",
                    postHeight:"125px",
                    keys:"margin-top"
                })
                event.target.parentElement.children[5].style.animation = "fade-in ease 1s";
                event.target.parentElement.children[5].style.display = "block";
                event.target.parentElement.children[5].style.opacity = 1;

                event.target.style.animation = "fade-out ease 1s";
                event.target.style.opacity = 0;
                event.target.style.display = "none";

                event.target.parentElement.children[7].style.animation = "fade-in ease 1s";
                event.target.parentElement.children[7].style.opacity = 1;
                event.target.parentElement.children[7].style.display = "block";            
            }, 1000);

                   /* });
            } else if (window.screen.width >= 480 && window.screen.width <= 766) {
                if (vista == true) {
                    $(".des").hide(1, function () {
                        $(".img").css({ "margin-top": "5%" });
                        $(".bloque-programa").css({ height: "16.6%" });
                        $(".botonMenos").hide(1);
                        $(".botonMas").show(1)
                    })
                };
                $(Id).animate({ height: "270px" },
                    function () {
                        $(".programas").animate({ height: "1940px" });
                        $(img).css({ "margin-top": "75px" });
                        $(des).show(500);
                        $(botonMas).hide(1);
                        $(botonMenos).show(1)
                    });
            } else if (window.screen.width >= 767 && window.screen.width <= 949) {
                if (vista == true) {
                    $(".des").hide(1, () => {
                        $(".img").css({ "margin-top": "5px" });
                        $(".bloque-programa").css({ height: "150px" });
                        $(".botonMenos").hide(1); $(".botonMas").show(1);
                    });
                };
                $(Id).animate({ height: "200px" }, () => {
                    $(".programas").animate({ height: "1070px" });
                    $(img).css({ "margin-top": "30px" });
                    $(des).show(500);
                    $(botonMas).hide(1);
                    $(botonMenos).show(1);
                });
            } else {
                if (vista == true) {
                    $(".des").hide(1, () => {
                        $(".img").css({ "margin-top": "5px" });
                        $(".bloque-programa").css({ height: "150px" });
                        $(".botonMenos").hide(1);
                        $(".botonMas").show(1);
                    });
                };
                $(Id).animate({ height: "230px" }, () => {
                    $(".programas").animate({ height: "1100px" });
                    $(".bloque-der").animate({ height: "1100px" });
                    $(img).css({ "margin-top": "30px" });
                    $(des).show(500);
                    $(botonMas).hide(1);
                    $(botonMenos).show(1);
                });
            } return vista = true;*/
        },
        viewLess: function(e){
            let nameSlide = "slide";
            let nameFade = "fade";
            let event = e;
            let that = this;

            let classParent = e.target.parentElement.parentElement.parentElement.parentElement;

            e.target.parentElement.parentElement.parentElement.style.height = "150px";
            e.target.parentElement.parentElement.style.animation = `slideOut ease 1s`;
            this.createKeyFrames({
                name: "slideOut",
                preHeight: "340px",
                postHeight: "150px",
                keys: "height"
            })
            setTimeout(() => {
                event.target.parentElement.parentElement.children[0].style.marginTop = "35px";
                event.target.parentElement.parentElement.children[0].style.animation = "imgSlideOut ease 1s";
                that.createKeyFrames({
                    name: "imgSlideOut",
                    preHeight: "125px",
                    postHeight: "35px",
                    keys: "margin-top"
                });
                classParent.style.height = "1020px";
                classParent.parentElement.style.height = "1020px";


                event.target.parentElement.children[5].style.animation = "fade-in ease 1s";
                event.target.parentElement.children[5].style.display = "none";
                event.target.parentElement.children[5].style.opacity = 0;

                event.target.style.animation = "fade-out ease 1s";
                event.target.style.opacity = 0;
                event.target.style.display = "none";

                console.log(event.target.parentElement.children[4]);
                
                event.target.parentElement.children[4].style.animation = "fade-in ease 1s";
                event.target.parentElement.children[4].style.opacity = 1;
                event.target.parentElement.children[4].style.display = "block";
            }, 1000);




        },
        createKeyFrames:function(animation){
            let keyFrames = `@keyframes ${animation.name}{0%{${animation.keys}:${animation.preHeight}}100%{${animation.keys}:${animation.postHeight}}}`;
            document.getElementsByTagName("style")[0].innerText = keyFrames;

        },
        independizar: function () {
            let style = {
                style: {
                    des: {
                        display: "none",
                        opacity: 0,
                        transition: ".5s ease"
                    },
                    img: {},
                    bloqueProg: {},
                    verMas: {},
                    verMenos: {
                        display: "none"
                    }
                },}
            this.no.push(style)
        }
    }
}); 
var galFotos = Vue.component("gal-fotos", { props: ["titulo", "images", "href"], template: '<a v-bind:href="href"><div id="gal"><img v-bind:src="images"><div><span id="t"><span id="txt">{{ titulo }}</span></span></div></div></a>' });
var modalTemplate = Vue.component('modal-template', {template: '<div class="modal"><div class="modal-content"><img v-bind:src="images.images.url" alt=""></div></div>'});