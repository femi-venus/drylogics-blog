import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Image from "@/src/components/image";
import { Grid } from "@mui/material";

// ----------------------------------------------------------------------

export default function ElearningLandingIntroduce() {

  return (
    <Container
      sx={{
        py: { xs: 8, md: 15 },
      }}
    >
      <Grid
        container
        spacing={3}
        alignItems={{ md: "center" }}
        justifyContent={{ md: "space-between" }}
      >
       
          <Grid xs={12} md={6} lg={5}>
            <Image
              alt="about"
              src="/assets/images/course/top_it_services.jpg"
              ratio="4/6"
              sx={{ borderRadius: 2, opacity: "50%" }}
            />
          </Grid>

        

        <Grid xs={12} md={6} lg={6}>
          <Typography
            variant="overline"
            sx={{
              display: "block",
              color: "primary.main",
              mb: { xs: 1, md: 2 },
            }}
          >
            Key Differentiators
          </Typography>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Tailored Solutions: Client Focus & Adaptability
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Our approach prioritizes client needs, adapting swiftly to market
            changes, fostering enduring partnerships through personalized
            services and expertise.
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 5, md: 10 }}
            sx={{ mt: { xs: 8, md: 10 } }}
          >
            <Stack spacing={3}>
              <Box sx={{ width: 24, height: 3, bgcolor: "primary.main" }} />
              <Typography sx={{ color: "text.primary" }}>
                Innovative Solutions
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Leveraging cutting-edge technologies to develop bespoke
                solutions tailored to our clients' unique needs.
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box sx={{ width: 24, height: 3, bgcolor: "primary.main" }} />
              <Typography sx={{ color: "text.primary" }}>
                Customer-Centric Approach
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Focusing on building long-term partnerships and delivering
                personalized services that exceed expectations.{" "}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 5, md: 10 }}
            sx={{ mt: { xs: 2, md: 5 } }}
          >
            <Stack spacing={3}>
              <Box sx={{ width: 24, height: 3, bgcolor: "primary.main" }} />
              <Typography sx={{ color: "text.primary" }}>Expertise</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                A team of highly skilled professionals with extensive experience
                across various industries and technology domains.
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <Box sx={{ width: 24, height: 3, bgcolor: "primary.main" }} />
              <Typography sx={{ color: "text.primary" }}>Agility</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Adapting quickly to changing market trends and client
                requirements to ensure timely delivery and maximum satisfaction.
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
