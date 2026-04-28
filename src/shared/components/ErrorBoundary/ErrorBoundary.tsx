import { Box, Button, Stack, Typography } from "@mui/material";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { withTranslation, type WithTranslation } from "react-i18next";

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    try {
      const user = localStorage.getItem("authUser");
      window.location.href = user ? "/overview" : "/signup";
    } catch {
      window.location.href = "/signup";
    }
  };

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
             textAlign: "center",
            p: 3
          }}
        >
          <Box sx={{ maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>
              {t("error:somethingWentWrong")}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {t("error:anUnexpectedErrorOccurred")}
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" onClick={this.handleReload}>
                {t("common:actions.reload")}
              </Button>

              <Button variant="outlined" onClick={this.handleGoHome}>
                {t("common:actions.goToOverview")}
              </Button>
            </Stack>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithTranslation = withTranslation()(ErrorBoundary);
export default ErrorBoundaryWithTranslation;
