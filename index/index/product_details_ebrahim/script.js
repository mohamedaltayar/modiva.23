// product-details.html

if (document.getElementById('product-detail') && window.location.pathname.includes('product-details.html')) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./server/server.json");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var products = JSON.parse(xhr.responseText);
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');

      const product = products.find(p => p.id == productId);
      if (!product) {
        console.log("Product not found for ID: ", productId);
        return;
      }

      // عرض تفاصيل المنتج
      let detailHTML = '';
      if (product.images && product.images[0]) {
        detailHTML = `
          <div class="detail-container">
            <div class="image-section">
              <img class="product-img" src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="contain">
              <h2 class="product-name">${product.name || 'Unnamed Product'}</h2>
              <div class="price-section">
                <p class="product-price">$${product.price || 'N/A'}</p>
              </div>
              <p class="product-description">${product.description || 'No description available'}</p>
              <div class="button-section">
                <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
              </div>
            </div>
          </div>
        `;

      } else {
        detailHTML = '<p>No image available for this product</p>';
      }
      
      // First insert the HTML into the DOM
      document.getElementById('product-detail').innerHTML = detailHTML;

      // قسم Best Selling
      let bestSellingHTML = '';
      const category = urlParams.get('category');
      const filteredProducts = category ? products.filter(p => p.category === category).slice(0, 4) : products.slice(0, 4);

      bestSellingHTML = '';
      let i = 0; // Initialize the counter variable
      filteredProducts.forEach(product => {
        if(i >= 4) return; // Limit to 4 products
        bestSellingHTML += `
          <div class="product-info">
            <img class="product-img" src="${product.images && product.images[0] ? product.images[0] : ''}" alt="${product.name || 'Unnamed Product'}">
            <h4 class="product-type">${product.category || 'Unknown'}</h4>
            <h3 class="product-name">${product.name || 'Unnamed Product'}</h3>
            <div class="price-block">
              <p>$${product.price || 'N/A'}</p>
            </div>
            <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
            <a href="product-details.html?id=${product.id}">View Details</a>
          </div>
        `;
        i++; // Increment the counter
      });

      document.getElementById('product-list').innerHTML = bestSellingHTML;

      // Add event listeners to ALL add-to-cart buttons after all HTML is inserted
      setTimeout(() => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        console.log(`Found ${addToCartButtons.length} add-to-cart buttons`);
        
        addToCartButtons.forEach((button, index) => {
          button.addEventListener('click', function (e) {
            e.preventDefault();
            window.open("../cart_mohamed/cart.html");
          });
        });
      }, 100);

      document.querySelectorAll('.categories a').forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          window.open("../cart_mohamed/cart.html");
        });
      });
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      console.log("خطأ في تحميل data.json: ", xhr.status);
    }
  };
}


// products.html
if (document.getElementById('product-list') && window.location.pathname.includes('products.html')) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./server/server.json", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var products = JSON.parse(xhr.responseText);
      const productList = document.getElementById('product-list');
      if (!productList) {
        console.log("Product list element not found!");
        return;
      }
      let i = 0;
      products.forEach(product => {
        productList.innerHTML += `
          <div class="product-info">
            <img class="product-img" src="${product.images && product.images[0] ? product.images[0] : ''}" alt="${product.name || 'Unnamed Product'}">
            <h4 class="product-type">${product.category || 'Unknown'}</h4>
            <h3 class="product-name">${product.name || 'Unnamed Product'}</h3>
            <div class="price-block">
              <p>$${product.price || 'N/A'}</p>
            </div>
            <button class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
            <a href="product-details.html?id=${product.id}" class="view-details">View Details</a>
          </div>
        `;
      });

      // Add event listeners to the add-to-cart buttons after HTML is inserted
      setTimeout(() => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        console.log(`Found ${addToCartButtons.length} add-to-cart buttons in products page`);
        
        addToCartButtons.forEach((button) => {
          button.addEventListener('click', function (e) {
            e.preventDefault();

            window.open("../cart_mohamed/cart.html");
          });
        });
      }, 100);
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      console.log("خطأ في تحميل data.json: ", xhr.status);
    }
  };
}