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
   } catch (e) {console.log(e)};
}

async function validation(){
   await createContact();
    await getProductId(); 
    return getPromise();}




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
    
        if(nbrLines == null || 0){
            erreur = "Votre panier est vide"
        }
        if(!tel.value){
            erreur = "Veuillez renseigner un numéro de téléphone!"
        }
        if(validTel.test(tel.value) == false){
            erreur = "Format de saisie incorrect. Veillez saisir un numéro de téléphone!"
        }
        if(!city.value){
            erreur = "veuillez renseigner votre ville!"
        }
        if(!codePostal.value){
            erreur = "Veuillez renseigner votre code postal!"
        }
        if(validCp.test(codePostal.value) == false){
            erreur = "Format de saisie incorrect. Veillez saisir un code postal!";
        }
        if(!address.value){
            erreur = "Veuillez renseigner votre adresse!"
        }
        if(!birth.value){
            erreur = "Veuillez renseigner votre date de naissance!"
        }
        if(!email.value){
            erreur = "Veuillez renseigner votre email!"
        }
        if(validEmail.test(email.value) == false){
            erreur = "Format de saisie incorrect. Veillez renseigner une adresse mail valid "
        }
        if(!lastName.value){
            erreur = "Veuillez renseigner votre prénom"
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
    
    
