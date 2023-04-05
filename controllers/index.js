window.addEventListener("load", function () {
  getProductIndex();
});

function getProductIndex() {
  const url = "https://shop.cyberlearn.vn/api/Product"; // Đường link api hoặc file local
  const method = "GET"; // Phương thức backend cung cấp

  axios({ url, method })
    .then(({ data }) => {
      renderListProductHome(data.content, 10, 18);
    })
    .catch(console.error);
}

function renderListProductHome(listProduct, startIndex, endIndex) {
  console.log(
    "🚀 ~ file: index.js:18 ~ renderListProductHome ~ listProduct, id, startIndex, endIndex:",
    listProduct,
    startIndex,
    endIndex
  );
  const productsToRender = listProduct.slice(startIndex, endIndex);
  const htmlString = productsToRender
    .map((product) => {
      return `
      <div class="col-lg-3 col-md-6" onclick="redirectToProductDetail(${product.id})">
        <div class="single-product">
          <img class="img-fluid" src="${product.image}" alt="">
          <div class="product-details">
            <h6>${product.name}</h6>
            <div class="price">
              <h6>$${product.price}</h6>
              <h6 class="l-through">$210.00</h6>
            </div>
            <div class="prd-bottom">
              <a href="" class="social-info">
                <span class="ti-bag"></span>
                <p class="hover-text">add to bag</p>
              </a>
              <a href="" class="social-info">
                <span class="lnr lnr-heart"></span>
                <p class="hover-text">Wishlist</p>
              </a>
              <a href="" class="social-info">
                <span class="lnr lnr-sync"></span>
                <p class="hover-text">compare</p>
              </a>
              <a href="" class="social-info">
                <span class="lnr lnr-move"></span>
                <p class="hover-text">view more</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  document.getElementById("id-latest-list-product").innerHTML += htmlString;

  return htmlString;
}

function redirectToProductDetail(productId) {
  // Chuyển sang trang single-product.html và truyền tham số id
  window.location.href = `single-product.html?id=${productId}`;
}
