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
        galeria:null,
        file:"",
        inputTitle:null,
        inputDescrip:null,
        salida:"",
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
        },
        imagen:file=>{
            this.file = file

        },
        recogerDatos:()=>{
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
                        name: fileTitle,
                        description: fileDes,
                        url: upload.snapshot.downloadURL
                    })
                    alert("Archivo subido exitosamente")
                })
            }
        }
    }

})