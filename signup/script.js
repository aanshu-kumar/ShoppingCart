// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

document.addEventListener("DOMContentLoaded", () => {
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let error_msg = document.getElementById("errorMsg");
    error_msg.style.color = "red";
  
    document.getElementById("loginBtn").addEventListener("click", () => {
      if (
        fname.value == "" ||
        lname.value == "" ||
        email.value == "" ||
        password.value == "" ||
        confirmPassword.value == ""
      ) {
        error_msg.textContent = "Please enter all the details";
      } else if (password.value != confirmPassword.value) {
        error_msg.textContent = "Passwords donot match";
      } else {
        error_msg.textContent = "Creating account...";
        error_msg.style.color = "green";
        let Users = JSON.parse(localStorage.getItem("Users") ?? "[]");
  
        let filterUser = Users.filter((user) => user.email == email.value);
        console.log(filterUser);
        if (filterUser.length > 0) {
          error_msg.textContent = "User with this email already Exist!!";
          error_msg.style.color = "red";
        } else {
          Users.push({
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: password.value,
            createdAt: Date.now(),
          });
          localStorage.setItem("Users", JSON.stringify(Users));
          fname.value = "";
          lname.value = "";
          email.value = "";
          password.value = "";
          confirmPassword.value = "";
          window.location.href="/shop/index.html"
        }
      }
    });
  });
  