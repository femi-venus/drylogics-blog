import { styled } from "@mui/material/styles";

export const StyledRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'disabled' && prop !== 'fullScreen',
})<{
  error?: boolean;
  disabled?: boolean;
  fullScreen?: boolean;
}>(({ theme, error, disabled, fullScreen }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  ...(fullScreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1300,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  }),
})); 