export const validateName = (name: string) => {
  if(!name.trim()) return 'common:validation.nameRequired';
  if(!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name.trim())) return 'common:validation.nameInvalid';
  return undefined;
};

export const validateEmail = (email: string) => {
  if (!email.trim()) return 'common:validation.emailRequired';
  if (!/\S+@\S+\.\S+/.test(email)) return 'common:validation.emailInvalid';
  return undefined;
};

export const validatePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 0) return "common:validation.phoneRequired";
  if (digits.length !== 10) return "common:validation.phoneInvalid";
  return undefined;
};
