const signupForm = document.getElementById("signupForm");
if(signupForm) {
  signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
          alert("Please fill in all fields");
          return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    try {
      const response = await fetch("https://minigmail.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newUser)
      });

      const result = await response.text();
      alert(result);

      if (result.toLowerCase().includes("success")) {
        window.location.href = "login.html";
      }
    }catch(error){
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again later.");
    }
  });
}


const loginForm = document.getElementById("loginForm");

if(loginForm) {
  loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const existingUser = {
       email: email,
       password: password
    };

    try{
       const response = await fetch("https://minigmail.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(existingUser)
       });

       const result = await response.text();
       alert(result);


       if (result === "Login successful!") {
           localStorage.setItem("loggedInUserEmail", email);
           window.location.href = "home.html";
         }
    }catch(error){
      console.error("Login failed:", error);
      alert("Login failed. Please try again later.");
    }

  });
}


const composeForm = document.getElementById("composeForm");

if(composeForm){
  composeForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const sender = localStorage.getItem("loggedInUserEmail");
    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const body = document.getElementById("body").innerHTML;

    if (!to || !subject || !body || body.trim() === "<br>") {
          alert("Please fill in all fields.");
          return;
    }

    const emailData = {
      from: sender,
      to: to,
      subject: subject,
      body: body,
      timestamp: new Date()
    };

    try{
      const response = await fetch("https://minigmail.onrender.com/api/send", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(emailData)
      });

      const result = await response.text();
      alert(result);
      window.location.href = "sent.html"
    }catch(error){
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  });
}

async function loadInbox() {
  const userEmail = localStorage.getItem("loggedInUserEmail");

  if(!userEmail){
    alert("User not logged in.");
    return;
  }

  try{
    const response = await fetch(`https://minigmail.onrender.com/api/inbox?email=${userEmail}`);
    const emails = await response.json();

    const inboxTable = document.getElementById("inboxTable").getElementsByTagName("tbody")[0];
    inboxTable.innerHTML = "";

    emails.forEach(email => {
      const row = document.createElement("tr");
      const fromCell = document.createElement("td");
      fromCell.textContent = email.from;

      const subjectCell = document.createElement("td");
      subjectCell.textContent = email.subject;

      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(email.timestamp).toLocaleDateString('en-GB', {
        day: '2-digit', month:'short', year: 'numeric'
      });

      row.appendChild(fromCell);
      row.appendChild(subjectCell);
      row.appendChild(dateCell);

      row.addEventListener("click", () => {
        localStorage.setItem("openedEmail", JSON.stringify(email));
        window.location.href = "message.html";
      });

      inboxTable.appendChild(row);
    });

  }catch(error) {
    console.error("Failed to load inbox:", error);
    alert("Failed to fetch inbox messages.");
  }
}




async function loadSent() {
  const userEmail = localStorage.getItem("loggedInUserEmail");

  if (!userEmail) {
    alert("User not logged in.");
    return;
  }

  try {
    const response = await fetch(`https://minigmail.onrender.com/api/sent?email=${userEmail}`);
    const emails = await response.json();

    const sentTable = document.getElementById("sentTable")?.getElementsByTagName("tbody")[0];
    if (!sentTable) return;

    sentTable.innerHTML = "";

    emails.forEach(email => {
      const row = document.createElement("tr");

      const toCell = document.createElement("td");
      toCell.textContent = email.to;

      const subjectCell = document.createElement("td");
      subjectCell.textContent = email.subject;

      const dateCell = document.createElement("td");
      dateCell.textContent = new Date(email.timestamp).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric'
      });

      row.appendChild(toCell);
      row.appendChild(subjectCell);
      row.appendChild(dateCell);

      row.addEventListener("click", () => {
        localStorage.setItem("openedEmail", JSON.stringify(email));
        window.location.href = "message.html";
      });

      sentTable.appendChild(row);
    });

  } catch (error) {
    console.error("Failed to load sent emails:", error);
    alert("Could not fetch sent messages.");
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("inbox.html")) {
    loadInbox();
  }

  if (path.endsWith("sent.html")) {
    loadSent();
  }

  const replyEmail = JSON.parse(localStorage.getItem("replyEmail"));
    if (replyEmail) {
      document.getElementById("to").value = replyEmail.to;
      document.getElementById("subject").value = replyEmail.subject;
      localStorage.removeItem("replyTo");
    }

  const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUserEmail");
        window.location.href = "login.html";
      });
    }
});

const loggedInEmail = localStorage.getItem("loggedInUserEmail");
const greetingElement = document.getElementById("greeting");

if (loggedInEmail && greetingElement) {
  const username = loggedInEmail.split("@")[0]; // get 'aishwarya' from 'aishwarya@gmail.com'
  const capitalized = username.charAt(0).toUpperCase() + username.slice(1); // 'Aishwarya'

  greetingElement.textContent = `Hi ${capitalized}!`;
  greetingElement.title = loggedInEmail; // sets tooltip on hover
}

const navLinks = document.querySelectorAll(".sidebar nav a");
const currentPath = window.location.pathname.split("/").pop(); // e.g., inbox.html

navLinks.forEach(link => {
  const hrefPath = link.getAttribute("href");
  if (hrefPath === currentPath) {
    link.classList.add("active");
  }
});


