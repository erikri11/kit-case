import * as React from "react";
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useEffect } from "react";
import { resolveAvatarSrc } from "@features/customers/utils/resolveAvatarSrc";
import type { UploadResponse } from "@features/customers/models/uploadResponse";
import { API_BASE, API_PREFIX } from "@shared/config/api";

interface AvatarUploadProps {
  avatarPreview: string | null;
  setAvatarPreview: (v: string | null | ((prev: string | null) => string | null)) => void;
  avatarUrl: string | null;
  setAvatarUrl: (v: string | null) => void;
}

export function AvatarUpload({
  avatarPreview,
  setAvatarPreview,
  avatarUrl,
  setAvatarUrl,
}: AvatarUploadProps) {

  const { t } = useTranslation('customers');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  // Cleanup preview object URL when it changes/unmounts
  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  async function uploadsAvatarApi(file: File): Promise<UploadResponse> {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`${API_BASE}${API_PREFIX}/uploads/avatar`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || t("common:uploadFailed"));
    }

    return res.json();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const okType = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type);
    if (!okType) {
      // TODO: add Snackbar instead of alert
      alert(t("Please select an image (jpeg/png/webp/gif)."));
      e.target.value = "";
      return;
    }

    // 1) Show preview immediately (replace previous preview safely)
    setAvatarPreview((prev: string | null) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    // 2) Upload to backend
    try {
      setIsUploading(true);
      const result = await uploadsAvatarApi(file);
      setAvatarUrl(result.fullUrl);
    } catch (err) {
      console.error(err);
      // TODO: add Snackbar instead of alert
      alert(t("Upload failed. Check backend/cors."));
      setAvatarUrl(null);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  const avatarSrc = resolveAvatarSrc(avatarUrl ?? avatarPreview);

  return (
    <Stack 
      direction="row" 
      spacing={3} 
      sx={{ alignItems: "center" }}
    >
      <Box
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: "50%",
          display: "inline-flex",
          p: 0.5
        }}
      >
        <Avatar
          src={avatarSrc}
          sx={{
            width: 100,
            height: 100,
            alignItems: "center",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {!avatarSrc ? <CameraAltOutlinedIcon /> : null}
        </Avatar>
      </Box>

      <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
        <Typography variant="subtitle1">{t("common:avatar")}</Typography>
        <Typography variant="caption">{t("customers:avatarUploadHint")}</Typography>

        <Button
          color="inherit"
          variant="outlined"
          onClick={openFilePicker}
          disabled={isUploading}
        >
          {/* TODO:: add LoadingButton */}
          {isUploading ? t("Uploading...") : t("Select")}
        </Button>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
        />
      </Stack>
    </Stack>
  );
}