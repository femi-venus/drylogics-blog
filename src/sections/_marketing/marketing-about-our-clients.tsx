import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from '@/src/components/image';
import { IBrandProps } from '@/src/types/brand';

// ----------------------------------------------------------------------

type Props = {
  brands: IBrandProps[];
};

export default function MarketingAboutOurClients({ brands }: Props) {
  return (
    <Container
      sx={{
        pb: { xs: 7, md: 11 },
      }}
    >
      <Stack alignItems="center" spacing={5}>
        <Typography variant="h2">Our Clients</Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ maxWidth: 680, overflow: 'hidden' }}
        >
          {brands.slice(0, 8).map((brand) => (
            <Box key={brand.id}>
              <Image
                alt={brand.name}
                src={brand.image}
                sx={{
                  height: 32,
                  mx: { xs: 2, md: 4 },
                  my: { xs: 2.5, md: 4 },
                }}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
