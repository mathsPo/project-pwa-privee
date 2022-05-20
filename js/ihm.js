const modelsContainer = document.querySelector("section.models");
const spinner = document.getElementById("spin");
const buttonAdd = document.getElementById("bb");
const trash = document.getElementsByTagName("trash");
const visual = document.querySelector("section.visualisation");
const mv = document.querySelector("div.model-viewer")

/**
 * fonction qui lit les fichiers selectionnés par l'input de type file et qui creer l'element HTML article
 */
 const result = document.getElementById('detail-files');
 document.getElementById('file-selector').addEventListener('change', (event) => {

     for(const file of event.target.files){
         appendModelHtml(file);
     }
 });

/**
 * Ajout d'un spinner au chargement de la page
 */
function startSpinner(){
    spinner.classList.remove('hidden');
}

/**
 * Suppression du spinner
 */
function stopSpinner(){
    window.setTimeout(function(){
        spinner.classList.add('hidden');
    }, 300)

}

/** 
 * Affiche un message d'erreur si aucune donnée n'a pu etre recup
 * @param error
 * @returns {null}
 */
function showErrorMessage(error){
    error = 'Aucune donnée n\'a pu etre recuperé sur le reseaux, affichage des données contenue dans le cache';
    return alert(error);
}

/**
 * Après le chargement de la page, activation et desactivation du spinner
 */
window.addEventListener('load', () => {
    startSpinner();
    stopSpinner();

});

/**
 * Ajout d'un modele dans la page web
 * @param file à ajouter dans la page web
 */
function appendModelHtml(file) {
    //Creation de l'element HTML qui va contenir le modele
    const article = document.createElement('article');
    const span = document.createElement('span');
    //Ajout du nom du fichier dans l'element HTML span
    span.innerText = file.name;
    article.appendChild(span);
    //Ajout d'un aid a l'article
    article.id = 'article' + file.name;

    //appelle de la fonction createTrashButton pour ajouter les boutons à l'article 
    article.appendChild(createTrashButton(file));

    //Ajout de l'article a la page web
    modelsContainer.appendChild(article);
}

/**
 * Supprime tous les articles du DIV modelsContainer
 */
function clearModel() {
    emptyElement(modelsContainer);
}

/**
 * Ajout de la poubelle et du bouton RA dans l'article
 * @param file à ajouter dans la page web
 */
function createTrashButton(file) {
    // Creation du bouton de RA 
    const va_icon = document.createElement('button');
    va_icon.type = 'button';
    va_icon.name = 'va';
    va_icon.classList.add('va');
    const span = document.createElement('span');
    span.classList.add('material-icons');
    span.innerHTML = 'view_in_ar';
    va_icon.appendChild(span); 

    // Creation du bouton poubelle 
    const del = document.createElement('button');
    del.type = 'button';
    del.name = 'del';
    del.classList.add('del')
    const span2 = document.createElement('span');
    span2.classList.add('material-icons');
    span2.innerHTML = 'delete';
    del.appendChild(span2);

    // Creation du div contenant les options de manipulation (poubelle et RA) 
    const div = document.createElement('div');
    div.type = 'container';
    div.appendChild(va_icon);
    div.appendChild(del); 

    // L'action que produit le bouton de RA, declenchant une preview du model en question
    va_icon.onclick=(event) => {
        while (visual.firstChild) {
            visual.removeChild(visual.firstChild);
        }
        h2 = document.createElement('h2');
        h2.textContent = "Modele de " + file.name;
        mv.innerHTML = `<model-viewer class='image' id='modelv' src='Redmi Note 9 Pro/Documents/modeles/${file.name}' shadow-intensity='1' ar ar-modes='webxr scene-viewer quick-look' camera-controls min-camera-orbit='auto auto 100%' max-camera-orbit='auto auto 100%' min-field-of-view='45deg' max-field-of-view='45deg' environment-image='neutral' auto-rotate autoplay></model-viewer>`
        visual.appendChild(h2)  
        event.stopPropagation(); 
    };

    // L'action que produit le bouton de la poubelle, appelle de la fonction deleteModel
    del.onclick=(event) => {
        deleteModel(file.name, event);
        event.stopPropagation();
    };
   
    return div;
}

/**
 * Suppression d'un modele identifié par son nom dans la page web
 * @param name du model à supprimer
 */
 function deleteModel(name) {
    startSpinner();
    console.log('Delete model ' + name + ' request');
    const article = document.getElementById('article' + name);
    modelsContainer.removeChild(article);

    console.log("successfully deleted");
    stopSpinner();
}