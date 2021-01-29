

let nameProd = sessionStorage.getItem('nom');
let pictProd = sessionStorage.getItem('img');
let lentille1 = sessionStorage.getItem('lent1');
let lentille2 = sessionStorage.getItem('lent2');
let lentille3 = sessionStorage.getItem('lent3');
let descProd = sessionStorage.getItem('desc');
let priceProd = sessionStorage.getItem('prix');
let productId = sessionStorage.getItem('id');
console.log(productId);

let titleProd = document.getElementById('name');
titleProd.innerHTML = nameProd;

let titlePage = document.querySelector('title');
titlePage.innerHTML = nameProd;

let presentPict = document.getElementById('image-produit');
presentPict.innerHTML = `<img src="${pictProd}" alt="image produit">`;

let txtProd = document.getElementById('desc-prod');
txtProd.innerHTML = `<strong>Description</strong> : ${descProd}`;

let lenseChoice = document.getElementById('choix-lent');
if(lentille2 === "undefined"){
    lenseChoice.innerHTML = `
    <option value"">choisir lentille</option>
    <option value="" >${lentille1}</option>`;
}else{ if(lentille3 === "undefined"){
    lenseChoice.innerHTML = `
    <option value"">choisir lentille</option>
    <option value="" >${lentille1}</ option> 
    <option value="" >${lentille2}</option> `
}else{
    lenseChoice.innerHTML = `
    <option value"">choisir lentille</option>
    <option value="" >${lentille1}</option>
    <option value="" >${lentille2}</option>
    <option value="" >${lentille3}</option>`
    }
}

function inputValid(){
    let input = document.getElementById('choix-lent');
    let valSelect = input.options[input.selectedIndex].value;
    let erreur = document.getElementById('invalid');
    if(valSelect == "choisir lentille"){
        erreur.innerHTML = "veuillez choisir une lentille"
    }else{
        erreur.innerHTML = "";
        ajoutPanier();
        alert("Votre produit a été ajouter au panier");
    }
}

let costProd = document.getElementById('prix');
costProd.innerHTML = `<strong>Prix: </strong>${priceProd/1000}0€`;

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
let incr = localStorage.getItem('incr');
if(incr>=1){
let nbrArt = document.getElementById('nbre-art');
nbrArt.innerHTML = `
<div>${incr}</div>`;}


