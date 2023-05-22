import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Box } from "@mui/material";
import { useState } from "react";
import PickPackOtherListPage from "./others/index";
import PickListInventoryPage  from "./inventory/index";

const PickPackPage = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pick list - Inventory" value="1" />
              <Tab label="Pick list - Other" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><PickListInventoryPage /></TabPanel>
          <TabPanel value="2"><PickPackOtherListPage /></TabPanel>
        </TabContext>
      </Box>
    );

};

export default PickPackPage;