

let currentUser = JSON.parse(localStorage.getItem("currentUsr"));
let cartSection = document.getElementById("cart-section");
let products = JSON.parse(localStorage.getItem("products"));
let cartItem = []
let sum = 0;
if (!currentUser) window.location.href = "../login/index.html";
else{
    let cartSection = document.getElementById("cart-section");
    
    let cart = JSON.parse(localStorage.getItem("cart"))
    if(cart.length>0)
    {
        cartItem=cart;
        renderCart(cart);
    }
    else{
        cartSection.innerHTML = ``;
        cartSection.innerHTML = `<h2>Your Cart is Empty.</h2>`
    }
}

function renderCart(arr)
{
   
    let cart_products = products.filter((item)=>arr.includes(item.id))
    console.log(cart_products);
    let items = document.getElementById("items");
    cart_products.map((item,idx)=>{
        sum = sum + Number(item.price)
        console.log(sum)
        items.innerHTML += `
        <div id="product-card">
            <img src=${item.image}>
            <h2>${item.title}</h2>
            <p>$${item.price}</p>
            <button onclick="delfromCart(${item.id})" >Remove from Cart</button>
            </div>
        `
        document.getElementById("price-list").innerHTML +=`
         <li>
              <p>${idx+1} ${item.title}</p>
              <p>$${item.price}</p>
            </li>
        `
        
    })
    document.getElementById("price-total").textContent = sum;
}

function delfromCart(id){
    cartItem = cartItem.filter((item)=>item != id)
    localStorage.setItem("cart",JSON.stringify(cartItem));
     document.getElementById("items").innerHTML = ``;
     document.getElementById("price-list").innerHTML =``;
     sum=0;
    renderCart(cartItem)
}


document.getElementById("checkout-btn").onclick = function (e) {
    var options = {
      key: "rzp_test_28sXZ6PupFDQwx", // Enter the Key ID generated from the Dashboard
      amount: sum * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MeShop. Checkout",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#000",
      },
      image:
        "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    };
  
    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    // clear mycart - localStorage
    localStorage.setItem("cart",JSON.stringify([]))
    cartSection.innerHTML = ``;
    cartSection.innerHTML = `<h2>Your Cart is Empty.</h2>`
    // e.preventDefault();
  };
  
  let click = false;
document.getElementById("small-menu").addEventListener("click", () => {
   click = !click;
   document.getElementById("sm-items").style.display = click ? "flex" : "none";
});
