"use client"

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
    name: string;
    imageUrls: string[];
}

const ProductImages = ({ imageUrls, name } : ProductImagesProps) => {

    const [currentImage, setCurrentImage] = useState(imageUrls[0]);

    const handlerImageClick = (imageUrls: string) => {
        setCurrentImage(imageUrls);
    }

    return (
        <div className="flex flex-col">
            <div className="bg-accent h-[300] w-full items-center justify-center">
                <Image
                    src={currentImage}
                    alt={name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto max-h-[70%] w-auto max-w-[80%]"
                    style={{
                        objectFit: "contain"
                    }}
                />

            </div>

        <div className="mt-8 grid grid-cols-4 gap-4 px-5">
            {imageUrls.map((imageUrl) => (
                <button
                    onClick={() =>handlerImageClick(imageUrl)}
                    key={imageUrl} 
                    className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
                        ${
                            imageUrl === currentImage &&
                            "border-2 border-solid border-primary"
                        }
                    `}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-auto max-h-[70%] w-auto max-w-[80%]"
                        style={{
                            objectFit: "contain"
                        }}
                    />
                </button>
            ))}
        </div>
        </div>
     );
}
 
export default ProductImages;