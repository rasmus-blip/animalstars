"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

const settings = {
  filter: null,
  sortBy: null,
  sortDir: "asc",
};

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
  star: "\u2606",
  // orange star code is "\u2B50"
  // TODO: Add star
};

console.table(allAnimals);

function start() {
  console.log("ready");
  loadJSON();
  // FUTURE: Add event-listeners to filter and sort buttons
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", filtering);
  });
  document.querySelectorAll("th").forEach((th) => {
    th.addEventListener("click", sorting);
  });
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  buildList();
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;
  animal.star = "\u2606";

  return animal;
}

function buildList() {
  const currentList = allAnimals; // FUTURE: Filter and sort currentList before displaying

  displayList(currentList);
}

function displayList(animals) {
  console.log(animals);

  // clear the display
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data

  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;
  clone.querySelector("[data-field=star]").textContent = animal.star; //??

  // TODO: Add event listener to click on star
  clone
    .querySelector("[data-field=star]")
    .addEventListener("click", changeStar);

  // TODO: Show star ⭐ or ☆

  function changeStar() {
    console.log(animal);
    if (animal.star === "\u2606") {
      animal.star = "\u2B50";
    } else if (animal.star === "\u2B50") {
      animal.star = "\u2606";
    }
    buildList(animal);
  }

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

function filtering(filter) {
  let animals = allAnimals; // default list all animals
  console.log(animals);
  filter = this.dataset.filter;
  if (filter === "cat") {
    animals = allAnimals.filter((animal) => animal.type === "cat");
    console.log(animals);
  } else if (filter === "dog") {
    animals = allAnimals.filter((animal) => animal.type === "dog");
  } else if (filter === "all") {
    animals = allAnimals;
  }
  displayList(animals);
}

function sorting(sort) {
  document.querySelectorAll("th").forEach((th) => {
    th.addEventListener("click", buildList);
  });
  let animals = allAnimals;
  sort = this.dataset.sort;
  console.log(sort);
  if (sort === "star") {
    animals = allAnimals.filter((animals) => animals.star === "\u2B50");
  } else {
    animals = allAnimals.filter((animals) => animals.star === "\u2606");
  }
  displayList(animals);
}
