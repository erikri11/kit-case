export const validateTitle = (title: string) => {
  const value = title.trim();

  if(!value) return "common:validation.titleRequired";
  if(!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(value)) return "common:validation.titleInvalid";
  return undefined;
};
