import { forwardRef } from 'react';

import Link from '@mui/material/Link';

import Iconify from '@/src/components/iconify';
// import { RouterLink } from 'src/routes/components';

import { StyledNavItem } from './styles';
import { NavItemProps } from '../types';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, open, active, subItem, externalLink, ...other }, ref) => {
    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableRipple
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        {item.title}

        {!!item.children && <Iconify width={16} icon="carbon:chevron-down" sx={{ ml: 1 }} />}
      </StyledNavItem>
    );

    // ExternalLink
    if (externalLink) {
      return (
        <Link href={item.path} target="_blank" rel="noopener" color="inherit" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Has child
    if (item.children) {
      return renderContent;
    }

    // Default
    return (
      <Link href={item.path} color="inherit" underline="none">
        {renderContent}
      </Link>
    );
  }
);
