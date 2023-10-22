import { Product } from "@prisma/client";
import { ProductWithTotalPrice } from "@/helpers/product"
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { ArrowBigDown, ArrowBigDownIcon } from "lucide-react";

interface ProductItemProps {
    product: ProductWithTotalPrice
}

const ProductItem = ({product}: ProductItemProps) => {
    return ( 
        <div className="flex max-w-[156px] flex-col gap-4">
            <div className="relative flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
                <Image 
                    src={product.imageUrls[0]}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto max-h[70%] w-auto max-w-[80%]"
                    style={{
                        objectFit: "contain",
                    }}
                    alt={product.name}
                />
                {product.discountPercentage > 0 && (
                    <Badge className="absolute left-3 top-3 px-2 py-[2px]">
                        <ArrowBigDown size={14} /> {product.discountPercentage}%
                    </Badge>
                )}
            </div>
            <div>
                <p className="w-full text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
            </div>
            
            <div className="flex items-center gap-2">
                    {product.discountPercentage > 0 ? (
                        <>
                            <p className="font-semibold">R$ {product.totalPrice.toFixed(2)}</p>
                            <p className="text-xs line-through opacity-75"> R$ {Number(product.basePrice).toFixed(2)}</p>
                        </>
                    ) : (
                        <p className="text-sm font-semibold">R$ {product.totalPrice.toFixed(2)}</p>
                    )
                    }
            </div>

        </div>
     );
}
 
export default ProductItem;