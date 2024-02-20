"use strict";

/*

try...catch використовається для "відлову помилок", таким чином що ці помилки не зупиняють роботу скрипта. Декілька прикладів використання try...catch:

1. В JS є метод JSON.parse який використовується що б перетворити строковий об*єкт отриманий від сервера в звичайний об*єкт. 

  const data = '{"name": "Jack", "age": 25}';
  const parsedObj = JSON.parse(data); // {name: "Jack", age: 25}

Але ми не можемо бути впевнені в валідності даних які ми отримуємо від сервера і тому що б запобігти виникнення помилки ми можемо використовувати try...catch

try {
  const parsedObj = JSON.parse(data)
}
catch (e) {
  alert("В даних наявна помилка, спробуйте ще раз")
}

2. Можемо уявити, що дані в об*єкті JSON є коректними але в них відстуня якась властивість. Ми можемо в такому випадку "викинути помилку":

try {
  const parsedObj = JSON.parse(data)
  if (!parsedObj) {
    throw new Error("Дані некоректні")
  }
}

catch (err) {
  alert('Помилка')
}

*/
const books = [
  {
    author: "Люсі Фолі",
    name: "Список запрошених",
    price: 70,
  },
  {
    author: "Сюзанна Кларк",
    name: "Джонатан Стрейндж і м-р Норрелл",
  },
  {
    name: "Дизайн. Книга для недизайнерів.",
    price: 70,
  },
  {
    author: "Алан Мур",
    name: "Неономікон",
    price: 70,
  },
  {
    author: "Террі Пратчетт",
    name: "Рухомі картинки",
    price: 40,
  },
  {
    author: "Анґус Гайленд",
    name: "Коти в мистецтві",
  },
];

const root = document.getElementById("root");

class PropertyError extends Error {
  constructor(index, prop, message) {
    super(message);
    this.message = `Object ${index + 1} misses ${prop} property`;
    this.name = "MissingPropertyValue";
  }
}

function createList() {
  const list = document.createElement("ul");
  return list;
}

function appendList(list, parent) {
  parent.append(list);
}

const list = createList();
appendList(list, root);

class Book {
  constructor(author, name, price, index) {
    this.author = author;
    this.name = name;
    this.price = price;
    this.index = index;
  }

  renderList(parent = list) {
    parent.insertAdjacentHTML(
      "beforeend",
      `
    <li>${this.author}</li>
    <li>${this.name}</li>
    <li>${this.price}</li>
    <br>
    `
    );
  }

  checkExcactProperty(prop, propName) {
    if (!prop) {
      throw new PropertyError(this.index, propName);
    }
  }

  checkProperties() {
    try {
      if (this.author && this.name && this.price) {
        this.renderList();
      } else {
        this.checkExcactProperty(this.author, "author");
        this.checkExcactProperty(this.name, "name");
        this.checkExcactProperty(this.price, "price");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

books.forEach((elem, index) => {
  new Book(elem.author, elem.name, elem.price, index).checkProperties();
});

// function filterBooks(books) {
//   const filteredBooks = books.filter(
//     (elem) => elem.name && elem.author && elem.price
//   );
//   return filteredBooks;
// }

// const filteredBooks = filterBooks(books);

// function checkProperty(index, books, prop) {
//   if (!books[index][prop]) {
//     return new PropertyError(index, prop);
//   }
// }

// function showError(books) {
//   for (let index in books) {
//     checkProperty(index, books, "name");
//     checkProperty(index, books, "author");
//     checkProperty(index, books, "price");
//   }
// }

// showError(books);

// function createListItem(filteredBook) {
//   const listItem = document.createElement("li");
//   listItem.innerHTML = `Author: ${filteredBook.author} <br> Name: ${filteredBook.name} <br> Price:${filteredBook.price}`;
//   return listItem;
// }

// function putListItem(list, listItem) {
//   list.appendChild(listItem);
// }

// function putList(root, list) {
//   root.appendChild(list);
// }

// function parseFilteredBooks(filteredBooks) {
//   for (let elem of filteredBooks) {
//     const listItem = createListItem(elem);
//     putListItem(list, listItem);
//   }
// }

// parseFilteredBooks(filteredBooks);

// putList(root, list);
