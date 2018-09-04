const fs = require("fs");
const {google} = require("googleapis");

const OAuth2 = google.auth.OAuth2;
const youtube = google.youtube("v3");

class UploadYoutubeVideo {
    constructor(){
        this.client_id = "24315564955-nnq0cqp6e64khnq9h2g9p8asmnncei8e.apps.googleusercontent.com";
        this.client_secret = "1FqiPtcmBCxa7aGYBVjYIpT-";

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

    uploadVideo(title, description, videoPath){
        let options = {
            resources: {
                snippet:{
                    title:title,
                    description:description
                },
                status:{
                    privacyStatus:"private"
                }
            },
            part:"snippet,status",
            media: {
                body:fs.createReadStream(videoPath)
            }
        }
        
        youtube.videos.insert(options, (err, data) => {
            if (err) throw err;
            console.log(data);
            fs.unlinkSync(__dirname+"/tmp/video"+mime)
        })
    }
}

module.exports = UploadYoutubeVideo;