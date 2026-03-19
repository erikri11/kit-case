import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import type { DropzoneOptions} from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

export interface FileDropzoneProps extends DropzoneOptions {
	caption?: string;
}

export function FileDropzone({ 
  caption,
   ...props 
  }: FileDropzoneProps) {
    
  const { t } = useTranslation("common");
	const { getRootProps, getInputProps, isDragActive } = useDropzone(props);

	return (
		<Stack spacing={2}>
			<Box
				sx={{
					alignItems: "center",
          border: "1px dashed",
          borderColor: "divider",
					borderRadius: 1,
					cursor: "pointer",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					outline: "none",
					p: 6,
					...(isDragActive && 
            { bgcolor: "action.selected", opacity: 0.5 }),
					  "&:hover": { ...(!isDragActive && { bgcolor: "action.hover" }) }
				}}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<Stack 
          direction="row" 
          spacing={2} 
          sx={{ alignItems: "center" }}
        >
					<Avatar
						sx={{
							color: "text.primary",
              boxShadow: 4
						}}
					>
						<BackupOutlinedIcon />
					</Avatar>
					<Stack spacing={1}>
						<Typography variant="h6">
							<Typography 
                component="span" 
                variant="inherit"
                sx={{ textDecoration: "underline" }} 
              >
								{t("common:actions.clickToUpload")}
							</Typography>{" "}
							{t("common:actions.orDragAndDrop")}
						</Typography>
						{caption ? (
							<Typography color="text.secondary" variant="body2">
								{caption}
							</Typography>
						) : null}
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
}
