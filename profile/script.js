// Write your script here

document.addEventListener("DOMContentLoaded",()=>{
 let fname = document.getElementById("fname");
 let lname = document.getElementById("lname");
 let submit = document.getElementById("submit");
 let oldpassword = document.getElementById("oldpassword");
 let newpassword = document.getElementById("newpassword");
 let confirmpassword = document.getElementById("confirmpassword");
 let changePasswordBtn = document.getElementById("changePasswordBtn");
 let email = document.getElementById("email");
 let error_msg = document.getElementById("error_msg");
 let error_msg2 = document.getElementById("error_msg2");
 error_msg.style.color = "red";
 error_msg2.style.color = "red";

    let currentUser = JSON.parse(localStorage.getItem("currentUsr"));
    if(!currentUser)
    window.location.href = "../login/index.html";
    email.setAttribute("placeholder",currentUser.email)
    let Users = JSON.parse(localStorage.getItem("Users"));

    submit.addEventListener("click",()=>{
        if(fname.value=="" || lname.value=="")
            error_msg.textContent  = "Fill the First name and Last name"
        Users.forEach((user)=>{
            if(user.email == currentUser.email)
            {   
                user.fname = fname.value;
                user.lname = lname.value;
                currentUser = user;
                localStorage.setItem("currentUsr",JSON.stringify(user));
            }
            localStorage.setItem("Users", JSON.stringify(Users));
        })
    })

    changePasswordBtn.addEventListener("click",()=>{
    if(oldpassword.value == currentUser.password)
    {
        if(newpassword.value == confirmpassword.value)
        {
            Users.forEach((user)=>{
                if(user.email == currentUser.email)
                {   
                    user.password = newpassword.value;
                    currentUser = user;
                    localStorage.setItem("currentUsr",JSON.stringify(user));
                }
                localStorage.setItem("Users", JSON.stringify(Users));
            })
            error_msg2.textContent = "Passwords change Successfull";
            error_msg2.style.color = "green"
        }
        else{
            error_msg2.textContent = "Passwords donot match";
        }
    }
    else{
        error_msg2.textContent = "Old password is incorrect";
    }
    })
    
})