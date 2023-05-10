// Variables :

// - Étape 1.1 - //
let urlApiWorks = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");
const figures = [];
// - Étape 1.2 - //
const filters = document.querySelectorAll(".filters-container button");
const filterAll = document.querySelector(".filterAll");

// Etape 1.1 = Fetch works //

// Fonction pour récupérer les travaux de l'API //
async function fetchWorks() {
  await fetch(urlApiWorks)
    .then((response) => response.json())
    .then((data) => {
      works = data;
      // Appel de la fonction pour générer les travaux de l'API //
      generateWorks();
    })
    .catch((error) => console.error(`Erreur : ${error}`));
}

// Fonction pour générer les travaux de l'API //
function generateWorks() {
  gallery.innerHTML = ""; // - DOM
  for (let i in works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    figure.setAttribute("data-works-category-id", works[i].category.id);
    figure.setAttribute("data-works-id", works[i].id);

    img.setAttribute("src", works[i].imageUrl);
    img.setAttribute("alt", works[i].title);
    img.setAttribute("crossorigin", "anonymous");

    figcaption.innerHTML = works[i].title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    figures.push(figure);
  }
}

// Appel de la fonction pour récupérer les travaux de l'API //
fetchWorks();

// Etape 1.2 = Filters works //

// Fonction pour définir le filtre actif //
function handleFilterClick(event) {
  filters.forEach((button) => {
    button.classList.remove("active"); // - Supprimer ".active" de tous les filtres
  });
  const clickedFilter = event.target;
  clickedFilter.classList.add("active"); // - Ajouter ".active" au filtre ciblé
}

// Appel de la fonction pour définir le filtre actif //
filters.forEach((button) => {
  button.addEventListener("click", handleFilterClick);
});

// Condition pour filtrer les travaux par catégories //
for (let filter of filters) {
  filter.addEventListener("click", function () {
    for (let figure of figures) {
      if (
        figure.getAttribute("data-works-category-id") ===
        filter.getAttribute("data-works-category-id")
      ) {
        figure.style.display = "block";
      } else if (filter.classList.contains("filterAll")) {
        figure.style.display = "block";
      } else {
        figure.style.display = "none";
      }
    }
  });
}

// Évènement pour afficher la connexion réussi //
window.addEventListener("DOMContentLoaded", () => {
  const isConnected = localStorage.getItem("isConnected");
  if (isConnected === "true") {
    alert("Vous êtes maintenant connecté !");
    console.log("Connexion réussi !");
    localStorage.removeItem("isConnected"); // - Suppression de la variable isConnected
  }
});
