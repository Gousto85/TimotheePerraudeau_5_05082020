

let result = document.getElementById('page-validation');
let numero_commande = localStorage.getItem('renvoi');
result.innerHTML = `Votre commande n° ${numero_commande} à bien été prise en compte. Nous vous remercions de votre confiance. À bientôt!`;


localStorage.clear();
sessionStorage.clear();