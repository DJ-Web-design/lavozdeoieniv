var app = new Vue({
    el:"#app",
    data:{
        tab:1,
        activeTab:"active-tab",
        tabs:[
            "Historia",
            "Visión",
            "Misión",
            "Equipo"
        ],
        tabsWind:[
            {
                name: "Historia",
                des:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo necessitatibus dolorum consequatur sed cupiditate nostrum
					maxime cumque reiciendis totam excepturi ut recusandae, eum optio quis maiores possimus dolorem quod incidunt.
					<br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, repellendus esse est facere reprehenderit rem vero
					mollitia numquam vitae accusamus temporibus iste quos, beatae error repellat tempore eveniet ab id!`,
            },{
                    name:"Visión",
                des:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo necessitatibus dolorum consequatur sed cupiditate nostrum
					maxime cumque reiciendis totam excepturi ut recusandae, eum optio quis maiores possimus dolorem quod incidunt.
					<br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, repellendus esse est facere reprehenderit rem vero
					mollitia numquam vitae accusamus temporibus iste quos, beatae error repellat tempore eveniet ab id!`,
            },{
                    name:"Misión",
                des:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo necessitatibus dolorum consequatur sed cupiditate nostrum
					maxime cumque reiciendis totam excepturi ut recusandae, eum optio quis maiores possimus dolorem quod incidunt.
					<br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, repellendus esse est facere reprehenderit rem vero
					mollitia numquam vitae accusamus temporibus iste quos, beatae error repellat tempore eveniet ab id!`,
            },{
                    name:"Equipo",
                des:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo necessitatibus dolorum consequatur sed cupiditate nostrum
					maxime cumque reiciendis totam excepturi ut recusandae, eum optio quis maiores possimus dolorem quod incidunt.
					<br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, repellendus esse est facere reprehenderit rem vero
					mollitia numquam vitae accusamus temporibus iste quos, beatae error repellat tempore eveniet ab id!`,
            }
        ]
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