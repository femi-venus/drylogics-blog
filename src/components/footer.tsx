import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import NextLink from 'next/link';

// Static styles object
const styles = {
  footer: {
    width: '100%',
    position: 'relative',
    bottom: 0,
    backgroundColor: "#212B36",
  },
  container: {
    display: "flex",
    py: 2,
    alignItems: "center",
   
    justifyContent: "space-between",
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 2, sm: 0 },
  },
  text: {
    color: "#919EAB",
  },
  link: {
    textDecoration: "none",
    color: "#919EAB",
    cursor: "pointer",
    '&:hover': {
      color: "#919EAB",
    },
  },
  copyright: {
    color: "#919EAB",
    fontSize: "0.875rem",
  },
  brand: {
    color: "#919EAB",
    fontSize: "0.875rem",
  },
} as const;

export default function Footer() {
  return (
    <Box component="footer" sx={styles.footer}>
      <Container sx={styles.container}>
        <Typography sx={styles.copyright}>
          © 
          {/* {new Date().getFullYear()}. */}
           All rights reserved
        </Typography>

        <NextLink href='/terms' passHref>
          <Typography component="span" sx={styles.link}>
            Terms
          </Typography>
        </NextLink>

        <NextLink href="privacy" passHref>
          <Typography component="span" sx={styles.link}>
            Privacy
          </Typography>
        </NextLink>

        <Typography sx={styles.brand}>
          A Drylogics Innovation
        </Typography>
      </Container>
    </Box>
  );
}
