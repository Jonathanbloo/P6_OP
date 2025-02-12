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

  gallery.forEach((objet) => {
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
      await deleteImage(trash.id);
      displayGalleryModal();
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

  if (!title.value.trim()) return alert("Le champ titre est requis.");
  if (!categoryForm.value.trim())
    return alert("Veuillez sélectionner une catégorie.");
  if (!fileInput.files[0]) return alert("Veuillez sélectionner une catégorie.");

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

/*************************** Ajout des catégories **************************/

async function categoryAdd() {
  const select = document.querySelector(".modal-post select");
  const categories = await getCategorys();
  categories.forEach(({ id, name }) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    select.appendChild(option);
  });
}
categoryAdd();
