/*!
* Start Bootstrap - Shop Homepage v5.0.1 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

/**
 * Class for the Product
 * @author Practical IT <info@thepracticalit.com>
 */
class Product {
    constructor(id, title, price, image) {
        this.id = id;
        this.productPrice = price;
        this.productTitle = title;
        this.productImage = image;
        this.previousPrice = null;
        this.rating = 0;
    }

    get price() {
        return this.productPrice;
    }
    set price(product_price) {
       this.productPrice = product_price;
    }

    get image() {
        return this.productImage;
    }
    set image(path) {
        this.productImage = path;
    }

    get title() {
        return this.productTitle;
    }
    set title(product_title) {
        this.productTitle = product_title;
    }

    get prevPrice() {
        return this.previousPrice;
    }
    set prevPrice(prev_price) {
        this.previousPrice = prev_price
    }

    getRating() {
        return this.rating;
    }

    setRating(rate) {
        this.rating = rate;
    }
}

let peanut = new Product(6, "Peanuts", 14.05, "/assets/car.jpg");
peanut.prevPrice = 16.99;
peanut.setRating(2);

let cart = [];

//products database.
let products = [
    new Product(1, "Car", 25000, "/assets/products/car.jpg"),
    new Product(2, "Stroller", 250, "/assets/products/stroller.jpg"),
    new Product(3, "Table Cover", 2.90, "/assets/products/table_cover.jpg"),
    new Product(4, "Set of Lamps", 11.95, "/assets/products/set_of_lamps.jpg"),
    new Product(5, "Umbrella", 8.95, null),
    peanut,
    new Product(7, "Deodorant", 6.99, null),
    new Product(8, "Mechanical Drill", 122.75, null)
];

//load these in the storage.
localStorage.setItem("products", JSON.stringify(products));

//load products when the page is loading.
const loadProducts = () => {
    let product_cards = "";
    products.forEach( product => {
    product_cards += `<div class="col mb-5">
    <div class="card h-100">
        <!-- Sale badge-->
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${product.prevPrice ? "Sale" : ""}</div>
        <!-- Product image-->
        <img class="card-img-top" src="${product.image}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${product.title}</h5>`;
        if (product.getRating() > 0) {

                product_cards += `<!-- Product reviews-->
                <div class="d-flex justify-content-center small text-warning mb-2">`;

                product_cards += [...Array(product.getRating()).keys()].reduce(
                    (acc, index) => acc + `<div class="bi-star-fill"></div>`, `<div class="bi-star-fill"></div>`
                );
                
                product_cards += `</div>`;
        }
        product_cards += `<!-- Product price-->
                <span class="text-muted text-decoration-line-through">
                    ${product.prevPrice ? product.prevPrice : ""}
                </span>
                ${product.price}
                <div>
                    Quantity: <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a id="${'cart_'+product.id}" class="add-cart btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
        </div>
    </div>
</div>`
    });
    document.getElementById("content_holder").innerHTML = product_cards;
}

loadProducts();

//add to cart handler
document.addEventListener('click', function (event) {
    if (containsClass(event.target, 'add-cart')) {
        //get the id of the product
        let id = event.target.id.split('_')[1];
        let product = getProductById(id);
        if (product) {
            cart.push({product: product, quantity: 1});
            document.querySelector('.cart-counter').innerHTML = cart.length;
            console.log(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}, false);

function containsClass(element, className) {
    return element.className.split(' ').indexOf(className) > -1;
}

function getProductById(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find( product => product.id == id);
}

/**
 * Function to register member to the storage.
 * 
 * @param member 
 */
function registerMember(member) {
    //validate for values
    //get members first
    let members = JSON.parse(localStorage.getItem('members'));
    if (members) {
        //we got members then add it to the existing ones
        //validate for array here
    } else {
        members = [];
    }
    //check if member already exists by email (use other function for that.)
    members.push(member);
    //put back to the database
    localStorage.setItem('members', JSON.stringify(members));
    return true;
}

function setMessage(content, success=true) {
    let message = document.getElementById('message');
    message.innerHTML = content;
    message.classList.remove('alert-danger');
    message.classList.add('alert-success');
    if (!success) {
        message.classList.remove('alert-success');
        message.classList.add('alert-danger');
    }
}

function authenticateMember(member) {
    //get all the members first
    let members = JSON.parse(localStorage.getItem('members'));
    if (members) {
        let logged_member = members.find( m => m.email == member.email && m.password == member.password );
        if (logged_member) {
            return logged_member
        }
    }
    return false;
}
welcomeLoggedUser();
function welcomeLoggedUser() {
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member) {
        document.getElementById('logged_member').innerHTML = `Welcome ${logged_member.name} `;
    }
}