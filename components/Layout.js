import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductContext } from "./ProductContext";

export default function Layout({ children }) {
  const { setSelectedProducts } = useContext(ProductContext);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (window.location.href.includes('success')) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  },[]);
  return (
    <div>
      {success && (
        <div className="w-full bg-emerald-500 text-white h-20 text-center content-center font-bold text-xl rounded-xl">
          Thanks for your order!
        </div>
      )}
      <div className="p-5">{children}</div>
      <Footer />
    </div>
  );
}
