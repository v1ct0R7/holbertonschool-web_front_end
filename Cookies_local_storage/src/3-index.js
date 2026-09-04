document.getElementById("submitForm").addEventListener("submit", setCookies);

function setCookies(event) {
  event.preventDefault();
  const firstname = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  document.cookie = `firstname=${firstname}; path=/; max-age=86400`;
  document.cookie = `email=${email}; path=/; max-age=86400`;

  showWelcomeMessageOrForm();
}

function showForm() {
  document.getElementById("formContainer").style.display = "block";
}

function hideForm() {
  document.getElementById("formContainer").style.display = "none";
}

function deleteCookiesAndShowForm() {
  document.cookie = "firstname=; path=/; max-age=0";
  document.cookie = "email=; path=/; max-age=0";

  const message = document.querySelector("h1");
  if (message) message.remove();
  showForm();
}

function showWelcomeMessageOrForm() {
  const firstname = getCookie("firstname");
  const email = getCookie("email");

  if (email.length > 0 && firstname.length > 0) {
    hideForm();

    let successMessage = document.createElement("h1");
    successMessage.innerHTML = "Welcome: " + firstname;

    const logoutLink = document.createElement("a");
    logoutLink.textContent = "(logout)";
    logoutLink.href = "#";

    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      deleteCookiesAndShowForm();
    });

    document.body.appendChild(successMessage);
    successMessage.appendChild(logoutLink);
  }
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const result = cookies.find((cookie, index) => {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  });
  return result.split("=")[1];
}
