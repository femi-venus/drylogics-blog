import { useState, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import Image from "next/image"; // Next.js optimized image
import Iconify from "@/src/components/iconify";
import { Grid } from "@mui/material";

// Static FAQs data
const faqs = [
  { id: 1, question: "What services do you offer?", answer: "We provide a range of services including web development, UI/UX design, and more." },
  { id: 2, question: "How can I contact support?", answer: "You can reach us through email at support@example.com." },
  { id: 3, question: "Do you offer custom solutions?", answer: "Yes, we tailor our services to meet your specific needs." },
];

export default function MarketingLandingFaqs() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeExpanded = useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return (
    <Container sx={{ pt: { xs: 5, md: 10 }, pb: { xs: 10, md: 15 } }}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6} lg={6}>
          <Stack spacing={2} sx={{ mb: 5, textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="overline" color="text.disabled">
              FAQS
            </Typography>
            <Typography variant="h2">Frequently Asked Questions</Typography>
          </Stack>

          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.question}
              onChange={handleChangeExpanded(faq.question)}
            >
              <AccordionSummary
                sx={{
                  minHeight: 64,
                  [`& .${accordionSummaryClasses.content}`]: { p: 0, m: 0 },
                  [`&.${accordionSummaryClasses.expanded}`]: { bgcolor: "action.selected" },
                }}
              >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {faq.question}
                </Typography>
                <Iconify width={24} icon={expanded === faq.question ? "carbon:subtract" : "carbon:add"} />
              </AccordionSummary>
              <AccordionDetails>{faq.answer}</AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        <Grid item xs={12} md={6} lg={5} sx={{ display: { xs: "none", md: "block" } }}>
          <Image alt="faqs" src="/assets/illustrations/illustration_faqs.svg" width={500} height={500} />
        </Grid>
      </Grid>
    </Container>
  );
}
