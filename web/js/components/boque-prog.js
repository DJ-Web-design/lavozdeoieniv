
Vue.component('bloque-prog', {
    props: { programa: String, dia: String, hora: String, locutor: String, descripcion: String, img: String }, template: `
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
    data: function () {
        return dataProg
    },
    methods: {
        viewMore: function (e) {
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
                keys: "height"
            });
            setTimeout(() => {
                event.target.parentElement.parentElement.children[0].style.animation = "imgSlide ease 1s";
                event.target.parentElement.parentElement.children[0].style.marginTop = "125px";
                that.createKeyFrames({
                    name: "imgSlide",
                    preHeight: "35px",
                    postHeight: "125px",
                    keys: "margin-top"
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
        viewLess: function (e) {
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
                setTimeout(() => {
                    event.target.parentElement.parentElement.children[0].style.animation = "";
                }, 1000);
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
        createKeyFrames: function (animation) {
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
                },
            }
            this.no.push(style)
        }
    }
}); 