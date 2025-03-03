import { forwardRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: string;
  width?: number;
}

const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon} 
    icon={icon}
    sx={{ width, height: width, display: "inline-block", ...sx }}
    {...other}
  />
));

export default Iconify;
