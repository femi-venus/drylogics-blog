import { useRef } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import SvgColor from "@/src/components/svg-color";

import { bgBlur } from "@/src/theme/css";
// ----------------------------------------------------------------------

const TOP = [
  {
    title: "Data Engineering",
    description:
      "Our data warehouse supports decision-making via data cleaning, integration, and ETL processes and optimizing RA3 nodes, Spectrum and other ETL enhancements.",
    icon: "/assets/icons/ic_popularity.svg",
  },
  {
    title: "DevOps",
    description:
      "Our core expertise spans: AWS, server admin, data warehousing, ETL, networking, security, proactive monitoring, featuring advanced troubleshooting and optimization competencies.",
    icon: "/assets/icons/ic_optimization.svg",
  },
  {
    title: "Full Stack Development",
    description:
      "Proficient team in ReactUS, Rails, databases. Enhancing user experience, balancing form and function, code reusability, optimizing speed, and scalability using markup languages.",
    icon: "/assets/icons/ic_secure_payment.svg",
  },
];

const BOTTOM = [
  {
    title: "Quality Assurance",
    description:
      "Our seasoned team are proficient in extensive test automation, delivering cost-effective, secure solutions by ensuring bug-free software aligned with client specifications. Confidentiality, reliability, and quality are paramount in our process.",
    icon: "/assets/icons/ic_report.svg",
  },
  {
    title: "Content Ops",
    description:
      "The Content Ops Team at Drylogics excels in social media data collection, platform updates, and customer support, fostering product optimization through seamless cross-team collaboration and efficient tool utilization.",
    icon: "/assets/icons/service/ic_service_bullhorn.svg",
  },
];

// ----------------------------------------------------------------------

export default function TravelLandingIntroduce() {


  return (
    <Box
      sx={{
        ...bgBlur({
          color: "#fff",
        }),
        pt: { xs: 2.5, md: 3.7 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Container>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mx: { xs: "auto", md: "unset" },
            mb: 12,
            textAlign: { xs: "center", md: "unset" },
            direction: "row",
          }}
        >
          <Typography variant="h2" sx={{ color: "common.black" }}>
            Our Expertise
          </Typography>
        </Stack>
      </Container>

      <Container sx={{ textAlign: "center", mb: 12 }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 8, md: 8 },
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {TOP.map((value) => (
            <Stack key={value.title} spacing={2} alignItems="center">
              <SvgColor
                src={value.icon}
                sx={{
                  mb: 3,
                  width: 64,
                  height: 64,
                  mx: "auto",
                  color: "primary.main",
                }}
              />

              <Typography variant="h5" sx={{ color: "common.black" }}>
                {value.title}
              </Typography>

              <Typography variant="body2" sx={{ color: "common.black" }}>
                {value.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
      <Container sx={{ textAlign: "center" }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 8, md: 8 },
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            },
          }}
        >
          {BOTTOM.map((value) => (
            <Stack key={value.title} spacing={2} alignItems="center">
              <SvgColor
                src={value.icon}
                sx={{
                  mb: 3,
                  width: 64,
                  height: 64,
                  mx: "auto",
                  color: "primary.main",
                }}
              />

              <Typography variant="h5" sx={{ color: "common.black" }}>
                {value.title}
              </Typography>

              <Typography variant="body2" sx={{ color: "common.black" }}>
                {value.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
