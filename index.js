//Server Const
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');

//Native Modules
const {
	existsSync,
	writeFileSync,
	readFileSync
} = require("fs");
const {join} = require("path");

//Fetch
require('es6-promise').polyfill();
const fetch = require("isomorphic-fetch");
const UploadVideo = require("./UploadVideo");

//Env
const PORT = process.env.PORT || 3000;
const serverUser = process.env.USER;
const serverPass = process.env.PASS;
const API_Key = process.env.API_KEY;

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app
	.use(fileUpload())
	.use(express.json())
	.use((req, res, next)=>{
		res.header("Access-Control-Allow-Origin", "https://www.lavozdeoieniv.tk, http://localhost:3000");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

app
	.get("/create-table", async (req, res) => {
		try {
			let client = await pool.connect();
			let result = await client.query('CREATE TABLE posts(content VARCHAR(1000000) not null, title VARCHAR(200) not null, labels VARCHAR(500) not null)');

			res.json(result);
			client.release();
		} catch(err) {
			res.status(500).send("Error: "+err);
		}
	})
	.get("/api-logged",(req, res)=>{
		res.json({
			youtube:existsSync("temp/youtube-token.txt"),
			blogger:existsSync("temp/blogger-token.txt")
		});
	})
	.get("/login-admin",({query}, res) => {
		let {user, pass} = query;

		if (serverUser === user && pass === serverPass)
			res.send("auth");
		else if (!user || !pass)
			res.status(403).send("<h1 style='text-align:center'>403</h1><hr/><p style='text-align:center'>Acceso No Autorizado</p>");
		else
			res.send("no-auth");
	})
	.get("/authSuccess", async ({query}, res)=>{
		//Auth Route
		try {
			let {code, authMethod} = query; //Google Account Code
			let refresh_token = await UploadVideo.getRefreshToken(code); //Account Refresh Token
			
			if (!refresh_token) res.status(401).send("Error");
			else {
				//Save Refresh Token then redirect to upload route
				if (authMethod === "youtube")
					writeFileSync("temp/youtube-token.txt", refresh_token);
				else if (authMethod === "blogger")
					writeFileSync("temp/blogger-token.txt", refresh_token);
				res.redirect(302, "/upload");
			}
		} catch(err) {
			throw err;
			res.status(500).send(err);
		}
	})
	.post("/create-post",async ({body}, res)=>{
		try {
			let {content, title, labels} = body;

			let access_token = Buffer.from(readFileSync("temp/blogger-token.txt")).toString();
		
			let response = await fetch("https://www.googleapis.com/blogger/v3/blogs/5719105395357704371/posts/", {
				method:"POST",
				headers:{
					"Authorization":access_token,
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					"kind": "blogger#post",
					"blog": {
						"id": "id"
					},
					"title": "A new post",
					"content": "With <b>exciting</b> content..."
				})
			})

			let {url} = await response.json();

			res.json({
				status:"success",
				url
			});
		} catch(err) {
			res.status(500).json({
				status:"error",
				error:err
			})
		}
	})
	.post("/edit-post",async({body}, res)=>{
		try {
			let {content, id} = body;
			let access_token = Buffer.from(readFileSync("temp/blogger-token.txt")).toString();
		
			let response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/5719105395357704371/posts/${id}`, {
				method:"PATCH",
				headers:{
					"Authorization":access_token,
					"Content-Type":"application/json"
				},
				body:JSON.stringify(content)
			});

			await response.json();

			res.send("updated");
		} catch(err) {
			res.status(500).send("error");
		} finally {
			db.$pool.end();
		}
	})
	.get("/posts/all", async(req, res)=>{
		try {
			let response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/5719105395357704371/posts?key=${API_Key}&fields=items(id,url,title,labels)`);
			let {items} = await response.json();

			let client = await pool.connect();
			let {rows} = await client.query('SELECT * FROM posts');
			rows = rows || [];

			items = items.map(e=>e.type = "published");
			items = items.concat(rows);

			res.json(items);
			client.release();
		} catch(err) {
			res.status(500).send("Error: "+err);
		}
	})
	.get("/posts/:id", async ({params}, res)=>{
		try {
			let {id} = params;

			let response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/5719105395357704371/posts/${id}?key=${API_Key}&fields=content,url,title,updated,labels`);
			let data = await response.json();
			res.json(data);
		} catch(err) {
			res.status(400).send(err);
		}
	})
	.post("/save-post", async ({body}, res) => {
		try {
			let {content, labels, title} = body;
			let client = await pool.connect();
			await client.query('INSERT INTO posts(content, labels, title) VALUES($1, $2, $3)', [content, labels, title]);

			res.json("ok");
			client.release();
		} catch(err) {
			console.log(err);
			res.status(500).send("Error: "+err);
		}
	})
	.post('/upload-video', ({files, body},res) => {

		let {file} = files;
		var {title, description} = body;

		let mime;
		switch (file.mimetype) {
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
		var videoPath = join(__dirname, "temp", "video"+mime);
		file.mv(videoPath, async ()=>{
			try{
				let fileBuffer = readFileSync(join(__dirname, "temp", "refresh-token.txt"));
				let refresh_token = Buffer.from(fileBuffer).toString();

				let access_token = await UploadVideo.getAccessToken(refresh_token);
			
				let Upload = new UploadVideo();

				Upload.setAccessRefreshToken(access_token, refresh_token);
				
				let status = await Upload.uploadVideo(title, description, videoPath);
				
				res.json({
					status
				});
			} catch(err) {
				res.status(500).json({
					status:err
				});
			}
		});
	})
	.listen(PORT, () => console.log("App preparada y escuchando en el puerto: " + PORT));
