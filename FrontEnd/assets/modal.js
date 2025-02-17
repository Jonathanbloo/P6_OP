/*************************** Sélection des éléments **************************/

const modifier = document.querySelector(".modifier");
const containerWrapper = document.querySelector(".container-wrapper");
const modifierClose = document.querySelector(".container-wrapper .fa-x");
const modalImages = document.querySelector(".wrapper-images");
const buttonAjout = document.querySelector(".modal-content-button");
const modalPost = document.querySelector(".modal-post");
const modalContent = document.querySelector(".modal-content");
const modalContentClose = document.querySelector(".modal-post .fa-x");
const arrowLeft = document.querySelector(".modalpost-arrow");
const imgPreview = document.querySelector(".container-file img");
const fileInput = document.querySelector(".container-file input");
const fileLabel = document.querySelector(".container-file label");
const fileIcon = document.querySelector(".container-file .fa-image");
const fileParagraphe = document.querySelector(".container-file p");
const form = document.querySelector(".modal-post form");
const title = document.querySelector(".modal-post #title");
const categoryForm = document.querySelector(".modal-post #category");

/*************************** Gestion du modal **************************/

modifier.addEventListener("click", () => {
  containerWrapper.style.display = "flex";
});

modifierClose.addEventListener("click", closeModal);
containerWrapper.addEventListener("click", (e) => {
  if (e.target.className === "container-wrapper") {
    closeModal();
  }
});

function closeModal() {
  containerWrapper.style.display = "none";
  location.reload();
}

/*************************** Affichage de la galerie **************************/

async function displayGalleryModal() {
  modalImages.innerHTML = "";
  const gallery = await getWorks();

  const VisibleGallery = gallery.filter((objet) => objet.visible !== false);

  VisibleGallery.forEach((objet) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");

    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = objet.id;
    img.src = objet.imageUrl;
    img.classList.add("modal-img");

    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(img);
    modalImages.appendChild(figure);
  });

  attachDeleteEvent();
}

displayGalleryModal();

/*************************** Suppression des images **************************/

function getAuthToken() {
  return localStorage.getItem("token") || console.error("Token non disponible");
}

function attachDeleteEvent() {
  document.querySelectorAll(".fa-trash-can").forEach((trash) => {
    trash.addEventListener("click", async () => {
      const projectId = trash.id; // Récupérer l'id du projet
      await deleteImage(projectId);
    });
  });
}

async function deleteImage(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    displayGalleryModal();
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
  }
}

/*************************** Gestion de la modal Post **************************/

buttonAjout.addEventListener("click", () => {
  modalPost.style.display = "flex";
  modalContent.style.display = "none";
});

modalContentClose.addEventListener("click", closeModal);
arrowLeft.addEventListener("click", () => {
  modalPost.style.display = "none";
  modalContent.style.display = "flex";
});

/*************************** Aperçu de l'image sélectionnée **************************/

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  const fileParagraphe = document.getElementById("jpgmo");

  if (!file) return alert("Aucun fichier sélectionné.");
  if (!file.type.startsWith("image/"))
    return alert("Le fichier n'est pas une image.");

  const reader = new FileReader();
  reader.onload = function (e) {
    imgPreview.src = e.target.result;
    imgPreview.style.display = "block";
    fileLabel.style.display = "none";
    fileIcon.style.display = "none";
    fileParagraphe.style.display = "none";
  };
  reader.readAsDataURL(file);
});

/*************************** Ajout d'un post **************************/

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Réinitialisation des erreurs
  document.getElementById("title-error").textContent = "";
  document.getElementById("category-error").textContent = "";
  document.getElementById("file-error").textContent = "";

  let isValid = true;

  // Vérification du titre
  if (!title.value.trim()) {
    title.classList.add("error-input");
    title.placeholder = "Veuillez entrer un titre";
    document.getElementById("title-error").textContent = "Le titre est requis.";
    isValid = false;
  } else {
    title.classList.remove("error-input");
  }

  // Vérification de la catégorie
  if (!categoryForm.value.trim()) {
    document.getElementById("category-error").textContent =
      "Veuillez sélectionner une catégorie.";
    isValid = false;
  }

  // Vérification de l'image
  if (!fileInput.files[0]) {
    document.getElementById("file-error").textContent =
      "Veuillez sélectionner une image.";
    isValid = false;
  }

  if (!isValid) return; // Stoppe l'exécution si une erreur est détectée

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });

    if (!response.ok) throw new Error(response.statusText);
    displayGalleryModal();
  } catch (error) {
    console.error("Erreur de requête:", error);
  }
});

/*************************** Fonction pour le bouton valider **************************/

document.addEventListener("DOMContentLoaded", function () {
  const titleInput = document.getElementById("title");
  const categoryInput = document.getElementById("category");
  const fileInput = document.getElementById("file");
  const validateButton = document.getElementById("validate-button");

  function checkFields() {
    if (
      titleInput.value.trim() !== "" &&
      categoryInput.value.trim() !== "" &&
      fileInput.files.length > 0
    ) {
      validateButton.disabled = false; // Activer le bouton
      validateButton.classList.add("active"); // Ajouter la classe CSS active
    } else {
      validateButton.disabled = true; // Désactiver le bouton
      validateButton.classList.remove("active"); // Enlever la classe CSS active
    }
  }

  titleInput.addEventListener("input", checkFields);
  categoryInput.addEventListener("input", checkFields);
  fileInput.addEventListener("change", checkFields);
});

/*************************** Ajout des catégories **************************/

async function categoryAdd() {
  const select = document.querySelector(".modal-post select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Veuillez sélectionner une catégorie";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  const categories = await getCategorys();
  categories.forEach(({ id, name }) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    select.appendChild(option);
  });
}
categoryAdd();
