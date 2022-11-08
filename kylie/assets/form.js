const forms = document.querySelectorAll("form");

const handleSubmit = ({ event, form }) => {
  event.preventDefault();

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);

  console.log(data);
};

forms.forEach((form) => {
  form.addEventListener("submit", (e) => handleSubmit({ event: e, form }));
});
