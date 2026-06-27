"use client";

import clsx from "clsx";
import { useState } from "react";

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr className="bg-gray-50">
      <th
        className="py-2 px-4 text-vs font-bold uppercase tracking-widest text-gray-400 text-center"
        colSpan={2}
      >
        {category}
      </th>
    </tr>
  );
}

type Product = {
  name: string;
  price: string;
  isStocked: boolean;
  category: string;
};

function ProductRow({ product }: { product: Product }) {
  return (
    <tr className="border-4 border-gray-100 hover:bg-gray-50 transition-colors duration-150 text-center">
      <td className={clsx("py-3 px-4", !product.isStocked && "text-red-400")}>
        {product.name}
      </td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    // Search functionality
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.isStocked) {
      return;
    }

    // Push every category in - making sure same categories not stored twice
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }

    // Push the Product Details row into the array
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  // Return the table
  return (
    <table className="w-3xl mx-auto border-collapse text-sm ">
      <thead>
        <tr className="border-5 border-gray-200">
          <th className="text-center py-3 px-4 font-semibold text-gray-600 uppercase tracking-wide">
            Name
          </th>
          <th className="text-center py-3 px-4 font-semibold text-gray-600 uppercase tracking-wide">
            Price
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

const PRODUCTS: Product[] = [
  { category: "Fruits", price: "$1", isStocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", isStocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", isStocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", isStocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", isStocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", isStocked: true, name: "Peas" },
];

function SearchBar({
  filterText,
  inStockOnly,
}: {
  filterText: string;
  inStockOnly: boolean;
}) {
  return (
    <form className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer justify-start pl-2 ">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={inStockOnly}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

export default function FilterableProductTable() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className=" m-3 bg-white rounded-xl shadow-sm border border-gray-100">
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable
        products={PRODUCTS}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
