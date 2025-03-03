import _ from "lodash";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import Image from "@/src/components/image";
import { fShortenNumber } from "@/src/utils/format-number";
import { bgBlur } from "@/src/theme/css";
import { Grid } from "@mui/material";
// ----------------------------------------------------------------------

const ROWS = [
  {
    label: "capacity",
    total: 35,
    content:
      "Our capacity knows no bounds, enabling us to handle any challenge, regardless of scale or complexity, with unwavering efficiency and excellence.",
  },
  {
    label: "years of excellence",
    total: 10,
    content:
      "We boast a wealth of expertise derived from nine years of dedicated and diverse experience across a spectrum of industries and professional capacities.",
  },
];

// ----------------------------------------------------------------------

export default function MarketingLandingAbout() {
  return (
    <Box
      sx={{
        ...bgBlur({
          color: "#FFFFFF",
        }),
        overflow: "hidden",
        py: { xs: 5, md: 10 },
      }}
      id="about-us"
    >
      <Container>
        <Grid
          container
          columnSpacing={{ xs: 0, md: 3 }}
          rowSpacing={{ xs: 5, md: 0 }}
          justifyContent="space-between"
        >
          <Grid
            xs={12}
            md={5}
            sx={{
              textAlign: { xs: "center", md: "right" },
            }}
          >
            <Image
              alt="software development engineers"
              src="/assets/images/software_development_engineers.jpg"
              ratio="3/4"
              sx={{
                borderRadius: 1.5,
                mb: { xs: 5, md: 10 },
                opacity: "75%",
              }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={5}>
              <Typography variant="h1" sx={{ my: 3, color: "common.black" }}>
                Expert Software Development Engineers
              </Typography>

              <Typography sx={{ color: "common.black" }}>
                Welcome to our world of excellence, where our expert software
                development engineers are dedicated to crafting innovative
                solutions tailored to elevate your business. With a wealth of
                experience and a commitment to cutting-edge technologies, our
                team ensures the delivery of top-notch software solutions.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          columnSpacing={{ xs: 0, md: 3 }}
          rowSpacing={{ xs: 5, md: 0 }}
          justifyContent="space-between"
        >
          <Grid
            xs={12}
            md={5}
            sx={{
              textAlign: { xs: "center", md: "right" },
            }}
          >
            <Typography
              component="div"
              variant="overline"
              sx={{ color: "common.black" }}
            >
              About Us
            </Typography>

            <Typography variant="h2" sx={{ my: 3, color: "common.black" }}>
              Who We Are
            </Typography>

            <Typography sx={{ color: "common.black" }}>
              At Drylogic Solutions, we are committed to revolutionizing how
              businesses manage their documents, resources, workflows, and more.
              Our suite of innovative solutions empowers you to streamline
              operations, increase productivity <br /> and achieve your
              strategic goals.{" "}
            </Typography>
          </Grid>

          <Grid xs={12} md={6} pt={4}>
            <Stack spacing={5}>
              {ROWS.map((row) => (
                <Stack
                  key={row.label}
                  direction="row"
                  alignItems="center"
                  divider={
                    <Divider
                      flexItem
                      orientation="vertical"
                      sx={{ ml: 3, mr: 5, borderStyle: "dashed" }}
                    />
                  }
                >
                  <Stack spacing={1} sx={{ width: 1, maxWidth: 100 }}>
                    <Stack direction="row">
                      <Typography variant="h2" sx={{ color: "common.black" }}>
                        {_.isFinite(row.total)
                          ? fShortenNumber(row.total)
                          : row.total}
                      </Typography>
                      {_.isFinite(row.total) && (
                        <Box
                          component="span"
                          sx={{ color: "primary.main", typography: "h4" }}
                        >
                          +
                        </Box>
                      )}
                    </Stack>

                    <Typography
                      variant="overline"
                      sx={{ color: "common.black" }}
                    >
                      {row.label}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: "common.black" }}>
                    {row.content}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
