// items in cart
let cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : {};

// get product data
fetch(
  "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product",
  {
    method: "GET",
  }
)
  .then((res) => {
    res.json().then((res) => {
      document.getElementById("title").innerText = res.title;
      document.getElementById("price").innerText =
        "$" + Number(parseFloat(res.price.toFixed(1)));
      document.getElementById("description").innerText = res.description;
      document.getElementById("pic").src = res.imageURL;
      res.sizeOptions.forEach((option, index) => {
        document.getElementById(
          "size-options"
        ).innerHTML += `<p onclick="setSize(this)" ondblclick="clearSelection(this)" class="greytext"
                        id="size-selector-unselected">${option.label}</p>`;
      });
    });
  })
  .catch((e) => {
    console.log(e);
  });

// the size selected
let selectedSize = null;
// whether the cart is opened
let cartOpened = false;

// update the selected size
const setSize = (e) => {
  // it is assumed that only one size can be selected each time
  if (document.getElementById("size-selector-selected") != null) {
    const selected = document.getElementById("size-selector-selected");
    selected.id = "size-selector-unselected";
  }
  selectedSize = e.textContent;
  e.id = "size-selector-selected";
};

// clear the selection
const clearSelection = (e) => {
  selectedSize = null;
  e.id = "size-selector-unselected";
};

// add to cart
const handleAddToCart = () => {
  // size is required
  if (selectedSize === null) {
    alert("Please select a size");
  } else {
    if (cartItems.hasOwnProperty(selectedSize)) {
      cartItems[selectedSize] += 1;
    } else {
      cartItems[selectedSize] = 1;
    }
  }
  Array.from(document.getElementsByClassName("cart-count")).map((element) => {
    element.innerText = Object.values(cartItems).reduce(
      (acc, curr) => acc + curr,
      0
    );
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// mouse hovering over
const addAnimation = (e) => {
  setTimeout(function () {
    e.className = "button-mouse-on";
  }, 200);
};

// mouse away
const removeAnimation = (e) => {
  setTimeout(function () {
    e.className = "button-mouse-away";
  }, 200);
};

// open cart
const openCart = () => {
  if (Object.keys(cartItems).length !== 0) {
    document.getElementById("cart").innerHTML = null;
    cartOpened = !cartOpened;
    cart = document.getElementById("cart");
    if (cartOpened) {
      cart.style.display = "block";
      document.getElementById("dropdown").style.backgroundColor = "white";
      document.getElementById("dropdown").style.borderTop = "1px solid #CCCCCC";
      document.getElementById("dropdown").style.borderLeft =
        "1px solid #CCCCCC";
      document.getElementById("dropdown").style.borderRight =
        "1px solid #CCCCCC";
      document.getElementById("dropdown").style.color = "#222222";
    } else {
      cart.style.display = "none";
      document.getElementById("dropdown").style.backgroundColor = "transparent";
      document.getElementById("dropdown").style.border = "none";
      document.getElementById("dropdown").style.color = "#888888";
    }

    for (const key in cartItems) {
      document.getElementById("cart").innerHTML += `
     <ul class="cart-item">
                    <img class="img-cart" id="img-cart" src="./asset/classic-tee.jpg"></img>
                    <p class="title-cart" id="title-cart">${
                      document.getElementById("title").textContent
                    }</p>
                    <p class="price-quant-cart" id="price-quant-cart">${
                      cartItems[key]
                    } X <span style="font-weight:bold">${
        document.getElementById("price").textContent
      }</span></p>
                    <p class="size-cart" id="size-cart">Size: ${key}</p>
                </ul>
    `;
    }
  } else {
    alert("Your cart is empty");
  }
};
