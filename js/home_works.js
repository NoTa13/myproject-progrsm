const input = document.getElementById('gmail_input');
const button = document.getElementById('gmail_button');
const result = document.getElementById('gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


button.addEventListener('click', ()=>{
    const value = input.value.trim();
    if (gmailRegExp.test(value)){
        result.textContent = 'Почта верна';
        result.style.color = 'green';
    }else{
         result.textContent = 'Почта не верна';
         result.style.color = 'red';
    }
});

// Проверка ИИН
const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

// ИИН формат: 12 цифр, первые 2 цифры - год, далее месяц, день, порядковый номер
const iinRegExp = /^\d{12}$/;

const validateIIN = (iin) => {
    // Проверяем формат
    if (!iinRegExp.test(iin)) {
        return false;
    }
    
    // Проверяем контрольную сумму
    let weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let sum1 = 0;
    
    for (let i = 0; i < 11; i++) {
        sum1 += parseInt(iin[i]) * weights1[i];
    }
    
    let checksum1 = sum1 % 11;
    if (checksum1 === 10) {
        let weights2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
        let sum2 = 0;
        for (let i = 0; i < 11; i++) {
            sum2 += parseInt(iin[i]) * weights2[i];
        }
        checksum1 = sum2 % 11;
        if (checksum1 === 10) checksum1 = 0;
    }
    
    return checksum1 === parseInt(iin[11]);
};

iinButton.addEventListener('click', () => {
    const value = iinInput.value.trim();
    if (validateIIN(value)) {
        iinResult.textContent = 'ИИН верный';
        iinResult.style.color = 'green';
    } else {
        iinResult.textContent = 'ИИН не верный';
        iinResult.style.color = 'red';
    }
});


//движение квадрата по квадрату
const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

let x = 0
let y = 0

let directionX = 1;
let directionY = 0;

const speed = 3;


function move(){
    const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth
    const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight

    x+= directionX*speed
    y+= directionY*speed

    childBlock.style.left = x + 'px'
    childBlock.style.top = y + 'px'

    if (x>maxWidth && directionX === 1){
        directionX = 0
        directionY = 1
    }else if (y>=maxHeight && directionY===1){
        directionX = -1
        directionY = 0
    }else if (x<=0 && directionX === -1){
        directionX = 0;
        directionY = -1
    }else if (y<=0 && directionY === -1){
        directionX = 1
        directionY = 0
    }
    setTimeout(move, 10)
}
move()


//Секундомер
let milliseconds = 0;
let intervalId;
let running = false;

function updateTimer() {
    milliseconds++;
    
    // Рассчитываем минуты, секунды и миллисекунды
    const minutes = Math.floor(milliseconds / 6000); // 6000 = 60 сек * 100 десятых долей
    const seconds = Math.floor((milliseconds % 6000) / 100);
    const tenths = milliseconds % 100;
    
    // Обновляем все элементы
    document.getElementById('minutesS').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('secondsS').innerText = seconds.toString().padStart(2, '0');
    document.getElementById('ml-secondsS').innerText = tenths.toString().padStart(2, '0');
}

// Функция сброса таймера
function resetTimer() {
    milliseconds = 0;
    document.getElementById('minutesS').innerText = '00';
    document.getElementById('secondsS').innerText = '00';
    document.getElementById('ml-secondsS').innerText = '00';
    
    if (running) {
        clearInterval(intervalId);
        running = false;
    }
}

// Обработчики событий
document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        intervalId = setInterval(updateTimer, 10); // 10ms = 0.01 секунды
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (running) {
        clearInterval(intervalId);
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', resetTimer);