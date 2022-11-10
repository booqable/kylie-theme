const forms = document.querySelectorAll("form");

const handleFetchSuccess = ({ form, initialHTML }) => {
  const submitButton = form.querySelector("button[type=submit]");

  setTimeout(() => {
    // Showing button success state
    submitButton.innerHTML = '<i class="fa-regular fa-check-circle"></i>';

    // Resetting form
    form.reset();

    setTimeout(() => {
      // Resetting submit button
      submitButton.removeAttribute("disabled");
      submitButton.innerHTML = initialHTML;
    }, 2000);
  }, 1000);
};

const handleFetchError = ({ form, initialHTML, errors }) => {
  // Selectors
  const submitButton = form.querySelector("button[type=submit]");
  const errorsContainer = form.querySelector('.form__error');

  // Making submit button display error
  submitButton.classList.add("error");
  submitButton.innerHTML = '<i class="fa-regular fa-triangle-exclamation"></i>';

  // Displaying errors
  for (const error of errors) {
    const field = form.querySelector(`[name=${Object.keys(error.meta)[0]}]`);

    field.classList.add("error");
    errorsContainer.innerHTML += `<p class="form__error-message">${error.detail}</p>`;
  }

  // Resetting submit button
  setTimeout(() => {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove("error");
    submitButton.innerHTML = initialHTML;
  }, 3000);
};

const handleSubmit = ({ event, form }) => {
  event.preventDefault();

  grecaptcha.ready(() => {
    grecaptcha
      .execute("6Le5IfYiAAAAABxzCgFGGxw3_fLo8-99otZn_NlQ", { action: "submit" })
      .then((token) => {
        // Selectors
        const errorsFields = form.querySelectorAll(".error");
        const errorsContainer = form.querySelector('.form__error');
        const submitButton = form.querySelector("button[type=submit]");
        const initialHTML = submitButton.innerHTML;

        // Clearing errors before submitting
        errorsFields.forEach((field) => field.classList.remove("error"));
        errorsContainer.innerHTML = "";

        // Disabling submit button and adding loading state
        submitButton.setAttribute("disabled", true);
        submitButton.innerHTML =
          '<i class="fa-regular fa-spinner-third fa-spin"></i>';

        // Fetching form data
        const formData = new FormData(form);

        const data = {
          data: {
            type: "forms",
            attributes: {
              ...Object.fromEntries(formData),
              type: "contact",
              captcha: token,
            },
          },
        };

        fetch("/api/4/forms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.errors) {
              return handleFetchError({
                form,
                initialHTML,
                errors: data.errors,
              });
            }

            return handleFetchSuccess({ form, initialHTML });
          });
      });
  });
};

forms.forEach((form) => {
  form.addEventListener("submit", (e) => handleSubmit({ event: e, form }));
});
