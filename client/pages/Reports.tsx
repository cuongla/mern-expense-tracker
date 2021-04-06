import React, { FC } from 'react'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import CategoryPie from '../components/reports/CategoryPie';
import YearlyBar from '../components/reports/YearlyBar';
import MonthlyScatter from '../components/reports/MonthlyScatter';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { Category } from '@material-ui/icons';


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

const TabPanel: FC<TabPanelProps> = ({ children, dir, index, value }) => {
    return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
    )
}

const Reports = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const a11yProps = (index: any) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Monthly" {...a11yProps(0)} />
                    <Tab label="Yearly" {...a11yProps(1)} />
                    <Tab label="Category" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <Divider className={classes.separator} />
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <MonthlyScatter />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <YearlyBar />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <CategoryPie />
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '90%',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: 40,
        marginBottom: 40
    },
    separator: {
        marginBottom: 36
    }
}))

export default Reports
