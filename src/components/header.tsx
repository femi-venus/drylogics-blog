import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Playfair_Display } from "next/font/google";
import Logo from "@/src/components/logo";
import { bgBlur } from "@/src/theme/css";
// import { useOffSetTop } from "src/hooks/use-off-set-top";
// import { useResponsive } from "src/hooks/use-responsive";


import { navConfig } from "./config-navigation";
import { Typography } from "@mui/material";
import { HEADER } from "./config-layout";
import HeaderShadow from "../commons/header-shadow";
import NavDesktop from "./desktop";
import NavMobile from "./nav-mobile";
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
// Define static styles outside component
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

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();

  // Memoize dynamic styles if they depend on props
  const toolbarStyles = React.useMemo(() => ({
    height: {
      xs: HEADER.H_MOBILE,
      md: HEADER.H_DESKTOP,
    },
    transition: theme.transitions.create(["height", "background-color"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    ...(headerOnDark && {
      color: "common.white",
    }),
  }), [theme, headerOnDark]);

  return (
    <AppBar>
      <Toolbar disableGutters sx={toolbarStyles}>
        <Container sx={containerStyles}>
          <Box sx={logoWrapperStyles}>
            <Logo sx={{ height: 100, width: 156 }} />
            <Typography
              sx={{
                fontFamily: {textStyle},
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
