"use client"

import { ProductWithTotalPrice } from '@/helpers/product';
import { ReactNode, createContext, useState } from 'react';

export interface CartProduct extends ProductWithTotalPrice {
    quantity: number;
}


interface ICartContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number;
    cartTotalDiscount: number;
    addProductToCart: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
    decreaseProductQuantity: () => {},
    addProductToCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    
    const addProductToCart = (product: CartProduct) => {
        /**Se o produto já estiver no carrinho, apenas aumente a sua quantidade */
        const productIsAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id,);

        if(productIsAlreadyOnCart) {
            setProducts((prevProducts) => prevProducts.map((cartProduct) => {
                if(cartProduct.id === product.id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + product.quantity,
                    }
                }

                return cartProduct;
                }),
            );

            return;
        }

        /**Se não, adicione o produto à lista */
        setProducts((prevProducts) => [ ...prevProducts, product]);
    };

    /**Diminui a quantidade de um produto no carrinho.
     *  Se a quantidade for 1, remova o produto, caso não diminua a quantidade em 0 o produto permanece no carrinho */

    const decreaseProductQuantity = (productId: string) => {

        setProducts((prevProducts) => prevProducts.map((cartProduct) => {
            if(cartProduct.id === productId) {
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity - 1,
                }
            }

            return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
        );
    }

    

    return ( 
        <CartContext.Provider
        value={{
            products,
            cartTotalPrice: 0,
            cartBasePrice: 0,
            cartTotalDiscount: 0,
            addProductToCart,
            decreaseProductQuantity
        }}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartProvider;