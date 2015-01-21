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

            var brefLength = words.characteristic[i].bref.length;
            for (var j = 0; j < brefLength; ++j) {
                for (var k = 0; k < words.characteristic[i].bref[j].length; ++k) {
                    var cTran = document.createElement("span");
                    cTran.className = "c-tran";
                    cTran.contentEditable = true;
                    
                    var tran = document.createTextNode(words.characteristic[i].bref[j][k]);
                    cTran.appendChild(tran);
                    translate.appendChild(cTran);

                    if (k != words.characteristic[i].bref[j].length - 1) {
                        translate.appendChild(document.createTextNode(", "));
                        
                    }
                }

                if (j != words.characteristic[i].bref.length - 1) {
                    translate.appendChild(document.createTextNode("; "));
                }
            }
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

            var detailLength = words.characteristic[i].detail.length;
            for (var j = 0; j < detailLength; ++j) {
                for (var k = 0; k < words.characteristic[i].detail[j].length; ++k) {
                    var cTran = document.createElement("span");
                    cTran.className = "c-tran";
                    cTran.contentEditable = true;

                    var tran = document.createTextNode(words.characteristic[i].detail[j][k]);
                    cTran.appendChild(tran);
                    translate.appendChild(cTran);

                    if (k != words.characteristic[i].detail[j].length - 1) {
                        translate.appendChild(document.createTextNode(", "));
                    }
                }

                if (j != words.characteristic[i].detail.length - 1) {
                    translate.appendChild(document.createTextNode("; "));
                }
            }

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

    //
    // There has some problmes
    //
    //// save
    //var save = document.getElementById("save");
    //save.onclick = function () {

    //    // get phonetic symbol
    //    var phoneticBlock = phonBlock.getElementsByClassName("ps");
    //    words.phonetic = []; // init
    //    for (var i = 0; i < phoneticBlock.length; ++i) {
    //        words.phonetic[i] = phoneticBlock[i].firstChild.nodeValue;
    //    }
        
    //    // get bref translate
    //    var brefBlock = document.getElementById("bref-block").childNodes;
    //    var brefLi = [];

    //    for (var i = 0; i < brefBlock.length; ++i) {
    //        if (brefBlock[i].nodeType == 1) {
    //            brefLi[brefLi.length] = brefBlock[i];  // add a new value in array's end
    //        }
    //    }

    //    // focus on span
    //    var brefFin = [];
    //    for (var i = 0; i < brefLi.length; ++i) {
    //        brefFin[brefFin.length] = brefLi[i].getElementsByClassName("c-tran");
    //    }
    //    for (var j = 0; j < brefFin[0].length; ++j) {
    //        words.characteristic.n.bref[j] = brefFin[0][j].firstChild.nodeValue;
    //    }
    //    for (var j = 0; j < brefFin[1].length; ++j) {
    //        words.characteristic.adj.bref[j] = brefFin[1][j].firstChild.nodeValue;
    //    }
        
    //    ///////////////////////////////////////////////////////////////
    //    ///////////////////////////////////////////////////////////////
    //    // get detail translate
    //    var detailBlock = document.getElementById("detail-block").childNodes;
    //    var detailLi = [];

    //    for (var i = 0; i < detailBlock.length; ++i) {
    //        if (detailBlock[i].nodeType == 1) {
    //            detailLi[detailLi.length] = detailBlock[i];  // add a new value in array's end
    //        }
    //    }

    //    // focus on span
    //    var detailFin = [];
    //    var sentence = [];
    //    for (var i = 0; i < detailLi.length; ++i) {
    //        detailFin[detailFin.length] = detailLi[i].getElementsByClassName("c-tran");
    //        sentence[sentence.length] = detailLi[i].getElementsByClassName("c-sen");
    //    }
    //    for (var j = 0; j < detailFin[0].length; ++j) {
    //        words.characteristic.n.detail[j] = detailFin[0][j].firstChild.nodeValue;
    //    }
    //    for (var j = 0; j < detailFin[1].length; ++j) {
    //        words.characteristic.adj.detail[j] = detailFin[1][j].firstChild.nodeValue;
    //    }
    //    // sentense n
    //    words.characteristic.n.ch_sentence = sentence[0][0].firstChild.nodeValue;
    //    words.characteristic.n.en_sentence = sentence[0][1].firstChild.nodeValue;
    //    // adj
    //    words.characteristic.adj.ch_sentence = sentence[1][0].firstChild.nodeValue;
    //    words.characteristic.adj.en_sentence = sentence[1][1].firstChild.nodeValue;
    //}

})