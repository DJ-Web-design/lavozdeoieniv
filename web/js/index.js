var app = new Vue({
    el:"#app",
    data:{
        sliderNo: 1,
        maxSlide: {
            "grid-template-rows": `auto 1fr;`
        },
        scroll:null,
        fraction: {
            "grid-row": "1 / auto"
        },
        fadeNo: 1,
        document:document,
        styleMenu:{
            left:"-100%"
        },
        styleSombra:{
            opacity:0,
            display:"none"
        },
        open:false,
        checked:"Habla Sobre Mi de Daniel calveti",
        successVote:false,
        errorVote:false,
        againVote:false,
        urlShareFace: "",
        urlShareTwit: "",
        posicion1:null,
        posicion2:null,
        posicion3:null,
        posicion4:null,
    },
    methods:{
        openMenu: function(){            
            if (this.open === false){
                this.styleMenu.left = 0;
                this.styleSombra.display = "block";
                console.log("Display block");
                
                setTimeout(()=>{
                    this.styleSombra.opacity = 1;
                    console.log("opacity 1");
                    
                }, 20);
                this.open = true;
            } else {
                this.styleMenu.left = "-100%";
                this.styleSombra.opacity = 0;
                console.log("opacity 0");
                setTimeout(()=>{
                    this.styleSombra.display = "none";
                    console.log("display none");
                }, 600)
                this.open = false;
            }

        },
        votar: function (e) {
            e.preventDeafault();
            if (localStorage.getItem('voto 1')) {
                this.againVote = true;
            } else {
                axios.get("form.php", {params:{
                    vota: this.checked
                }}).then(response => {
                    this.urlShareFace = `https://www.facebook.com/sharer.php?text=Yo vote por: ${response.data}. Entra a www.lavozdeoieniv.com y tu tambien vota por tu canción favorita.`,
                        this.urlShareTwit = `https://twitter.com/intent/tweet?text=Yo vote por: ${response.data}. Entra a www.lavozdeoieniv.com y tu tambien vota por tu canción favorita.`,
                    this.successVote = true;
                    /*Cambiar para cambiar el voto
                    localStorage.removeItem("voto 1")
                    localStorage.setItem("voto 2", true)*/
                    localStorage.setItem('voto 1', true)
                }).catch( error =>{
                    this.errorVote = true;
                })
            }
        },
        changeSlider: function (operation) {
            if (operation === "+") {
                if (this.fadeNo === 4) {
                    this.fadeNo = 0
                }
                this.fadeNo++
                setTimeout(() => {
                    if (this.sliderNo === 4) {
                        this.sliderNo = 0;
                    }
                    this.sliderNo++
                }, 1500);

            }
            else if (operation === "-") {
                if (this.fadeNo === 1) {
                    this.fadeNo = 5
                }
                this.fadeNo--
                setTimeout(() => {
                    if (this.sliderNo === 1) {
                        this.fadeNo = 4
                    }
                    this.sliderNo--
                }, 1500);

            }
        }
    },
    watch:{
        scroll:function(e) {
            let posicion = (e * .15)
             this.posicion1 = 0 - posicion;
             this.posicion2 = 160 - posicion;
             this.posicion3 = 260 - posicion;
             this.posicion4 = 300 - posicion;    
        }
    }
})