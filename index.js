const TikTokScraper = require('tiktok-scraper');
const https = require("https");
const fs = require("fs");
readline = require('readline');


let hashtags = "sneakers"
const options = {
    number: 2,
    sessionList: ['sid_tt=685eb894588a5f19bbf51f75c1d624c4;'],
    headers: {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
        "referer": "https://www.tiktok.com/",
        "cookie": "tt_webid_v2=689854141086886123"
    },
    downloaded: true,

    asyncDownload: 5,

    filepath: './tiktok1',

    fileName: 'sneakers',


};

(async () => {

    try {
        const posts = await TikTokScraper.hashtag(hashtags, options);


        for (const [key, value] of Object.entries(posts["collector"])) {

            let url = value["videoUrl"]
            https.get(url, function (res) {
                const fileStream = fs.createWriteStream(`video${value["id"]}.mp4`);
                res.pipe(fileStream);
                fileStream.on("finish", function () {
                    fileStream.close();
                    console.log("done")
                });

            });
        }
    } catch (error) {
        console.log(error);
    }

})();






// let url= posts

// https.get(url,function(res){
//     const fileStream = fs.createWriteStream("video.mp4");
//     res.pipe(fileStream);
//     fileStream.on("finish", function(){
//         fileStream.close();
//         console.log("done")
//     });

// });



