//リスト呼び出し処理
if (getLocalStorage("myForm")) {//自分で登録したフォームがある場合、
  data = JSON.parse(getLocalStorage("myForm"));
  data.forEach((qs, index) => {
    $("#formSelector").append("<option value='" + index + "'>" + qs.questionTitle + "</option>");
  });
} else {
  data = questions;
  data.forEach((qs, index) => {
    $("#formSelector").append("<option value='" + index + "'>" + qs.questionTitle + "</option>");
  });
}


//質問リストを選択した質問リストの内容を表示
$("#formSelector").change(() => {

  const qIndex = $("[name=formSelector]").val();
  $("#questionTitle").val(data[qIndex].questionTitle);
  let list = "";
  data[qIndex].questionContents.forEach((e, i) => {
    let content = "";
    let answerType = "";
    let question = "";
    let placeholder = "";
    answerType = "<select name='select" + i + "'>";
    if (e.answerType == "text") {
      answerType += "<option selected value='text'>text</option>";
      answerType += "<option value='code'>code</option>";
    } else {
      answerType += "<option value='text'>text</option>";
      answerType += "<option selected value='code'>code</option>";
    }
    answerType += "</select>";
    question = "<textarea id='question" + i + "'>" + e.question + "</textarea>";
    placeholder = "<textarea id='placeholder" + i + "'>" + e.placeholder + "</textarea>";

    content += "<div class='col'>" + answerType + "</div>"
    content += "<div class='col'>" + question + "</div>"
    content += "<div class='col'>" + placeholder + "</div>"
    list += "<div class='row'>" + content + "</div>"
  });

  $(".formContent").html(list);

  $(".recordMessage").css("display", "none");
  $(".addArea").css("display", "flex");
  $(".deleteMessage").css("display", "none");


});





//保存ボタンを押したら
$("#recordButton").on("click", () => {
  const qIndex = $("[name=formSelector]").val();

  data[qIndex].questionTitle = $("#questionTitle").val();
  data[qIndex].questionContents.forEach((e, i) => {
    e.answerType = $("[name='select" + i + "']").val();
    e.question = $("#question" + i).val();
    e.placeholder = $("#placeholder" + i).val();
  });

  setLocalStorage("myForm", JSON.stringify(data));

  $(".recordMessage").css("display", "block");

})


//削除ボタンを押したら
$("#deleteAll").on("click", () => {
  $(".addArea").css("display", "none");

  $(".deleteMessage").css("display", "block");
})
$("#deleteStorage").on("click", () => {
  localStorage.removeItem("myForm");
})
$("#cancel").on("click", () => {
  $(".deleteMessage").css("display", "none");
})