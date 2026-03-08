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
        <Grid size={{ xs: 12, md: 5 }}>
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
        <Grid size={{ xs: 12, md: 7 }}>
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
              <Skeleton height={120} />
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid size={{ xs: 12, md: 5 }}>
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
