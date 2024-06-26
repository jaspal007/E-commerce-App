import { useContext } from "react"
import { ProductContext } from "./ProductContext"

export default function Product({product}){
  const id = product._id;
  const {setSelectedProducts, setTotalCost} = useContext(ProductContext)
  function addProduct(){
    setSelectedProducts(prev=>[...prev, id]);
    setTotalCost(prev=> prev+=product.price);
  }
    return(
        <div className="max-w-xl min-w-52">
            <div className="p-5 bg-blue-100 rounded-xl shrink-0">
        <img src={product.image} alt={product._id}/>
      </div>
      <div>
        <h3 className="font-bold mt-1">{product.name}</h3>
      </div>
      <p className="text-sm leading-4 mt-1">
        {product.desc}
      </p>
      <div className="flex mt-2">
        <div className="text-2xl font-bold grow">${product.price}</div>
        <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-1 rounded-lg">
          Add to cart
        </button>
      </div>
        </div>
    )
}