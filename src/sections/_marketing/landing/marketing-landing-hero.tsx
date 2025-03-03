import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { Grid } from "@mui/material";

// ----------------------------------------------------------------------

export default function MarketingLandingHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/background/landing_page_bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: theme.palette.text.primary,
        overflow: "hidden",
      }}
      id="home"
    >
      <Container
        sx={{
          py: { xs: 10, md: 15 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                my: 3,
                fontWeight: theme.typography.fontWeightBold,
                color: theme.palette.common.white,
              }}
            >
              Empowering Innovation,
              <br /> Delivering Excellence
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: alpha(theme.palette.common.white, 0.8),
                maxWidth: "600px",
              }}
            >
              We drive digital transformation, blending technical expertise and
              industry insight to deliver unmatched value to clients.
            </Typography>

            <Stack
              spacing={3}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              justifyContent={{ xs: "center", md: "unset" }}
              sx={{ mt: 5 }}
            >
              <Button
                variant="contained"
                size="large"
                href="#contact-us"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
