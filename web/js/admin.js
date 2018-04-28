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
    },
    methods: {
        imagen: function (file) {
            if (this.file[0].type != "image/png" && this.file[0].type != "image/jpeg" && this.file[0].type != "image/gif") {
                alert("Por favor seleccione una imagen");
                document.getElementById("archi").value = ""
            } else {
                this.file = file
            }

        },
        recogerDatos: function () {
            let inputTitle = document.getElementById("titulo")
            let inputDescrip = document.getElementById("des")
            let inputGal = document.getElementById("gal")

            var fileTitle = inputTitle.value
            var fileDes = inputDescrip.value
            var fileGal = inputGal.value

            console.log(fileDes, fileTitle, this.file[0].name, inputGal.value);

            if (fileTitle && fileDes && fileGal && this.file) {
                let sendFile = this.file[0];
                var upload = storageChild.child(sendFile.name).put(sendFile);

                this.imageLoad = sendFile.name
                this.showLoad = true
                upload.on("state_changed", snapshot => {
                    this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

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
                    database.push({
                        title: fileTitle,
                        description: fileDes,
                        url: upload.snapshot.downloadURL
                    })
                    alert("Archivo subido exitosamente")
                    this.showLoad = false
                })
            }
        },
        spinToggle: e => {
            e.preventDefault()
            this.spin = true;
            let votos = {
                voto1: "Habla Sobre Mi de Daniel calveti",
                voto2: "Luz y Sal de Funky",
                voto3: "Amor Real de Manny Montes"
            }
            axios.get(`votos.php?voto1=${votos.voto1}&voto2=${votos.voto2}&voto3=${votos.voto3}`)
            .then( res => {
                console.log(res.data.res3);
                this.voto1 = res.data.res1
                this.voto2 = res.data.res2
                this.voto3 = res.data.res3
                this.spin = false
            }).catch(err => {
                alert("Error en el servidor")
                this.spin = false
                console.log(err);
            })
        },
        pedirVotos: datos => {


        },
        submit: function (e) {
            e.preventDefault();
            this.noUser = ""
            this.spin = true
            let datos = {
                user: this.inputUser,
                pass: this.inputPass
            }
            axios.get(`login-admin.php?user=${datos.user}&pass=${datos.pass}`)
            .then(res => {
                console.log(res);
                
                if (res.data == "noUser") {
                    this.noUser = "Usuario o contraseña incorrectos"
                    this.spin = false
                } else if (res.data == "accede") {
                    this.bloqueo = false;
                    this.spin = false
                    if (this.remember) {
                        localStorage.setItem("remember", true)
                    } else {
                        sessionStorage.setItem("remember", true)
                    }
                } else { }
            }).catch( error => {
                alert("Error al conectar con el servidor.\nIntentelo de nuevo");
                this.spin = false;
                this.noUser = "";
                console.log(error);
                
            })
        },
        cerrarModal: function (e) {
            e.preventDefault();
            this.showLoad = false
        },
        borrarRegistros: function (key) {
            if (confirm("¿Seguro que deseas borrar esos registros?")) {
                database.child(key).remove()
            }
        },
        video: function (archivo) {
            if (archivo[0].type != "video/3gpp" && archivo[0].type != "video/x-ms-wmv" && archivo[0].type != "video/mp4" && archivo[0].type != "video/x-msvideo") {
                alert("Por favor seleccione una imagen");
                document.getElementById("archi").value = ""
            } else {
                this.video = archivo[0]
            }
        },
        enviarVideo: function () {
            var params = new URLSearchParams()
            params.append("url", this.video)
            axios.post("video.php", params)
        }
    }
})
