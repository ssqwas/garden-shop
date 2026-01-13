import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo } from "react";
import { api, Product } from "@/api";

export default function Sales() {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    api.getProducts().then((products) => {
      setSaleProducts(products.filter(p => p.discount !== undefined));
    }).catch(console.error);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let processed = [...saleProducts];

    // Filter by Price
    if (minPrice !== "") {
      processed = processed.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== "") {
      processed = processed.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sort
    switch (sortOption) {
      case "price-low-high":
        processed.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        processed.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        processed.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "alphabetical":
        processed.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return processed;
  }, [saleProducts, minPrice, maxPrice, sortOption]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="w-full px-10 py-20">
        <h1 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%] mb-10">
          Discounted items
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-10 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-txt-black font-semibold text-xl leading-[130%]">
              Price
            </span>
            <Input
              placeholder="from"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-28 h-9 px-4 py-2 rounded-small border border-grey-divider text-txt-grey text-base"
            />
            <Input
              placeholder="to"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-28 h-9 px-4 py-2 rounded-small border border-grey-divider text-txt-grey text-base"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-txt-black font-semibold text-xl leading-[130%]">
              Sorted
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="flex items-center gap-2 px-4 py-2 rounded-small border border-grey-divider hover:border-txt-black transition-colors bg-white text-txt-black font-medium text-base h-9 outline-none appearance-none pr-8 relative"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23282828\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '20px' }}
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-high-low">price: high-low</option>
              <option value="price-low-high">price: low-high</option>
              <option value="alphabetical">alphabetical</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p className="text-txt-grey text-xl col-span-full">
              No products found matching your criteria.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
