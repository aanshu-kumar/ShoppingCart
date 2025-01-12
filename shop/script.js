// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

let colors = ["#03A9F4","#FF5722","#0f8182","#4CAF50","#410d9e"];
let sizes = ["XS","S","M","L","XL"];

let products;
let data=[];

let currentUser = JSON.parse(localStorage.getItem("currentUsr"));
if(!currentUser)
window.location.href = "../login/index.html";
else{
  if(localStorage.getItem("products"))
  {
    products = JSON.parse(localStorage.getItem("products"));
    products = products.map((item)=>{
      item.color = colors.slice(Math.random()*5);
      item.size = sizes.slice(Math.random()*5);
      return item;
    })
    data = [...products];
    renderProducts()
  }
  else{
  fetch("https://fakestoreapi.com/products").then((res)=> res.json()).then((data)=>{
     products = data.map((item)=>{
      item.color = colors.slice(Math.random()*5);
      item.size = sizes.slice(Math.random()*5);
      return item;
    })
    localStorage.setItem("products",JSON.stringify(products));
  })
  renderProducts()
  data = [...products];
}
}


  
  function renderProducts()
  {
    let Mens_Cloathing = document.getElementById("Mens_Cloathing");
    Mens_Cloathing.innerHTML = ``;
    let Womens_Cloating = document.getElementById("Womens_Cloating");
    Womens_Cloating.innerHTML = ``;
    let jewelery = document.getElementById("jewelery");
    jewelery.innerHTML = ``;
    let electronics = document.getElementById("electronics");
    electronics.innerHTML = ``;

    products.map((item)=>{
      let Item = document.createElement("div");
      Item.setAttribute("class","item");
      Item.innerHTML = `
                 <img src=${item.image} alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="price">$${item.price}</div>
                  <div class="sized">${item.size.map((item)=> item)}</div>
                </div>
                <div class="colors">
                  Colors:
                  <div class="row">
                  ${item.color.map((clr)=>{
                    return `<div class="circle" style="background-color: ${clr}"></div>`
                  })}
                  </div>
                </div>
                <div class="row">Rating:</div>
              </div>
              <button id="addBtn">Add to Cart</button>
      `
      if(item.category == "electronics")
      electronics.appendChild(Item);
    else if(item.category == "jewelery")
      jewelery.appendChild(Item);
    else if( item.category == "men's clothing")
      Mens_Cloathing.appendChild(Item);
    else
    Womens_Cloating.appendChild(Item);
    })
    products = [...data];
  }

  let filters = document.querySelectorAll(".filter");
  let index;
    filters.forEach((filter,idx)=>{
    filter.addEventListener("click",()=>{
      filter.classList.add("active");
      index = idx;
      removeActive();
      if(idx==1)
      products = products.filter((item)=>item.category=="men's clothing");
      else if(idx==2)
        products = products.filter((item)=>item.category=="women's clothing");
      else if(idx==3)
        products = products.filter((item)=>item.category=="jewelery");
      else if(idx==4)
        products = products.filter((item)=>item.category=="electronics");
      else{}
      renderProducts();

    })
  })

  function removeActive()
  {
    filters.forEach((filter,idx)=>{
      if(index !=idx)
      {
        filter.classList.remove("active");
      }
    })
  }
  