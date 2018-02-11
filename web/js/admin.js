var app = new Vue({
    el:"#app",
    data:{
        bloqueo:true,
        inputUser:"",
        inputPass:"",
        noUser:"",
        remember:"",
        page:1,
        page1:true,
        page2:false,
        page3:false,
        galeria:null,
        file:"",
        inputTitle:null,
        inputDescrip:null,
        salida:"",
        spin:false,
        voto1: 0,
        voto2: 0,
        voto3: 0,
    },
    methods:{
        imagen:function(file){
            this.file = file

        },
        recogerDatos:function(){
            let inputTitle = document.getElementById("titulo")
            let inputDescrip = document.getElementById("des")
            let inputGal = document.getElementById("gal")

            var fileTitle = inputTitle.value
            var fileDes = inputDescrip.value
            var fileGal = inputGal.value

            console.log(fileDes, fileTitle, this.file[0].name, inputGal.value);

            if (fileTitle && fileDes && fileGal && this.file){
                let sendFile = this.file[0];

                var upload = storageChild.child("prueba").put(sendFile)

                upload.on("state_changed", snapshot => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, error => {
                    alert("Error al subir archivo");
                    console.log(error.code);
                }, () => {
                    database.child("prueba").push({
                        title: fileTitle,
                        description: fileDes,
                        url: upload.snapshot.downloadURL
                    })
                    alert("Archivo subido exitosamente")
                })
            }
        },
        spinToggle:e=>{
            e.preventDefault()
            this.spin = true;
            this.voto1 = "";
            this.voto2 = "";
            this.voto3 = "";

            let votos = {
                voto1: "Habla Sobre Mi de Daniel calveti",
                voto2: "Luz y Sal de Funky",
                voto3: "Amor Real de Manny Montes"
            }
            $.get("votos.php", votos, res => {
                this.spin = false
                this.voto1 = res.res1
                this.voto2 = res.res2
                this.voto3 = res.res3
            }).fail(err => {
                alert("Error en el servidor")
                console.log(err);
            })
        },
        pedirVotos:datos =>{
            
            
        },
        submit:function(e){
            e.preventDefault();
            let datos = {
                user:this.inputUser,
                pass:this.inputPass
            }
            $.get("login-admin.php", datos, res =>{
                if (res == "noUser") {
                    this.noUser = "Usuario o contraseña incorrectos"
                } else if (res == "accede") {
                    this.bloqueo = false;
                    if (this.remember) {
                        localStorage.setItem("remember", true)
                    } else {
                        sessionStorage.setItem("remember", true)
                    }
                } else {}
            }).fail(() => {
                alert("Error al conectar con el servidor.\nIntentelo de nuevo")
            })
        }
    }
})
