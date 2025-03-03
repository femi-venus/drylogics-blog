import Box from "@mui/material/Box";
import Header from "./header";
import Footer from "./footer";
import { HEADER } from "./config-layout";

type Props = {
  children: React.ReactNode;
  headerOnDark?: boolean;
  withSpacing?: boolean;
};

export default function MainLayout({ children, headerOnDark = false, withSpacing = false }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header headerOnDark={headerOnDark} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {withSpacing && <Spacing />}
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
