import React from "react";
import { Typography, Box, Container, Divider, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: 6,
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
          {/* Privacy Policy Title */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Privacy Policy
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography
            variant="subtitle1"
            paragraph
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            Effective Date: <strong>01-01-2025</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            This Privacy Policy describes how Drylogic Solutions ("Company",
            "we", "us", or "our") collects, uses, and protects information
            provided by clients and users ("User", "you") when engaging with our
            IT consulting and development services ("Services"). By using our
            Services, you agree to the terms of this Privacy Policy.
          </Typography>

          {/* Section 1 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect the following types of information to provide and improve
            our Services:
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            1.1 Information You Provide
          </Typography>
          <Typography variant="body1" paragraph>
            - <strong>Client Information:</strong>Name, email address, contact
            details, company information, and contractual details.
            <br />- <strong>Project Data:</strong> Data shared or stored as part
            of our consulting, development, or support engagements.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            1.2 Automatically Collected Information
          </Typography>
          <Typography variant="body1" paragraph>
            - <strong>Usage Data:</strong> Information about interactions with
            our website, software solutions, and communication platforms,
            including IP addresses, browser type, operating system, and
            timestamps.
            <br />- <strong>Device Data:</strong> Details about the devices used
            to access our Services.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            1.3 Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph>
            We use cookies, web beacons, and similar technologies to improve
            user experience and monitor engagement. You can manage cookie
            preferences in your browser settings.
          </Typography>

          {/* Section 2 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use your information to:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>
              Provide, operate, and improve our Services.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Manage projects, contracts, and client communications.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Process transactions and maintain financial records.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Enhance security and ensure compliance with legal and regulatory
              requirements.
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Comply with legal obligations and enforce our terms.
            </Typography>
          </Box>

          {/* Section 3 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            3. Data Sharing and Disclosure
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell or rent your personal information. However, we may
            share your information with:
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            3.1 Service Providers
          </Typography>
          <Typography variant="body1" paragraph>
            Third-party vendors and partners who assist us in providing
            services, such as hosting, analytics, and customer support.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            3.2 Legal Requirements
          </Typography>
          <Typography variant="body1" paragraph>
            Authorities, when required to comply with legal obligations or to
            protect our rights and safety.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            3.3 Business Transfers
          </Typography>
          <Typography variant="body1" paragraph>
            In the event of a merger, acquisition, or sale of assets, your
            information may be transferred to the new entity.
          </Typography>

          {/* Section 4 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            4. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We retain your information as long as necessary to provide the
            Software and fulfill the purposes described in this Privacy Policy.
            Upon termination of your account, we will delete or anonymize your
            data unless required by law to retain it.
          </Typography>

          {/* Section 5 */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", mt: 4 }}
          >
            5. Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate technical and organizational measures to
            protect your data from unauthorized access, disclosure, alteration,
            or destruction. However, no method of data transmission or storage
            is entirely secure, and we cannot guarantee absolute security.
          </Typography>

          <Divider sx={{ my: 4 }} />
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
  );
};

export default PrivacyPolicy;
