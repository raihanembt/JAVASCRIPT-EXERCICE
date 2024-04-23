function resetForm(){
    document.getElementById("annonceForm").reset();
}
function ValidForm(){
    var matricule = document.getElementById("matricule").Value;
    var marque = document.getElementById("marque").Value;
    // var modele = document.getElementById("modele").Value;
    var anneeProd = document.getElementById("cardurant").Value;
    var prix = document.getElementById("prix").Value;

    var matriculeRegex = /^[0-9]{1,8}-[A-Z]-[0-9]{1,2}$/;
    var marqueRegex = /^[a-zA-Z]{4,15}$/;
    var carburantRegex = /^[a-zA-Z]{4,15}$/;
    var prixRegex = /^[1-9]\d*$/;

    if(!matriculeRegex.test(matricule)||marqueRegex.test(marque)||carburantRegex.test(anneeProd) ||prixRegex.test(prix)){
        return false;
    }
    return true;
}
document.getElementById("btn-enregistrer").addEventListener("click",function enregistrerForm(){
    let voitures=[]
    if(ValidForm()){
        var matricule = document.getElementById("matricule").Value;
        var marque = document.getElementById("marque").Value;
        var modele = document.getElementById("modele").Value;
        var anneeProd = document.getElementById("cardurant").Value;
        var prix = document.getElementById("prix").Value;

        var voiture = {
            "Matricule": matricule,
            "Marque": marque,
            "Modèle": modele,
            "Année de Production": anneeProd,
            "Carburant": carburant,
            "Prix": prix
        };
        voitures.push(voiture)
        resetForm()
        alert("annonce enregistre")
    }else{
        alert("remplir les champs")
        document.body.style.background="orange"
    }
})
    