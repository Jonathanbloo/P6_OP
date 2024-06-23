

/** Les Variables **/


/* Fonction qui appel et retourne le tableau works en json */
async function getWorks(){
    const reponse = await fetch("http://localhost:5678/api/works")
    const projets = await reponse.json();

worksView(projets);
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
;
})
}
worksView();


/** Recuperation des categories pour notre filtre **/

async function getCategorys() { /* creation d'une function qui affiche les categories */
    const reponse = await fetch("http://localhost:5678/api/categories");
    const categorie = await reponse.json();
    const gallery = document.querySelector('.gallery');
    const Filtres = document.querySelector('.filtre');
    const btnTous = document.createElement('button');
    btnTous.innerText = "Tous";
    Filtres.appendChild(btnTous);
    btnTous.classList.add(".filtre__style")
    btnTous.addEventListener("click", function(){
        gallery.innerHTML="";
        getWorks();
    })
    for (let filtres of categorie) {
        const button = document.createElement('button');
        button.innerText = filtres.name;
        Filtres.appendChild(button);
        button.classList.add(".filtre__style")
        button.addEventListener("click", async function(){
            const reponse = await fetch("http://localhost:5678/api/works");
            const btnFiltres = await reponse.json();
            
            const filtre = btnFiltres.filter(function (btnFiltres){
                return btnFiltres.categoryId === filtres.id;
            })
            const gallery = document.querySelector('.gallery');
            gallery.innerHTML="";
            worksView(filtre);
        })
    }

}   
getCategorys();




/** Affichage de mes btn par catégories **/




/** Ajout du click qui permet de filtrer nos catégories **/



