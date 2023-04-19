const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];
const monthsRu = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',
  'Ноябрь', 'Декабрь'
];


const declOfNum = (number, titles) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

const API_KEY = '11a18336-c5a6-4e1d-9df4-48f825a93ac2'

const currentYear = new Date().getFullYear()
const currentMounth = new Date().getMonth()
const currentMounthRu = monthsRu[currentMounth]
const currentMountEng = months[currentMounth].toLocaleUpperCase()

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (serchParams, prop) => serchParams.get(prop),
})

let queryParam = params.page

if(!queryParam) {
    queryParam = 1
    history.pushState(null, null, '?page=1')
}



const appListEl = document.querySelector('.app__list')
const yearEl = document.querySelector('.year')
const monthEl = document.querySelector('.mounth')
const paginationsEl = document.querySelectorAll('.app__pagination')
const errorEl = document.querySelector('.app__error');
const loadingEl = document.querySelector('.app__loading');

yearEl.textContent = currentYear
monthEl.textContent = currentMounthRu



const initApp = (page = 1) => {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${currentYear}&month=${currentMountEng}&page=${page}`

    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        }
    }) 
    .then((response) => response.json())
    .then((data) => {

    errorEl.style.display = 'none';
    loadingEl.style.display = 'none';

    const total = data.total
    const pages = Math.ceil(total/10)

    
    for (let i = pages; i>=1; i--) {
      paginationsEl.forEach(el => {
        el.insertAdjacentHTML('afterbegin', `
        <li class="app__pagination-item">
            <a href="?page=${i}" class="app__pagination-link ${i == queryParam ? 'app__pagination-link--current' : ''}">${i}</a>
        </li>
        `)
      })
    }
    return data 
    })
    .then((data) => {
        for (let item of data.releases) {

            const option = {
                month: 'long',
                day: 'numeric'
            }

            let date = new Date(item.releaseDate).toLocaleString('ru-Ru', option)

            let rating = item.rating ? item.rating.toFixed(1) : 'Недостаточно голосов';

            let duration = `${item.duration} ${declOfNum(item.duration, ['минута', 'минуты', 'минут'])}`;

            let to = item.genres.map(item => Object.values(item)[0]);

            let genres = to.toString().replace(',', ', ');

            appListEl.insertAdjacentHTML('afterbegin', `
            <li class="app__list-item">
            <article class="app__card movie-card">
                <a href="https://www.kinopoisk.ru/film/${item.filmId}" target="_blank" class="movie-card__link">
                    <div class="movie-card__image-wrapper">
                        <img src="${item.posterUrlPreview}" alt="${!item.nameRu ? item.nameEn : item.nameRu}" loading="lazy" class="movie-card__image">
                        <div class="movie-card__image-hover">
                            <div class="movie-card__rating ${item.rating === null ? 'movie-card__rating--null' : ''}">${rating}</div>
                            <div class="movie-card__genres">${genres}</div>
                            <div class="movie-card__duration ${item.duration === 0 ? 'movie-card__duration--hidden' : ''} ">${duration}</div>
                        </div>
                    </div>
                    <h2 class="movie-card__title">
                        ${!item.nameRu ? item.nameEn : item.nameRu}
                    </h2>
                    <div class="movie-card__date">${date}</div>
                </a>
            </article>
            </li>
            `)
        }
        
    })
    .catch(() => {
        errorEl.style.display = 'block';
        loadingEl.style.display = 'none';
      });
}

initApp(queryParam)