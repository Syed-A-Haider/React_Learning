const products = [
  { id: 1, name: "Cabbage", price: 10 },
  { id: 2, name: "Garlic", price: 20 },
  { id: 3, name: "Apple", price: 30 },
];

// List products, use price as conditional to decide colour of text
const listItems = products.map((product) => (
  <li
    key={product.id}
    style={{ color: product.price > 20 ? "text-red-500" : "text-green-500" }}
  >
    {product.name}: £{product.price}
  </li>
));

function ListProducts() {
  return <ul>{listItems}</ul>;
}

export default ListProducts;
