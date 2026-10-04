// js/create.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createClipForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Зупиняємо стандартну відправку форми

            // Очищаємо класи помилок
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('invalid'));

            let isValid = true;
            let errorMessage = '';

            // Отримуємо значення
            const artistName = document.getElementById('artistName');
            const songTitle = document.getElementById('songTitle');
            const duration = document.getElementById('duration');
            const views = document.getElementById('views');

            // JS Валідація
            const artistPattern = /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/;
            
            if (!artistPattern.test(artistName.value.trim())) {
                isValid = false;
                artistName.classList.add('invalid');
                errorMessage += "Ім'я виконавця має містити лише літери.\n";
            }

            if (songTitle.value.trim().length < 2) {
                isValid = false;
                songTitle.classList.add('invalid');
                errorMessage += "Назва пісні повинна містити хоча б 2 символи.\n";
            }

            if (Number(duration.value) < 1 || Number(duration.value) > 3600 || duration.value === '') {
                isValid = false;
                duration.classList.add('invalid');
                errorMessage += "Тривалість має бути від 1 до 3600 секунд.\n";
            }

            if (Number(views.value) < 0 || views.value === '') {
                isValid = false;
                views.classList.add('invalid');
                errorMessage += "Кількість переглядів не може бути від'ємною.\n";
            }

            // Якщо є помилки - показуємо модалку
            if (!isValid) {
                showModal(errorMessage);
                return;
            }

            // Якщо все добре
            const newClip = {
                artistName: artistName.value.trim(),
                songTitle: songTitle.value.trim(),
                duration: Number(duration.value),
                views: Number(views.value)
            };

            console.log('Новий кліп створено:', newClip);
            
            // Замість alert можна також використати модалку для успіху, 
            // але в завданні вимагається модалка для інформування про невірні дані.
            alert('Кліп успішно додано!');
            
            // Очищення форми
            form.reset();
        });
    }
});
