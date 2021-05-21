const btn = document.querySelector('.btn');
const content = document.querySelector('.content');
// записываем в переменную результат из локального хранилища
const myDIV = localStorage.getItem('myDIV');

// соответственно если пользователь перезагрузил страницу то данные подтянутся из локалки
if (myDIV) {
  content.innerHTML = myDIV;
}

// по клику запускаем проверку условий, если условие верное, то запускаем функцию 
btn.addEventListener('click', check);

function check() {
  const number = Number(document.querySelector('.number').value);
  const limit = Number(document.querySelector('.limit').value);
  if ((number > 0 && number < 11) && (limit > 0 && limit < 11)) {
    responseResult(number, limit);
  }
  else if ((number < 1 || number > 10) && (limit < 1 || limit > 10)) {
    content.innerHTML = `<p>Номер страницы и лимит вне диапазона от 1 до 10</p>`;
  }
  else if (number < 1 || number > 10) {
    content.innerHTML = `<p>Номер страницы вне диапазона от 1 до 10`;
  }
  else if (limit < 1 || limit > 10) {
    content.innerHTML = `<p>Лимит вне диапазона от 1 до 10</p>`;
  }
}

// функция делает запрос на сервер, парсит результат и записывает его в ноды
function responseResult(number, limit) {
  fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`)
.then((response) => {
  const result = response.json();
  return result;
})
.then((data) => {
  let card = '';
  data.forEach(item => {
    const cardBlock = `
    <div>
      <img src=${item.download_url} width="150" height="150">
      <p>${item.author}</p>
    </div>`
    card = card + cardBlock;
  })
  // после записи результата записываем его в локальное хранилище
  localStorage.setItem('myDIV', card);
  // и выводим его в ноду
  content.innerHTML = card;
})
.catch(() => { console.log('error') })
}