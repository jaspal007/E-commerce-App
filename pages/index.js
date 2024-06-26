import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { useState } from "react";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");
  const categoryNames = [...new Set(products.map((p) => p.category))];

  if (phrase)
    products = products.filter((p) =>
      p.name.toLowerCase().includes(phrase.toLowerCase())
    );

  return (
    <Layout>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Seach for products..."
        className="bg-neutral-300 rounded-xl w-full h-10 px-3 my-5"
      />
      <div>
        {categoryNames.map((categoryName) => (
          <div key={categoryName}>
            {products.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-3xl font-bold capitalize">
                  {categoryName}
                </h2>
                <div className="flex -mx-5 overflow overflow-x-scroll scrollbar-hide snap-x">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((product) => (
                      <div
                        key={product.name}
                        className="m-5 py-3 px-3 snap-start"
                      >
                        <Product product={product} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
