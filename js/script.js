// 
// ---------------------------
let qIndex; //選択されたオブジェクト配列の配列番号を保持


// function
// ---------------------------

//クリップボードにコピーしたよを知らせる
const iconClipboardVisible = () => {
    $("#iconClipboard").removeClass("bi-clipboard");
    $("#iconClipboard").addClass("bi-clipboard-check");
    $("#iconClipboard").addClass("text-success");
    $("#copied").css("visibility", "visible");
};

//クリップボードにコピーしてない状態にする。
const iconClipboardHidden = () => {
    if ($("#iconClipboard").hasClass("bi-clipboard-check")) {
        $("#iconClipboard").addClass("bi-clipboard");
        $("#iconClipboard").removeClass("bi-clipboard-check");
        $("#iconClipboard").removeClass("text-success");
    };
    $("#copied").css("visibility", "hidden");
};




// script
// ---------------------------


//プルダウンリスト
//に質問テンプレートをセットする。配列番号がvalueになる。
questions.forEach((questionTemplate, index) => {
    $("#templateSelector").append("<option value='" + index + "'>" + questionTemplate.questionTitle + "</option>");
});


//質問テンプレートを選択したとき、
//質問テンプレートを表示する。
$("#templateSelector").change(() => {
    $("#form-area").html("");//フォームを初期化
    $("#outputText").val("");//出力も初期化

    //選択したvalue(配列番号)を取り出す。
    qIndex = $("[name=templateSelector]").val();
    if (!isNaN(qIndex)) {//qIndexが数字だったら
        //質問テンプレート一覧を取り出して表示する。
        questions[qIndex].questionContents.forEach((item, index) => {
            $("#form-area").append("<div class='container mb-3'><label for='q" + index + "' class='form-label'>" + item.question + "</label><textarea class='form-control' id='q" + index + "'rows='3' placeholder='" + item.placeholder + "'></textarea></div>");
        });
        $("#buttonOutput").css("visibility", "visible");
    } else {
        $("#outputArea").css("visibility", "hidden");
        $("#buttonOutput").css("visibility", "hidden");
    }
    iconClipboardHidden();
});

// 出力ボタンをおしたら
// 入力した内容をまとめたテキストを表示。
$("#buttonOutput").on("click", () => {
    let outputText = "";
    questions[qIndex].questionContents.forEach((item, index) => {
        outputText += "【" + item.question + "】";
        outputText += "\n";
        if (item.answerType == "code") {
            outputText += "```\n";
            outputText += $("#q" + index).val();
            outputText += "```";
        } else {
            outputText += $("#q" + index).val();
        }
        outputText += "\n";
    });
    $("#outputText").val(outputText);
    $("#outputArea").css("visibility", "visible");

    iconClipboardHidden();
});


//コピーアイコンを押したら、
//クリップボードにコピーしたことを知らせる。
$("#copyToClipboard").on("click", () => {
    iconClipboardVisible();
    let copyText = $("#outputText").val();
    navigator.clipboard.writeText(copyText);
});
