Vue.component("chat-template", {
    props: ["user", "message", "pic", "date"],
    template: `<li id="plantilla" class="left clearfix"><span class="chat-img pull-left"><img :src="pic" class="img-circle userpic" /></span><div class="chat-body clearfix"><div class="header"><strong class="Nombre">{{ user }}</strong><small class="pull-right"><span class="Tiempo">{{ date }}</span></small></div><p class="Mensaje">{{ message }}</p></div></li>`, data: function () { return data },
    methods: {
        verModal: function () {
            this.display = "block";
            this.opa = 1;
        }
    }
});
