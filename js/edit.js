import { getClipById, updateClip } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("editClipForm");
  const artistName = document.getElementById("artistName");
  const songTitle = document.getElementById("songTitle");
  const duration = document.getElementById("duration");
  const views = document.getElementById("views");

  // Отримуємо id кліпа з URL (?id=...)
  const urlParams = new URLSearchParams(window.location.search);
  const clipId = urlParams.get("id");

  // Завантажуємо дані кліпа з бекенду (GET /api/clips/:id)
  if (clipId) {
    try {
      const clip = await getClipById(clipId);
      if (clip) {
        artistName.value = clip.artistName || "";
        songTitle.value = clip.songTitle || "";
        duration.value = clip.duration || "";
        views.value = clip.views || "";
      }
    } catch (err) {
      console.error("Не вдалося завантажити кліп:", err);
    }
  }

  // Відправка форми: PUT /api/clips/:id
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => input.classList.remove("invalid"));

    let isValid = true;
    let errorMessage = "";

    if (artistName.value.trim() === "") {
      isValid = false;
      artistName.classList.add("invalid");
      errorMessage += "Введіть ім'я виконавця.\n";
    }

    if (songTitle.value.trim() === "") {
      isValid = false;
      songTitle.classList.add("invalid");
      errorMessage += "Введіть назву пісні.\n";
    }

    if (Number(duration.value) <= 0 || duration.value === "") {
      isValid = false;
      duration.classList.add("invalid");
      errorMessage += "Тривалість має бути більшою за 0.\n";
    }

    if (Number(views.value) < 0 || views.value === "") {
      isValid = false;
      views.classList.add("invalid");
      errorMessage += "Кількість переглядів не може бути від'ємною.\n";
    }

    if (!isValid) {
      showModal(errorMessage);
      return;
    }

    const updatedData = {
      artistName: artistName.value.trim(),
      songTitle: songTitle.value.trim(),
      duration: Number(duration.value),
      views: Number(views.value)
    };

    try {
      await updateClip(clipId, updatedData);
      alert("Кліп успішно оновлено!");
      window.location.href = "./index.html";
    } catch (err) {
      showModal("Помилка оновлення: " + err.message);
    }
  });
});
