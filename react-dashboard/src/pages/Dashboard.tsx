import { useEffect, useState } from "react";
import { getProducts } from "../services/api"
import ProductCard from "../components/ProductCard";

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let temp = [...products];

    // Search
    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === "price") {
      temp.sort((a, b) => a.price - b.price);
    }
    if (sort === "name") {
      temp.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFiltered(temp);
  }, [search, sort, products]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;