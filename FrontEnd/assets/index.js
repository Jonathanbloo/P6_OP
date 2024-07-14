

/** Les Variables **/
const gallery = document.querySelector(".gallery");
const filterSection = document.querySelector('.filtre');


/* Fonction qui appel et retourne le tableau works et categorie en json */
async function getWorks(){
    const response = await fetch("http://localhost:5678/api/works")
    return await response.json();
}
getWorks();

async function getCategorys(){
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

/**  affichage du works **/

async function worksView(filterId = 0){      /* creation d'une function qui affiche mes works */
    const arrayworks = await getWorks();    /* variable qui appelle pour tableau works json */
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = "";

    // Filtrer les travaux en fonction de l'ID de la catégorie
    const worksToDisplay = filterId === 0 ? arrayworks : arrayworks.filter(work => work.categoryId === filterId);


    worksToDisplay.forEach(element => {         /* foreach qui permet de rechercher mes elements dans mon tableau */
    const galleryImage = document.createElement('img');   /* variable qui cree un element image */
    galleryImage.src = element.imageUrl; /* permet d'aller chercher l'image depuis l'objet */
    galleryImage.classList.add('gallery');
    const galleryTitle = document.createElement('figurecaption'); /* variable qui cree un element figurecaption */
    galleryTitle.textContent = element.title;                 /* permet d'aller chercher le titre depuis l'objet */
    const galleryFigure = document.createElement('figure'); /* variable qui cree un une balise figure */
    galleryFigure.appendChild(galleryImage);  /* permet de mettre l'element image en enfant de figure */
    galleryFigure.appendChild(galleryTitle);  /* permet de mettre l'element figurecaption en enfant de figure */
    gallery.appendChild(galleryFigure);       /* permet de mettre l'element figure en enfant de la section gallery */

})
}
worksView();


/** Recuperation des categories pour notre filtre et filtre par categorie **/

async function displayFilters() {
    const filters = await getCategorys();
    filters.unshift({ id: 0, name: "Tous"}); //une catégorie spéciale avec id: 0 et name: "Tous" Ce filtre permet d'afficher tous les travaux sans filtrage.

    filters.forEach(filter => {
        const button = document.createElement("button"); // Pour chaque catégorie dans filters, on crée un bouton HTML.
        button.textContent = filter.name; // Le texte du bouton (button.textContent) est le nom de la catégorie (filter.name).
        filterSection.appendChild(button); // Le bouton est ajouté à une section de filtres (filterSection).
        button.classList.add('filtre__style');  // ajout d'une classe CSS (filtre__style) au bouton pour le styliser.

        button.addEventListener("click", async () => { //événement de clic est ajouté à chaque bouton.
            await worksView(filter.id);  //appelle worksView(filter.id), une fonction (non montrée ici) qui affiche les travaux correspondant à l'ID de la catégorie (filter.id)
            console.log(filters);
        });
        
    });
}
displayFilters();



/** Utilisateur Connecté pour modal **/
const loged = window.sessionStorage.getItem('loged');
const modeEdition = document.querySelector(".modal-container");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const modalPhoto = document.querySelector(".modal-photo");

if (loged === 'true') {
    // Affichage la div en mode édition
    if (modeEdition) {
        modeEdition.classList.add('modal-visible');
    } else {
        console.error("Element .modal-container non trouvé !");
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
        modalPhoto.style.display = 'block';
    } else {
        console.error("Element .modal-photo non trouvé !")
    }
} else {
    // Masque la div en mode édition
    if (modeEdition) {
        modeEdition.classList.remove('modal-visible');
    } else {
        console.error("Element .modal-container non trouvé !");
    }
    // Affiche le bouton de connexion
    if (login) {
        login.style.display = 'block';
    } else {
        console.error("Element .login non trouvé !");
    }
    // Masque le bouton de déconnexion
    if (logout) {
        logout.style.display = 'none';
    } else {
        console.error("Element .logout non trouvé !");
    }

}

// Ajoutez des gestionnaires d'événements pour login et logout
if (login) {
    login.addEventListener('click', () => {
        // Simulez une connexion en tant qu'admin (pour les tests)
        window.sessionStorage.setItem('loged', 'true');
        // Rechargez la page pour appliquer les changements
        location.reload();
    });
} else {
    console.error("Element .login non trouvé pour ajouter l'événement !");
}

if (logout) {
    logout.addEventListener('click', () => {
        window.sessionStorage.removeItem('loged');
        // Rechargez la page pour appliquer les changements
        location.reload();
    });
} else {
    console.error("Element .logout non trouvé pour ajouter l'événement !");
}


/*************************** Ajout du modal Galerie photo **************************/

const modifier = document.querySelector('.modifier')
const containerWrapper = document.querySelector('.modal-wrapper');
const modifierClose = document.querySelector(' .modal-wrapper .fa-x');


modifier.addEventListener('click', () => {
    console.log("modifier");
    containerWrapper.style.display = 'flex';
});
modifierClose.addEventListener('click', () => {
    containerWrapper.style.display = 'none';
});
