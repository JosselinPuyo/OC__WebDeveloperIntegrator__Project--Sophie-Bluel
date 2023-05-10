// Variables :

// - Étape 2.2 - //
const urlApiLogin = "http://localhost:5678/api/users/login";
const loginButton = document.querySelector("#login-button");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const emptyFieldMessage = "Saisissez un identifiant et un mot de passe";
const errorMessage = "Erreur dans l'identifiant ou le mot de passe";

// Etape 2.2 = User authentication //

// Évènement sur le bouton « Se connecter » : Appel de la fonction pour gérer la connexion //
loginButton.addEventListener("click", handleLogin);

// Fonction pour gérer la connexion //
async function handleLogin(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  // Appel de la fonction pour valider le remplissage de tous les champs du formulaire (e-mail / mot de passe) //
  if (!validateForm(email, password)) {
    return;
  }

  try {
    // Appel de la fonction pour la connexion à l'API //
    await userLogin(email, password);
  } catch (error) {
    displayErrorMessage(
      "Une erreur s'est produite lors de la tentative de connexion : " +
        error.message
    );
    console.error("Erreur : ", error);
  }
}

// Fonction pour valider le remplissage de tous les champs du formulaire (e-mail / mot de passe) //
function validateForm(email, password) {
  if (email === "" || password === "") {
    displayErrorMessage(emptyFieldMessage);
    return false;
  } else {
    return true;
  }
}

// Fonction pour la connexion à l'API //
async function userLogin(email, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(urlApiLogin, options); // - Constante d'envoi de la requête HTTP POST

  if (response.ok) {
    const data = await response.json(); // - Récupération de la réponse de l'API sous forme JSON
    localStorage.setItem("token", data.token); // - Stockage du token de connexion dans le localStorage
    localStorage.setItem("isConnected", "true"); // - Stockage de la variable isConnected dans le localStorage
    // Appel de la fonction pour rediriger vers la page d'accueil //
    redirectToHomePage();
  } else {
    // Appel de la fonction pour afficher un message d'erreur //
    displayErrorMessage(errorMessage);
  }
}

// Fonction pour rediriger vers la page d'accueil //
function redirectToHomePage() {
  window.location.href = "./index.html";
}

// Fonction pour afficher un message d'erreur //
function displayErrorMessage(message) {
  alert(message);
  console.error(`Erreur : ${message}`);
}
