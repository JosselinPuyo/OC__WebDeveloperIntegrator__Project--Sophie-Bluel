// Variables :

// - Étape 3.1 - //
const userToken = localStorage.getItem("token");

const loginButton = document.querySelector(".login a");
const headerBody = document.querySelector("header");
const filtersContainer = document.querySelector(".filters-container");
const editModeBanner = document.querySelector(".edit-mode-banner");
const buttonsEdit = document.querySelectorAll(".edit-btn");

const buttonOpenModalWorks = document.querySelector(".btn-open-modal-works");
const modalContainer = document.querySelector(".modal-container");
const modal1 = document.querySelector(".modal-1");
const buttonCloseModal1 = document.querySelector(".btn-close-modal-1");
const modalWorksContainer = document.querySelector(".modal-works-container");
const trashIcons = [];
const arrowsIcons = [];
const modalFigures = [];
const buttonDeleteGallery = document.querySelector(".btn-delete-gallery");

// Etape 3.1 = Add modal window (admin) //

// Condition si token = admin //
if (userToken) {
  loginButton.innerText = "logout";
  loginButton.addEventListener("click", function () {
    if (confirm("Êtes-vous sûr(e) de vouloir vous deconnecter ?")) {
      localStorage.removeItem("token");
    }
  });
  headerBody.style = "padding-top: 38px";
  filtersContainer.style.display = "none";
  editModeBanner.style.display = "flex";
  for (let element of buttonsEdit) {
    element.style.display = "flex";
  }
}

// Évènement sur le bouton « Modifier » : Appel de la fonction pour ouvrir la modale n°1 //
buttonOpenModalWorks.addEventListener("click", openModal);

// Fonction pour ouvrir la modale n°1 //
function openModal() {
  modalContainer.style.display = "flex";
  modal1.style.display = "flex";
}

// Évènement : Appel de la fonction pour fermer la modale //
document.addEventListener("click", closeModalWindow); // - Via la fenêtre
buttonCloseModal1.addEventListener("click", closeModalButton); // - Via l'icone « x »

// Fonction pour fermer la modale - Via la fenêtre //
function closeModalWindow(event) {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
    closeModalButton();
  }
}
// Fonction pour fermer la modale - Via l'icone « x » //
function closeModalButton() {
  modalContainer.style.display = "none";
}

// Fonction pour récupérer les travaux de l'API dans la modale //
async function fetchWorksModal() {
  try {
    const response = await fetch(urlApiWorks);
    const works = await response.json();

    for (let i in works) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const trashIconContainer = document.createElement("div");
      const trashIcon = document.createElement("i");
      const arrowsIconContainer = document.createElement("div");
      const arrowsIcon = document.createElement("i");

      figure.setAttribute("data-works-category-id", works[i].category.id);
      figure.setAttribute("data-works-id", works[i].id);
      figure.addEventListener("mouseover", function () {
        arrowsIconContainer.style.display = "flex";
      });
      figure.addEventListener("mouseout", function () {
        arrowsIconContainer.style.display = "none";
      });

      img.setAttribute("src", works[i].imageUrl);
      img.setAttribute("alt", works[i].title);
      img.setAttribute("crossorigin", "anonymous");

      trashIcon.setAttribute("data-works-id", works[i].id);
      arrowsIcon.setAttribute("data-works-id", works[i].id);

      trashIconContainer.classList.add("trash-container");
      trashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon");

      arrowsIconContainer.classList.add("arrows-container");
      arrowsIcon.classList.add(
        "fa-solid",
        "fa-arrows-up-down-left-right",
        "arrows-icon"
      );

      figcaption.textContent = "éditer";

      trashIconContainer.appendChild(trashIcon);
      arrowsIconContainer.appendChild(arrowsIcon);
      figure.append(img, figcaption, trashIconContainer, arrowsIconContainer);
      modalWorksContainer.appendChild(figure);

      trashIcons.push(trashIcon);
      arrowsIcons.push(arrowsIcon);
      modalFigures.push(figure);
    }
    // Appel de la fonction pour supprimer 1 projet
    deleteWork();
  } catch (error) {
    console.error("Erreur : ", error);
  }
}

// Appel de la fonction pour récupérer les travaux de l'API dans la modale //
fetchWorksModal();

// Etape 3.2 = Delete works modal //

// Fonction pour récupérer la requête 'DELETE' de l'API //
async function fetchDeleteRequest(workId) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await fetch(
      `http://localhost:5678/api/works/${workId}`,
      options
    );

    if (response.ok) {
      alert("Votre projet a bien été supprimé");
      console.log("Projet supprimé");
    }
  } catch (error) {
    console.error("Erreur : ", error);
  }
}

// Fonction pour supprimer 1 projet //
function deleteWork() {
  for (let trashIcon of trashIcons) {
    trashIcon.addEventListener("click", function () {
      const workId = trashIcon.getAttribute("data-works-id");
      // Appel de la fonction pour récupérer la requête 'DELETE' de l'API //
      fetchDeleteRequest(workId);
      for (let figure of modalFigures) {
        if (figure.getAttribute("data-works-id") === workId) {
          figure.remove();
        }
      }
      for (let figure of figures) {
        if (figure.getAttribute("data-works-id") === workId) {
          figure.remove();
        }
      }
    });
  }

  // Évènement sur le bouton « Supprimer la gallerie » : Appel de la fonction pour supprimer tous les projets //
  buttonDeleteGallery.addEventListener("click", async function () {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les travaux ?")) {
      for (let i in works) {
        const workId = works[i].id;
        // Appel de la fonction pour récupérer la requête 'DELETE' de l'API //
        fetchDeleteRequest(workId);
      }
      gallery.innerHTML = "";
      modalWorksContainer.innerHTML = "";
    }
  });
}
