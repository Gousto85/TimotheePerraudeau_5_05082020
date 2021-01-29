let nbrLines = localStorage.getItem("incr");

//affiche "votre panier est vide" dans le tableau de la page
//si aucun article n'est présent
function affichVide(){
if(nbrLines == 0 || "null"){
    let vide = document.getElementById('basketList');
    vide.innerHTML = `
    <tr>
        <td colspan="3">Votre panier est vide</td>
    </tr>`}};
affichVide();

let panier = [];

//ajoute les articles présent dans le localstorage au tabeau "panier"
function createPanier(){
for (i = 1; i <= nbrLines; i++){
    let article = JSON.parse(localStorage.getItem(`article${i}`));
    panier.push(article);
}};
createPanier();
 console.log(panier);
localStorage.setItem('panier', JSON.stringify(panier));
let basket = "";
let total = 0;

//affiche les articles présent dans le tableau panier
//sur la page web en créant du contenu html personnalisé,
//affiche le total et l'enregistre dans le localstorage
function affichPanier(){
for (i=0; i<panier.length; i++){
    let designation = panier[i].designation;
    let prix = panier[i].prix;
    prix = prix/1000;
    
    let list = document.getElementById('basketList');
    basket = basket + `
    <tr>
        <td>${designation}</td>
        <td>${prix}0€</td>
        <td><img src="corbeille.svg" alt="logo supprimer article" onclick="supprimer('${i}')"></td>
    </tr>`
    list.innerHTML = basket;
    let nb2=parseFloat(prix);
    total = total +prix; 
    total = Math.round(total*100)/100;
    console.log(total);
    let Total = document.getElementById('total');
    Total.innerHTML = `Total: ${total}0€`;
    localStorage.setItem('total', total);
}};
affichPanier();

//supprime des articles du tableau panier
//et met à jour le localstorage
function supprimer(elt){
    panier.splice(elt, 1);
    console.log(panier);
    localStorage.clear();
    for(i=0; i<panier.length; i++){
        artSup = {
            designation: panier[i].designation,
            prix: panier[i].prix,
            id: panier[i].id
        }
        localStorage.setItem(`article${i+1}`, JSON.stringify(artSup));
    }
    nbrLines = nbrLines-1;
    localStorage.setItem('incr',nbrLines);
    history.go(0);
}


         

      




