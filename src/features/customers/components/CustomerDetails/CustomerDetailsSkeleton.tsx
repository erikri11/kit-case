import { Avatar, Box, Card, CardContent, CardHeader, Divider, Grid, Skeleton, Stack } from "@mui/material";

export function CustomerDetailsSkeleton() {
  return (
    <>
      {/* Back link */}
      <Box sx={{ mb: 4 }}>
        <Skeleton width={120} height={24} />
      </Box>

      {/* Avatar + name */}
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 4 }}>
        <Skeleton variant="circular" width={64} height={64} />

        <Stack spacing={1}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Skeleton width={160} height={32} />
            <Skeleton width={80} height={28} />
          </Stack>

          <Skeleton width={180} />
        </Stack>
      </Stack>

      {/* Cards */}
      <Grid container spacing={4}>
        {/* Basic details */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar>
                  <Skeleton variant="circular" width={24} height={24} />
                </Avatar>
              }
              title={<Skeleton width={120} />}
            />
            <CardContent>
              <Stack spacing={2}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Stack key={i} spacing={0.5}>
                    <Skeleton width={100} />
                    <Skeleton width="60%" height={24} />
                    {i !== 5 && <Divider />}
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Payments */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar>
                  <Skeleton variant="circular" width={24} height={24} />
                </Avatar>
              }
              title={<Skeleton width={100} />}
            />
            <CardContent>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2,
                  mb: 3
                }}
              >
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Stack spacing={0.5}>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={60} height={32} />
                  </Stack>

                  <Stack spacing={0.5}>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={80} height={32} />
                  </Stack>

                  <Stack spacing={0.5}>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={80} height={32} />
                  </Stack>
                </Stack>
              </Box>
              <Skeleton variant="rectangular" height={200} />
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar>
                  <Skeleton variant="circular" width={24} height={24} />
                </Avatar>
              }
              title={<Skeleton width={100} />}
            />
            <CardContent>
              <Stack spacing={2}>
                <Skeleton width={160} height={40} />
                <Skeleton width="90%" />
                <Skeleton width="70%" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
