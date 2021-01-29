
//récupération des éléments de l'article séléctionné
//dans le sessionStorage
let nameProd = sessionStorage.getItem('nom');
let pictProd = sessionStorage.getItem('img');
let lentille1 = sessionStorage.getItem('lent1');
let lentille2 = sessionStorage.getItem('lent2');
let lentille3 = sessionStorage.getItem('lent3');
let descProd = sessionStorage.getItem('desc');
let priceProd = sessionStorage.getItem('prix');
let productId = sessionStorage.getItem('id');
console.log(productId);

//création du fonction qui vérifie la présence d'article
//à afficher et effectue un retour à la page d'accueil
//si ce n'est pas le cas
function ifArt(){
if(productId == null){
    setTimeout(function(){window.location = "index.html"}, 100); 
}
}ifArt();

//création d'une fonction qui affiche les éléments de l'article
//séléctionner sur la page client
function affichArt(){
let titleProd = document.getElementById('name');
titleProd.innerHTML = nameProd;
console.log(titleProd);

let titlePage = document.querySelector('title');
titlePage.innerHTML = nameProd;
console.log(titlePage);

let presentPict = document.getElementById('image-produit');
presentPict.innerHTML = `<img src="${pictProd}" alt="image produit">`;
console.log(presentPict);

let txtProd = document.getElementById('desc-prod');
txtProd.innerHTML = `<strong>Description</strong> : ${descProd}`;
console.log(txtProd);

//création des options de choix de lentille en html
let lenseChoice = document.getElementById('choix-lent');
if(lentille2 === "undefined"){
    lenseChoice.innerHTML = `
    <option >choisir lentille</option>
    <option value="" >${lentille1}</option>`;
}else{ if(lentille3 === "undefined"){
    lenseChoice.innerHTML = `
    <option >choisir lentille</option>
    <option value="" >${lentille1}</ option> 
    <option value="" >${lentille2}</option> `
}else{
    lenseChoice.innerHTML = `
    <option >choisir lentille</option>
    <option value="" >${lentille1}</option>
    <option value="" >${lentille2}</option>
    <option value="" >${lentille3}</option>`
    }console.log(lenseChoice);
}
}
affichArt();


//vérifie qu'un choix de lentille a bien été séléctionné
//par l'utilisateur
function inputValid(){
    let input = document.getElementById('choix-lent');
    let valSelect = input.options[input.selectedIndex].value;
    let erreur = document.getElementById('invalid');
    if(valSelect == "choisir lentille"){
        erreur.innerHTML = "veuillez choisir une lentille";
    }else{
        erreur.innerHTML = "";
        ajoutPanier();
        alert("Votre produit a été ajouter au panier");
    }
}

let costProd = document.getElementById('prix');
costProd.innerHTML = `<strong>Prix: </strong>${priceProd/1000}0€`;

//incrémente un élément "incr" dans le localStorage
//à chaque click sur "ajouter au panier", créé un objet
// correspondant à l'article à ajouter puis l'ajoute
//au localStorage
function ajoutPanier(){
    let i = localStorage.getItem('incr');
    i++;
    if(i>=1){
        let nbrArt = document.getElementById('nbre-art');
        nbrArt.innerHTML = `
        <div>${i}</div>`
    }
    localStorage.setItem('incr', i);
    let artSup = {
        designation: nameProd,
        prix: priceProd,
        id: productId
    };
    localStorage.setItem(`article${i}`, JSON.stringify(artSup));
}

//création d'une fonction 
//qui affiche le nombre d'article présent dans le panier
function nbrArtPanier(){
let incr = localStorage.getItem('incr');
if(incr>=1){
let nbrArt = document.getElementById('nbre-art');
nbrArt.innerHTML = `
<div>${incr}</div>`;}
}
nbrArtPanier();