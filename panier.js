

let nbrLines = localStorage.getItem("incr");
if(nbrLines == 0 || "null"){
    let vide = document.getElementById('basketList');
    vide.innerHTML = `
    <tr>
        <td colspan="3">Votre panier est vide</td>
    </tr>`

    let panier = [];
for (i = 1; i <= nbrLines; i++){
    let article = JSON.parse(localStorage.getItem(`article${i}`));
    panier.push(article);
}
console.log(panier);
localStorage.setItem('panier', JSON.stringify(panier));
let basket = "";
let total = 0;
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
}

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
}}


         

      




