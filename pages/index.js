import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="p-5">
      <div>
        <h2 className="text-3xl font-bold">Mobiles</h2>
        <div className="p-5 bg-blue-100 rounded-xl">
          <img src="/products/iphone.png" alt="iphone 14 pro" />
        </div>
        <div>
          <h3 className="font-bold mt-1">Iphone 14 Pro</h3>
        </div>
        <p className="text-sm leading-4 mt-1">
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
        <div className="flex mt-2">
          <div className="text-2xl font-bold grow">$899</div>
          <button className="bg-emerald-400 text-white py-1 px-1 rounded-lg">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
