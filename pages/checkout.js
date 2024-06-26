import Layout from "@/components/Layout";
import { ProductContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
  const { selectedProducts, setSelectedProducts, totalCost, setTotalCost } =
    useContext(ProductContext);
  const [cost, setCost] = useState(0);
  const finalCost = cost + cost * 0.01;
  const [productInfo, setProductInfo] = useState([]);
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];
    console.log(uniqueIds.length);
    console.log(selectedProducts.length);
    fetch("/api/products?ids=" + uniqueIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductInfo(json));

    setCost(totalCost);
  }, [selectedProducts, totalCost]);

  // console.log(productInfo.length);
  function addProduct(id) {
    // console.log('result: '+productInfo.filter((p)=>id===p._id)[0].price);
    setSelectedProducts((prev) => [...prev, id]);
    setTotalCost(
      (prev) => (prev += productInfo.filter((p) => id === p._id)[0].price)
    );
  }
  function removeProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setTotalCost(
        (prev) => (prev -= productInfo.filter((p) => id === p._id)[0].price)
      );
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => pos !== index);
      });
    }
  }
  return (
    <Layout>
      {selectedProducts.length === 0 ? (
        <div className="w-full text-center h-screen content-center">
          No product in your shopping cart
        </div>
      ) : (
        <div>
          {productInfo.map((p) => (
            <div
              key={p._id}
              className="flex mb-5 h-full bg-gray-300 shadow-lg rounded-2xl p-2"
            >
              <div className="bg-gray-100 rounded-xl w-28 shrink-0 p-2">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="pl-5 flex-col w-full">
                <h3 className="font-bold h-3/4">{p.name}</h3>
                <div className="flex px-2">
                  <div className="grow">${p.price}</div>
                  <div className="border border-gray-700 rounded-sm flex">
                    <button
                      onClick={() => {
                        removeProduct(p._id);
                      }}
                      className="text-white bg-emerald-500 px-1"
                    >
                      -
                    </button>
                    <div className="px-2">
                      {selectedProducts.filter((id) => id === p._id).length}
                    </div>
                    <button
                      onClick={() => {
                        addProduct(p._id);
                      }}
                      className="text-white bg-emerald-500 rounded-sm px-0.5"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col text-xl font-semibold">
            <div className="flex my-4">
              <h3 className="grow text-gray-400">Sub Total</h3>${cost}
            </div>
            <div className="flex my-4">
              <h3 className="grow text-gray-400">Delivery Fees</h3>$
              {(cost * 0.01).toFixed(2)}
            </div>
            <div className="flex my-4 border-gray-300 border-t-2">
              <h3 className="grow text-gray-400">Total Cost</h3>${finalCost}
            </div>
          </div>
        </div>
      )}
        <div className="border-t-2 border-gray-500 py-2 mt-10 mb-2">
          <h3 className="text-xl font-semibold">Address</h3>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-3 mb-2"
          />
          <input
            type="text"
            name="house"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            placeholder="House No."
            className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-1 mb-2"
          />
          <input
            type="text"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street"
            className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-1 mb-1"
          />
          <input
            type="text"
            name="locality"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="Locality"
            className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-1 mb-1"
          />
          <div className="flex">
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-1 mb-1 me-1"
            />
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-1 mb-1 mx-1"
            />
            <input
              type="number"
              name="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Pincode"
              className="bg-neutral-300 rounded-lg w-full h-10 px-3 mt-1 mb-1 ms-1"
            />
          </div>
        </div>
        <div className="my-8">
          <input
            type="hidden"
            name="products"
            value={selectedProducts.join(",")}
          />
          <button
            type="submit"
            className="bg-emerald-500 text-white text-2xl p-4 w-full rounded-xl shadow-lg shadow-emerald-300"
          >
            Pay ${finalCost}
          </button>
        </div>
    </Layout>
  );
}
