import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from "dayjs";
import type { Task } from "@features/tasks/models/task.model";
import { blue } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

interface TasksPreviewProps {
  tasks: Task[];
}

export function TasksPreview({ 
  tasks 
}: TasksPreviewProps) {

  const navigate = useNavigate();

  return (
		<Card variant="outlined">
			<CardHeader
				avatar={
					<Avatar 
          sx={{
              bgcolor: blue[300],
              border: "2px solid",
              borderColor: blue[500]
            }}
          >
						<CalendarTodayIcon />
					</Avatar>
				}
        title="Upcoming tasks"
				subheader={new Date().toLocaleDateString()}
			/>
			<CardContent sx={{ py: "8px" }}>
				<List disablePadding>
					{tasks.map((task) => (
						<TaskPreviewItem task={task} key={task.id} />
					))}
				</List>
			</CardContent>
			<Divider />
			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button 
          color="primary" 
          size="small"
          endIcon={<ArrowForwardIcon />} 
          onClick={() => navigate("/admin/tasks")}
        >
					View all tasks
				</Button>
			</CardActions>
		</Card>
	);
}

interface TaskPreviewItemProps {
	task: Task;
}

function TaskPreviewItem({ 
  task 
}: TaskPreviewItemProps) {

	return (
		<ListItem disableGutters>
			<Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          height: "100%",
          mr: 2
        }}
      >
				<Stack
					sx={{
          bgcolor: "customGrey.light",
          borderRadius: 1.5,
          flex: "0 0 auto",
          px: 1,
          py: 0.25,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          width: 40
        }}
				>
          <Typography variant="caption" sx={{ lineHeight: 1 }}>
            {dayjs(task.dueDate).format("MMM").toUpperCase()}
          </Typography>

          <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: "bold" }}>
            {dayjs(task.dueDate).format("D")}
          </Typography>
				</Stack>
			</Stack>
			<ListItemText
				disableTypography
				primary={
					<Typography variant="body2" noWrap>
						{task.title}
					</Typography>
				}
				secondary={
					<Typography 
            color="text.secondary" 
            variant="body2" 
            noWrap
          >
						{task.description ?? "No description"}
					</Typography>
				}
			/>
		</ListItem>
	);
}

export default TasksPreview;
