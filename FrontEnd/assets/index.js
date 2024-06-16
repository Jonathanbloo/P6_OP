

/** Les Variables **/

const gallery = document.querySelector('.gallery');
const filter = document.querySelector('.filtre');


/* Fonction qui appel et retourne le tableau works en json */
async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works")
    return await reponse.json();
}
getWorks();


/**  affichage du works **/

async function worksView(){      /* creation d'une function qui affiche mes works */
    const arrayworks = await getWorks();    /* variable qui appelle pour tableau works json */
    arrayworks.forEach(element => {         /* foreach qui permet de rechercher mes elements dans mon tableau */
    const galleryImage = document.createElement('img');   /* variable qui cree un element image */
    galleryImage.src = element.imageUrl;                    /* permet d'aller chercher l'image depuis l'objet */
    const galleryTitle = document.createElement('figurecaption'); /* variable qui cree un element figurecaption */
    galleryTitle.textContent = element.title;                 /* permet d'aller chercher le titre depuis l'objet */
    const galleryCategoryId = document.createElement('figure'); /* variable qui cree un une balise figure */
    galleryCategoryId.appendChild(galleryImage);  /* permet de mettre l'element image en enfant de figure */
    galleryCategoryId.appendChild(galleryTitle);  /* permet de mettre l'element figurecaption en enfant de figure */
    gallery.appendChild(galleryCategoryId);       /* permet de mettre l'element figure en enfant de la section gallery */
});
}
worksView();


/** Recuperation des categories pour notre filtre **/

async function getCategorys() { /* creation d'une function qui affiche les categories */
    const reponse = await fetch("http://localhost:5678/api/categories");
    return await reponse.json();
}
/** Affichage de mes btn par catégories **/

async function displayButtonCategorie() { /* creation d'une function qui affiche les boutons */
    const categories = await getCategorys(); //rappel de la fonction getCategorys
    categories.forEach(categorie => {        // recherche dans categories les elements 
        const btn = document.createElement("button");  // variable qui créé element <button>
        btn.textContent = categorie.name;     // btn contient du texte qui viens de mon tableau sous le nom "name" 
        btn.id = categorie.id;          // de meme que pour name mais pour id
        filter.appendChild(btn);        // mon btn est enfant de ma section filtre (permet de bien le placer)
        btn.classList.add('filtre__style'); // ajout de la class css filtre__style à mon btn
    });
}
displayButtonCategorie();

/** Ajout du click qui permet de filtrer nos catégories **/

async function btnClick() {
    const filter = await getWorks();
    console.log(filter);
    const buttons = document.querySelectorAll(".filtre button");
    buttons.forEach((button) => {
        button.addEventListener("click",(e)=>{
            console.log(coucou);
        btnId = e.target.id;
        gallery.innerHTML = "";
        });
    });
};

btnClick();
