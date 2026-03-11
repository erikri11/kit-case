import { CustomersApi } from "@features/customers/api/customersApi";
import type { CustomerCreate, CustomerUpdate } from "@features/customers/models/customer.model";
import type { FieldName } from "@features/customers/models/fieldName";
import type { Mode } from "@features/customers/models/mode";
import { validateEmail, validateName, validatePhone } from "@features/customers/validation/validateCustomer";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useCustomerUpsertDialog(
  mode: Mode,
  onClose: () => void,
  customerId?: string, 
  initialCustomer?: CustomerUpdate
) {
  const { t } = useTranslation("customers");
  const { setSnackbarMessage } = useSnackbar();

  const [name, setName] = useState<string>(initialCustomer?.name ?? '');
  const [email, setEmail] = useState<string>(initialCustomer?.email ?? '');
  const [phone, setPhone] = useState<string>(initialCustomer?.phone ?? '');
  const [quota, setQuota] = useState<number>(initialCustomer?.quota ?? 0);
  const [status, setStatus] = useState<string>(initialCustomer?.status ?? t("customers:statusPending"));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false, 
    email: false, 
    phone: false 
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);
  
  const canSubmit = !nameError && !emailError && !phoneError;

  const showNameError = !!nameError && (touched.name || submitted);
  const showEmailError = !!emailError && (touched.email || submitted);
  const showPhoneError = !!phoneError && (touched.phone || submitted);

  const handleUpsertCustomer = async () => { 
    setSubmitted(true);
    if (!canSubmit) return;

    try {
      if (mode === "add") {
         const payload: CustomerCreate = { 
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          avatarUrl: avatarUrl ?? undefined,
        };

        await CustomersApi.post(payload);

        setSnackbarMessage({ 
          content: t("customers:snackbar.addSuccess"), 
          type: "success" 
        });
      } else if (mode === "edit" && customerId) {
        const payload: CustomerUpdate = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          quota: quota,
          status: status as CustomerUpdate["status"],
          avatarUrl: avatarUrl ?? undefined,
        };

        await CustomersApi.put(customerId, payload);
        
        setSnackbarMessage({ 
          content: t("customers:snackbar.updateSuccess"), 
          type: "success" 
        });
      }
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error updating customer:", errorMessage);

      setSnackbarMessage({ 
        content: t("customers:snackbar.updateError"), 
        type: "error" 
      });
    }
  };

  return {
    t,
    name,
    email,
    phone,
    quota,
    status,
    avatarUrl,
    avatarPreview,
    canSubmit,
    nameError,
    emailError,
    phoneError,
    showNameError,
    showEmailError,
    showPhoneError,
    setName,
    setEmail,
    setPhone,
    setQuota,
    setStatus,
    setAvatarUrl,
    setAvatarPreview,
    setTouched,
    handleUpsertCustomer
  }
}
