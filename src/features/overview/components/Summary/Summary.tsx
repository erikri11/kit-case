import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TrendDownIcon from "@mui/icons-material/TrendingDown";
import TrendUpIcon from "@mui/icons-material/TrendingUp";
import type { Trend } from "@features/overview/models/trend";

export interface SummaryProps {
	amount: number;
	diff: number;
	icon: React.ElementType;
	title: string;
	trend: Trend;
	sx?: object;
}

export function Summary({ 
  amount, 
  diff, 
  icon: Icon, 
  title, 
	trend,
	sx
}: SummaryProps) {

	const { t, i18n } = useTranslation("common");

	const trendColor = trend === "up" ? "success.main" : "error.main";
	const percentFormatter = new Intl.NumberFormat(i18n.language, {
		style: "percent",
		maximumFractionDigits: 2
	});

	return (
		<Card variant="outlined">
			<CardContent>
				<Stack 
					direction="row" 
					spacing={3} 
					sx={{ alignItems: "center" }}
				>
					<Avatar sx={sx}>
						<Icon />
					</Avatar>
					<Stack>
						<Typography color="text.secondary" variant="body1">
							{title}
						</Typography>
						<Typography variant="h3">
							{amount}
							</Typography>
					</Stack>
				</Stack>
			</CardContent>

			<Divider />

			<Box sx={{ p: 1 }}>
				<Stack 
					direction="row" 
					spacing={1} 
					sx={{ alignItems: "center" }}
				>
					<Stack
						sx={{
							alignItems: "center",
							justifyContent: "center",
							color: trendColor
						}}
					>
						{trend === "up" ? <TrendUpIcon /> : <TrendDownIcon />}
					</Stack>
					<Typography color="text.secondary" variant="body2">
						<Typography 
							color={trendColor} 
							component="span" 
							variant="subtitle2"
						>
							{percentFormatter.format(diff / 100)}
						</Typography>{" "}
						{trend === "up" ? t('overview:increase') : t('overview:decrease')} {t('overview:vsLastMonth')}
					</Typography>
				</Stack>
			</Box>
		</Card>
	);
}
