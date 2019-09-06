const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
	modal.classList.add("hide");
});


fetch("https://kea-alt-del.dk/t5/api/categories")
	.then(function (response) {
		return response.json()
	}).then(function (data) {
		data.forEach(buildCategory)
		getProducts();

	})

function buildCategory(data) {
	const section = document.createElement("section");
	const header = document.createElement("h1");
	header.textContent = data;
	section.setAttribute("id", data);
	section.appendChild(header);
	document.querySelector("main").appendChild(section);
}

function getProducts() {
	fetch("https://kea-alt-del.dk/t5/api/productlist")
		.then(function (response) {
			return response.json()
		}).then(function (data) {
			data.forEach(showDish)
		})
}


function showDish(dish) {
	console.log(dish)
	const template = document.querySelector("template").content;
	const copy = template.cloneNode(true);
	copy.querySelector(".data_name").textContent = dish.name;
	copy.querySelector(".data_price").textContent = dish.price;

	copy.querySelector(".data_img").src = "img/small/" + dish.image + "-sm.jpg";



	//	copy.querySelector(".data_vegetarian").textContent = dish.vegetarian;



	if (dish.discount) {
		copy.querySelector(".data_price").classList.add("discount");
		//		calculate the new price WITH DISCOUNTS
		copy.querySelector(".data_discount").textContent = Math.round(dish.price - dish.discount / 100 * dish.price)
	} else {
		copy.querySelector(".data_discount").remove();
	}

	console.log("hey" + dish.soldout);
	if (dish.soldout) {
		//alert("hey");
		copy.querySelector(".soldOut").textContent = "SOLD OUT!!";
	} else {
		copy.querySelector(".soldOut").remove();
	}




	if (dish.vegetarian) {
		//alert("hey");
		copy.querySelector(".data_vegetarian").textContent = "VEGETARIAN!!";
	} else {
		copy.querySelector(".data_vegetarian").remove();
	}



	if (modal.vegetarian) {
		modal.querySelector(".modal-vegetarian").textContent = "VEGETARIAN!!";
	}







	copy.querySelector("button").addEventListener("click", () => {
		fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
			.then(res => res.json())
			.then(showDetails);
	});




	//	youtube modal toggle here
	//	copy.querySelector("button").addEventListener("click", toggleModal)

	document.querySelector(`#${dish.category}`).appendChild(copy);
}

function showDetails(data) {
	console.log(data)
	modal.querySelector(".modal-name").textContent = data.name;
	modal.querySelector(".modal-description").textContent = data.longdescription;
	modal.querySelector(".modal-price").textContent = data.price;
	modal.querySelector(".modal-image").src = "img/small/" + data.image + "-sm.jpg";
	let verdict = "Meat"
	if (data.vegetarian) {
		verdict = "Vegetarian"
	}
	modal.querySelector(".modal-vegetarian").textContent = verdict;

	modal.querySelector(".modal-allergens").textContent = data.allergens;

	modal.classList.remove("hide");
}

// YOUTUBE modal BELOW  !!!

//const toggleModal = () => {
//	console.log("toggle")
//	document.querySelector(".modal")
//		.classList.toggle("modal--hidden");
//
//}
//
//document.querySelector(`.modal`)
//	.addEventListener(`click`, toggleModal);
//
//document.querySelector("#learn-more")
//	.addEventListener(`submit`, (event) => {
//		event.preventDefault();
//		toggleModal();
//	});
//
//
