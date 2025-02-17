/** Les Variables **/
const gallery = document.querySelector(".gallery");
const filterSection = document.querySelector(".filtre");

/* Fonction qui appel et retourne le tableau works et categorie en json */
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}
getWorks();

async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

/**  affichage du works **/

async function worksView(filterId = 0) {
  const arrayworks = await getWorks();
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  // Filtrer les travaux en fonction de l'ID de la catégorie
  const worksToDisplay =
    filterId === 0
      ? arrayworks
      : arrayworks.filter((work) => work.categoryId === filterId);

  worksToDisplay.forEach((element) => {
    const galleryImage = document.createElement("img");
    galleryImage.src = element.imageUrl;
    galleryImage.classList.add("gallery");
    const galleryTitle = document.createElement("figurecaption");
    galleryTitle.textContent = element.title;
    const galleryFigure = document.createElement("figure");
    galleryFigure.appendChild(galleryImage);
    galleryFigure.appendChild(galleryTitle);
    gallery.appendChild(galleryFigure);
  });
}
worksView();

/** Recuperation des categories pour notre filtre et filtre par categorie **/

async function displayFilters() {
  const filters = await getCategorys();
  filters.unshift({ id: 0, name: "Tous" }); //une catégorie spéciale avec id: 0 et name: "Tous" Ce filtre permet d'afficher tous les travaux sans filtrage.

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.textContent = filter.name;
    filterSection.appendChild(button);
    button.classList.add("filtre__style");

    button.addEventListener("click", async () => {
      await worksView(filter.id);
    });
  });
}
displayFilters();

/** Utilisateur Connecté pour modal **/
const loged = window.sessionStorage.getItem("loged");
const modeEdition = document.querySelector(".modal-container");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const modalPhoto = document.querySelector(".modal-photo");
const filterNone = document.querySelector(".filtre");
const modifierTitle = document.querySelector(".modifier-titre");

if (loged === "true") {
  // Affichage la div en mode édition
  if (modeEdition) {
    modeEdition.classList.add("modal-visible");
  } else {
    console.error("Element .modal-container non trouvé !");
  }
  if (modifierTitle) {
    modifierTitle.classList.add("modifier-titre");
  } else {
    console.error("Element .modifier-titre non trouvé !");
  }
  // Affichage le bouton de déconnexion
  if (logout) {
    logout.textContent = "Logout";
    logout.style.display = "block";
  } else {
    console.error("Element .logout non trouvé !");
  }
  // Masque le bouton de connexion
  if (login) {
    login.style.display = "none";
  } else {
    console.error("Element .login non trouvé !");
  }
  // Affiche le bouton modifier
  if (modalPhoto) {
    modalPhoto.style.display = "block";
  } else {
    console.error("Element .modal-photo non trouvé !");
  }
  if (filterNone) {
    filterNone.style.display = "none";
  } else {
    console.error("Element .filtre non trouvé !");
  }
} else {
  // Masque la div en mode édition
  if (modeEdition) {
    modeEdition.classList.remove("modal-visible");
  } else {
    console.error("Element .modal-container non trouvé !");
  }
  // Affiche le bouton de connexion
  if (login) {
    login.style.display = "block";
  } else {
    console.error("Element .login non trouvé !");
  }
  // Masque le bouton de déconnexion
  if (logout) {
    logout.style.display = "none";
  } else {
    console.error("Element .logout non trouvé !");
  }
}

// Ajoutez des gestionnaires d'événements pour login et logout
if (login) {
  login.addEventListener("click", () => {
    window.sessionStorage.setItem("loged", "true");
    location.reload();
  });
} else {
  console.error("Element .login non trouvé pour ajouter l'événement !");
}

if (logout) {
  logout.addEventListener("click", () => {
    window.sessionStorage.removeItem("loged");
    window.location("login");
  });
} else {
  console.error("Element .logout non trouvé pour ajouter l'événement !");
}
