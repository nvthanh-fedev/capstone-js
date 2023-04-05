let validation = new Validation("id-register");

const registerBtn = document.getElementById("btn-register");

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("register-name");
  const emailInput = document.getElementById("register-email");
  const phoneInput = document.getElementById("register-phone");
  const passwordInput = document.getElementById("register-password");
  const genderInput = document.querySelector("[name=gender]:checked");

  var valid = validation.validateForm();

  if (!valid) {
    console.log("🚀 ~ file: register.js:17 ~ valid:", valid);
    return;
  }

  const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value,
    gender: isMaleChecked(genderInput.value),
  };
  console.log("🚀 ~ file: register.js:28 ~ user:", user);

  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: user,
  });
  promise.then(function (res) {
    console.log("ket qua", res.data);
    document.getElementById("status-register-success").innerHTML =
      "Đăng kí tài khoản thành công";
    document.getElementById("status-register-error").innerHTML = "";
  });
  promise.catch(function (err) {
    window.location.href = "index.html";
    console.log(err.response.data);
    document.getElementById("status-register-error").innerHTML =
      "Đăng kí tài khoản không thành công";
    document.getElementById("status-register-success").innerHTML = "";
  });
});

function isMaleChecked(value) {
  if (value === "male") {
    return true;
  } else {
    return false;
  }
}
