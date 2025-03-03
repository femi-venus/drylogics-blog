import Stack from '@mui/material/Stack';

import { NavProps } from '../types';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function NavDesktop({ data, sx }: NavProps) {
  return (
    <Stack
      component="nav"
      direction="row"
      spacing={5}
      pt={3}
      sx={{
        height: 1,
        ...sx,
      }}
    >
      {data.map((link) => (
        <Link key={link.title} href={`/${link.path}`} passHref style={{ textDecoration: "none" , color: "white",
          cursor: "pointer"}}>
          {link.title}
        </Link>
      ))}
    </Stack>
  );
}
