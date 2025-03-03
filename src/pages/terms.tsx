import React, { useContext } from "react";
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
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        py: 6,
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
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
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 4,
              color: "text.primary",
            }}
          >
            Terms of Service
          </Typography>

          {/* Effective Date */}
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: 3,
              color: "text.secondary",
            }}
          >
            <strong>Effective Date:</strong> 01-01-2025
          </Typography>

          <Divider sx={{ marginBottom: 4 }} />

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
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                By using the Software, you:
              </Typography>
              <ul>
                <Typography
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1 }}
                >
                  Represent that you are at least 18 years of age or have the
                  legal capacity to enter into agreements.
                </Typography>
                <Typography
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1 }}
                >
                  Agree to comply with these Terms and all applicable laws and
                  regulations.
                </Typography>
              </ul>
            </Grid>

            {/* Section 2 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                2. License to Use the Software
              </Typography>
              <Typography variant="body1" paragraph>
                - Merkensoft grants you a non-exclusive, non-transferable,
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
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                3. Restrictions
              </Typography>
              <Typography variant="body1" paragraph>
                You agree not to:
              </Typography>
              <ul>
                <Typography
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1 }}
                >
                  Reverse engineer, decompile, or disassemble the Software.
                </Typography>
                <Typography
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1 }}
                >
                  Modify, reproduce, or distribute the Software.
                </Typography>
                <Typography
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1 }}
                >
                  Use the Software for unlawful or unauthorized purposes.
                </Typography>
                <Typography
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1 }}
                >
                  Transfer or sublicense your license to any third party without
                  prior written consent.
                </Typography>
              </ul>
            </Grid>

            {/* Section 4 */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                4. Ownership and Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                - The Software, including its underlying code, design, and
                features, is the exclusive property of Merkensoft.
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
                sx={{ fontWeight: "bold", marginBottom: 2 }}
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
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                13. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                For questions or concerns about these Terms, please contact us
                at:
                <br />
                <strong>Merkensoft</strong>
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
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {/* &copy; {new Date().getFullYear()} Merkensoft. All rights reserved. */}
          </Typography>
        </Paper>
      </Container>
    </Box>
    </ThemeProvider>
  )
};

export default TermsOfService;
