import { Category } from "@prisma/client"
import Image from "next/image";
interface CategoryItemProps {
    category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
    return (
        <div className="flex flex-col">
            <div className="bg-category-item-gradient flex h-[150px] w-full items-center rounded-tl-lg rounded-tr-lg justify-center">
                <Image
                    src={category.imageUrl}
                    alt={category.name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto max-h-[70%] w-auto max-w-[80%]"
                    style={{
                        objectFit: "contain"
                    }}
                />
            </div>
            <div className="rounded-bl-lg rounded-br-lg bg-accent py-2">
                <p className="text-sm font-semibold">{category.name}</p>
            </div>
        </div>
    );
}
 
export default CategoryItem;