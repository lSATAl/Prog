const pole = document.querySelector('.pole');
const randome = document.querySelector('.random')
const otkat = document.querySelector('.pobeda')
const Memor = document.querySelector('.mem')

const razmerKletki = 100;
var Mamory = [];
let okno = { // позиция пустого окна
    value: 0,
    top: 0,
    left: 0,
}

let kletki = [];
kletki.push(okno);
//Функции-------------------------------------------------------------------------------
function bgg () {
    let reversMemory = Mamory.reverse()
    for(let b = 0; b < reversMemory.length; b++) {
        move2(reversMemory[b])
        Mamory = [];
    }
    console.log(reversMemory)
}
function random() {    
    for (let z = 1; z <= 3000; z++) {
        let a = nomera[Math.floor(Math.random() * nomera.length)];
       if (a === 0) a = 12
        move(a)
    }
}
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

    let finish = kletki.every(kletka => {
        return kletka.value === kletka.top * 4 + kletka.left;
    })
}
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
//Функции-------------------------------------------------------------------------------
//Генерация поля -----------------------------------------------------------------------
let nomera =[...Array(15).keys()];

for (let i = 1; i <= 15; i++) {
    let kletka = document.createElement('div')
    let value = nomera[i - 1] +  1;
    kletka.className = 'kletka'; 
    kletka.innerHTML = value;

    let left = i % 4;
    let top = (i - left) / 4

    kletki.push({
        value: value,
        left: left,
        top: top,
        element: kletka
    });

    kletka.style.left = `${left * razmerKletki}px`;
    kletka.style.top = `${top * razmerKletki}px`;

    pole.append(kletka);

    kletka.addEventListener('click', () => {
        move(i);
        console.log(i)
    })
    
}
//Генерация поля -----------------------------------------------------------------------

//запускаем рандомайзер, сохраняем его шаги в память mamory
random()
console.log(Mamory)

//кнопочки
randome.addEventListener('click', () => {
    random();
});

otkat.addEventListener('click', () => {
    bgg(Mamory);
    });
    
Memor.addEventListener('click', () => {
    console.log(Mamory)
    });