
let loginBtn = document.getElementById("login-btn");
let signupBtn = document.getElementById("signup-btn");

loginBtn.addEventListener("click",()=>{
   window.location.href='/login/index.html'; 
})

signupBtn.addEventListener("click",()=>{
    window.location.href='/signup/index.html'; 
 })
let click = false;
document.getElementById("small-menu").addEventListener("click", () => {
   click = !click;
   document.getElementById("sm-items").style.display = click ? "flex" : "none";
});
