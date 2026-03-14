import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useAvatarUpload } from "./useAvatarUpload";

interface AvatarUploadProps {
  avatarPreview: string | null;
  avatarUrl: string | null;
  setAvatarPreview: (v: string | null | ((prev: string | null) => string | null)) => void;
  setAvatarUrl: (v: string | null) => void;
}

export function AvatarUpload({
  avatarPreview,
  avatarUrl,
  setAvatarPreview,
  setAvatarUrl
}: AvatarUploadProps) {
  const {
    t,
    avatarSrc,
    isUploading,
    hasAvatar,
    fileInputRef,
    openFilePicker,
    handleRemoveAvatar,
    handleFileChange
  } = useAvatarUpload(
    avatarPreview,  
    avatarUrl, 
    setAvatarPreview, 
    setAvatarUrl
  );

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
        <Typography variant="subtitle1">{t("common:labels.avatar")}</Typography>
        <Typography variant="caption">{t("customers:avatarUploadHint")}</Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Button
            loading={isUploading}
            loadingPosition="start"
            color="inherit"
            variant="outlined"
            onClick={openFilePicker}
            disabled={isUploading}
          >
            {hasAvatar ? t("common:actions.change") : t("common:actions.select")}
          </Button>

          {hasAvatar && (
            <Button
              color="error"
              variant="outlined"
              onClick={handleRemoveAvatar}
              disabled={isUploading}
            >
              {t("common:actions.remove")}
            </Button>
          )}
        </Stack>

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
