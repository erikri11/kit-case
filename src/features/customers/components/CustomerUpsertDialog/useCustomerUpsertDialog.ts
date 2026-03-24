import { useState } from "react";
import { useTranslation } from "react-i18next";
import { customerApi } from "@features/customers/api/customersApi";
import type { CustomerCreate, CustomerFieldName, CustomerStatus, CustomerUpdate } from "@features/customers/models/customer.model";
import { validateEmail, validateName, validatePhone } from "@features/customers/validation/validateCustomer";
import type { Mode } from "@shared/types/mode";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";

export function useCustomerUpsertDialog(
  mode: Mode,
  onClose: () => void,
  customerId?: string, 
  initialCustomer?: CustomerUpdate
) {
  const { t } = useTranslation(["customers", "common"]);
  const { setSnackbarMessage } = useSnackbar();

  const [name, setName] = useState<string>(initialCustomer?.name ?? '');
  const [email, setEmail] = useState<string>(initialCustomer?.email ?? '');
  const [phone, setPhone] = useState<string>(initialCustomer?.phone ?? '');
  const [quota, setQuota] = useState<number>(initialCustomer?.quota ?? 0);
  const [status, setStatus] = useState<CustomerStatus>(initialCustomer?.status ?? "Pending");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<CustomerFieldName, boolean>>({
    name: false, 
    email: false, 
    phone: false 
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);
  
  const showNameError = !!nameError && (touched.name || submitted);
  const showEmailError = !!emailError && (touched.email || submitted);
  const showPhoneError = !!phoneError && (touched.phone || submitted);

  const canSubmit = !nameError && !emailError && !phoneError;

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

        await customerApi.post(payload);

        setSnackbarMessage({ 
          content: t("customers:snackbar.addSuccess"), 
          type: "success" 
        });
      } else if (mode === "edit") {
        if (!customerId) return;
        
        const payload: CustomerUpdate = {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          quota: quota,
          status: status as CustomerUpdate["status"],
          avatarUrl: avatarUrl ?? undefined,
        };

        await customerApi.put(customerId, payload);
        
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
        content:
          mode === "add"
            ? t("customers:snackbar.addError")
            : t("customers:snackbar.updateError"),
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
