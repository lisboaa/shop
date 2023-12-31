"use client"

import { ProductWithTotalPrice } from '@/helpers/product';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

export interface CartProduct extends ProductWithTotalPrice {
    quantity: number;
}


interface ICartContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number;
    cartTotalDiscount: number;
    subTotal: number;
    total: number;
    totalDiscount: number;
    addProductToCart: (product: CartProduct) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
    subTotal: 0,
    total: 0,
    totalDiscount: 0,
    decreaseProductQuantity: () => {},
    addProductToCart: () => {},
    increaseProductQuantity: () => {},
    removeProductFromCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>(
        typeof window !== "undefined" ?
        JSON.parse(localStorage.getItem("@fsw-store/cart-products") || "[]") :
        [],
    );

    useEffect(() => {
      localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products));
    }, [products]);
    
    const subTotal = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.basePrice) * product.quantity;
        }, 0);
    }, [products]);
    
    const total = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + product.totalPrice * product.quantity;
        }, 0);
    }, [products]);

    const totalDiscount = subTotal - total;

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
    };

    const increaseProductQuantity = (productId: string) => {
        setProducts((prevProducts) => prevProducts.map((cartProduct) => {
            if(cartProduct.id === productId) {
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + 1,
                }
            }

            return cartProduct;
        }));
    }

    const removeProductFromCart = (productId: string) => {
        setProducts((prevProducts) => prevProducts.filter((cartProduct) => cartProduct.id !== productId));
    }
    

    return ( 
        <CartContext.Provider
        value={{
            products,
            cartTotalPrice: 0,
            cartBasePrice: 0,
            cartTotalDiscount: 0,
            subTotal,
            total,
            totalDiscount,
            addProductToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProductFromCart,
        }}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartProvider;