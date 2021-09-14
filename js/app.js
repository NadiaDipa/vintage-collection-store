const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    //by destructuring product object
    const {
      rate,
      count
    } = product.rating

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = ` 
    <div class="h-100">
      <div style = "background-color:#112031;" class = "card h-100">
        <div style="background-color:white">
        <img style="height:200px; width:150px" src="${product.image}" class="card-img-top mx-auto mt-3 mb-2" alt="...">
        </div>
        <div class="card-body mt-2 text-white">
             <h5 class="card-title fw-bold text-light">${product.title}</h5>
            <p>Category: ${product.category}</p>
             <h5 class="text-danger">Price: $ ${product.price}</h5>
             <div class="d-flex justify-content-center gap-3"> <h6 class = "text-light"> ${product.rating.rate} <span class = "fa fa-star checked text-warning"> </span></h6>
               <h6 class="text-light"> ${product.rating.count} <span class = "fa fa-users text-warning"> </span> </h6> </div>
        </div>
      <div class = "card-footer">
        <button id="details-btn" class="btn btn-danger">Details</button>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      </div>
     </div>
    </div>
    `
    document.getElementById("all-products").appendChild(div);
  }
};

const showDetails = (price, rating) => {
  console.log(price, rating)

  const x = Array.from(Array(parseInt(rating)).keys()).map((r) => '<i class="bi bi-star-fill text-warning"></i>')

  // console.log(x)
  document.getElementById("modal-body").innerHTML = `
  
     <div class='p-3'>
      <p>Rating: ${Array.from(Array(parseInt(rating)).keys()).map(
        (r) => '<i class="bi bi-star-fill text-warning"></i>'
      )}</p>
      <h2>Price: $ ${price}</h2>
     </div>
`;

}


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // console.log(price, typeof price)

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  // const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  console.log(total, typeof total)
  //  document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {

  console.log(
    getInputValue("price"),
    getInputValue("delivery-charge"),
    getInputValue("total-tax")
  );

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};