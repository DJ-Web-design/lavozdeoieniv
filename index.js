const express = require("express"),
      app = express()
      fileUpload = require('express-fileupload'),
      {writeFileSync, unlinkSync, readFileSync} = require("fs"),

      require('es6-promise').polyfill(),
      require("util").promisify();
const fetch = require("isomorphic-fetch"),
      UploadApi = require("./UploadVideo"),

      PORT = process.env.PORT || 5000,
      user = process.env.USER,
      pass = process.env.PASS,
      client_id = process.env.CLIENT_ID,
      client_secret = process.env.CLIENT_SECRET

app.use(fileUpload())
    .use((req, res, next)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

app
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
    .get("/youtube-auth", async ({query}, res)=>{
        let code = query.code;
        let dataToSend = `code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=https%3A%2F%2Flavozdeoieniv.herokuapp.com%2Fyoutube-auth&grant_type=authorization_code`;
        try {
        let response = await fetch("https://accounts.google.com/o/oauth2/token",{
            method:"POST",
            body:dataToSend,
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        let data = await response.json();

            access_token = data["access_token"];
            refresh_token = data["refresh_token"];

            setTimeout(()=>{
                access_token = undefined;
                refresh_token = undefined;
            }, data["expires_in"] * 1000);

            res.redirect(301, `https://www.lavozdeoieniv.tk/admin?access_token=${access_token}&refresh_token=${refresh_token}&acc=TGEgVm96IGRlIE9JRU5JVg==`);

        }catch(err){
            res.status(err.status).send(err.statusText);
        }
    })
    .post('/upload-video',(req,res) => {
        let EDFile = req.files.file
        var title = req.body.title;
        var description = req.body.description;    
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
    
        EDFile.mv(__dirname+"/tmp/video"+mime, async ()=>{
            let API = new UploadApi();
            API.setAccessRefreshToken(access_token, refresh_token);

            try {
                res.send(await API.uploadVideo(title, description, __dirname+"/tmp/video"+mime)); 
            } catch(err) {
                res.status(500).send(err);
            }
        })
    })
    .listen(PORT, () => console.log("App preparada y escuchando en el puerto: " + PORT));
