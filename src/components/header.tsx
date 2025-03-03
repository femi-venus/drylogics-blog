import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Playfair_Display } from "next/font/google";
import Logo from "@/src/components/logo";
import { navConfig } from "./config-navigation";
import { Typography } from "@mui/material";
import { HEADER } from "./config-layout";
import NavDesktop from "./desktop";
import React from "react";

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export const textStyle = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
  display: 'swap',
});

// Define static styles
const containerStyles = {
  height: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const logoWrapperStyles = {
  display: "flex",
  alignItems: "center",
  lineHeight: 0,
  position: "relative",
};

// Pre-defined static toolbar styles
const baseToolbarStyles = {
  height: {
    xs: HEADER.H_MOBILE,
    md: HEADER.H_DESKTOP,
  },
  transition: "height 200ms ease-in-out, background-color 200ms ease-in-out",
};

const darkToolbarStyles = {
  ...baseToolbarStyles,
  color: "common.white",
};

export default function Header({ headerOnDark }: Props) {
  // Use pre-defined styles based on headerOnDark prop
  const toolbarStyles = headerOnDark ? darkToolbarStyles : baseToolbarStyles;

  return (
    <AppBar>
      <Toolbar disableGutters sx={toolbarStyles}>
        <Container sx={containerStyles}>
          <Box sx={logoWrapperStyles}>
            <Logo sx={{ height: 100, width: 156 }} />
            <Typography
              sx={{
                fontFamily: textStyle.style.fontFamily,
                fontSize: 30,
                ml: 1,
                color: "text.secondary",
              }}
            >
              D r y l o g i c s
            </Typography>
          </Box>

          <NavDesktop data={navConfig} />
        </Container>
      </Toolbar>
    </AppBar>
  );
}
