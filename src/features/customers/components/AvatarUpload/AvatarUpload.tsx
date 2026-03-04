import * as React from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useEffect } from "react";
import { resolveAvatarSrc } from "@features/customers/utils/resolveAvatarSrc";
import type { UploadResponse } from "@features/customers/models/uploadResponse";

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

    const res = await fetch("http://localhost:4000/uploads/avatar", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || "Upload failed");
    }

    return res.json();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const okType = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type);
    if (!okType) {
      alert("Please select an image (jpeg/png/webp/gif).");
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
      alert("Upload failed. Check backend/cors.");
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
    <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          border: "1px dashed var(--mui-palette-divider)",
          borderRadius: "50%",
          display: "inline-flex",
          p: "4px",
        }}
      >
        <Avatar
          src={avatarSrc}
          sx={{
            width: 100,
            height: 100,
            alignItems: "center",
            bgcolor: "var(--mui-palette-background-level1)",
            color: "var(--mui-palette-text-primary)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!avatarSrc ? <CameraAltOutlinedIcon /> : null}
        </Avatar>
      </Box>

      <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
        <Typography variant="subtitle1">Avatar</Typography>
        <Typography variant="caption">Min 400x400px, PNG or JPEG</Typography>

        <Button
          color="secondary"
          variant="outlined"
          onClick={openFilePicker}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Select"}
        </Button>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
        />

        {avatarUrl ? (
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Uploaded: {avatarUrl}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
}