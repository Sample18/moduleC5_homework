const btn = document.querySelector('.btn');
const div = document.querySelector('.content');
btn.addEventListener('click', () => {
  const width = Number(document.querySelector('.inp1').value);
  const height = Number(document.querySelector('.inp2').value);
  if ((width <= 300 && width >= 100) && (height <= 300 && height >= 100)) {
        fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => {
          // console.log('response', response.url);
          const result = response.url;
          return result;
        })
        .then((data) => {
          div.innerHTML = `<img src=${data} alt="random-image">`;
        })
        .catch(() => { console.log('error') });
  }
  else {
    div.innerHTML = `<p>одно из чисел вне диапазона от 100 до 300</p>`
  }
});