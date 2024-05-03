document.addEventListener("DOMContentLoaded",chargement);
function chargement(){
    let categorie;
    const request = new XMLHttpRequest();
    request.open("GET","index.json",true);
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let responseData = JSON.parse(this.responseText);
            categorie= responseData.categorie;
            console.log(categorie)
            let categorieOption ;
            for(let i = 0 ; i < categorie.length ; i++){
               categorieOption += `<option value =" ${categorie[i].titre}" >${categorie[i].titre} </option> `
            }
            document.getElementById("category").innerHTML = categorieOption;
        }
    }
    request.send();
}
class Produit {
    constructor(code, title, description, price, category) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}
const produit1 = new Produit(1, "Produit 1", "Description produit 1", 10, "Catégorie 1");
const produit2 = new Produit(2, "Produit 2", "Description produit 2", 20, "Catégorie 2");
const products = [produit1, produit2];

const tbody = document.querySelector('tbody');
const productForm = document.getElementById('productForm');
const btnCancel = document.getElementById('btnCancel');
const btnClear = document.getElementById('btnClear');
const btnAdd = document.getElementById('btnAdd');
const btnCategories = document.getElementById('btnCategories');
const codeInput = document.getElementById('code');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');
const categoryInput = document.getElementById('category');

function displayProducts() {
    tbody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
        `;
        tbody.appendChild(row);
    });
}
function addProduct(e) {
    e.preventDefault();
    const code = parseInt(codeInput.value);
    const title = titleInput.value;
    const description = descriptionInput.value;
    const price = parseFloat(priceInput.value);
    const category = categoryInput.value;

    if (!isValidProduct(code, title, description, price, category)) {
        alert('Veuillez remplir correctement tous les champs.');
        return;
    }

    const newProduct = new Produit(code, title, description, price, category);
    products.push(newProduct);
    displayProducts();
    productForm.reset();
    hideForm();
}
function isValidProduct(code, title, description, price, category) {
    return !isNaN(code) && title.trim() !== '' && description.trim() !== '' && !isNaN(price) && category.trim() !== '' && !products.some(product => product.code === code);
}
function showForm() {
    productForm.classList.remove('hidden');
}
function hideForm() {
    productForm.classList.add('hidden');
}
function deleteSelectedProducts() {
    const selectedRows = document.querySelectorAll('tr.selected');
    if (selectedRows.length === 0) {
        alert('Veuillez sélectionner au moins un produit à supprimer.');
        return;
    }

    if (confirm('Voulez-vous vraiment supprimer le(s) produit(s) sélectionné(s) ?')) {
        selectedRows.forEach(row => {
            const code = parseInt(row.cells[0].textContent);
            products.splice(products.findIndex(product => product.code === code), 1);
            row.remove();
        });
    }
}

function selectRow(e) {
    const row = e.target.parentNode;
    if (row.tagName.toLowerCase() === 'tr') {
        row.classList.toggle('selected');
    }
}
function clearForm() {
    productForm.reset();
}
btnAdd.addEventListener('click', showForm);
btnCancel.addEventListener('click', hideForm);
btnClear.addEventListener('click', clearForm);
tbody.addEventListener('click', selectRow);
document.getElementById('productForm').addEventListener('submit', addProduct);
document.getElementById('btnSupp').addEventListener('click', deleteSelectedProducts);

displayProducts();
