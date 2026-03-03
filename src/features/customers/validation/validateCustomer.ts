export const validateName = (name: string) => {
  if(!name.trim()) return 'Name is required';
  if(!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name.trim())) return 'Invalid name format';
  return undefined;
};

export const validateEmail = (email: string) => {
  if (!email.trim()) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
  return undefined;
};

export const validatePhone = (phone: string) => {
  if (!phone.trim()) return 'Phone is required';
  if (!/^\+?[0-9\s\-()]+$/.test(phone.trim())) return 'Invalid phone format';
  return undefined;
};
