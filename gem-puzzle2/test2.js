const pole = document.querySelector('.pole');
const randome = document.querySelector('.random')
const otkat = document.querySelector('.pobeda')
const Memor = document.querySelector('.mem')
const selection = document.querySelector('.select')
const Start = document.querySelector('.start')
const Clear = document.querySelector('.clear')



let selectChoice = selection.value.slice(-1);
var Mamory = [];
let Tap = [];
let countKletok = selectChoice * selectChoice;
let razmerKletki = 320 / selectChoice;
let nomera =[...Array(countKletok-1).keys()];
    
    let okno =  { // позиция пустого окна
    value: 0,
    top: 0,
    left: 0,
}

let kletki = [];
let dropZoni = [];
kletki.push(okno);
dropZoni.push(okno);



//let b = 0;
//let reversMemory = Mamory.reverse()
//let slow =  setTimeout(move2, 30 * (b + 1), reversMemory[b])  

//Функции-------------------------------------------------------------------------------
//Реверс. Отматывает все ходы назад. 
function bgg () {
    //if (!cancelled) {
     //   console.log('GG!')
     //   return false;
     // }
    MamoryCleaner(Mamory)
    let reversMemory = Mamory.reverse()
    for(b = 0; b < reversMemory.length; b++) {
      let slow =  setTimeout(move2, 30 * (b + 1), reversMemory[b])  
       console.log(reversMemory[b])
       //let slow =  setInterval(() => {
        //const a = reversMemory.pop();
        //move2(a);
       //},30)
      // setTimeout(() => { clearInterval(slow);}, 5000);
                 
    }
    Mamory = [];
    console.log(reversMemory)
    clearInterval(tictac);

}

//Перемешивание
function random() {  
    selectChoice = selection.value.slice(-1); 
    let randomizer = 1000 * selectChoice

    for (let z = 1; z <= randomizer; z++) {
        let a = nomera[Math.floor(Math.random() * (nomera.length))];
       if (a === 0) a = nomera.length
        move(a)
    }
    console.log(randomizer)
}
// Функция для реверсивного движения
function move2 (nomer) {
        let kletka = kletki[nomer];

        let leftBord = Math.abs(okno.left - kletka.left);
        let topBord = Math.abs(okno.top - kletka.top);
    
        if(leftBord + topBord > 1) {
            return;
        }
    
        kletka.element.style.left = `${okno.left * razmerKletki}px`;
        kletka.element.style.top = `${okno.top * razmerKletki}px`;
    
        let oknoLeft = okno.left;
        let oknoTop = okno.top;
        okno.left = kletka.left;
        okno.top = kletka.top;
        kletka.left = oknoLeft;
        kletka.top = oknoTop;
    
    
}
// В теории должна останавливать процесс решения
//function CTOP() {
   // cancelled = true;
    //cancelled = false;
    //}
//Функция передвижения клеток по полю
function move (nomer) {
    let kletka = kletki[nomer];

    let leftBord = Math.abs(okno.left - kletka.left);
    let topBord = Math.abs(okno.top - kletka.top);

    if(leftBord + topBord > 1) {
        return;
    }
    Mamory.push(nomer)
    Tap.push(nomer)
    document.Form2.tap.value = Tap.length;

    kletka.element.style.left = `${okno.left * razmerKletki}px`;
    kletka.element.style.top = `${okno.top * razmerKletki}px`;
    //dragAndDrop()

    let oknoLeft = okno.left;
    let oknoTop = okno.top;
    okno.left = kletka.left;
    okno.top = kletka.top;
    kletka.left = oknoLeft;
    kletka.top = oknoTop;

    

    let finish = kletki.every(kletka => {
        return kletka.value === kletka.top * selectChoice + kletka.left;
    })

    if(finish) {
        let WIN = document.Form3.win.value = `Ура! Вы решили головоломку за ${vivod} и ${Tap.length} ходов`;

    }


}
function start () {
    if(pole.firstChild) { //не даст заполнить поле, еслитам что то есть.
        return
    } else {
        selectChoice = selection.value.slice(-1);
        razmerKletki = 320 / selectChoice;
        razmerdropZoni = 320 / selectChoice;
        countKletok = selectChoice * selectChoice;
        nomera =[...Array(countKletok-1).keys()];
        nomera2 =[...Array(countKletok).keys()];

        okno.value = 0;
        okno.top = 0;
        okno.left = 0;
        
        console.log(okno)
        
        //Генерация поля
        for (let i = 0; i <= (countKletok - 1); i++) {
            let dropZona = document.createElement('div')

            dropZona.className = 'dropzona'
        
            let leftm = i % selectChoice;
            let topm = (i - leftm) / selectChoice;
        
            dropZoni.push({
                left: leftm,
                top: topm,
                element: dropZona
            });
            dropZona.style.width = `${320 / selectChoice}px`
            dropZona.style.height = `${320 / selectChoice}px`
            dropZona.style.left = `${leftm * razmerdropZoni}px`;
            dropZona.style.top = `${topm * razmerdropZoni}px`;
        
            pole.append(dropZona);
    }
        for (let i = 1; i <= (countKletok - 1); i++) {
            let kletka = document.createElement('div')
            let value = nomera[i - 1] +  1;

            kletka.className = 'kletka'; 
            kletka.innerHTML = value;
            kletka.setAttribute('draggable', true); //включет возможность drag and drop
        
            let left = i % selectChoice;
            let top = (i - left) / selectChoice;

            kletki.push({
                value: value,
                left: left,
                top: top,
                element: kletka
            });

            kletka.style.width = `${320 / selectChoice}px`
            kletka.style.height = `${320 / selectChoice}px`
            kletka.style.left = `${left * razmerKletki}px`;
            kletka.style.top = `${top * razmerKletki}px`;
            
            kletka.addEventListener('click', () => {
                move(i);
                console.log(i)
            })
            pole.append(kletka);
    }

    
    }
    random()
    console.log(Mamory)
    console.log(okno)
    Tap = [];
    document.Form2.tap.value = Tap.length;

    
}

function clear () {
    while (pole.firstChild) {
        pole.firstChild.remove();
    }
    kletki = [];
    nomera = [];
    kletki.push(okno);
    Mamory = [];
    
}

//функция подчищающая память от лишних действий
function MamoryCleaner(a) {
    for(n = 0; n < 5; n++){
        for (var q=1; q<a.length; ++q) {
          if (a[q-1] === a[q]) {
            a.splice(q, 1)
            a.splice(q-1, 1)
          }
        }
    }
    
    Mamory = a;
  }


//Секундомер
let tictac;
let S = '00', M = '00', H = '00';
let vivod = '';
function timer(){

    
    S = '00';
    M = '00';
    H = '00';
    vivod = '';
    
    tictac = setInterval(function(){
      //Плюсик перед строкой преобразует его в число,мания вне хогвартса
      S = +S +1;
      //Если результат меньше 10, прибавляем впереди строку '0'
      if( S < 10 ) { S = '0' + S; }
      if( S == 60 ) {
        S = '00';
        //Как только секунд стало 60, добавляем +1 к минутам
        M = +M + 1;
        //Дальше то же самое, что и для секунд
        if( M < 10 ) { M = '0' + M; }
        if( M == 60 ) {
          //Как только минут стало 60, добавляем +1 к часам.
          M = '00';
          H = +H + 1;
          if( H < 10 ) { H = '0' + H; }
        }
      }
      
        vivod = H + ':' + M + ':' + S;
        document.Form.timer.value = vivod;
      //Тикает всё через одну функцию, раз в секунду.
    },1000);
    
    

};
function stoptimer() {
    clearInterval(tictac);
    S = '00';
    M = '00';
    H = '00';
    vivod = H + ':' + M + ':' + S;
}

//drag drop

//const dragAndDrop = () => {
//    const dragDropKletka = document.querySelector('.kletka')

//    const dragStart = function() {
//        console.log('dragStart')
//    };
 //   dragDropKletka.addEventListener('dragstart', dragStart);


//}

var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {

  }, false);

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      if ( event.target.className == "dropzona" ) {
          event.target.style.background = "purple";
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropzona" ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.className == "dropzona" ) {
          event.target.style.background = "";
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
      }
    
  }, false);
//Функции-------------------------------------------------------------------------------




//кнопочки--------------------------------------------------------------------------------

//запускаем рандомайзер, сохраняем его шаги в память mamory
randome.addEventListener('click', () => {
    //CTOP();
    stoptimer()
    clear();
    start();
    document.Form3.win.value = `Да прибудет с тобой сила`;
    timer()
});

otkat.addEventListener('click', () => {
    bgg(Mamory);
    });
    
Memor.addEventListener('click', () => {
    console.log(Mamory)
    });

//Start.addEventListener('click', () => {
 //       start();
 //       });

//Clear.addEventListener('click', () => {
  //  clear();
   // });