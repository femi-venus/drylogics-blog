import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { alpha, styled, useTheme } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { bgGradient } from "@/src/theme/css";
import Iconify from "@/src/components/iconify";
import { Grid } from "@mui/material";

// ----------------------------------------------------------------------

const StyledInput = styled((props: TextFieldProps) => (
  <TextField fullWidth {...props} />
))(({ theme }) => ({
  [`& .${inputBaseClasses.input}`]: {
    color: theme.palette.common.white,
  },
  [`& .${inputLabelClasses.root}.${inputLabelClasses.shrink}`]: {
    color: theme.palette.grey[500],
    [`&.${inputLabelClasses.focused}`]: {
      color: theme.palette.grey[500],
    },
  },
}));

// ----------------------------------------------------------------------

export default function MarketingLandingFreeSEO() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0),
          imgUrl: "/assets/images/marketing/marketing_get_free_seo.jpg",
        }),
        overflow: "hidden",
        py: { xs: 10, md: 15 },
      }}
      id="contact-us"
    >
      <Container>
        <Grid
          container
          spacing={{
            xs: 5,
            md: 8,
          }}
          justifyContent="space-between"
        >
          <Grid xs={12} md={6} />

          <Grid xs={12} md={4}>
            <Typography
              variant="h1"
              component="h2"
              sx={{
                color: "primary.main",
                mb: { xs: 3, md: 8 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Contact Us
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ color: "common.white", mb: 2 }}
            >
              <Iconify icon="carbon:email" width={24} sx={{ mr: 2 }} />

              <Link color="inherit" href="mailto:info@drylogics.com">
                info@drylogics.com
              </Link>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ color: "common.white", mb: 2 }}
            >
              <Iconify icon="carbon:location" width={24} sx={{ mr: 2 }} />
              56, Race Course Road,
              <br />
              Coimbatore - 641 018.
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ color: "common.white" }}
            >
              <Iconify icon="solar:phone-outline" width={24} sx={{ mr: 2 }} />
              +91 97900 06521
            </Stack>
          </Grid>
          <Grid xs={12} md={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ color: "common.white", mt: 18 }}
            >
              <Iconify icon="your-qr-code-icon" width={24} sx={{ mr: 2 }} />
              <img
                src="/assets/images/qr/qr.png"
                alt="QR Code"
                width={125}
                height={125}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
