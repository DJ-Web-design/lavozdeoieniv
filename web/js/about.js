var app = new Vue({
    el:"#app",
    data:{
        tab:1
    },
    methods:{
        changeTab:function(evento) {

        }
    },
    watch:{
        historia:function(){
            if(this.historia){
                this.vision = false;
                this.mision = false;
                this.equipo = false;
            }

        }
    }
})