
// 
//  This part work for initing editor and update editor
//
var words = {
    phonetic: ["/‘hed.wɜrd1/", "/‘hed.wɜrd2/"],
    characteristic: [
        { // conj
            chara: "conj",
            exist: false
        },
        { // n
            chara: "n",
            exist: true,
            bref: [["释义A1", "释义A2"]],
            detail: [["释义A1", "释义A2", "释义A3", "释义A4"]],
            chSentence: "例句中文",
            enSentence: "Sentence in English"
        },
        {  // adj
            chara: "adj",
            exist: true,
            bref: [["释义B1"], ["释义C1"]],
            detail: [["释义B1", "释义B2"], ["释义C1", "释义C2"]],
            chSentence: "例句中文",
            enSentence: "Sentence in English"
        },
        {  // adv
            chara: "adv",
            exist: false
        }
    ]
}

$(document).ready(function () {

    //
    // init. Data translate to serface
    //

    // init phonetic-symbol
    var phonBlock = document.getElementById("phonetic-symbol");
    var phonBlockHTML = ""; // 

    for (var i = 0; i < words.phonetic.length; ++i) {

        var newPs = "<span class=\"ps\">" + words.phonetic[i] + "</span>";
        var newDelete = "<img class=\"delete\" src=\"image/delete.png\" />";
        var newOnePs = "<div class=\"one-ps\">" + newPs + newDelete + "</div>"

        phonBlockHTML += newOnePs;
    }

    phonBlockHTML += "<div id=\"add-ps\">添加发音</div>";
    phonBlock.innerHTML = phonBlockHTML;

    // init bref-block
    var brefBlock = document.getElementById("bref-block");
    var brefBlockHTML = "";

    for (var i = 0; i < 4; ++i) {
        if (words.characteristic[i].exist == true) {  // if this chara is exist

            // frist is characteristic's icon
            var charaIcon = "<img class=\"ico-" + words.characteristic[i].chara
                + "\" src=\"image/" + words.characteristic[i].chara + ".png\" />";

            // secend is bref translate block
            var brefString = "";
            var brefLength = words.characteristic[i].bref.length;
            for (var j = 0; j < brefLength; ++j) {
                for (var k = 0; k < words.characteristic[i].bref[j].length; ++k) {

                    brefString += words.characteristic[i].bref[j][k];

                    if (k != words.characteristic[i].bref[j].length - 1) {
                        brefString += ", ";
                    }
                }

                if (j != words.characteristic[i].bref.length - 1) {
                    brefString += "; ";
                }
            }
            var translateBlock = "<span class=\"translate\" contenteditable=\"true\">" +
                brefString + "</span>";

            var brefLi = "<li class=\"characteristic cha-" + words.characteristic[i].chara + "\">"
                + charaIcon + translateBlock + "</li>";

            brefBlockHTML += brefLi;
        }
    }
    brefBlock.innerHTML = brefBlockHTML;

    // init detail-block
    var detailBlock = document.getElementById("detail-block");
    var detailBlockHTML = "";

    for (var i = 0; i < 4; ++i) {
        if (words.characteristic[i].exist == true) {  // if this chara is exist

            // frist is characteristic's icon
            var charaIcon = "<img class=\"ico-" + words.characteristic[i].chara
                + "\" src=\"image/" + words.characteristic[i].chara + ".png\" />";

            // secend is bref translate block
            var detailString = ""; // init
            var detailLength = words.characteristic[i].detail.length;
            for (var j = 0; j < detailLength; ++j) {
                for (var k = 0; k < words.characteristic[i].detail[j].length; ++k) {

                    detailString += words.characteristic[i].detail[j][k];

                    if (k != words.characteristic[i].detail[j].length - 1) {
                        detailString += ", ";
                    }
                }

                if (j != words.characteristic[i].detail.length - 1) {
                    detailString += "; ";
                }
            }
            var translateBlock = "<span class=\"translate\" contenteditable=\"true\">" +
                detailString + "</span>";

            // thrid is detail sentence(bref dosen't have sentence)
            var chineseSenText = words.characteristic[i].chSentence;
            var englishSenText = words.characteristic[i].enSentence;

            var chineseSen = "<span class=\"chinese-s\" contenteditable=\"true\">"
                + chineseSenText + "</span>";
            
            var englishSen = "<span class=\"english-s\" contenteditable=\"true\">"
                + englishSenText + "</span>";

            var sentenceBlcok = "<div class=\"sentence\">" + chineseSen
                + englishSen + "</div>";

            var detailLi = "<li class=\"characteristic cha-" + words.characteristic[i].chara + "\">"
                + charaIcon + translateBlock + sentenceBlcok + "</li>";

            detailBlockHTML += detailLi;
        }
    }
    detailBlock.innerHTML = detailBlockHTML;
    


    //
    // When operate in phonetic-symbol
    //

    // delete phonetic-symbol
    var deletePhon = phonBlock.getElementsByClassName("detele");

    var deleteBlock = $(".delete");
    deleteBlock.click(function () {
        var onePs = this.parentNode;
        phonBlock.removeChild(onePs);
    })

    // add new phonetic-symbol
    var addPs = document.getElementById("add-ps");
    addPs.onclick = function () {
        var newOnePs = document.createElement("div");
        newOnePs.className = "one-ps";
        
        var newPs = "<span class=\"ps\" contenteditable=\"true\">/here/</span>";
        var newDelete = "<img class=\"delete\" src=\"image/delete.png\" />";

        newOnePs.innerHTML = newPs + newDelete;
        phonBlock.insertBefore(newOnePs, addPs);

        // bind clickEvent for new delete
        newDelete.onclick = function () {
            var onePs = this.parentNode;
            phonBlock.removeChild(onePs);
        }
    }

    

    // face to data
    var save = document.getElementById("save");
    save.onclick = function () {
        
        var phonetic = document.getElementsByClassName("ps");
        var brefTranslate = document.getElementById("bref-tran")
            .getElementsByClassName("translate");
        var detailTranslate = document.getElementById("detial-tran")
            .getElementsByClassName("translate");
        var chSentence = document.getElementsByClassName("chinese-s");
        var enSentence = document.getElementsByClassName("english-s");
        
        var x = 0; // x use to count

        for (var i = 0; i < 4; ++i) {
            if (words.characteristic[i].exist == true) {

                // phonetic
                words.phonetic = new Array(); // init
                for (var j = 0; j < phonetic.length; ++j) {
                    words.phonetic[j] = phonetic[j].firstChild.nodeValue;
                }

                // bref
                var brefString = brefTranslate[x].firstChild.nodeValue;
                var brefClass = brefString.split(";");
                words.characteristic[i].bref = new Array(); //init
                for (var j = 0; j < brefClass.length; ++j) {
                    words.characteristic[i].bref[j] = new Array(); // init

                    var brefItem = brefClass[j].split(",");
                    for (var k = 0; k < brefItem.length; ++k) {
                        words.characteristic[i].bref[j][k] = brefItem[k].trim();
                        // trim() use to delete terminal balnk
                    }
                }

                // detail
                var detailString = detailTranslate[x].firstChild.nodeValue;
                var detailClass = detailString.split(";");
                words.characteristic[i].detail = new Array(); //init
                for (var j = 0; j < detailClass.length; ++j) {
                    words.characteristic[i].detail[j] = new Array(); // init

                    var detailItem = detailClass[j].split(",");
                    for (var k = 0; k < detailItem.length; ++k) {
                        words.characteristic[i].detail[j][k] = detailItem[k].trim();
                        // trim() use to delete terminal balnk
                    }
                }

                // sentence
                words.characteristic[i].chSentence = chSentence[x].firstChild.nodeValue;
                words.characteristic[i].enSentence = enSentence[x].firstChild.nodeValue;

                ++x; // add 1
            }
        }
    }
})