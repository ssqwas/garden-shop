import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { api, Category, Product } from "@/api";

export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await api.getCategories();
        setCategories(cats.slice(0, 4));

        const prods = await api.getProducts();
        const sales = prods
          .filter((p) => p.discount !== undefined)
          .slice(0, 4);
        setSaleProducts(sales);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Link to="/sales">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/fb2afeee77fe1ba75c0751a5759f835c269e9566?width=2880"
            alt="Garden products"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <h1 className="sr-only">Amazing Discounts on Garden Products!</h1>
        </Link>
      </section>

      {/* Categories Section */}

      <section className="w-full px-10 py-20">
        <div className="flex items-center gap-8 mb-10">
          <h2 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%]">
            Categories
          </h2>
          <div className="flex items-center flex-1 gap-8 pt-2.5">
            <div className="flex-1 h-px bg-grey-divider" />
            <Link
              to="/categories"
              className="px-4 py-2 rounded-small border border-grey-divider text-txt-grey text-center font-medium text-base leading-[126%] hover:border-txt-black hover:text-txt-black transition-colors"
            >
              All categories
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-full h-[350px] rounded-big overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-txt-black text-center font-medium text-xl leading-[130%]">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Discount Form Section */}
      <section className="w-full px-10 pb-20">
        <div className="rounded-big bg-gradient-to-r from-[#0B710B] to-green p-8 overflow-hidden">
          <h2 className="text-white text-center font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%] mb-6">
            5% off on the first order
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fe12c5eda7d85f4a0eb1936311aa204dd767b2cb?width=1496"
                alt="Garden tools"
                className="w-full h-[360px] object-contain"
              />
            </div>
            <div className="w-full lg:w-[516px] flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Name"
                  className="bg-transparent border-white text-white placeholder:text-white h-auto py-4 px-8 rounded-small text-xl font-medium"
                />
                <Input
                  placeholder="Phone number"
                  className="bg-transparent border-white text-white placeholder:text-white h-auto py-4 px-8 rounded-small text-xl font-medium"
                />
                <Input
                  placeholder="Email"
                  className="bg-transparent border-white text-white placeholder:text-white h-auto py-4 px-8 rounded-small text-xl font-medium"
                />
              </div>
              <Button className="bg-white hover:bg-white/90 text-txt-black font-semibold text-xl py-4 px-8 h-auto rounded-small w-full">
                Get a discount
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section className="w-full px-10 pb-20">
        <div className="flex items-center gap-8 mb-10">
          <h2 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%]">
            Sale
          </h2>
          <div className="flex items-center flex-1 gap-8 pt-2.5">
            <div className="flex-1 h-px bg-grey-divider" />
            <Link
              to="/sales"
              className="px-4 py-2 rounded-small border border-grey-divider text-txt-grey text-center font-medium text-base leading-[126%] hover:border-txt-black hover:text-txt-black transition-colors"
            >
              All sales
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
