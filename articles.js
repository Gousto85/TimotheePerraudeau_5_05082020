//création d'un objet pour requete au serveur
let request = new XMLHttpRequest();
//fonction de vérification de l'état de la requete
request.onreadystatechange = function() {
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let response = JSON.parse(this.responseText);
        console.log(response);
//si la requete est abouti, création d'un objet par article
        let articles = '';
        for(i = 0; i<response.length; i++){
            let picture = response[i].imageUrl;
            let name = response[i].name;
            let price = response[i].price;
            let description = response[i].description;
            let lenses1 = response[i].lenses[0];
            let lenses2 = response[i].lenses[1];
            let lenses3 = response[i].lenses[2];
            let productId = response[i]._id;
            console.log(productId);
            //création d'un contenu html pour chaque article
            let article = document.getElementById('productList');
            articles = articles + `<tr>
                            <td><img src=\"${picture}\" alt=\"image article\"</td>
                            <td>${name}</td>
                            <td>${price/1000}0€</td>
                            <td ><a href=\"produit.html\"><button onclick=\"setData('${description}', '${picture}', '${lenses1}','${lenses2}','${lenses3}', '${name}', '${price}', '${productId}');\">Voir article</button></a></td>
                            </tr>`;
        //console.log(articles);
        article.innerHTML = articles;
        
        }    
    }else{console.log('requete en cours')}
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
//création d'une fonction qui envoi les éléments de l'article séléctionner. L'appel de cette fonction est effectuer au click (ligne 26) et les arguments personnalisés pour chaque article
function setData(description, image, lenses1, lenses2, lenses3, name, price, productId){
                sessionStorage.setItem('desc', description);
                sessionStorage.setItem('img', image);
                sessionStorage.setItem('lent1', lenses1);
                sessionStorage.setItem('lent2', lenses2);
                sessionStorage.setItem('lent3', lenses3);
                sessionStorage.setItem('nom', name);
                sessionStorage.setItem('prix', price);
                sessionStorage.setItem('id', productId);
         };

 //création d'une fonction qui affiche le nombre d'article présent dans le panier
function nbrArtPanier(){
let incr = localStorage.getItem('incr');
if(incr>=1){
let nbrArt = document.getElementById('nbre-art');
nbrArt.innerHTML = `
<div>${incr}</div>`;}
}
nbrArtPanier();
    
