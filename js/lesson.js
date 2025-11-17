//проверка номера
const phoneInput = document.querySelectorAll('#phone_input');
const phoneButton = document.querySelectorAll('#phone_button');
const phoneSpan = document.querySelectorAll('#phone_result');

//+996550644772 - Киргизия
const reqExpKyrgyz = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

//+7 922 XXX-XX-XX - Россия
const reqExpRussia = /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/

// Проверка первого номера (Киргизия)
phoneButton[0].addEventListener('click', ()=>{
    if (reqExpKyrgyz.test(phoneInput[0].value)){
        phoneSpan[0].innerHTML = 'Этот номер существует';
        phoneSpan[0].style.color = 'green';
    }else {
        phoneSpan[0].innerHTML = 'Этот номер не существует';
        phoneSpan[0].style.color = 'red';
    }
})

// Проверка второго номера (Россия)
phoneButton[1].addEventListener('click', ()=>{
    if (reqExpRussia.test(phoneInput[1].value)){
        phoneSpan[1].innerHTML = 'Этот номер существует';
        phoneSpan[1].style.color = 'green';
    }else {
        phoneSpan[1].innerHTML = 'Этот номер не существует';
        phoneSpan[1].style.color = 'red';
    }
})


//TAB SLIDER
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents =  document.querySelector('.tab_content_items');


const hightTabsContentCards = () =>{
    tabsContentCards.forEach((tabsContentCard)=>{
        tabsContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0)=>{
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards();
showTabsContentCards();


tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex)=>{
            if(event.target === tabItem){
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let curretIndex = 0; // Первая вкладка
let intervalId; //Переменная для хранения интервала

//Ф-ция для автоматического переключения

const startAuthoSlider = ()=>{
    intervalId = setInterval(()=>{
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex +1) % tabsItems.length;
    }, 2000); // 2сек
}
//Запуск автослайдера
startAuthoSlider();

//Остановка слайдера при клике на вкладку

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId);
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex) =>{
            if(event.target === tabItem){
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                curretIndex = tabItemIndex;
                startAuthoSlider();
            }
        })
    }
}

// Получаем input элементы
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

// Фиксированные курсы
const USD_RATE = 87; // 1 USD = 87 SOM
const EUR_RATE = 101; // 1 EUR = 101 SOM

// Блокировка чтобы избежать циклических вызовов при программном обновлении полей
let isUpdatingConverter = false;

const formatNumber = (num) => {
    // Убираем лишние нули, но оставляем максимум 2 знака после запятой
    return Number.isFinite(num) ? (+num.toFixed(2)).toString() : '';
};

const onSomInput = (e) => {
    if (isUpdatingConverter) return;
    const raw = e.target.value.trim();
    const value = parseFloat(raw);
    isUpdatingConverter = true;
    if (raw === '' || isNaN(value)) {
        usdInput.value = '';
        eurInput.value = '';
        isUpdatingConverter = false;
        return;
    }
    const som = value;
    const usd = som / USD_RATE;
    const eur = som / EUR_RATE;
    usdInput.value = formatNumber(usd);
    eurInput.value = formatNumber(eur);
    isUpdatingConverter = false;
};

const onUsdInput = (e) => {
    if (isUpdatingConverter) return;
    const raw = e.target.value.trim();
    const value = parseFloat(raw);
    isUpdatingConverter = true;
    if (raw === '' || isNaN(value)) {
        somInput.value = '';
        eurInput.value = '';
        isUpdatingConverter = false;
        return;
    }
    const usd = value;
    const som = usd * USD_RATE;
    const eur = som / EUR_RATE; // convert som -> eur
    somInput.value = formatNumber(som);
    eurInput.value = formatNumber(eur);
    isUpdatingConverter = false;
};

const onEurInput = (e) => {
    if (isUpdatingConverter) return;
    const raw = e.target.value.trim();
    const value = parseFloat(raw);
    isUpdatingConverter = true;
    if (raw === '' || isNaN(value)) {
        somInput.value = '';
        usdInput.value = '';
        isUpdatingConverter = false;
        return;
    }
    const eur = value;
    const som = eur * EUR_RATE;
    const usd = som / USD_RATE; // convert som -> usd
    somInput.value = formatNumber(som);
    usdInput.value = formatNumber(usd);
    isUpdatingConverter = false;
};

if (somInput) somInput.addEventListener('input', onSomInput);
if (usdInput) usdInput.addEventListener('input', onUsdInput);
if (eurInput) eurInput.addEventListener('input', onEurInput);


//Card Swicher

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1
const totalCards = 200

async function getCardData(cardNumber){
    try{

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
        if(!response.ok){
            throw new Error('Error in server')
        }
        return await response.json()

    }catch (error){
        console.log('errrr data: ', error);
        return null;
        
    }
}

function updateCard(cardData){
    card.innerHTML = `
    <p>${cardData.title}</p>
    <p style='color: ${cardData.completed ? "green": "yellow"}'> ${cardData.completed}
    <span>${cardData.id}</span>
    `
}

// Инициализация карточки
getCardData(count).then(data => {
    if (data) updateCard(data);
});

btnNext.addEventListener('click', async () => {
    if (count < totalCards) {
        count++;
        const cardData = await getCardData(count);
        if (cardData) updateCard(cardData);
    }
});

btnPrev.addEventListener('click', async () => {
    if (count > 1) {
        count--;
        const cardData = await getCardData(count);
        if (cardData) updateCard(cardData);
    }
});

// Weather API - Using weatherapi.com (более надёжный)
const cityInput = document.querySelector('.cityName');
const citySpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');

// Fallback демо-данные для тестирования
const demoWeatherData = {
    'bishkek': { name: 'Bishkek', country: 'KG', temp: 12, description: 'Облачно', icon: 'Clouds' },
    'london': { name: 'London', country: 'GB', temp: 8, description: 'Облачно', icon: 'Clouds' },
    'москва': { name: 'Москва', country: 'RU', temp: -5, description: 'Снег', icon: 'Snow' },
    'moscow': { name: 'Moscow', country: 'RU', temp: -5, description: 'Снег', icon: 'Snow' },
    'new york': { name: 'New York', country: 'US', temp: 15, description: 'Ясно', icon: 'Clear' },
    'paris': { name: 'Paris', country: 'FR', temp: 10, description: 'Дождь', icon: 'Rain' },
    'токио': { name: 'Токио', country: 'JP', temp: 18, description: 'Ясно', icon: 'Clear' },
    'tokyo': { name: 'Tokyo', country: 'JP', temp: 18, description: 'Ясно', icon: 'Clear' }
};

const getWeather = async (city) => {
    if (!city || city.trim() === '') {
        citySpan.innerHTML = '';
        tempSpan.innerHTML = '';
        return;
    }
    
    try {
        citySpan.innerHTML = '⏳ Загрузка...';
        tempSpan.innerHTML = '';
        
        // Попытка получить данные с weatherapi.com
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d0e4516e8cdc4dbdb5191528251701&q=${encodeURIComponent(city)}&aqi=no&lang=ru`);
            
            if (response.ok) {
                const data = await response.json();
                const temp = Math.round(data.current.temp_c);
                const description = data.current.condition.text;
                const emoji = getWeatherEmoji(data.current.condition.code);
                
                citySpan.innerHTML = `${emoji} Город: <strong>${data.location.name}, ${data.location.country}</strong>`;
                tempSpan.innerHTML = `🌡️ Температура: <strong>${temp}°C</strong><br>Описание: ${description}`;
                return;
            }
        } catch (apiError) {
            console.warn('weatherapi.com недоступен, используем fallback:', apiError);
        }
        
        // Fallback: проверяем в демо-данных
        const lowerCity = city.toLowerCase().trim();
        if (demoWeatherData[lowerCity]) {
            const demo = demoWeatherData[lowerCity];
            const emoji = getWeatherEmoji(demo.icon);
            citySpan.innerHTML = `${emoji} Город: <strong>${demo.name}, ${demo.country}</strong> (демо)`;
            tempSpan.innerHTML = `🌡️ Температура: <strong>${demo.temp}°C</strong><br>Описание: ${demo.description}`;
            return;
        }
        
        // Если ничего не сработало
        throw new Error('Город не найден в базе');
        
    } catch (error) {
        citySpan.innerHTML = '❌ Ошибка';
        tempSpan.innerHTML = error.message || 'Город не найден. Попробуй: London, Paris, Moscow, Tokyo, Bishkek';
        console.error('Weather error:', error);
    }
};

const getWeatherEmoji = (input) => {
    // Для weatherapi.com (используют коды погоды)
    if (typeof input === 'number') {
        const codeMap = {
            1000: '☀️',  // Sunny
            1003: '☁️',  // Partly cloudy
            1006: '☁️',  // Cloudy
            1009: '☁️',  // Overcast
            1012: '☁️',  // Drizzle
            1015: '🌧️',  // Light rain
            1018: '🌧️',  // Light rain shower
            1021: '🌧️',  // Rain
            1063: '🌧️',  // Rain shower
            1066: '❄️',   // Snow
            1069: '❄️',   // Snow
            1072: '❄️',   // Snow
            1087: '⛈️',   // Thunderstorm
            1114: '❄️',   // Blizzard
            1135: '🌫️',   // Fog
            1147: '🌫️'    // Fog
        };
        return codeMap[input] || '🌤️';
    }
    
    // Для fallback демо-данных
    const emojis = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Snow': '❄️',
        'Thunderstorm': '⛈️',
        'Mist': '🌫️'
    };
    return emojis[input] || '🌤️';
};

if (cityInput) {
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        }
    });

    cityInput.addEventListener('blur', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });
}

