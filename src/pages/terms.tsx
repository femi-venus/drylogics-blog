import React from "react";
import {
  Typography,
  Box,
  Link,
  Divider,
  Grid,
  Paper,
  Container,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const TermsOfService = () => {
  const paths = {
    privacy: "/privacy",
  };
 

  return (
    <Box
      sx={{
        py: 6,
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Terms of Service
          </Typography>
          <Divider sx={{ my: 3 }} />
          
          {/* Effective Date */}
          <Typography
            variant="subtitle1"
            paragraph
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            Effective Date: <strong>01-01-2025</strong>
          </Typography>

          {/* Introduction */}
          <Typography variant="body1" paragraph>
            Welcome to Drylogic Solutions! These Terms of Service ("Terms")
            govern your access to and use of our IT consulting and development
            services ("Services"). By engaging with our Services, you agree to
            these Terms. If you do not agree, please refrain from using our
            Services.
          </Typography>

          {/* Terms Sections */}
          <Grid container spacing={4}>
            {/* Section 1 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                By using the Software, you:
              </Typography>
              <Box component="ul" sx={{ pl: 4 }}>
                <Typography component="li" variant="body1" paragraph>
                  Represent that you are at least 18 years of age or have the
                  legal capacity to enter into agreements.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Agree to comply with these Terms and all applicable laws and
                  regulations.
                </Typography>
              </Box>
            </Grid>

            {/* Section 2 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                2. License to Use the Software
              </Typography>
              <Typography variant="body1" paragraph>
                - Drylogic Solutions grants you a non-exclusive, non-transferable,
                revocable license to use the Software for the duration of your
                subscription.
                <br />- The license is for team use only and is subject to any
                limitations stated in your subscription plan.
              </Typography>
            </Grid>

            {/* Section 3 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                3. Restrictions
              </Typography>
              <Typography variant="body1" paragraph>
                You agree not to:
              </Typography>
              <Box component="ul" sx={{ pl: 4 }}>
                <Typography component="li" variant="body1" paragraph>
                  Reverse engineer, decompile, or disassemble the Software.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Modify, reproduce, or distribute the Software.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Use the Software for unlawful or unauthorized purposes.
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  Transfer or sublicense your license to any third party without
                  prior written consent.
                </Typography>
              </Box>
            </Grid>

            {/* Section 4 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                4. Ownership and Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                - The Software, including its underlying code, design, and
                features, is the exclusive property of Drylogic Solutions.
                <br />- All customer data input into the Software belongs to the
                customer.
                <br />- The use of open-source components is subject to their
                respective licenses.
              </Typography>
            </Grid>

            {/* Add more sections in a similar style */}

            {/* Section 11 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                11. Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                Your use of the Software is also governed by our{" "}
                <Link href={paths.privacy} color="primary">
                  Privacy Policy
                </Link>
                , which is incorporated by reference.
              </Typography>
            </Grid>

            {/* Section 13 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", mt: 4 }}
              >
                13. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                For questions or concerns about these Terms, please contact us at:
                <br />
                <strong>Drylogic Solutions</strong>
                <br />
                Email: [Insert Contact Email]
                <br />
                Phone: [Insert Contact Number]
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />
          
          {/* Footer */}
          <Typography
            variant="body1"
            paragraph
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            For questions or concerns, contact us at{" "}
            <strong>[Insert Email]</strong>.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
};

export default TermsOfService;
