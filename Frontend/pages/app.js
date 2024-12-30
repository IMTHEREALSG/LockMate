const url = "https://lockmate-4omt.onrender.com";

function showAlert(message, type = "success", duration = 1000) {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.style.position = "fixed";
  alert.style.top = "10%";
  alert.style.left = "50%";
  alert.style.transform = "translateX(-50%)";
  alert.style.padding = "10px";
  alert.style.borderRadius = "5px";
  alert.style.backgroundColor = type === "success" ? "green" : "red";
  alert.style.color = "white";
  alert.style.zIndex = "1000";
  alert.style.color = "white";
  document.body.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, duration);
}

function toggleVisibility() {
  const passwordInput = document.getElementById("password");
  const visibilitybtn = document.getElementById("toggle-icon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    visibilitybtn.innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    passwordInput.type = "password";
    visibilitybtn.innerHTML = `<i class="fas fa-eye"></i>`;
  }
}

document
  .getElementById("signup-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const MobNum = document.getElementById("mobile_no").value;
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_no: MobNum,
          username,
          password,
        }),
      });

      if (response.status == 201) {
        showAlert("Signup Successful!", "success", 1000);
        setTimeout(() => {
          window.location.href = "signin.html";
        }, 1000);
      } else {
        const data = await response.json();
        const message =
          response.status === 400 &&
          data?.message?.toLowerCase().includes("user already exists")
            ? "User already exists. Please try a different username."
            : response.status === 400
            ? "Invalid request. Please check your input."
            : "Server error. Please try again later.";
        showAlert(data.message || message, "error");
      }
    } catch (error) {
      showAlert("Server error. Please try again later.", "error");
    }
  });

document.getElementById("loginform")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("Username").value;
  const password = document.getElementById("Password").value;
  try {
    const response = await fetch(`${url}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });

    if (response.status == 200) {
      const data = await response.json();
      localStorage.setItem("username", username);
      showAlert("Login Successful!", "success", 1000);
      setTimeout(() => {
        window.location.href = "Main.html";
      }, 1000);
    } else {
      const data = await response.json();
      const message =
        response.status === 400 &&
        data?.message?.toLowerCase().includes("invalid username or password")
          ? "Invalid username or password. Please try again."
          : response.status === 400
          ? "Invalid request. Please check your input."
          : "Server error. Please try again later.";
      showAlert(data.message || message, "error");
    }
  } catch (error) {
    showAlert("Server error. Please try again later.", "error");
  }
});

let storedname = localStorage.getItem("username");
const heading = document.getElementById("dashname");
console.log(heading);
if (heading) {
  if (storedname) {
    heading.innerHTML = `Hello ${storedname.split("@")[0]}👋 Your Dashboard `;
  } else {
    heading.innerHTML = `Hello User👋 Your Dashboard `;
  }
}

document
  .getElementById("password-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passname = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    try {
      const response = await fetch(`${url}/password/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pname:passname,
          pword:password,
        }),
        credentials: "include",
      });
      if (response.status === 201) {
        const data = await response.json();
        addPasswordToUI(data);
        document.getElementById("password-form").reset();
      } else {
        const data = await response.json();
        showAlert(data.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  });

 async function getPasswords() {
    const currentPage = window.location.pathname;
  
    if (currentPage.includes("Main") && !localStorage.getItem("username")) {
      window.location.href = "signin.html";
      return;
    }
   if(currentPage.includes("Main")) {
    try {
      const response = await fetch(`${url}/password`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        const list = document.getElementById("password-list");
        list.innerHTML = ""; 
        data.forEach((item) => {
          addPasswordToUI(item);
        });
      } else {
        showAlert("Failed to fetch passwords", "error");
      }
    } catch (error) {
      showAlert("Network error", "error");
    }
  }
}
  
  function addPasswordToUI(data) {
    const list = document.getElementById("password-list");
    const item = document.createElement("li");
    item.classList.add(
      "mb-1",
      "bg-black",
      "text-white",
      "p-3",
      "rounded", 
      "flex", 
      "justify-between",
      "items-center"
    );
    item.dataset.id = data.id;
  
    const decryptbtn = document.createElement("button");
    decryptbtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
    decryptbtn.classList.add(
      "text-white",
      "hover:text-red-400",
      "transition",
      "duration-300"
    );
  
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deletebtn.classList.add(
      "text-white",
      "hover:text-red-400",
      "transition",
      "duration-300"
    );
  
    const content = document.createElement("div");
    content.innerHTML = `<strong class="text-white mb-10">${data.pname}</strong>
                         <p class="text-gray-500 text-sm">Encrypt Password</p>`;
  
    decryptbtn.addEventListener("click", async () => {
      decryptPassword(data.id, item);
    });
    deletebtn.addEventListener("click", async () => {
      deletePassword(data.id, item);
    });
  
    item.appendChild(content);
    item.appendChild(decryptbtn);
    item.appendChild(deletebtn);
    list.insertBefore(item, list.firstChild);
  } 

async function decryptPassword(id, item) {
  try {
    const response = await fetch(`${url}/password/decrypt/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      const password = data.pword;

      item.innerHTML =`<div>
                            <strong class="text-white mb-10">${data.pname}</strong>
                            <p class="text-gray-500 text-sm">Decrypt Password</p>
                            </div>
                            <p class="text-white">${password}</p>
                            <button class="text-red-500 hover:text-red-700 transition duration-300" onclick="hidePassword(this.parentElement)">
                                     <i class="fa-solid fa-eye-slash"></i>
                            </button>
                            <button class="text-red-500 hover:text-red-700 transition duration-300" onclick="deletePassword(this.parentElement)">
                                     <i class="fa-solid fa-trash"></i>
                            </button>`;

    }else{
        showAlert("Password not found", "error");
    }
  } catch (error) {
       showAlert("Network error", "error");
  }
}

async function deletePassword(id, item) {
    try{
        const response = await fetch(`${url}/password/delete/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        if(response.ok){
            item.remove();
            showAlert("Password deleted successfully", "success");
            const passwordList = document.getElementById("password-list"); 
            if (passwordList.children.length === 0) {
              passwordList.innerHTML = "<p></p>";
            }
        }
        else{
            showAlert("Failed to delete password", "error");
        }

    } catch(error){
        showAlert("Network error", "error");
    }
}

function hidePassword(item){
    const passname = item.querySelector("strong").textContent;
    const passId = item.dataset.id;
    item.innerHTML = `<div>
                            <strong class="text-white mb-10">${passname}</strong>
                            <p class="text-gray-500 text-sm">Encrypt Password</p>
                          </div>
                            <button class="text-white hover:text-green-700 transition duration-300" onclick="decryptPassword('${passId}', this.parentElement)">
            <i class="fa-solid fa-eye"></i>
        </button>
         <button class="text-white hover:text-red-700 transition duration-300" onclick="deletePassword('${passId}',this.parentElement)">
                   <i class="fa-solid fa-trash"></i>
                </button>`;
}

document.getElementById("logout")?.addEventListener("click", async () => {
    localStorage.removeItem("username");
    
    window.location.href = "signin.html";
});

document.addEventListener("DOMContentLoaded", getPasswords);
