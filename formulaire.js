
//créé l'objet contact
async function createContact(){
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let mail = document.getElementById('mail').value;
    let date = document.getElementById('date').value;
    let adresse = document.getElementById('adresse').value;
    let complement = document.getElementById('complement').value;
    let codePostal = document.getElementById('code-postal').value;
    let ville = document.getElementById('ville').value;
    let tel = document.getElementById('tel').value;
    let contact = {
        firstName: nom,
        lastName: prenom,
        address: adresse,
        city: ville,
        email: mail
    };
    sessionStorage.setItem('contact',JSON.stringify(contact));
    console.log(contact);
}

//créé le tableau products
async function getProductId(){
    let produits = JSON.parse(localStorage.getItem(`panier`));
    let products = [];
    console.log(products);
    for(i=0; i<produits.length; i++){
        let product_id = produits[i].id;
        products.push((product_id));
    };
    sessionStorage.setItem('products', JSON.stringify(products));
    console.log(products);
}


//envoie une requete de type POST au serveur,
//recoit la réponse, l'enregistre dans le localstorage,
//ouvre la page de validation de commande et indique
//si une erreur à eu lieu 
async function getPromise() {   
    try{
    let contact = JSON.parse(sessionStorage.getItem('contact'));
    let products = JSON.parse(sessionStorage.getItem('products'));
    fetch('http://localhost:3000/api/cameras/order', {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            contact,
            products,
        }),
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{console.log('pas de réponse du serveur')}
    }).then(data =>
        localStorage.setItem('renvoi', data.orderId),
        setTimeout(function(){window.location = "validation.html"}, 100) );
   } catch (e) {console.log("requète non aboutie" + e)};
}

//s'assure que l'objet et le tableau à envoyer au serveur
//on bien été créé avant de les envoyer au serveur
async function validation(){
   await createContact();
    await getProductId(); 
    return getPromise();}


//Vérifie le contenu des champs du formulaire
//avant de les valider
function valChamps(){
    document.getElementById('formulaire').addEventListener("submit", function(e){
        e.preventDefault();
        let erreur;
        
        let firstName = document.getElementById('nom');
        let lastName = document.getElementById('prenom');
        let email = document.getElementById('mail');
        let birth = document.getElementById('date');
        let address = document.getElementById('adresse');
        let complement = document.getElementById('complement');
        let codePostal = document.getElementById('code-postal');
        let city = document.getElementById('ville');
        let tel = document.getElementById('tel');
    
        let validTel = /^[0-9]{10}$/;
        let validCp = /^[0-9]{5}$/;
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let validTxt = /^(.|\n|\r|\n\r){3,}$/;
        let validDate = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
        ;
        let validAddress = /^(.|\n|\r|\n\r|0-9){3,}$/;
    

        if(nbrLines == "null" || 0){
            erreur = "Votre panier est vide"
        }
        if(validTel.test(tel.value) == false){
            erreur = "Format de saisie incorrect. Veillez saisir un numéro de téléphone!"
        }
        if(!tel.value){
            erreur = "Veuillez renseigner un numéro de téléphone!"
        }
        
        if(validTxt.test(city.value) == false){
            erreur = "Format de saisie incorrect. Veuillez saisir votre ville"
        }
        if(!city.value){
            erreur = "veuillez renseigner votre ville!"
        }
        
        if(validCp.test(codePostal.value) == false){
            erreur = "Format de saisie incorrect. Veillez saisir un code postal!";
        }
        if(!codePostal.value){
            erreur = "Veuillez renseigner votre code postal!"
        }
        
        if(validAddress.test(address.value) == false){
            erreur = "Format de saisie incorrect. Veuillez saisir une adresse!"
        }
        if(!address.value){
            erreur = "Veuillez renseigner votre adresse!"
        }
        
        if(validDate.test(birth.value) == false){
            erreur = "Format de saisie incorrect. Veuillez saisir une date!"
        }
        if(!birth.value){
            erreur = "Veuillez renseigner votre date de naissance!"
        }
        
        if(validEmail.test(email.value) == false){
            erreur = "Format de saisie incorrect. Veillez renseigner une adresse mail valid "
        }
        if(!email.value){
            erreur = "Veuillez renseigner votre email!"
        }
        
        if(validTxt.test(lastName.value) == false){
            erreur = "Format de saisie incorrect. Veuillez saisir votre prénom!"
        }
        if(!lastName.value){
            erreur = "Veuillez renseigner votre prénom"
        }
        
        if(validTxt.test(firstName.value) == false){
            erreur = "Format de saisie incorrect. Veuillez saisir votre nom!"
        }
        if(!firstName.value){
            erreur = "Veuillez renseigner votre Nom!"
        }
        
        if(erreur){
            //e.preventDefault();
            document.getElementById('invalid').innerHTML = erreur;
        }
        else{
            validation();
        }
    
    
    })
}
valChamps();


    
