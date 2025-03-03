import { useEffect } from 'react';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import Logo from '@/src/components/logo';
import Iconify from '@/src/components/iconify';
// import { usePathname } from 'src/routes/hooks';
// import Scrollbar from '@/src/components/scrollbar';
// import { useBoolean } from 'src/hooks/use-boolean';


import { NavProps } from './types';
import { NAV } from './config-layout';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function NavMobile({ data }: NavProps) {
  // const pathname = usePathname();

  // const mobileOpen = useBoolean();

  // useEffect(() => {
  //   if (mobileOpen.value) {
  //     mobileOpen.onFalse();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  return (
    <div>
      <IconButton  sx={{ ml: 1, color: 'inherit' }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        // open={mobileOpen.value}
        // onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        {/* <Scrollbar> */}
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link: { title: any; }) => (
              <Link key={link.title} href={`/${link.title}`} >{link.title}</Link>
            ))}
          </List>

          <Stack spacing={1.5} sx={{ p: 3 }}>
            <Button fullWidth variant="contained" color="inherit">
              Buy Now
            </Button>
          </Stack>
        {/* </Scrollbar> */}
      </Drawer>
    </div>
  );
}
