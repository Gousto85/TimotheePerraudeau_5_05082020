

let result = document.getElementById('page-validation');
let numero_commande = localStorage.getItem('renvoi');
let total = localStorage.getItem('total');
result.innerHTML = `Votre commande n° ${numero_commande} pour un total de ${total}0€ a bien été prise en compte. Nous vous remercions de votre confiance. À bientôt!`;


localStorage.clear();
sessionStorage.clear();