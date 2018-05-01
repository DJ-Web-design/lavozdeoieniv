var app = new Vue({
    el: "#app",
    data: {
        bloqueo: true,
        inputUser: "",
        inputPass: "",
        noUser: "",
        remember: "",
        page: 1,

        chatMessages: [],
        page1: true,
        page2: false,
        page3: false,
        galeria: null,
        file: "",
        inputTitle: null,
        inputDescrip: null,
        salida: "",
        spin: false,
        voto1: 0,
        voto2: 0,
        voto3: 0,
        showLoad: false,
        imageLoad: "",
        progress: 0,
        registrosSeleccionados: [],
        videoMeta:{
            title:null,
            des:null
        },
        video:null
    },
    methods: {
        imagen: function (file) {
            if (file[0].type != "image/png" && file[0].type != "image/jpeg" && file[0].type != "image/gif") {
                alert("Por favor seleccione una imagen");
                document.getElementById("archi").value = ""
            } else {
                this.file = file
            }

        },
        recogerDatos: function () {
            var fileTitle = document.getElementById("titulo").value;
            var fileDes = document.getElementById("des").value;
            var fileGal = document.getElementById("gal").value;
            var typeImg;

            switch (this.file[0].type) {
                case "image/png":
                    typeImg = ".png";
                    break;
                case "image/jpeg":
                    typeImg = ".jpg";
                    break;
                case "image/gif":
                    typeImg = ".gif";
                    break;
            }
            console.log(this.file[0].type, typeImg);

            if (fileTitle && fileDes && fileGal && this.file) {
                let sendFile = this.file[0];                
                var upload = storageChild.child(sendFile.name).put(sendFile);
                this.imageLoad = sendFile.name;
                this.showLoad = true;
                upload.on("state_changed", snapshot => {
                    this.progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
                    this.showLoad = false
                }, () => {
                    databaseImg.child("prueba").push({
                        title: fileTitle,
                        description: fileDes,
                        url: upload.snapshot.downloadURL
                    })
                    alert("Archivo subido exitosamente")
                    this.showLoad = false
                })
            }
        },
        spinToggle: function(e){
            e.preventDefault()
            var that = this;
            this.spin = true;
            let votos = {
                voto1: "Habla Sobre Mi de Daniel calveti",
                voto2: "Luz y Sal de Funky",
                voto3: "Amor Real de Manny Montes"
            }
            axios.get(`votos.php?voto1=${votos.voto1}&voto2=${votos.voto2}&voto3=${votos.voto3}`)
            .then( res => {
                console.log(res.data.res3);
                that.voto1 = res.data.res1
                that.voto2 = res.data.res2
                that.voto3 = res.data.res3
                that.spin = false
            }).catch(err => {
                alert("Error en el servidor")
                that.spin = false
                console.log(err);
            })
        },
        submit: function (e) {
            e.preventDefault();
            this.noUser = ""
            this.spin = true;
            var that = this; 
            let datos = {
                user: this.inputUser,
                pass: this.inputPass
            }
            axios.get(`login-admin.php?user=${datos.user}&pass=${user.pass}`)
            .then(res => {
                if (res.data == "noUser") {
                    that.noUser = "Usuario o contraseña incorrectos"
                    that.spin = false
                } else if (res.data == "accede") {
                    that.bloqueo = false;
                    that.spin = false
                    if (this.remember) {
                        localStorage.setItem("remember", true)
                    } else {
                        sessionStorage.setItem("remember", true)
                    }
                } else { }
            }).catch( error => {
                alert("Error al conectar con el servidor.\nIntentelo de nuevo");
                that.spin = false;
                that.noUser = "";                
            })
        },
        cerrarModal: function (e) {
            e.preventDefault();
            this.showLoad = false
        },
        borrarRegistros: function (key) {
            if (confirm("¿Seguro que deseas borrar esos registros?")) {
                databaseChat.child(key).remove()
            }
        },
        videoHandler: function (archivo) {
            /*if (archivo[0].type != "video/3gpp" && archivo[0].type != "video/x-ms-wmv" && archivo[0].type != "video/mp4" && archivo[0].type != "video/x-msvideo") {
                alert("Por favor seleccione un video");
                document.getElementById("video").value = ""
            } else {*/
                this.video = archivo[0]
            //}
        },
        enviarVideo: function () {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            var params = new FormData()
            params.append("archivo", this.video);
            params.append("description", this.videoMeta.des);
            params.append("title", this.videoMeta.title);
            axios.post("videoUploadTest.php", params, config)
            .then(res=>{
                console.log(res);
                
            }).catch( err =>{
                console.log(err);
                
            })
        }
    }
})
