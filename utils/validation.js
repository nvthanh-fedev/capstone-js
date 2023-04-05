class Validation {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.nameInput = this.form.querySelector("#register-name");
    this.emailInput = this.form.querySelector("#register-email");
    this.phoneInput = this.form.querySelector("#register-phone");
    this.passwordInput = this.form.querySelector("#register-password");
    this.confirmPasswordInput = this.form.querySelector(
      "#register-confirm-password"
    );
    this.genderInputs = this.form.querySelectorAll("[name=gender]");
    this.checkboxInput = this.form.querySelector("#f-option2");

    // Define all the notifications
    this.nameNotification = this.form.querySelector("#noti-name");
    this.emailNotification = this.form.querySelector("#noti-email");
    this.phoneNotification = this.form.querySelector("#noti-phone");
    this.passwordNotification = this.form.querySelector("#noti-password");
    this.confirmPasswordNotification = this.form.querySelector(
      "#noti-confirm-password"
    );
    this.genderNotification = this.form.querySelector("#noti-gender");
    this.checkboxNotification = this.form.querySelector("#noti-checkbox");

    // Bind the `this` context for the `validateForm()` method
    this.validateForm = this.validateForm.bind(this);

    this.submitButton = this.form.querySelector("#btn-register");
  }

  validateForm() {
    let valid = true;

    // Validate name
    const nameValue = this.nameInput.value.trim();
    if (
      nameValue === "" ||
      nameValue.length < 3 ||
      nameValue.length > 50 ||
      !/\p{Letter}/u.test(nameValue)
    ) {
      this.nameNotification.textContent =
        "Name must be 3-50 characters long and only contain letters, spaces, and hyphens";
      valid = false;
    } else {
      this.nameNotification.textContent = "";
    }

    // Validate email
    const emailValue = this.emailInput.value.trim();
    if (emailValue === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      this.emailNotification.textContent = "Invalid email address";
      valid = false;
    } else {
      this.emailNotification.textContent = "";
    }

    // Validate phone
    const phoneValue = this.phoneInput.value.trim();
    if (phoneValue === "" || !/^[0-9]{10,11}$/.test(phoneValue)) {
      this.phoneNotification.textContent = "Invalid phone number";
      valid = false;
    } else {
      this.phoneNotification.textContent = "";
    }

    // Validate password
    const passwordValue = this.passwordInput.value.trim();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,16}$/;
    if (passwordValue === "" || !passwordRegex.test(passwordValue)) {
      this.passwordNotification.textContent =
        "Password must be 8-16 characters long and contain at least one lowercase letter, one uppercase letter, one number, one special character";
      valid = false;
    } else {
      this.passwordNotification.textContent = "";
    }

    // Validate confirm password
    const confirmPasswordValue = this.confirmPasswordInput.value.trim();
    if (confirmPasswordValue !== passwordValue) {
      this.confirmPasswordNotification.textContent = "Passwords do not match";
      valid = false;
    } else {
      this.confirmPasswordNotification.textContent = "";
    }

    console.log(
      "🚀 ~ file: validation.js:98 ~ Validation ~ validateForm ~ valid:",
      valid
    );

    return valid;
  }
}
