import * as styles from './styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import useHomeStore from '../../store/homeStore';
import { FacebookEmbed } from 'react-social-media-embed';
import { Divider } from '@mui/material';

const Sidebar = () => {
  const startPeriod = useHomeStore((state) => state.startPeriod);
  const endPeriod = useHomeStore((state) => state.endPeriod);

  const setStartPeriod = useHomeStore((state) => state.setStartPeriod);
  const setEndPeriod = useHomeStore((state) => state.setEndPeriod);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.datePickerContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Início"
            value={startPeriod}
            onChange={(newDate) => setStartPeriod(newDate!)}
          />
          <DatePicker
            label="Fim"
            value={endPeriod}
            onChange={(newDate) => setEndPeriod(newDate!)}
          />
        </LocalizationProvider>
      </div>

      <Divider variant="middle" />

      <div className={styles.embedContainer}>
        <FacebookEmbed
          url="https://www.facebook.com/ProReitoriadeCulturaeExtensao/posts/pfbid02FqLobgPL6ENAtHhKgghbBa9R66s2VMzwdZgbxYBTez9mGwFPJefUSEmEizUAoB9wl?__cft__[0]=AZXVL-xX1XLulbxaC5bX5_RAe7KODsj0A3Ke6DeYx7woKrQHalQkDTR98Aqk3GmX8coYWAW5mu9L0dvhTErW5u6q2ivGJ6kKi2cSAKsvz8ZVSqMxGWBVWrmhTRnJf7tlDQR5Pd6HHJX5G627xDeszZqcmglTj9NNoTgTosNmX1_Zcg74wLnIQ3w8E-mAsNSazKJAMoLkNDn_Rd40I1fH3Ubr&__tn__=%2CO%2CP-R
          6"
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default Sidebar;
