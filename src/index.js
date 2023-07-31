// get product data
fetch(
  "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product",
  {
    method: "GET",
  }
)
  .then((res) => {
    res.json().then((res) => {
      console.log(res);
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
  }
  console.log(selectedSize);
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
  cartOpened = !cartOpened;
  cart = document.getElementsByClassName("cart")[0];
  if (cartOpened) {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
};
