var path = require("path"),
    request = require("request"),
    fs = require("fs");

MEDIA_EXTENSION_PNG = ".png";
MEDIA_EXTENSION_JPG = ".jpg";
TEXT_EXTENSION = ".txt";

var list_posts = function(file) {
    var extension = path.extname(file);
    var textFile = file.replace(new RegExp(extension + '$'), TEXT_EXTENSION);
    var text = "";

    if (extension !== MEDIA_EXTENSION_PNG
        && extension !== MEDIA_EXTENSION_JPG) return;

    if (fs.existsSync(textFile)) {
        text = fs.readFileSync(textFile)
    }

    var media = encodeURIComponent("https://raw.githubusercontent.com/Adventech/adventech-social/master/"+file.replace(" ", "%20"));

    request.post("https://api.bufferapp.com/1/updates/create.json?access_token=1/38a6d0f44ff13fd087b9f51d2f7dc273").form("text="+text+"&profile_ids%5B%5D=586a761340b8c63a719b2c22&profile_ids%5B%5D=586a77b1b6684f861d9b2bfd&profile_ids%5B%5D=586a77ecb6684f0f219b2bf7&media%5Bphoto%5D=" + media)
};

process.argv.forEach(function (val, index, array) {
    if (index === 2) {
        // console.log(val)
        list_posts(val);
    }
});