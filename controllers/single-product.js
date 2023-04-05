const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
console.log("🚀 ~ file: single-product.html:759 ~ productId:", productId);

getProductDetail(productId);

function getProductDetail(productId) {
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`, //Đường link api hoặc file local
    method: "GET", //phương thức backend cung cấp
  });

  promise.then(function (res) {
    let product = res.data.content;
    console.log("🚀 ~ file: single-product.js:15 ~ product:", product);

    renderProductDetail(product);

    reanderRelatedProduct(product);
  });

  promise.catch(function (err) {
    console.log(err);
  });
}

function reanderRelatedProduct(product) {
  let listProductRelated = product.relatedProducts;
  console.log(
    "🚀 ~ file: single-product.js:27 ~ reanderRalatedProduct ~ listProductRelated:",
    listProductRelated
  );

  const htmlString = listProductRelated
    .map((product) => {
      return `
      <div class="col-lg-4 col-md-6" onclick="redirectToProductDetail(${product.id})">
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

  document.getElementById("id-relatedProduct").innerHTML += htmlString;
  return htmlString;
}

function renderProductDetail(product) {
  const sizes = product.size
    .map((size) => {
      return `
      <a class="icon_btn btn-size" href="#" onclick="addActiveClassToBtnSizeLinks()">
        ${size}
      </a>
    `;
    })
    .join("");

  const htmlString = `
    <div class="container">
      <div class="row s_product_inner">
        <div class="col-lg-6">
          <div class="s_Product_carousel">
            <div class="single-prd-item">
              <img class="img-fluid" src="${product.image}" alt="">
            </div>
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="s_product_text">
            <h3>${product.name}</h3>
            <h2>$ ${product.price}</h2>
            <ul class="list">
              <li><a class="active" href="#">${product.shortDescription}</a></li>
            </ul>
            <p>${product.description}</p>

            <div class="card_area d-flex align-items-center mb-3">
              ${sizes}
            </div>

            <div class="product_count">
              <label for="qty">Quantity:</label>
              <input type="text" name="qty" id="sst" maxlength="12" value="1" title="Quantity:" class="input-text qty">
              <button onclick="
                var result = document.getElementById('sst');
                var sst = result.value;
                if (!isNaN(sst)) result.value++;
                return false;
              " class="increase items-count" type="button"><i class="lnr lnr-chevron-up"></i></button>
              <button onclick="
                var result = document.getElementById('sst');
                var sst = result.value;
                if (!isNaN(sst) && sst > 0) result.value--;
                return false;
              "class="reduced items-count" type="button\"><i class="lnr lnr-chevron-down"></i></button>
            </div>

            <div class="card_area d-flex align-items-center">
              <a class="primary-btn" href="#">Add to Cart</a>
              <a class="icon_btn" href=\"#\"><i class="lnr lnr-diamond"></i></a>
              <a class="icon_btn" href=\"#\"><i class="lnr lnr-heart"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("id-product_image_area").innerHTML += htmlString;
  return htmlString;
}

function addActiveClassToBtnSizeLinks() {
  // Lấy tất cả các phần tử có lớp "btn-size"
  var btnSizeLinks = document.querySelectorAll(".btn-size");

  // Lặp qua từng phần tử và thêm lớp "active" khi nó được nhấn vào
  btnSizeLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
      btnSizeLinks.forEach(function (otherLink) {
        if (otherLink !== link && otherLink.classList.contains("active")) {
          otherLink.classList.remove("active"); // Xoá lớp "active" của các phần tử khác
          otherLink.style.backgroundColor = ""; // Xoá màu nền của các phần tử khác
        }
      });
      link.classList.add("active"); // Thêm lớp "active" vào liên kết
      link.style.backgroundColor = "#092F2E"; // Thay đổi màu nền của liên kết thành #DC90E1
    });
  });
}

function redirectToProductDetail(productId) {
  // Chuyển sang trang single-product.html và truyền tham số id
  window.location.href = `single-product.html?id=${productId}`;
}
