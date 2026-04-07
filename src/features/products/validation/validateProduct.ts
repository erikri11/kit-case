export const validateName = (name: string) => {
  const value = name.trim();

  if (!value) return "common:validation.nameRequired";
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' .&-]+$/.test(value)) return "common:validation.nameInvalid";

  return undefined;
};

export const validatePrice = (price: string) => {
  const value = price.trim();
  const num = Number(value);

  if (!value) return "common:validation.priceRequired";
  if (!Number.isFinite(num) || num < 0) return "common:validation.priceInvalid";

  return undefined;
};

export const validateQuantity = (quantity: string) => {
  const value = quantity.trim();
  const num = Number(value);

  if (!value) return "common:validation.quantityRequired";
  if (!Number.isFinite(num) || num < 0) return "common:validation.quantityInvalid";
  
  return undefined;
};
