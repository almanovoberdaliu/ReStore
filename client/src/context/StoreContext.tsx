import { createContext, useContext } from "react";
import { Basket } from "../app/models/basket";

interface StoreContextValue{
    basket: Basket | null;
    setBasket: (basket : Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function UseStoreContext(){
    const context = useContext(StoreContext);
}