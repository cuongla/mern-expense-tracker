import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import CategoryPie from '../components/reports/CategoryPie';
import YearlyBar from '../components/reports/YearlyBar';
import MonthlyScatter from '../components/reports/MonthlyScatter';


const Reports = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <MonthlyScatter />
            <Divider className={classes.separator} />
            <YearlyBar />
            <Divider className={classes.separator} />
            <CategoryPie />
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
