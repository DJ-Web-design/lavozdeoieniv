Vue.component("chat-template",{
    props:["user", "message", "pic", "date"],
    template:`<li id="plantilla" class="left clearfix">
                    <span class="chat-img pull-left">
                        <img :src="pic" class="img-circle userpic" />
                    </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <strong class="Nombre">{{ user }}</strong>
                            <small class="pull-right">
                                <span class="Tiempo">{{ date }}</span>
                            </small>
                        </div>
                        <p class="Mensaje">{{ message }}</p>
                    </div>
                </li>`
})
var panel = new Vue({
    el: '.cuerpo',
    data: data,
    methods:{
        sendMessage:function(e){
            e.preventDefault();
            let formatofecha = new Date();
            let d = formatofecha.getUTCDate();
            let m = formatofecha.getMonth() + 1;
            let y = formatofecha.getFullYear();
            let h = formatofecha.getHours();
            let min = formatofecha.getMinutes();
            let Fecha = `${d}/${m}/${y} ${h}:${min}`;
            if (this.chat.message && this.chat.user){
                TablaDeBaseDatos.push({ 
                    message: this.chat.message, 
                    user: this.chat.user, 
                    pic: this.chat.pic, 
                    date:Fecha 
                });
                this.chat.message=""
                }
        },
        verModal: function () {
            this.showModal = true;
        }
    },
});
var modal = new Vue({
    el:"#modal",
    data:data
})