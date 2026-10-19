import { createClip } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createClipForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('invalid'));

            let isValid = true;
            let errorMessage = '';

            const artistName = document.getElementById('artistName');
            const songTitle = document.getElementById('songTitle');
            const duration = document.getElementById('duration');
            const views = document.getElementById('views');

            if (artistName.value.trim() === '') {
                isValid = false;
                artistName.classList.add('invalid');
                errorMessage += "Введіть ім'я виконавця.\n";
            }

            if (songTitle.value.trim() === '') {
                isValid = false;
                songTitle.classList.add('invalid');
                errorMessage += "Введіть назву пісні.\n";
            }

            if (Number(duration.value) <= 0 || duration.value === '') {
                isValid = false;
                duration.classList.add('invalid');
                errorMessage += "Тривалість має бути більшою за 0.\n";
            }

            if (Number(views.value) < 0 || views.value === '') {
                isValid = false;
                views.classList.add('invalid');
                errorMessage += "Кількість переглядів не може бути від'ємною.\n";
            }

            if (!isValid) {
                showModal(errorMessage);
                return;
            }

            const newClip = {
                artistName: artistName.value.trim(),
                songTitle: songTitle.value.trim(),
                duration: Number(duration.value),
                views: Number(views.value)
            };

            try {
                const created = await createClip(newClip);
                console.log('Created clip:', created);
                alert('Кліп успішно створено!');
                form.reset();
            } catch (error) {
                showModal('Помилка сервера: ' + error.message);
            }
        });
    }
});