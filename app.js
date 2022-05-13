// Тоглогчийн ээлжийг хадалгалах хувьсагч
// ЖН: 1-р тоглогчийг 0, 2-р тоглогчийг - 1 гэж нэрлэнэ
var activePlayer = 0;

// Тоглогчийн цуглуулсан  оноог хадаглах хувьсагч
var srocres = [0, 0];

// Тоглогчийн ээлжиндэ цуглуулж байгаа оноог хадгалах хувьсагч
var roundScore = 0;

// // Програм эхлэхэд бэлтгэх

// document.getElementById('score-0').textContent = '0';
// // window.document.querySelector('#score-0').textContent = 0;
// window.document.getElementById('score-1').textContent = '0';

// window.document.getElementById('current-0').textContent = '0';
// window.document.getElementById('current-1').textContent = '0';

var diceDom = document.querySelector('.dice');
diceDom.style.display = "none";
// Тоглоомыг эхлүүллээ
initNewGame();



// Эхлэх функц
function initNewGame(){
    activePlayer = 0;    
    // Тоглогчийн цуглуулсан  оноог хадаглах хувьсагч
    srocres = [0, 0];    
    // Тоглогчийн ээлжиндэ цуглуулж байгаа оноог хадгалах хувьсагч
    roundScore = 0;    
    document.getElementById('score-0').textContent = '0';
    window.document.getElementById('score-1').textContent = '0';
    window.document.getElementById('current-0').textContent = '0';
    window.document.getElementById('current-1').textContent = '0';

    // Тоглогчдын нэрийг буцааж гаргах
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
 
    document.querySelector('player-0-panel').classList.remove('winner');
    document.querySelector('player-1-panel').classList.remove('winner');
    
    diceDom.style.display = "none";
    }

// Шоог шидэх эвент листенер
window.document.querySelector('.btn-roll').addEventListener('click', function(){
    var diceNumber = Math.floor(Math.random()*6 + 1);
    // 1-6 доторх санамсаргүй нэг тоог гаргаж авна
    // Шооны зургийг гаргаж ирнэ
    diceDom.style.display = 'block';
    // Шооны зургийг харгалзах тооны утгаар зургийг гаргаж ирнэ
    diceDom.src = 'dice-' + diceNumber + '.png';
    // Буусан тоо нь 1 ээс ялгаатай бол идеэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ

    if(diceNumber !== 1){
        //1-s явлгаатай тоо бууллаа. Буусан тоог тоглогчид нэмж өгнө
        roundScore = roundScore + diceNumber;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        // // 1 буусан тул толгогчийн ээлжийн хэсэгт сольж өгнө.
        // // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
        // roundScore = 0;
        // document.getElementById('current-' + activePlayer).textContent = 0;

        // // Хэрэв идэхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийг 1 болго.
        // // Үгүй бол идэвхтэй тоглогчийг 0 болго.
        // // if(activePlayer === 0) {
        // //     activePlayer = 1;
        // // } else {
        // //     activePlayer = 0; 
        // // }
      
        // activePlayer === 0 ? (activePlayer=1) : (activePlayer=0);

        // // Улаан цэгийг шилжүүлэх код
        // // document.querySelector('.player-0-panel').classList.remove('active');
        // // document.querySelector('.player-1-panel').classList.add('active');
        // document.querySelector('.player-0-panel').classList.toggle('active');
        // document.querySelector('.player-1-panel').classList.toggle('active');

        // // Шоог түр алга болгох
        // diceDom.style.display = "none";

            // Тоглогчийн ээлийг солино
            switchToNextPlayer();
    }

});
// HOLD товчны эвент листенер
document.querySelector('.btn-hold').addEventListener('click', function(){
    // Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө
    // var scores = [0,0];
    // if(activePlayer === 0) {
    //     srocres [0] = srocres [0] + roundScore;
    // } else {
    //     srocres [1] = srocres [1] + roundScore;
    // }
    // Нөхцөл шалгах бичилтийн оронд богно бичилтээр бичиж болно.
    srocres[activePlayer] = srocres[activePlayer] + roundScore;
    // Дэлгэц дээр оноог нь өөрчилнө
    document.getElementById('score-' + activePlayer).textContent = srocres[activePlayer];

    // Уг тоглогч хожсон эсэхийг оноо нь 100-с их эсэх шалгах
    if(srocres[activePlayer] >= 20) {
        // Ялагч гэсэн текстийг  нэргийнх оронд гаргана
        document.getElementById('name-'+activePlayer).textContent = 'WINNER!!!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');       
    } else {
        // Тоглогчийн ээлийг солино
        switchToNextPlayer();
    }


    // Ээлжийн оноог нь 0 болгоно.
    // roundScore = 0;
    // document.getElementById('current-'+activePlayer).textContent = 0;

    // // Тоглогчийн ээлжийг солино.

    // activePlayer === 0 ? (activePlayer=1) : (activePlayer=0);

    // // Улаан цэгийг шилжүүлэх код
    // document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-1-panel').classList.toggle('active');

    // // Шоог түр алга болгох
    // diceDom.style.display = "none";
    switchToNextPlayer();
});


// Энэ функц нь тоглох ээлийг дараачийн тоглогч руу шилжүүлдэг.
function switchToNextPlayer(){
    // Ээлжийн оноог нь 0 болгоно.
    roundScore = 0;
    document.getElementById('current-'+activePlayer).textContent = 0;

    // Тоглогчийн ээлжийг солино.

    activePlayer === 0 ? (activePlayer=1) : (activePlayer=0);

    // Улаан цэгийг шилжүүлэх код
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Шоог түр алга болгох
    diceDom.style.display = "none";
}


// Шинэ тоглоом эхлүүлэх товчний эвент 
document.querySelector('.btn-new').addEventListener('click',initNewGame);

