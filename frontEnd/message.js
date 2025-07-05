document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.endsWith("inbox.html")) {
    loadInbox();
  }

  if (path.endsWith("sent.html")) {
    loadSent();
  }

  if (path.endsWith("message.html")) {
    const email = JSON.parse(localStorage.getItem("openedEmail"));

    if (!email) {
      document.body.innerHTML = "<p>No message selected.</p>";
      return;
    }

    document.getElementById("from").textContent = email.from;
    document.getElementById("to").textContent = email.to;
    document.getElementById("subject").textContent = email.subject;
    document.getElementById("date").textContent = new Date(email.timestamp).toLocaleString();
    document.getElementById("body").innerHTML = email.body;

    document.getElementById("replyBtn").addEventListener("click", () => {
      const replyData = {
        to: email.from,
        subject: "Re: " + email.subject,
      };
      localStorage.setItem("replyEmail", JSON.stringify(replyData));
      window.location.href = "compose.html";
    });


    document.getElementById("deleteBtn").addEventListener("click", async () => {
      if (!email.id) {
        alert("Invalid message. Cannot delete.");
        return;
      }

      const confirmDelete = confirm("Are you sure you want to delete this message?");
      if (!confirmDelete) return;

      try {
        const response = await fetch(`http://localhost:8081/api/delete?id=${email.id}`, {
          method: "PUT"
        });

        const result = await response.text();
        alert(result);
        window.location.href = "inbox.html";
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Something went wrong while deleting the message.");
      }
    });

    const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUserEmail");
            window.location.href = "login.html";
          });
        }
  }
});
