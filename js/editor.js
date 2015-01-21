
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

    // init
    //var comma = document.createTextNode(", ");
    //var semicolon = document.createTextNode("; ");
    // There has a question: why just can use onece?

    // init phonetic-symbol
    var phonBlock = document.getElementById("phonetic-symbol");
    var addPs = document.getElementById("add-ps");

    for (var i = 0; i < words.phonetic.length; ++i) {
        var newOnePs = document.createElement("div");
        newOnePs.className = "one-ps";

        var newDelete = document.createElement("img");
        newDelete.className = "delete";
        newDelete.src = "image/delete.png";
        newOnePs.appendChild(newDelete);

        var newPs = document.createElement("span");
        newPs.className = "ps";

        var phon = document.createTextNode(words.phonetic[i]);
        newPs.appendChild(phon);

        newOnePs.insertBefore(newPs, newDelete);
        phonBlock.insertBefore(newOnePs, addPs);
    }
    

    // delete phonetic-symbol
    var phonBlock = document.getElementById("phonetic-symbol");
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

        var newPs = document.createElement("span");
        newPs.className = "ps";
        newPs.contentEditable = "true";
        var phon = document.createTextNode("/here/");
        newPs.appendChild(phon);

        var newDelete = document.createElement("img");
        newDelete.className = "delete";
        newDelete.src = "image/delete.png";

        newOnePs.appendChild(newPs);
        newOnePs.appendChild(newDelete);
        phonBlock.insertBefore(newOnePs, addPs);

        // bind clickEvent for new delete
        newDelete.onclick = function () {
            var onePs = this.parentNode;
            phonBlock.removeChild(onePs);
        }
    }

    // init bref-block
    var brefBlock = document.getElementById("bref-block");

    for (var i = 0; i < 4; ++i) {
        if (words.characteristic[i].exist == true) {  // if this chara is exist

            var brefLi = document.createElement("li");
            brefLi.className = "characteristic";
            brefLi.className += " cha-" + words.characteristic[i].chara;

            var img = document.createElement("img");
            img.className = "ico-" + words.characteristic[i].chara;
            img.src = "image/" + words.characteristic[i].chara + ".png";
            brefLi.appendChild(img);

            var translate = document.createElement("div");
            translate.className = "translate";

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
            translate.innerHTML = "<span class=\"c-tran\" contenteditable=\"true\">" +
                brefString + "</span>";
            brefLi.appendChild(translate);
            brefBlock.appendChild(brefLi);
        }
    }

    // init detail-block
    var detailBlock = document.getElementById("detail-block");

    for (var i = 0; i < 4; ++i) {
        if (words.characteristic[i].exist == true) {  // if this chara is exist

            var detailLi = document.createElement("li");
            detailLi.className = "characteristic";
            detailLi.className += " cha-" + words.characteristic[i].chara;

            var img = document.createElement("img");
            img.className = "ico-" + words.characteristic[i].chara;
            img.src = "image/" + words.characteristic[i].chara + ".png";
            detailLi.appendChild(img);

            var translate = document.createElement("div");
            translate.className = "translate";

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
            translate.innerHTML = "<span class=\"c-tran\" contenteditable=\"true\">" +
                detailString + "</span>";

            // sentence
            var chineseSenText = document.createTextNode(words.characteristic[i].chSentence);
            var englishSenText = document.createTextNode(words.characteristic[i].enSentence);

            var chineseSen = document.createElement("span");
            chineseSen.className = "chinese-s" + " c-sen";
            chineseSen.contentEditable = true;
            chineseSen.appendChild(chineseSenText);

            var englishSen = document.createElement("span");
            englishSen.className = "english-s" + " c-sen";
            englishSen.contentEditable = true;
            englishSen.appendChild(englishSenText);

            var sentence = document.createElement("div");
            sentence.className = "sentence";
            sentence.appendChild(chineseSen);
            sentence.appendChild(englishSen);

            detailLi.appendChild(translate);
            detailLi.appendChild(sentence);
            detailBlock.appendChild(detailLi);
        }
    }

    // face to data
    var save = document.getElementById("save");
    save.onclick = function () {
        
        var phonetic = document.getElementsByClassName("ps");
        var brefTranslate = document.getElementById("bref-tran")
            .getElementsByClassName("c-tran");
        var detailTranslate = document.getElementById("detial-tran")
            .getElementsByClassName("c-tran");
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