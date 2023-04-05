// add them su kien neu su kien onload da duoc khai bao truoc do
window.addEventListener("load", function () {
  getProduct();
});

function getProduct() {
  const url = "https://shop.cyberlearn.vn/api/Product"; // Đường link api hoặc file local
  const method = "GET"; // Phương thức backend cung cấp

  axios({ url, method })
    .then(({ data }) => {
      const currentPageNum = getCurrentPage();
      const productsPerPage = getNumberProductsPerPage(); // Số lượng sản phẩm trên mỗi trang
      const sortType = getSortType();

      console.log(
        `🚀 ~ file: index.js:17 ~ currentPageNum: ${currentPageNum}, productsPerPage: ${productsPerPage}`
      );

      refresh();
      renderListProductByPaginationNumber(
        data.content,
        currentPageNum,
        productsPerPage,
        sortType
      );
    })
    .catch(console.error);
}

function refresh() {
  document.getElementById("category-single-product").innerHTML = "";
}

function renderListProductByPaginationNumber(
  listProduct,
  currentPageNum,
  productsPerPage,
  sortType
) {
  const startIndex = (currentPageNum - 1) * productsPerPage;
  const endIndex = currentPageNum * productsPerPage;
  const productsToRender = listProduct.slice(startIndex, endIndex);
  let productsSorted = [];

  if (sortType === "name") {
    productsSorted = sortName(productsToRender);
  } else if (sortType === "ascending") {
    productsSorted = sortPriceAscending(productsToRender);
  } else if (sortType === "descending") {
    productsSorted = sortPriceDescending(productsToRender);
  }

  console.log("🚀 ~ file: category.js:47 ~ sortType:", sortType);

  console.log("🚀 ~ file: category.js:52 ~ productsSorted:", productsSorted);

  console.log("🚀 ~ file: category.js:44 ~ productsToRender:", productsSorted);

  if (productsSorted.length > 0) {
    const htmlString = productsToRender
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

    result = htmlString;
  } else {
    const htmlStringNoShoe = `
      <div class="col-12" >

      <img class="img-fluid" src="./img/noshoe.png" >
        
      </div>
    `;

    result = htmlStringNoShoe;
  }

  document.getElementById("category-single-product").innerHTML += result;
  return result;
}

function redirectToProductDetail(productId) {
  // Chuyển sang trang single-product.html và truyền tham số id
  window.location.href = `single-product.html?id=${productId}`;
}

function getNumberProductsPerPage() {
  var select = document.querySelector(".value-number-show");
  let numberProductsPerPage = select.value;
  return numberProductsPerPage;
}

function getCurrentPage() {
  const activePage = document.querySelector(
    ".pagination button.number-page a.active"
  );
  if (activePage) {
    return activePage.textContent;
  } else {
    return null;
  }
}

function getSortType() {
  var select = document.querySelector(".value-sort");
  let sortType = select.value;
  return sortType;
}

// giảm
function sortPriceDescending(products) {
  products.sort(function (a, b) {
    return b.price - a.price;
  });
  return products;
}

// tăng
function sortPriceAscending(products) {
  products.sort(function (a, b) {
    return a.price - b.price;
  });
  return products;
}

// sort theo tên
function sortName(products) {
  products.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // Chuyển tên sản phẩm thành chữ in hoa
    var nameB = b.name.toUpperCase(); // Chuyển tên sản phẩm thành chữ in hoa
    if (nameA < nameB) {
      return -1; // Trả về số âm nếu tên sản phẩm a đứng trước tên sản phẩm b
    }
    if (nameA > nameB) {
      return 1; // Trả về số dương nếu tên sản phẩm a đứng sau tên sản phẩm b
    }
    return 0; // Trả về 0 nếu hai tên sản phẩm bằng nhau
  });
  return products;
}
