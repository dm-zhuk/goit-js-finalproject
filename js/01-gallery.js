/* Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
Реалізація делегування на ul.gallery і отримання url великого зображення.
Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
Розмітка елемента галереї
Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

<li class="gallery__item">...

Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.
+Закриття з клавіатури - Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна. */

import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");

function renderGallery(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
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

  if (event.currentTarget == event.target) {
    return;
  }

  if (event.target.closest(".gallery__item")) {
    const largeImageSrc = event.target.dataset.source;

    /* Initialize BasicLightbox
     слухача клавіатури потрібно ставити при відкритті модального вікна, а знімати при закритті модального вікна. Для цього потрібно використати обʼєкт налаштувань бібліотеки, а саме ключики onShow i onClose. */

    const instance = basicLightbox.create(
      `
        <img src="${largeImageSrc}" alt="" />
      `,
      {
        handler: null,
        onShow(instance) {
          console.log(this);
          this.handler = onEscape.bind(instance);
          document.addEventListener("keydown", this.handler);
        },
        onClose() {
          document.removeEventListener("keydown", this.handler);
        },
      }
    );

    instance.show();
  }

  function onEscape({ code }) {
    if (code === "Escape") {
      console.log(this);
      this.close();
    }
  }
}

// console.log(galleryItems);
// console.log(basicLightbox);
