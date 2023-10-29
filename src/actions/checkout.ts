"use server";

import { CartProduct } from "@/providers/cart";

import Stripe from 'stripe'

export const createCheckout = async (products: CartProduct[]) => {

    const stripe = new Stripe("sk_test_51O5HGiB6KTaqaB4KQfupQYsSouu8vLfSBHIdKxNqIdB0eepxa37syqtpGEULEQAjQFLVKxWSsPk2YirJxnNpKleP00P7agXvUN", {
        apiVersion: '2023-10-16',
    })

    const checkout = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
        line_items: products.map((product) => ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: product.name,
                    description: product.description,
                    images: product.imageUrls,
                },
                unit_amount: product.totalPrice * 100,
            },  
            quantity: product.quantity,
        })),
    })
    console.log(checkout);
    
    return checkout;
}