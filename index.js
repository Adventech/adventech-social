
MEDIA_EXTENSION = "png";

var list_posts = function(files) {
    for (var i = 0; i < files.length; i++){
        var extension = files[i].split(".").pop();

        if (extension != MEDIA_EXTENSION) continue;


    }
};