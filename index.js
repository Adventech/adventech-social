var path = require("path"),
    request = require("request"),
    fs = require("fs");

MEDIA_EXTENSION_PNG = ".png";
MEDIA_EXTENSION_JPG = ".jpg";
TEXT_EXTENSION = ".txt";
TOKEN = "";

var list_posts = function(file) {
    var extension = path.extname(file).toLowerCase();
    var textFile = file.replace(new RegExp(extension + '$'), TEXT_EXTENSION);
    var text = "#bible #truth 🙏";

    if (extension !== MEDIA_EXTENSION_PNG
        && extension !== MEDIA_EXTENSION_JPG) return;

    if (fs.existsSync(textFile)) {
        text = fs.readFileSync(textFile)
    }

    var media = encodeURIComponent("https://raw.githubusercontent.com/Adventech/adventech-social/master/"+file.replace(" ", "%20")),
        twitterProfile = '';


    if (text.length <= 140){
        twitterProfile = "&profile_ids%5B%5D=586a77ecb6684f0f219b2bf7";
    }

    request.post("https://api.bufferapp.com/1/updates/create.json?access_token=" + TOKEN).form("text="+text+"&profile_ids%5B%5D=586a761340b8c63a719b2c22&profile_ids%5B%5D=586a77b1b6684f861d9b2bfd"+twitterProfile+"&media%5Bphoto%5D=" + media)
};

process.argv.forEach(function (val, index, array) {
    if (index === 2){
        TOKEN = val;
    }
    if (index === 3) {
        list_posts(val);
    }
});