import { Star } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-slate-100 p-6 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 capitalize border border-slate-200 shadow-sm">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h2 className="font-bold text-slate-850 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h2>
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-medium text-amber-700 shrink-0 border border-amber-200/50">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <span className="text-xl font-black text-slate-900 tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-slate-900 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;