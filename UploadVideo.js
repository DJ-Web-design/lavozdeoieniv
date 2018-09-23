const fs = require("fs");
const {google} = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const youtube = google.youtube("v3");

const admin = require("firebase-admin");

var serviceAccount = {
    "type": "service_account",
    "project_id": "chat-lavozdeoieniv",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": "-----BEGIN PRIVATE KEY-----\n"+process.env.PRIVATE_KEY+"\n-----END PRIVATE KEY-----\n",
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4cmvz%40chat-lavozdeoieniv.iam.gserviceaccount.com"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chat-lavozdeoieniv.firebaseio.com'
});

const db = admin.database();

const videosDatabase = db.ref("videos");

class UploadYoutubeVideo {
    constructor(){
        this.client_id = process.env.CLIENT_ID;
        this.client_secret = process.env.CLIENT_SECRET;
        this.access_token;
        this.refresh_token;
        this.oauth2Client;
        this.initializeOAuth2();
    }

    initializeOAuth2(){
        this.oauth2Client = new OAuth2(
            this.client_id,
            this.client_secret
        );
    }
    setAccessRefreshToken(access_token, refresh_token){
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this._setOAuthCredentials();
    }
    _setOAuthCredentials(){
        this.oauth2Client.setCredentials({
            access_token:this.access_token,
            refresh_token:this.refresh_token
        })
        this._setOptions();
    }
    _setOptions(){
        google.options({auth:this.oauth2Client}, (err, res)=>{
            if (err) throw err;
            console.log(err);
        })
    }
    uploadVideo(videoTitle, videoDescription, videoPath){
        youtube.videos.insert({
            part: 'status,snippet',
            resource: {
                snippet: {
                    title: videoTitle,
                    description: videoDescription
                },
                status: { 
                    privacyStatus: 'private' //if you want the video to be private
                }
            },
            media: {
                body: fs.createReadStream(videoPath)
            }
        }, (err, data) => {
            if (err) {
                throw err;
                return res.status(500).send("upload-error")
            } else {
                let videoData = data.data
                console.log(videoData.snippet.thumbnails);
                videosDatabase.push({
                    id:videoData.id,
                    title:videoData.snippet.title,
                    description:videoData.snippet.description,
                    link:"https://youtu.be/"+videoData.id,
                    date:videoData.snippet.publishedAt
                }).then(res=>{
                    return res.status(200).send("success")
                })
            }
            fs.unlinkSync(videoPath)

        })
    }
}

module.exports = UploadYoutubeVideo;