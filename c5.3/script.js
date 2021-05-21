const btn = document.getElementById('btn-id');
const str = document.getElementById('str');

// делаем функцию которая делает запрос на урл и результат кладет в колбек
function useRequest(url, callback) {
  // сам запрос
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function(){
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    }
    else {
      const result = JSON.parse(xhr.response);
      //соответственно кладем результат в колбек
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function(){
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
};

// делаем колбек
function displayResult(apiData) {
  let cards = '';
  
  // в колбеке делаем див в который кладем результат
  apiData.forEach(item => {
    const cardBlock = `
    <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>`;
    cards = cards + cardBlock;
  });
  str.innerHTML = cards;
}

//функция проверки, вызывает юзреквест если число в инпуте попадает в диапазон чисел
function check () {
  const value = Number(document.getElementById('input-id').value);
  const url = `https://picsum.photos/v2/list?limit=${value}`;
  if (value < 11 && value > 0) {
    useRequest(url, displayResult);
  }
  else {
    str.innerHTML="число вне диапазона от 1 до 10";
  }
}

btn.addEventListener('click', check)