// 
// ---------------------------
let qIndex; //選択されたオブジェクト配列の配列番号を保持


// function
// ---------------------------

//クリップボードにコピーしたよを知らせる
const iconClipboardVisible = (id) => {
    $(id).removeClass("bi-clipboard");
    $(id).addClass("bi-clipboard-check");
    $(id).addClass("text-success");
    console.log(id);
};

//クリップボードにコピーしてない状態にする。
const iconClipboardHidden = (id) => {
    if ($(id).hasClass("bi-clipboard-check")) {
        $(id).addClass("bi-clipboard");
        $(id).removeClass("bi-clipboard-check");
        $(id).removeClass("text-success");
    };
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
    iconClipboardHidden("#iconTextClipboard");
});

// 出力ボタンをおしたら
// 入力した内容をまとめたテキストを表示。
$("#buttonOutput").on("click", () => {
    let outputText = "";
    let outputCode = "";
    $("#outputText").css("visibility", "hidden");
    $(".codeArea").css("visibility", "hidden");

    questions[qIndex].questionContents.forEach((item, index) => {
        if (item.answerType == "code") {
            outputCode += $("#q" + index).val();
            $(".codeArea").css("visibility", "visible");
        } else {
            outputText += "【" + item.question + "】";
            outputText += "\n";
            outputText += $("#q" + index).val();
            $("#outputText").css("visibility", "visible");
        }
        outputText += "\n";
    });

    $("#outputText").val(outputText);
    $("#outputCode").val(outputCode);

    iconClipboardHidden("#iconTextClipboard");
});


//テキストのコピーアイコンを押したら、
//クリップボードにコピーしたことを知らせる。
$("#copyTextToClipboard").on("click", () => {
    iconClipboardVisible("#iconTextClipboard");
    let copyText = $("#outputText").val();
    navigator.clipboard.writeText(copyText);
});

//コードのコピーアイコンを押したら、
//クリップボードにコピーしたことを知らせる。
$("#copyCodeToClipboard").on("click", () => {
    iconClipboardVisible("#iconCodeClipboard");
    let copyText = $("#outputCode").val();
    navigator.clipboard.writeText(copyText);
});
