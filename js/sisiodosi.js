//ランダムを返す
function numRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 正規分布乱数関数 参考:http://d.hatena.ne.jp/iroiro123/20111210/1323515616
 * @param number m 平均μ
 * @param number s 分散σ^2
 * @return number ランダムに生成された値
 */
//ガウスランダム 正規分散
const normRand = (m, s) => {
  let a = 1 - Math.random();
  let b = 1 - Math.random();
  let c = Math.sqrt(-2 * Math.log(a));
  if (0.5 - Math.random() > 0) {
    return c * Math.sin(Math.PI * 2 * b) * s + m;
  } else {
    return c * Math.cos(Math.PI * 2 * b) * s + m;
  }
};

//写真を準備
const kindOfSika = 60;
imgSika = [];
for (let i = 1; i <= kindOfSika; i++) {
  imgSika[i] = new Image();
  imgSika[i].src = "./../image/sika" + i + ".png";
}

//キャンバスを準備
const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");
var w = $('.wrapper').width();
var h = $('.wrapper').height();
$('#canvas').attr('width', w);
$('#canvas').attr('height', h);
ctx.globalAlpha = 0.95;


//しかを沢山いれるオブジェクト配列
let sikas = [];
let sikaCounter = 0;
let addSika;


//ボタンを押したときの挙動
$("#buttonMotto").on("click", () => {
  num = numRandom(0, 10);//ししおどす確率
  if (num === 0) {
    $("#kakon").get(0).volume = 0.5;//おと半分の音量にする。
    $("#kakon").get(0).play(); //音ならす。
    if (addSika) { clearInterval(addSika); }//しか増やすのやめる
    sikaCounter = 0;//しかカウンターをリセット
    let countdown = 3;//3秒でフェードアウト
    const deleteAll = setInterval(() => {
      countdown -= 0.1;
      ctx.globalAlpha = countdown / 3 * 0.9 / 0.9;//カウントダウンとともに薄くする。
      if (countdown < 0.1) {
        clearInterval(deleteAll);//しかを倒すしょりを中止
        sikas = [];//しかの配列空にする
        ctx.clearRect(0, 0, canvas.width, canvas.height);//キャンバス初期化
        ctx.globalAlpha = 0.95//デフォルトに戻す。
      }
    }, 100)

  } else {
    if (sikaCounter === 8) {
      startAddSikaInterval();
    }
    sikaImageNum = numRandom(1, kindOfSika);

    //画像サイズ調整用
    scale = canvas.width / imgSika[sikaImageNum].width;
    scaleR = normRand(20, 5);
    scaleW = scale * imgSika[sikaImageNum].width / scaleR;
    scaleH = scale * imgSika[sikaImageNum].height / scaleR;

    xx = numRandom(0, canvas.width);
    if (sikaCounter < 10) {
      yy = numRandom(canvas.height - 100, canvas.height - 50);
    } else {
      yy = numRandom(0, canvas.height - 50);
    }

    sikas.push({
      sikaNum: sikaImageNum,
      x: xx,
      y: yy,
      scaleW: scaleW,
      scaleH: scaleH,
    });
    sikaCounter += 1;
  }
})

const startAddSikaInterval = () => {
  addSika = setInterval(() => {
    sikaImageNum = numRandom(1, kindOfSika);

    //画像サイズ調整用
    scale = canvas.width / imgSika[sikaImageNum].width;
    scaleR = normRand(20, 5);
    scaleW = scale * imgSika[sikaImageNum].width / scaleR;
    scaleH = scale * imgSika[sikaImageNum].height / scaleR;
    sikas.push({
      sikaNum: sikaImageNum,
      x: numRandom(0, canvas.width),
      y: numRandom(0, canvas.height - 50),
      scaleW: scaleW,
      scaleH: scaleH,
    });
    sikaCounter += 1;

    if (sikaCounter === 150) { //100体でたら追加をやめる。
      clearInterval(addSika);
    }
  }, 100);
}


const draw = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);//初期化

  //フッターぽく見せる。
  ctx.beginPath();
  ctx.fillStyle = 'darkseagreen';
  ctx.fillRect(0, canvas.height - 50, canvas.width, canvas.height)
  ctx.closePath();

  sikas.forEach((e, i) => {
    ctx.drawImage(imgSika[e.sikaNum], e.x, e.y, e.scaleW, e.scaleH)
  });
}, 100);