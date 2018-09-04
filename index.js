
const express = require("express");
const fileUpload = require('express-fileupload');

const fs = require("fs");

const PORT = process.env.PORT || 5000;

const UploadApi = require("./UploadVideo");

require('es6-promise').polyfill()
const fetch = require("isomorphic-fetch");

const ajax = express();

const user = "agustin";
const pass = "oieniv.15";

const client_id = "24315564955-nnq0cqp6e64khnq9h2g9p8asmnncei8e.apps.googleusercontent.com"
const client_secret = "1FqiPtcmBCxa7aGYBVjYIpT-"

ajax.use(fileUpload());

ajax
    .get("/json",({query}, res)=>{
        if (query.artista && query.cancion && query.number && query.access === "data") {
            var file = require("./json/votos.json");
            switch(query.number){
                case "1":
                    file.uno.artista = query.artista;
                    file.uno.cancion = query.cancion;
                    file.uno.voto = `${query.cancion} de ${query.artista}`;
                    file.uno.image = query.image
                    break;
                case "2":
                    file.dos.artista = query.artista;
                    file.dos.cancion = query.cancion;
                    file.dos.voto = `${query.cancion} de ${query.artista}`;
                    file.dos.image = query.image
                    break;
                case "3":
                    file.tres.artista = query.artista;
                    file.tres.cancion = query.cancion;
                    file.tres.voto = `${query.cancion} de ${query.artista}`;
                    file.tres.image = query.image
                    break;
                default:
                    file.uno.artista = query.artista;
                    file.uno.cancion = query.cancion;
                    file.uno.voto = `${query.cancion} de ${query.artista}`;
                    file.uno.image = query.image
                    break;
            }
            let json = JSON.stringify(file);
            fs.writeFileSync(__dirname+"/json/votos.json", json);
            res.status(200).send(json);
        } else if (query.access === "2BuljYzbHPKcNMRIcnDNBGmVj9I02qXqw"){
            res.status(200);
            res.sendFile(__dirname+"/json/votos.json");
        } else {
            res.status(403).send("Acceso No Autorizado");
        }
    })
    .get("/login-admin",(req, res) => {
        let serverUser = req.query.user;
        let serverPass = req.query.pass;

        if (serverUser === user && serverPass === pass) {
            res.send("auth");
        }else if (!serverUser || !serverPass){
            res.status(403).send("<h1 style='text-align:center'>403</h1><hr/><p style='text-align:center'>Acceso no autorizado</p>");
        }else {
            res.send("no-auth");
        }
    })
    .get("/youtube-auth", ({query}, res)=>{
        let code = query.code;
        let dataToSend = `code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=https://www.lavozdeoieniv.tk/admin&grant_type=authorization_code`;
        fetch("https://accounts.google.com/o/oauth2/token",{
            method:"POST",
            body:dataToSend,
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            access_token = data["access_token"]
            refresh_token = data["refresh_token"]
            setTimeout(()=>{
                access_token = undefined;
                refresh_token = undefined;
            }, data["expires_in"] * 1000);
            res.redirect(301, `/?access_token=${access_token}&refresh_token=${refresh_token}&@cc355_1D=@mn1r1s_@1l3th`)
        }).catch(err=>{
            console.log(`Error = ${JSON.stringify(err)}\n`)
            res.status(err.status).json(err.statusText);
        })
    })
    .post('/upload-video',(req,res) => {
        let EDFile = req.files.file
        let title = req.body.title;
        let description = req.body.description;
    
        var access_token = req.body.access_token;
        var refresh_token = req.body.refresh_token;
    
        let mime;
        switch (EDFile.mimetype) {
            case "video/mp4":
                mime = ".mp4";
                break;
            case "video/3gpp":
                mime = ".3gp";
                break;
            case "video/x-msvideo":
                mime = ".avi";
                break;
            default:
                mime = ".mp4";
                break;
        }
    
        EDFile.mv(__dirname+"/tmp/video"+mime,()=>{
            let API = new UploadApi();
            API.setAccessRefreshToken(access_token, refresh_token);
            API.uploadVideo(title, description, __dirname+"/tmp/video"+mime);
            return res.status(200).send("success")
        })
    })
    .post("/thumbCreate", (req, res)=>{
        let file = req.files.url;
        file.mv(__dirname+"/tmp/image", ()=>{
            // read binary data
            var bitmap = fs.readFileSync(__dirname+"/tmp/image");
            // convert binary data to base64 encoded string
            let data = new Buffer(bitmap).toString('base64');
            if (data) {
                res.status(200).send(data)
            } else {
                res.status(200).send("no-data")
            }
        })
    })

ajax.listen(PORT, () => console.log("Escuchando en el puerto " + PORT));