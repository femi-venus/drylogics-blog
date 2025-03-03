import { Theme } from '@mui/material/styles';
import { buttonClasses } from '@mui/material/Button';
import Iconify from '@/src/components/iconify';
import React from 'react';

// ----------------------------------------------------------------------

interface PickerSlots {
  openPickerIcon?: React.FC;
  leftArrowIcon?: React.FC;
  rightArrowIcon?: React.FC;
  switchViewIcon?: React.FC;
}

interface PickerType {
  defaultProps: {
    slots: PickerSlots;
  };
}

// List of date pickers and time pickers
const dateList = [
  'DatePicker',
  'DateTimePicker',
  'StaticDatePicker',
  'DesktopDatePicker',
  'DesktopDateTimePicker',
  'MobileDatePicker',
  'MobileDateTimePicker',
];

const timeList = ['TimePicker', 'MobileTimePicker', 'StaticTimePicker', 'DesktopTimePicker'];

// Icon Components
const SwitchIcon: React.FC = () => <Iconify icon="eva:chevron-down-fill" width={24} />;
const LeftIcon: React.FC = () => <Iconify icon="eva:arrow-ios-back-fill" width={24} />;
const RightIcon: React.FC = () => <Iconify icon="eva:arrow-ios-forward-fill" width={24} />;
const CalendarIcon: React.FC = () => <Iconify icon="solar:calendar-minimalistic-linear" width={24} />;
const ClockIcon: React.FC = () => <Iconify icon="solar:clock-circle-outline" width={24} />;

// Generate Date Picker Types
const desktopTypes = dateList.reduce<Record<string, PickerType>>((result, currentValue) => {
  result[`Mui${currentValue}`] = {
    defaultProps: {
      slots: {
        openPickerIcon: CalendarIcon,
        leftArrowIcon: LeftIcon,
        rightArrowIcon: RightIcon,
        switchViewIcon: SwitchIcon,
      },
    },
  };
  return result;
}, {});

// Generate Time Picker Types
const timeTypes = timeList.reduce<Record<string, PickerType>>((result, currentValue) => {
  result[`Mui${currentValue}`] = {
    defaultProps: {
      slots: {
        openPickerIcon: ClockIcon,
        rightArrowIcon: RightIcon,
        switchViewIcon: SwitchIcon,
      },
    },
  };
  return result;
}, {});

// Date Picker Theme Overrides
export function datePicker(theme: Theme) {
  return {
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .MuiPickersLayout-actionBar': {
            [`& .${buttonClasses.root}:last-of-type`]: {
              backgroundColor: theme.palette.text.primary,
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.common.white
                  : theme.palette.grey[800],
            },
          },
        },
      },
    },

    // Date Pickers
    ...desktopTypes,

    // Time Pickers
    ...timeTypes,
  };
}
