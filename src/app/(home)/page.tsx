import Image  from "next/image"
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma"
import ProductList from "./components/product-list";

export default async function Home() {
    const deals = await prismaClient.product.findMany({
        where: {
            discountPercentage: {
                gt: 0,
            }
        }
    })

    return (
        <>
            <div className="">
                <Image 
                    src="/banner-home.png"
                    height={0}
                    width={0}
                    className="h-auto- w-full"
                    sizes="100vw"
                    alt="Até 55% de desconto so esse mês!"
                    />
                <div className="mt-8">
                    <Categories/>
                </div>

                <div className="mt-8">
                    <p className="mb-3 pl-5 font-bold uppercase">Ofertas</p>
                    <ProductList products={deals}/>
                </div>

                <Image
                    src="/banner-mouses.png"
                    height={0}
                    width={0}
                    className="h-auto w-full px-5"
                    sizes="100vw"
                    alt="Até 55% de desconto em Mouses"
                />
            </div>
        </>
    );
}