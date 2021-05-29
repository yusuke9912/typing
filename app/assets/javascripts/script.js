$(function(){

var wordlist = [
    ["ああ言えばこう言う", "aaiebakouiu"],
    ["急がば回れ", "isogabamaware"],
    ["魚心あれば水心", "uogokoroarebamizugokoro"],
    ["縁の下の力持ち", "ennositanotikaramoti"],
    ["鬼の目にも涙", "oninomenimonamida"],
    ["飼い犬に手を噛まれる", "kaiinunitewokamareru"],
    ["九死に一生を得る", "kyuusiniissyouwoeru"],
    ["口は禍の元", "kutihawazawainomoto"],
    ["芸術は長く人生は短", "geijutuhanagakujinseihamijikasi"],
    ["後悔先に立たず", "koukaisakinitatazu"],
    ["猿も木から落ちる", "sarumokikaraotiru"],
    ["知らぬが仏", "siranugahotoke"],
    ["酸いも甘いも噛み分けた", "suimoamaimokamiwaketa"],
    ["善は急げ", "zenhaisoge"],
    ["大は小を兼ねる", "daihasyouwokaneru"],
    ["塵も積もれば山となる", "tirimotumorebayamatonaru"],
    ["鶴は千年亀は万年", "turuhasennenkamehamannen"],
    ["天は二物を与えず", "tenhanibutuwoataezu"],
    ["時は金なり", "tokihakanenari"],
    ["長い物には巻かれろ", "nagaimononihamakarero"],
    ["二度あることは三度ある", "nidoarukotohasandoaru"],
    ["糠に釘", "nukanikugi"],
    ["猫の手も借りたい", "nekonotemokaritai"],
    ["暖簾に腕押し", "norenniudeosi"],
    ["早起きは三文の徳", "hayaokihasanmonnotoku"],
    ["火のないところに煙は立たぬ", "hinonaitokoronikemurihatatanu"],
    ["覆水盆に反らず", "hukusuibonnikaerazu"],
    ["弁慶の泣き所", "benkeinonakidokoro"],
    ["仏の顔も三度", "hotokenokaomosando"],
    ["眉毛を読まれる", "mayugewoyomareru"],
    ["身から出た錆", "mikaradetasabi"],
    ["娘一人に婿八人", "musumehitorinimukohatinin"],
    ["目には目、歯には歯", "menihame,hanihaha"],
    ["元の鞘に納まる", "motonosayaniosamaru"],
    ["焼け石に水", "yakeisinimizu"],
    ["油断大敵", "yudantaiteki"],
    ["弱り目に祟り目", "yowarimenitatarime"],
    ["楽は苦の種、苦は楽の種", "rakuhakunotane,kuharakunotane"],
    ["良薬は口に苦し", "ryouyakuhakutininigasi"],
    ["類は友を呼ぶ", "ruihatomowoyobu"],
    ["例によって例の如し", "reiniyottereinogotosi"],
    ["論語読みの論語知らず", "rongoyominorongosirazu"],
    ["笑う門には福来たる", "waraukadonihahukukitaru"],
];

var readytime = 3;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;
var prev = -1;
var state = false;
var rate;
var typeSpeed;

var time_limit = 60;
var time_remaining;

var title = $('#title');


$('#selectLimit').on('change',function(){
    time_limit = $(this).val();
})

$('#start_button').on('click',function(){
    ready();
});

function ready() {
    readytime = 3;
    $('#count').html(readytime);
    $('#displayScore').hide();
    $('h1').hide();
     $('#start_button').hide();
     $('#limitForm').hide();
      $('#count').show();
       $('#submitRanking').hide();
        $('.require_login').hide();
       $('header').css('visibility','hidden')
   
    for (let i = 0; i < title.length; i++) {
        title[i].style.display = "none";
    }


    var readytimer = setInterval(function () {
        readytime--;
        if (readytime <= 0) {
             $('#count').hide();
            clearInterval(readytimer);
            gameStart();

        }
           $('#count').html(readytime);

    }, 1000);
}

function gameStart() {
    time_remaining = time_limit;
    $('#time').show();
    $('#time').css({'color':'#333','font-size':'30px','font-weight':'normal'});
    $('#time').html("残り時間：" + time_remaining);
    score = 0.0;
    mistake = 0;
    correct = 0;
    state = true;
    wordDisplay();

    var gametimer = setInterval(function () {
        time_remaining--;
           $('#time').html("残り時間：" + time_remaining);

        if (time_remaining <= 3) {
            $('#time').css({'color':'red','font-size':'35px','font-weight':'bold'})
          
        }
        if (time_remaining <= 0) {
            clearInterval(gametimer);
            finish();
        }
    }, 1000);
}

function wordDisplay() {
    while (true) {
        random = Math.floor(Math.random() * wordlist.length);
        if (random != prev) break;
    }
    prev = random;
    $('#japanese').html(wordlist[random][0]);
    $('#romaji').html(wordlist[random][1]);

    charInsort();
}

function charInsort() {
    word_char = wordlist[random][1].charAt(char_num);
}

function finish() {
    state = false;
    if (correct !== 0 || mistake !== 0) {
        score = Math.floor(Math.pow(correct, 2) * Math.pow((correct / (correct + mistake)), 5));
        rate = (correct / (correct + mistake) * 100).toFixed(1);
    } else {
        score = 0;
        rate = 0;
    }
    typeSpeed = correct / time_limit;
    $('header').css('visibility','visible')
    $('#displayScore').css('display','table');
    $('#displayScore tr:nth-of-type(1) .scoreArea').html("<b>" + score + "</b>" + "点");
    $('#displayScore tr:nth-of-type(2) .scoreArea').html("<b>" + rate + "</b>" + "%");
    $('#displayScore tr:nth-of-type(3) .scoreArea').html("<b>" + Math.round(typeSpeed * 100) / 100 + "</b>" + "回/秒");
    $('#time').hide()
    $('#romaji').html("");
    $('#japanese').html("");
    $('#start_button').css('display','inline-block').attr('value', 'もう一回');
    $('#submitRanking').show();
    $('#submitRanking').append("<input id='score' type='hidden' name='score' value='" + score + "'>");
    $('#submitRanking').append("<input type='hidden' name='limit' value='" + time_limit + "'>");
   $('.require_login').show();
    word_char = 0;
    random = 0;
    char_num = 0;

}


$(document).keydown(function(event){
    if (state) {
        var keyStr = event.key;
        keyStr = keyStr.toLowerCase();
        
        if (keyStr == word_char) {
            
            $('#missaudio').get(0).pause();
            $('#missaudio').get(0).currentTime = 0;
           
             $('#correctaudio').get(0).pause();
             $('#correctaudio').get(0).currentTime = 0;
             $('#correctaudio').get(0).play();
            $('#romaji').html("<span style='color: red;'>" + wordlist[random][1].substr(0, char_num + 1) + "</span>" + wordlist[random][1].substr(char_num + 1, wordlist[random][1].length));
         
            char_num++;
            correct++;
            charInsort();
        } else {
            $('#missaudio').get(0).pause();
            $('#missaudio').get(0).currentTime = 0;
             $('#correctaudio').get(0).pause();
             $('#correctaudio').get(0).currentTime = 0;
            mistake++;
            $('#missaudio').get(0).play();
        }
        if (char_num == wordlist[random][1].length) {
            char_num = 0;
            wordDisplay();
        }
    }
}) 



  $('.visible').click(function() {
    let $input = $(this).prev('input');
    let $fa = $(this).children('i');
    $fa.removeClass();
    if ($input.attr('type') == 'password') {
      $input.attr('type', 'text');
      $fa.addClass('fa fa-eye-slash');
    } else {
      $input.attr('type', 'password');
      $fa.addClass('fa fa-eye');
    }
  });


});