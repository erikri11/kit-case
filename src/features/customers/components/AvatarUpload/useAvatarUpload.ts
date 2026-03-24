import type { UploadResponse } from "@features/customers/models/uploadResponse";
import { resolveAvatarSrc } from "@features/customers/utils/resolveAvatarSrc";
import { API_BASE, API_PREFIX } from "@shared/config/api";
import { useSnackbar } from "@shared/context/snackbar/useSnackbar";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function useAvatarUpload(
  avatarPreview: string | null,
  avatar: string | null,
  setAvatarPreview: (v: string | null | ((prev: string | null) => string | null)) => void,
  setAvatar: (v: string | null) => void
) {
  
  const { t } = useTranslation("common");
  const { setSnackbarMessage } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Cleanup preview object URL when it changes/unmounts
  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  async function uploadAvatarApi(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE}${API_PREFIX}/uploads/avatar`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || t("common:uploadAvatarFailed"));
    }

    return response.json();
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const okType = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type);
    if (!okType) {
      setSnackbarMessage({ 
        content: t("common:pleaseSelectImage"),
        type: "error" 
      });
      e.target.value = "";
      return;
    }

    // 1) Show preview immediately
    setAvatarPreview((prev: string | null) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return URL.createObjectURL(file);
    });

    // 2) Upload to backend
    try {
      setIsUploading(true);
      const result = await uploadAvatarApi(file);
      setAvatar(result.fullUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error uploading avatar:", errorMessage);

      setSnackbarMessage({ 
        content: t("common:uploadAvatarFailed"),
        type: "error" 
      });

      setAvatar(null);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  function openFilePicker() {
    fileInputRef.current?.click();
  };

  function handleRemoveAvatar() {
    setAvatarPreview((prev: string | null) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });

    setAvatar(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const avatarSrc = resolveAvatarSrc(avatar ?? avatarPreview);
  const hasAvatar = Boolean(avatarSrc);

  return {
    t,
    avatarSrc,
    isUploading,
    hasAvatar,
    fileInputRef,
    openFilePicker,
    handleRemoveAvatar,
    handleFileChange
  }
}
