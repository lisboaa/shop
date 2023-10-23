import { Badge } from "@/components/ui/badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { ArrowDownIcon } from "lucide-react";

interface ProductInfoProps {
    product: Pick<
        ProductWithTotalPrice,
        "baseprice" | "description" | "discountPercentage" | "totalPrice" | "name"
    >;
}

export const ProductInfo = ({
    product: { baseprice, description, discountPercentage, totalPrice, name },
} : ProductInfoProps) => {
    return(
        <div className="flex flex-col px-5">
            <h2 className="text-lg">{name}</h2>

            <div className="flex items-center gap-1">
                <h1>R$ {totalPrice.toFixed(2)}</h1>
                {discountPercentage > 0 && (
                <Badge className="left-3 top-3 px-2 py-[2px]">
                    <ArrowDownIcon size={14} /> {discountPercentage}%
                </Badge>
                )}
            </div>
        </div>
    )
}