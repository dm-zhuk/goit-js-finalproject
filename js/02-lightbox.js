/* Зроби таку саму галерею як в першому завданні, але використовуючи бібліотеку SimpleLightbox, яка візьме на себе обробку кліків по зображеннях, відкриття і закриття модального вікна, а також гортання зображень за допомогою клавіатури.
    <li class="gallery__item">
   <a class="gallery__link" href="large-image.jpg">
      <img class="gallery__image" src="small-image.jpg" alt="Image description" />
   </a>
</li>
Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
Підключення скрипту і стилів бібліотеки, використовуючи CDN сервіс cdnjs: simple-lightbox.min.js і simple-lightbox.min.css.
Ініціалізація бібліотеки після створення і додання елементів галереї у ul.gallery. Для цього ознайомся з документацією SimpleLightbox секції «Usage» і «Markup».
Подивися в документації секцію «Options» і додай відображення підписів до зображень з атрибута alt. Нехай підпис буде знизу і з'являється через 250 мілісекунд після відкриття зображення. */

import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

function renderGallery(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>
    `
    )
    .join("");
}

galleryList.insertAdjacentHTML("afterbegin", renderGallery(galleryItems));
galleryList.addEventListener("click", handlerGalleryClick);

function handlerGalleryClick(event) {
  event.preventDefault();
}

// Initialize SimpleLightbox
new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});

console.log(galleryItems);
