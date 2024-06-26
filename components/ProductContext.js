import { createContext } from "react"
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext({});
export default function ProductContextProvider({children}){
    const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {defaultValue: []});
    // const [totalCost, setTotalCost] = useLocalStorageState('value', {defaultValue: 0});
    return(
       <ProductContext.Provider value={{selectedProducts, setSelectedProducts}}>
        {children}
        </ProductContext.Provider>
    )
}