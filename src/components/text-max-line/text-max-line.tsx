import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { TextMaxLineProps } from "./types";

// ----------------------------------------------------------------------

export default function TextMaxLine({
  asLink,
  variant = "body1",
  line = 2,
  persistent = false,
  children,
  sx,
  ...other
}: TextMaxLineProps) {
  const styles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: line,
    WebkitBoxOrient: "vertical",
    ...(persistent && {
      height: "auto", // Avoid dynamic calculation
    }),
    ...sx,
  } as const;

  if (asLink) {
    return (
      <Link color="inherit" variant={variant} sx={{ ...styles }} {...other}>
        {children}
      </Link>
    );
  }

  return (
    <Typography variant={variant} sx={{ ...styles }} {...other}>
      {children}
    </Typography>
  );
}
