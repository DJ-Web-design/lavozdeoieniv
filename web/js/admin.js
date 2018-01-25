var app = new Vue({
    el:"#app",
    data:{
        bloqueo:true,
        usuario:"david",
        contra:"1234",
        inputUser:"",
        inputPass:"",
        noUser:false,
        remember:"",
        page:1,
        page1:true,
        page2:false,
        page3:false,
        galeria:"",
    },
    methods:{
        autenticate: function() {
            if (this.inputUser == this.usuario && this.inputPass == this.contra) {
                if (this.remember) {
                    localStorage.setItem("remember", true)
                }
                this.bloqueo = false
            } else {
                this.noUser = true
            }
        }
    }

})