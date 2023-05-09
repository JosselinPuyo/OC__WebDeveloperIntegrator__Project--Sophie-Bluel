// Variables :

// - Étape 1.1 - //
let urlApiWorks = "http://localhost:5678/api/works";
const gallery = document.querySelector(".gallery");
const figures = [];

// Etape 1.1 = Fetch works //

// Fonction pour récupérer les travaux de l'API
async function fetchWorks() {
  await fetch(urlApiWorks)
    .then((response) => response.json())
    .then((data) => {
      works = data;
      // Appel de la fonction pour générer les travaux de l'API
      generateWorks();
    })
    .catch((error) => console.error(`Erreur : ${error}`));
}

// Fonction pour générer les travaux de l'API
function generateWorks() {
  // DOM
  gallery.innerHTML = "";
  for (let i in works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    figure.setAttribute("works-id", works[i].id);

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

// Appel de la fonction pour récupérer les travaux de l'API
fetchWorks();
