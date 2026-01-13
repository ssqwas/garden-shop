import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { api, Category } from "@/api";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="w-full px-10 py-20">
        <h1 className="text-txt-black font-bold text-4xl md:text-5xl lg:text-[64px] leading-[110%] mb-10">
          Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
      </main>

      <Footer />
    </div>
  );
}
