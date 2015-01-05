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

    var phon_block = document.getElementById("phonetic_symbol");
    var delete_phon = phon_block.getElementsByClassName("detele");
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
    var delete_block = $(".delete");
    delete_block.click(function () {
        var one_ps = this.parentNode;
        phon_block.removeChild(one_ps);
    })

    var add_ps = document.getElementById("add_ps");
    add_ps.onclick = function () {
        var new_one_ps = document.createElement("div");
        new_one_ps.setAttribute("class", "one_ps");

        var new_ps = document.createElement("span");
        new_ps.setAttribute("class", "ps");
        var phon = document.createTextNode("/here/");
        new_ps.appendChild(phon);

        var new_delete = document.createElement("img");
        new_delete.setAttribute("class", "delete");
        new_delete.setAttribute("src", "image/delete.png");

        new_one_ps.appendChild(new_ps);
        new_one_ps.appendChild(new_delete);
        phon_block.insertBefore(new_one_ps, add_ps);

        // bind clickEvent for new delete
        new_delete.onclick = function () {
            alert("haha");
            var one_ps = this.parentNode;
            phon_block.removeChild(one_ps);
        }
    }

    
    
    var save = document.getElementById("save");
    save.onclick = function () {

        // get phonetic symbol
        var phonetic_block = phon_block.getElementsByClassName("ps");
        words.phonetic = []; // init
        for (var i = 0; i < phonetic_block.length; ++i) {
            words.phonetic[i] = phonetic_block[i].firstChild.nodeValue;
        }
        
        // get bref translate
        var bref_block = document.getElementById("bref_block").childNodes;
        var bref_li = [];

        for (var i = 0; i < bref_block.length; ++i) {
            if (bref_block[i].nodeType == 1) {
                bref_li[bref_li.length] = bref_block[i];  // add a new value in array's end
            }
        }

        // focus on span
        var bref_fin = [];
        for (var i = 0; i < bref_li.length; ++i) {
            bref_fin[bref_fin.length] = bref_li[i].getElementsByClassName("c_tran");
        }
        for (var j = 0; j < bref_fin[0].length; ++j) {
            words.characteristic.n.bref[j] = bref_fin[0][j].firstChild.nodeValue;
        }
        for (var j = 0; j < bref_fin[1].length; ++j) {
            words.characteristic.adj.bref[j] = bref_fin[1][j].firstChild.nodeValue;
        }
        
        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // get detail translate
        var detail_block = document.getElementById("detail_block").childNodes;
        var detail_li = [];

        for (var i = 0; i < detail_block.length; ++i) {
            if (detail_block[i].nodeType == 1) {
                detail_li[detail_li.length] = detail_block[i];  // add a new value in array's end
            }
        }

        // focus on span
        var detail_fin = [];
        var sentence = [];
        for (var i = 0; i < detail_li.length; ++i) {
            detail_fin[detail_fin.length] = detail_li[i].getElementsByClassName("c_tran");
            sentence[sentence.length] = detail_li[i].getElementsByClassName("c_sen");
        }
        for (var j = 0; j < detail_fin[0].length; ++j) {
            words.characteristic.n.detail[j] = detail_fin[0][j].firstChild.nodeValue;
        }
        for (var j = 0; j < detail_fin[1].length; ++j) {
            words.characteristic.adj.detail[j] = detail_fin[1][j].firstChild.nodeValue;
        }
        // sentense n
        words.characteristic.n.ch_sentence = sentence[0][0].firstChild.nodeValue;
        words.characteristic.n.en_sentence = sentence[0][1].firstChild.nodeValue;
        // adj
        words.characteristic.adj.ch_sentence = sentence[1][0].firstChild.nodeValue;
        words.characteristic.adj.en_sentence = sentence[1][1].firstChild.nodeValue;
    }

})