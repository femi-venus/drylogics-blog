import { LoadingButtonProps } from "@mui/lab";

// ----------------------------------------------------------------------

export function loadingButton() {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LoadingButtonProps }) => ({
          ...(ownerState.variant === "soft" && {
            [`& .MuiLoadingButton-loadingIndicator`]: {
              left: 10,
              right: 14, // Adjusted as there’s no separate start/end
            },
            ...(ownerState.size === "small" && {
              [`& .MuiLoadingButton-loadingIndicator`]: {
                left: 10,
                right: 10,
              },
            }),
          }),
        }),
      },
    },
  };
}
