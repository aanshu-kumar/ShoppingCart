document.addEventListener("DOMContentLoaded", () => {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let error_msg = document.getElementById("error_msg");
  error_msg.style.color = "red";

  function generateToken()
  {
    let token=(Math.random()*1000).toString();
    return token;
  }
  document.getElementById("login").addEventListener("click", (e) => {
    if (email.value == "" || password.value == "") {
      error_msg.textContent = "Fill all the details";
    } else {
      let Users = JSON.parse(localStorage.getItem("Users") ?? "[]");
      if (Users.length > 0) {
        let user = Users.filter((item) => item.email == email.value);
        if (user.length > 0) {
          if (user[0].password == password.value) {
            error_msg.textContent = "Logging in...";
            error_msg.style.color = "green";
            localStorage.setItem("currentUsr", JSON.stringify({...user[0],token:generateToken()})) 
            localStorage.setItem("cart",JSON.stringify([]));

            window.location.href = "../shop/index.html";           
            email.value = "";
            password.value = "";
          } else {
            error_msg.textContent = "Password is incorrect";
          }
        } else {
          error_msg.textContent = "User donot Exist!! with this email.";
        }
      } else {
        error_msg.textContent = "User donot Exist!! Please signup.";
      }
    }
  });
});
