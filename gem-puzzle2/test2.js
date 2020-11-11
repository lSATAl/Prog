const pole = document.querySelector('.pole');
const randome = document.querySelector('.random')
const otkat = document.querySelector('.pobeda')
const Memor = document.querySelector('.mem')
const selection = document.querySelector('.select')
const Start = document.querySelector('.start')
const Clear = document.querySelector('.clear')


let selectChoice = selection.value.slice(-1);
var Mamory = [];
let countKletok = selectChoice * selectChoice;
let razmerKletki = 320 / selectChoice;
let nomera =[...Array(countKletok-1).keys()];
let okno = { // позиция пустого окна
    value: 0,
    top: 0,
    left: 0,
}
let kletki = [];
kletki.push(okno);



//let b = 0;
//let reversMemory = Mamory.reverse()
//let slow =  setTimeout(move2, 30 * (b + 1), reversMemory[b])  

//Функции-------------------------------------------------------------------------------
//Реверс. Отматывает все ходы назад. 
function bgg () {
    if (!cancelled) {
        console.log('GG!')
        return false;
      }
    MamoryCleaner(Mamory)
    let reversMemory = Mamory.reverse()
    for(b = 0; b < reversMemory.length; b++) {
       let slow =  setTimeout(move2, 30 * (b + 1), reversMemory[b])  
       slow;          
    }
    Mamory = [];
    console.log(reversMemory)
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

function CTOP() {
    cancelled = true;
    //cancelled = false;
    }
//Функция передвижения клеток по полю
function move (nomer) {
    let kletka = kletki[nomer];

    let leftBord = Math.abs(okno.left - kletka.left);
    let topBord = Math.abs(okno.top - kletka.top);

    if(leftBord + topBord > 1) {
        return;
    }
    Mamory.push(nomer)

    kletka.element.style.left = `${okno.left * razmerKletki}px`;
    kletka.element.style.top = `${okno.top * razmerKletki}px`;


    let oknoLeft = okno.left;
    let oknoTop = okno.top;
    okno.left = kletka.left;
    okno.top = kletka.top;
    kletka.left = oknoLeft;
    kletka.top = oknoTop;

    let finish = kletki.every(kletka => {
        return kletka.value === kletka.top * 4 + kletka.left;
    })

    if(finish) {
        
    }


}
function start () {
    if(pole.firstChild) {
        return
    } else {
        selectChoice = selection.value.slice(-1);
        razmerKletki = 320 / selectChoice;
        countKletok = selectChoice * selectChoice;
        nomera =[...Array(countKletok-1).keys()];
        okno.value = 0;
        okno.top = 0;
        okno.left = 0;

        console.log(okno)
        
        //Генерация поля
        for (let i = 1; i <= (countKletok - 1); i++) {
            let kletka = document.createElement('div')
            let value = nomera[i - 1] +  1;
            kletka.className = 'kletka'; 
            kletka.innerHTML = value;
        
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

//Таймер 



//Функции-------------------------------------------------------------------------------


//запускаем рандомайзер, сохраняем его шаги в память mamory


//кнопочки
randome.addEventListener('click', () => {
    CTOP();
    clear();
    start();
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