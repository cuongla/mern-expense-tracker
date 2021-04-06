import React from 'react'
import { Link } from 'react-router-dom';
import auth from '../helpers/auth-helper';
import ExpenseOverview from '../components/expense/ExpenseOverview'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'


const Home = () => {
    const classes = useStyles();

    return (
        <>
            { auth.isAuthenticated() &&
                <ExpenseOverview />
            }
        </>
    );
};

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 800,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 440
    },
    credit: {
        padding: 10,
        textAlign: 'right',
        backgroundColor: '#ededed',
        borderBottom: '1px solid #d0d0d0',
        '& a': {
            color: '#4f83cc'
        }
    }
}))

export default Home
