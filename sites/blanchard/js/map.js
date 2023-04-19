    
        function init() {
            let myMap = new ymaps.Map("map", {
                center: [55.76139365239679,37.60071646412499],
                zoom: 13
            });

            let placemark = new ymaps.Placemark([55.75846806898367,37.60108849999989], {}, {
iconLayout: 'default#image',
iconImageHref: 'img/map-icon.svg',
iconImageSize: [20, 20]
            });




            myMap.controls.remove('geolocationControl'); // удаляем геолокацию
            myMap.controls.remove('searchControl'); // удаляем поиск
            myMap.controls.remove('trafficControl'); // удаляем контроль трафика
            myMap.controls.remove('typeSelector'); // удаляем тип
            myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
            // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
            myMap.controls.remove('rulerControl'); // удаляем контрол правил
            myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

            myMap.geoObjects.add(placemark);
        };


       ymaps.ready(init);