let productContainer;

if (localStorage.getItem('productsData') == null) {
	productContainer = [];
} else {
	productContainer = JSON.parse(localStorage.getItem('productsData', productContainer));
	displayProducts();
}

function addProduct() {
	let productName = document.getElementById('productNameInp').value,
		productPrice = document.getElementById('productPriceInp').value,
		productBrand = document.getElementById('productBrandInp').value,
		productDesc = document.getElementById('productDescInp').value;

	if (validation(productName) == true) {
		let product = {
			name: productName,
			price: productPrice,
			brand: productBrand,
			desc: productDesc
		};

		productContainer.push(product);

		localStorage.setItem('productsData', JSON.stringify(productContainer));

		displayProducts();
	}else {
		document.getElementById("alertName").style.display = "block";
	}
}

function displayProducts() {
	let temp = ``;

	for (let i = 0; i < productContainer.length; i++) {
		temp += `<div class="col-md-3">
							<div class="product mb-4">
								<img src="stock..jpg" class="img-fluid">
								<h4 class="pt-3">${productContainer[i].name}<span class="badge badge-primary ml-4">
								${productContainer[i].brand}</span> </h4>
								<p class="lead">${productContainer[i].desc}</p>
								<div class="price">${productContainer[i].price} $</div>
								<button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
								<button onclick="updateProduct(${i})" class="btn btn-outline-warning btn-sm">Update</button>
							</div>
						</div>`;
	}

	document.getElementById('productsRow').innerHTML = temp;
}

function searchProducts(term) {
	let temp = ``;

	for (let i = 0; i < productContainer.length; i++) {
		if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
			temp += `<div class="col-md-4">
								<div class="product">
									<img src="stock..jpg" class="img-fluid">
									<h4 class="pt-3">${productContainer[i].name}<span class="badge badge-primary ml-4">
									${productContainer[i].brand}</span> </h4>
									<p class="lead">${productContainer[i].desc}</p>
									<div class="price">${productContainer[i].price} $</div>
									<button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
									<button onclick="updateProduct(${i})" class="btn btn-outline-warning btn-sm">Update</button>
								</div>
							</div>`;
		}
	}
	document.getElementById('productsRow').innerHTML = temp;
}

function deleteProduct(index) {
	productContainer.splice(index, 1);

	localStorage.setItem('productsData', JSON.stringify(productContainer));
	displayProducts();
}

function validation(productName) {
	let nameReg = /^[A-z]{4,8}$/gi;

	if (nameReg.test(productName) == false) {
		return false;
	} else {
		return true;
	}
}
