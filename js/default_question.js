//デフォルトの質問を格納するJavaScript

const questions = [
  {
    questionTitle: "詰んだ・・・質問チャンネル",
    questionContents: [{
      question: "何について質問したい？",
      placeholder: "プログラミング言語名、主要技術名など",
      answerType: "text",
    },
    {
      question: "なにを実現したい？",
      placeholder: "〇〇を□□にしたい。",
      answerType: "text",
    },
    {
      question: "いまどうなっている？",
      placeholder: "どんなエラーがでてる？予想と違う場合の期待する挙動と、実際の挙動は？",
      answerType: "text",
    },
    {
      question: "問題はどこにありそう？",
      placeholder: "どこが怪しいと思っている？",
      answerType: "text",
    },
    {
      question: "なにか参考にした資料がある？",
      placeholder: "URLとか。調べ方を教えてほしい場合はここに記入!",
      answerType: "text",
    },
    {
      question: "コード貼り付けとく？",
      placeholder: "コードを貼り付けー",
      answerType: "code",
    },
    ]
  },
  {
    questionTitle: "もくもく目標設定",
    questionContents: [{
      question: "なにする？",
      placeholder: "コードかく？アイデア出し？ワイワイしたい？",
      answerType: "text",
    },
    {
      question: "目標は？",
      placeholder: "〇〇理解、〇〇を△%とか",
      answerType: "text",
    },
    {
      question: "なんか言っときたいこと",
      placeholder: "誰か捕まえて質問します！みたいな",
      answerType: "text",
    },
    ]
  },
  {
    questionTitle: "どや！",
    questionContents: [{
      question: "何ができた？",
      placeholder: "",
      answerType: "text",
    },
    {
      question: "自己評価",
      placeholder: "",
      answerType: "checkbox",
    },
    {
      question: "なにが難しかった？",
      placeholder: "",
      answerType: "text",
    },
    ]
  },
];