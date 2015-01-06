var words = {
    phonetic: ["/‘hed.wɜrd1/", "/‘hed.wɜrd2/"],
    characteristic: {
        n: {
            bref: [["释义A1", "释义A2"]],
            detail: [["释义A1", "释义A2", "释义A3", "释义A4"]],
            ch_sentence: "例句中文",
            en_sentence: "Sentence in English"
        },
        adj: {
            bref: [["释义B1"], ["释义C1"]],
            detail: [["释义B1", "释义B2"], ["释义C1", "释义C2"]],
            ch_sentence: "例句中文",
            en_sentence: "Sentence in English"
        }
    }
}

$(document).ready(function () {

    var phonBlock = document.getElementById("phonetic_symbol");
    var deletePhon = phonBlock.getElementsByClassName("detele");
    //document.onclick = function () {
    //    alert("haha");
    //    for (var i = 0; i < words.phonetic.length; ++i) {

    //        delete_phon[i].onclick = function () {
    //            var one_ps = delete_phon[i].parentNode;
    //            phon_block.removeChild(one_ps);
    //        }
    //    }
    //}
    //getElementsByClassName("detele").onclick = function () {
    //    alert("haha");
    //    var one_ps = this.parentNode;
    //    phon_block.removeChild(one_ps);
    //}
    var deleteBlock = $(".delete");
    deleteBlock.click(function () {
        var onePs = this.parentNode;
        phonBlock.removeChild(onePs);
    })

    var addPs = document.getElementById("add_ps");
    addPs.onclick = function () {
        var newOnePs = document.createElement("div");
        newOnePs.className = "one_ps";

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

    
    
    var save = document.getElementById("save");
    save.onclick = function () {

        // get phonetic symbol
        var phoneticBlock = phonBlock.getElementsByClassName("ps");
        words.phonetic = []; // init
        for (var i = 0; i < phoneticBlock.length; ++i) {
            words.phonetic[i] = phoneticBlock[i].firstChild.nodeValue;
        }
        
        // get bref translate
        var brefBlock = document.getElementById("bref_block").childNodes;
        var brefLi = [];

        for (var i = 0; i < brefBlock.length; ++i) {
            if (brefBlock[i].nodeType == 1) {
                brefLi[brefLi.length] = brefBlock[i];  // add a new value in array's end
            }
        }

        // focus on span
        var brefFin = [];
        for (var i = 0; i < brefLi.length; ++i) {
            brefFin[brefFin.length] = brefLi[i].getElementsByClassName("c_tran");
        }
        for (var j = 0; j < brefFin[0].length; ++j) {
            words.characteristic.n.bref[j] = brefFin[0][j].firstChild.nodeValue;
        }
        for (var j = 0; j < brefFin[1].length; ++j) {
            words.characteristic.adj.bref[j] = brefFin[1][j].firstChild.nodeValue;
        }
        
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // get detail translate
        var detailBlock = document.getElementById("detail_block").childNodes;
        var detailLi = [];

        for (var i = 0; i < detailBlock.length; ++i) {
            if (detailBlock[i].nodeType == 1) {
                detailLi[detailLi.length] = detailBlock[i];  // add a new value in array's end
            }
        }

        // focus on span
        var detailFin = [];
        var sentence = [];
        for (var i = 0; i < detailLi.length; ++i) {
            detailFin[detailFin.length] = detailLi[i].getElementsByClassName("c_tran");
            sentence[sentence.length] = detailLi[i].getElementsByClassName("c_sen");
        }
        for (var j = 0; j < detailFin[0].length; ++j) {
            words.characteristic.n.detail[j] = detailFin[0][j].firstChild.nodeValue;
        }
        for (var j = 0; j < detailFin[1].length; ++j) {
            words.characteristic.adj.detail[j] = detailFin[1][j].firstChild.nodeValue;
        }
        // sentense n
        words.characteristic.n.ch_sentence = sentence[0][0].firstChild.nodeValue;
        words.characteristic.n.en_sentence = sentence[0][1].firstChild.nodeValue;
        // adj
        words.characteristic.adj.ch_sentence = sentence[1][0].firstChild.nodeValue;
        words.characteristic.adj.en_sentence = sentence[1][1].firstChild.nodeValue;
    }

})