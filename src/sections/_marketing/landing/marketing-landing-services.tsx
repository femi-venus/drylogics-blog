import { type FC } from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import SvgColor from "@/src/components/svg-color";
import TextMaxLine from "@/src/components/text-max-line";

// ----------------------------------------------------------------------

const COLORS = ["primary", "secondary", "success", "warning", "success"] as const;
const SERVICES = [
  {
    name: "Software Development",
    icon: "./assets/images/process/document_storage.svg",
    content: (
      <div>
        Mobile App Development
        <br /> Cloud-Based Solutions <br />
        Web Application Development <br /> Custom Software Development
      </div>
    ),
    path: "",
  },
  {
    name: "Managed IT Services",
    icon: "./assets/images/process/workflow_management.svg",
    content: (
      <div>
        Network Management <br />
        Help Desk Support <br /> Data Backup & Recovery <br /> IT Security
        Management
      </div>
    ),
    path: "",
  },
  {
    name: "IT Consulting",
    icon: "./assets/images/process/resource_management.svg",
    content: (
      <div>
        Digital Transformation
        <br />
        IT Infrastructure Optimization
        <br />
        Technology Strategy & Planning
        <br />
        Cybersecurity Solutions
      </div>
    ),
    path: "",
  },
  {
    name: "Digital Marketing",
    icon: "./assets/images/process/capacity_planning.svg",
    content: (
      <div>
        Content Marketing
        <br />
        Social Media Marketing
        <br />
        Pay-Per-Click (PPC) Advertising
        <br />
        Search Engine Optimization (SEO)
      </div>
    ),
    path: "",
  },
  {
    name: "AI Solutions",
    icon: "./assets/images/process/capacity_planning.svg",
    content: (
      <div>
        AI-Powered Prospecting <br />
        Automated Outreach <br />
        Predictive Lead Scoring <br />
        Personalized Engagement
      </div>
    ),
    path: "",
  },
];

// ----------------------------------------------------------------------

type ServiceItemProps = {
  service: {
    name: string;
    content: React.ReactNode;
    path: string;
    icon: string;
  };
  index: number;
};

const ServiceItem: FC<ServiceItemProps> = ({ service, index }) => {
  const { name, icon, content } = service;
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 4,
        boxSizing: "border-box",
      }}
    >
      <SvgColor
        src={icon}
        sx={{
          width: 50,
          height: 50,
          mx: "auto",
          color: (theme) => theme.palette[COLORS[index]].main,
        }}
      />
      <Stack spacing={1} sx={{ my: 5, flexGrow: 1 }}>
        <TextMaxLine
          variant="h6"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            textAlign: "center",
          }}
        >
          {name}
        </TextMaxLine>
        <TextMaxLine
          variant="body2"
          line={6}
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            textAlign: "center",
          }}
        >
          {content}
        </TextMaxLine>
      </Stack>
    </Card>
  );
};

const MarketingLandingServices: FC = () => {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
      id="services"
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 480,
          mb: { xs: 8, md: 5 },
          mx: { xs: "auto", md: "unset" },
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Typography variant="overline" sx={{ color: "text.disabled" }}>
          Our Services
        </Typography>
        <Typography variant="h2">We Provide</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          A diverse array of services to cater to a wide range of needs and preferences.
        </Typography>
      </Stack>

      <Box>
        <Grid container spacing={3}>
          {SERVICES.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={service.name}>
              <ServiceItem service={service} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MarketingLandingServices;
