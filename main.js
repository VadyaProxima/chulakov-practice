document.addEventListener('DOMContentLoaded', function() {
    const cityNameElement = document.getElementById('city-name');
    const confirmTemplate = document.getElementById('confirm-template').content;
    const cityTemplate = document.getElementById('city-template').content;
    let confirmDialog = null;
    let cityDialog = null;

    // Функция для обновления имени города в шапке
    function updateCityName() {
        const savedCity = localStorage.getItem('selectedCity') || 'Пятигорск';
        cityNameElement.textContent = savedCity;
    }

    // Обработчик для открытия первого модального окна
    cityNameElement.addEventListener('click', function() {
        document.body.appendChild(confirmTemplate.cloneNode(true));
        confirmDialog = document.getElementById('confirm-dialog');
        const confirmTitle = document.getElementById('confirm-title');
        confirmTitle.textContent = `Ваш город ${cityNameElement.textContent}?`;
        confirmDialog.showModal();

        // Обработчик для кнопки "Да, верно"
        document.getElementById('confirm-yes').addEventListener('click', function() {
            confirmDialog.close();
            document.body.removeChild(confirmDialog);
        });

        // Обработчик для кнопки "Изменить регион"
        document.getElementById('confirm-change').addEventListener('click', function() {
            confirmDialog.close();
            document.body.removeChild(confirmDialog);
            openCityDialog();
        });
    });

    // Функция для открытия второго модального окна со списком городов
    function openCityDialog() {
        document.body.appendChild(cityTemplate.cloneNode(true));
        cityDialog = document.getElementById('city-dialog');
        cityDialog.showModal();

        cityDialog.querySelectorAll('.city-list button').forEach(button => {
            button.addEventListener('click', function() {
                const selectedCity = button.getAttribute('data-city');
                localStorage.setItem('selectedCity', selectedCity);
                cityNameElement.textContent = selectedCity;
                cityDialog.close();
                document.body.removeChild(cityDialog);
            });
        });
    }

    // Обновить имя города при загрузке страницы
    updateCityName();
});


