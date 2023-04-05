const paginationButtons = document.querySelectorAll(".pagination button");

paginationButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // remove active from all buttons
    paginationButtons.forEach((button) => {
      button.querySelector("a").classList.remove("active");
    });
    // add active to the clicked button
    event.currentTarget.querySelector("a").classList.add("active");

    let pageNum = getCurrentPage();
    console.log(
      "🚀 ~ file: panigation.js:14 ~ button.addEventListener ~ pageNum:",
      pageNum
    );

    getProduct();
  });
});

function numberProductsPerPageChanged() {
  getProduct();
}

function sortTypeChanged() {
  getProduct();
}
