let colors = ["#FF5722", "#410d9e", "#4CAF50", "#000000", "#03A9F4"];
let sizes = ["S", "M", "L", "XL"];

let products;
let data = [];

let currentUser = JSON.parse(localStorage.getItem("currentUsr"));
if (!currentUser) window.location.href = "../login/index.html";
else {
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
    products = products.map((item) => {
      item.color = colors.slice(Math.random() * 5);
      item.size = sizes.slice(Math.random() * 5);
      return item;
    });
    data = [...products];
    // console.log("local",products)
    renderProducts();
  } else {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        products = data.map((item) => {
          item.color = colors.slice(Math.random() * 5);
          item.size = sizes.slice(Math.random() * 5);
          return item;
        });
        localStorage.setItem("products", JSON.stringify(products));
      });
    data = [...products];
    // console.log("fetch",products)
    renderProducts();
  }
}

function renderProducts() {
  let Mens_Cloathing = document.getElementById("Mens_Cloathing");
  Mens_Cloathing.innerHTML = ``;
  let Womens_Cloating = document.getElementById("Womens_Cloating");
  Womens_Cloating.innerHTML = ``;
  let jewelery = document.getElementById("jewelery");
  jewelery.innerHTML = ``;
  let electronics = document.getElementById("electronics");
  electronics.innerHTML = ``;

  let cart = JSON.parse(localStorage.getItem("cart")?localStorage.getItem("cart"):"[]");

  products.map((item) => {
    let Item = document.createElement("div");
    Item.setAttribute("class", "item");
    Item.innerHTML = `
                 <img src=${item.image} alt="Item" />
              <div class="info">
              <h4>${item.title.length>40 ? item.title.slice(0,40)+"..." : item.title}</h4>
                <div class="row">
                  <div class="price">$${item.price}</div>
                  <div class="sized">${item.size.map((item) => item)}</div>
                </div>
                <div class="colors">
                  Colors:
                  <div class="row" style="display: flex; flex-wrap: wrap; align-items: center;">
                  ${item.color.map((clr) => {
                    return `<div class="circle" style="background-color: ${clr};"></div>`;
                  })}
                  </div>
                </div>
                <div class="row">Rating:${item.rating.rate}</div>
              </div>
              ${
                cart.includes(item.id) 
                  ? `<button style="color: black; background-color: white; border: 1px solid black;" id="delBtn${item.id}" onclick="delfromCart(${item.id})">Remove from Cart</button>`
                  : `<button id="addBtn${item.id}" onclick="addToCart(${item.id})">Add to Cart</button>`
              }
      `;
    if (item.category == "electronics") electronics.appendChild(Item);
    else if (item.category == "jewelery") jewelery.appendChild(Item);
    else if (item.category == "men's clothing")
      Mens_Cloathing.appendChild(Item);
    else Womens_Cloating.appendChild(Item);
  });
  products = [...data];
}

let filters = document.querySelectorAll(".filter");
let index;
filters.forEach((filter, idx) => {
  filter.addEventListener("click", () => {
    filter.classList.add("active");
    index = idx;
    removeActive();
    if (idx == 1)
      products = products.filter((item) => item.category == "men's clothing");
    else if (idx == 2)
      products = products.filter((item) => item.category == "women's clothing");
    else if (idx == 3)
      products = products.filter((item) => item.category == "jewelery");
    else if (idx == 4)
      products = products.filter((item) => item.category == "electronics");
    else {
    }
    renderProducts();
  });
});

function removeActive() {
  filters.forEach((filter, idx) => {
    if (index != idx) {
      filter.classList.remove("active");
    }
  });
}

// Add to Cart;
function addToCart(id) {
  if (localStorage.getItem("cart")) {
    let currCart = JSON.parse(localStorage.getItem("cart"), "[]");
    currCart.push(id);
    localStorage.setItem("cart", JSON.stringify(currCart));
  } else {
    localStorage.setItem("cart", JSON.stringify([id]));
  }
  renderProducts()
}
//remove from cart
function delfromCart(id) {

  if (localStorage.getItem("cart")) {
    let currCart = JSON.parse(localStorage.getItem("cart"));
    currCart = currCart.filter((item_id) => item_id != id);
    localStorage.setItem("cart", JSON.stringify(currCart));
  }
  renderProducts()
}
// color filter

let red = document.getElementById("red");
let blue = document.getElementById("blue");
let green = document.getElementById("green");
let black = document.getElementById("black");
let skyblue = document.getElementById("skyblue");

red.addEventListener("click", checkFilter);
blue.addEventListener("click", checkFilter);
green.addEventListener("click", checkFilter);
black.addEventListener("click", checkFilter);
skyblue.addEventListener("click", checkFilter);

function checkFilter() {
  if (red.checked) {
    products = products.filter((item) => item.color.includes("#FF5722"));
  }
  if (blue.checked) {
    products = products.filter((item) => item.color.includes("#410d9e"));
  }
  if (green.checked) {
    products = products.filter((item) => item.color.includes("#4CAF50"));
  }
  if (black.checked) {
    products = products.filter((item) => item.color.includes("#000000"));
  }
  if (skyblue.checked) {
    products = products.filter((item) => item.color.includes("#03A9F4"));
  }
  renderProducts();
}

//Size Filter

let sm = document.getElementById("s");
let md = document.getElementById("m");
let lg = document.getElementById("l");
let xl = document.getElementById("xl");

sm.addEventListener("click", sizefilter);
md.addEventListener("click", sizefilter);
lg.addEventListener("click", sizefilter);
xl.addEventListener("click", sizefilter);

function sizefilter() {
  if (sm.checked) {
    products = products.filter((item) => item.size.includes("S"));
  }
  if (md.checked) {
    products = products.filter((item) => item.size.includes("M"));
  }
  if (lg.checked) {
    products = products.filter((item) => item.size.includes("L"));
  }
  if (xl.checked) {
    products = products.filter((item) => item.size.includes("XL"));
  }
  renderProducts();
}

//price filter

let range0_25 = document.getElementById("0-25");
let range25_50 = document.getElementById("25-50");
let range50_100 = document.getElementById("50-100");
let range100_on = document.getElementById("100on");

range0_25.addEventListener("click", priceFilter);
range25_50.addEventListener("click", priceFilter);
range50_100.addEventListener("click", priceFilter);
range100_on.addEventListener("click", priceFilter);

function priceFilter() {
  if (range0_25.checked) {
    products = products.filter((item) => item.price > 0 && item.price <= 25);
  }
  if (range25_50.checked) {
    products = products.filter((item) => item.price >= 25 && item.price <= 50);
  }
  if (range50_100.checked) {
    products = products.filter((item) => item.price >= 50 && item.price <= 100);
  }
  if (range100_on.checked) {
    products = products.filter((item) => item.price >= 100);
  }
  renderProducts();
}

let range = document.getElementById("range");
range.addEventListener("click", () => {
  products = products.filter((item) => item.rating.rate >= range.value);
  renderProducts();
});

// search function

document.getElementById("search-input").addEventListener("input", () => {
  let search = document.getElementById("search-input").value.toLowerCase();

  products = products.filter((item) => {
    return item.title.toLowerCase().includes(search);
  });
  renderProducts();
});


let click = false;
document.getElementById("small-menu").addEventListener("click", () => {
   click = !click;
   document.getElementById("sm-items").style.display = click ? "flex" : "none";
});
let filter_click = false;
document.getElementById("filter").addEventListener("click", () => {
  filter_click = !filter_click;
  document.getElementById("filter-menu").style.display = filter_click ? "block" : "none";
})

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("currentUsr");
  window.location.href = "../login/index.html";
});