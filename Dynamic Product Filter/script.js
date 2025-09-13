const productElement = document.querySelector("#products");
const categorySelect = document.querySelector("#category");

const products = [
  { id: 1, name: "Cookbook", category: "books" },
  { id: 2, name: "Jeans", category: "clothing" },
  { id: 3, name: "Iphone", category: "electronics" },
  { id: 4, name: "Soul", category: "books" },
  { id: 5, name: "Tshirt", category: "clothing" },
  { id: 6, name: "Laptop", category: "electronics" },
];

function filterProducts(category = "all") {
  if (category === "all") {
    return products;
  } else {
    return products.filter((value) => {
      return value.category === category;
    });
  }
}

categorySelect.addEventListener("change", (e) => {
  const filtered = filterProducts(e.target.value);
  const data = filtered.map((value) => {
    return `<div style="border : 1px solid gray; padding: 10px; margin: 5px;">${value.name}</div>`;
  });
  productElement.innerHTML = data.join("");
});

//Initial Render
const filtered = filterProducts("all");
const data = filtered.map((value) => {
  return `<div style="border : 1px solid gray; padding: 10px; margin: 5px">${value.name}</div>`;
});
productElement.innerHTML = data.join("");
