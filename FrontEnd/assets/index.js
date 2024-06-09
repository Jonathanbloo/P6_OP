async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works"); /* Await permet d'attendre que fetch lise completement api works  */
    console.log(reponse);
}
getWorks();