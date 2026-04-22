import type { Product } from "@features/products/models/product.model";
import type { ProductImageState } from "@features/products/models/productImageState.model";
import { useEffect, useState } from "react";

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

  const revoke = (img?: ProductImageState | null) => {
    if (img?.file && img.url.startsWith("blob:")) {
      URL.revokeObjectURL(img.url);
    }
  };

  useEffect(() => {
    const currentImage = image;

    return () => {
      revoke(currentImage);
    };
  }, [image]);

  const handleImageDrop = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setImage((prev) => {
      revoke(prev);

      return {
        id: `IMG-${Date.now()}`,
        url: previewUrl,
        fileName: file.name,
        file
      };
    });
  };

  const handleImageRemove = () => {
    setImage((prev) => {
      revoke(prev);
      return null;
    });
  };

  return {
    image,
    handleImageDrop,
    handleImageRemove 
  };
}
