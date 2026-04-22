import type { Product } from "@features/products/models/product.model";
import type { ProductImageState } from "@features/products/models/productImageState.model";
import { useState } from "react";

interface UseProductImageProps {
  initialImage?: Product["image"] | null;
}

export function useProductImage({ 
  initialImage 
}: UseProductImageProps) {
  
  const [image, setImage] = useState<ProductImageState | null>(
    initialImage
      ? {
          id: "existing-image",
          url: initialImage.url,
          fileName: initialImage.fileName
        }
      : null
  );

  const handleImageDrop = async (files: File[]) => {
    if (files.length === 0) return;

    if (image?.file && image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url);
    }

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setImage({
      id: `IMG-${Date.now()}`,
      url: previewUrl,
      fileName: file.name,
      file
    });
  };

  const handleImageRemove = () => {
    if (image?.file && image.url.startsWith("blob:")) {
      URL.revokeObjectURL(image.url);
    }
    setImage(null);
  };

  return {
    image,
    handleImageDrop,
    handleImageRemove 
  };
}
