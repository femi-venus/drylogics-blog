import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Carousel, {
  CarouselArrows,
  CarouselDots,
  useCarousel,
} from "@/src/components/carousel";
import { ReactNode } from "react";
import SvgColor from "@/src/components/svg-color";
import TextMaxLine from "@/src/components/text-max-line";

// ----------------------------------------------------------------------

const COLORS = ["primary", "secondary", "success", "warning", "success"] as const;
const SERVICES = [
  {
    name: "Software Development",
    icon: "/assets/images/process/document_storage.svg",
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
    icon: "/assets/images/process/workflow_management.svg",
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
    icon: "/assets/images/process/resource_management.svg",
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
    icon: "/assets/images/process/capacity_planning.svg",
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
    icon: "/assets/images/process/capacity_planning.svg",
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

export default function MarketingLandingServices() {
  // Manually define breakpoints for static-friendly behavior
  const carousel = useCarousel({
    slidesToShow: 3, // Default for desktop
    slidesToScroll: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 900, // Tablets
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 600, // Mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    ...CarouselDots({
      rounded: true,
      sx: { mt: 5 },
    }),
  });

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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Container sx={{ position: "relative", zIndex: 9 }}>
          <CarouselArrows
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                mt: -8,
                left: 2,
                opacity: 1,
                color: "common.white",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.main" },
              },
            }}
            rightButtonProps={{
              sx: {
                mt: -8,
                right: 2,
                opacity: 1,
                color: "common.white",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.main" },
              },
            }}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {SERVICES.map((service, index) => (
                <ServiceItem key={index} service={service} index={index} />
              ))}
            </Carousel>
          </CarouselArrows>
        </Container>
      </Box>
    </Container>
  );
}

type ServiceItemProps = {
  service: {
    name: string | ReactNode;
    content: string | ReactNode;
    path: string;
    icon: string;
  };
  index: number;
};

function ServiceItem({ service, index }: ServiceItemProps) {
  const { name, icon, content } = service;
  return (
    <Card
      sx={{
        px: 4,
        py: 5,
        width: { xs: "90%", sm: "auto" },
        mx: 1,
        boxSizing: "border-box",
      }}
    >
      <SvgColor
        src={icon}
        sx={{
          width: 50,
          height: 50,
          mx: "auto",
          display: "block",
          color: (theme) => theme.palette[COLORS[index]].main,
        }}
      />
      <Stack spacing={1} sx={{ my: 5 }}>
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
}
