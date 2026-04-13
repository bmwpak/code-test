const ProductCard = ({ product }: any) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full object-cover mb-2"
      />
      <h2 className="font-bold">{product.title}</h2>
      <p className="text-blue-500 font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductCard;