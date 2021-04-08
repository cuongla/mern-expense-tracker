import React from 'react'
import { Link } from 'react-router-dom';
import auth from '../helpers/auth-helper';
import ExpenseOverview from '../components/expense/ExpenseOverview'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import backgroundImage from '../assets/images/background.jpg';

const Home = () => {
    const classes = useStyles();

    return (
        <>
            { auth.isAuthenticated() &&
                <ExpenseOverview />
            }
            {
                !auth.isAuthenticated() && (
                    <div className={classes.container}>
                        <div className={classes.wrapper}>
                            <Typography
                                variant="h4">
                                Start tracking your expenses today for better life.
                                </Typography>
                            <Link to="/auth/login">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ marginTop: '2rem' }}>
                                    Log in your account now
                                    </Button>
                            </Link>
                        </div>
                    </div>
                )
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
    container: {
        width: '100%',
        height: '93vh',
        textAlign: 'center',
        overflowY: 'hidden',
        overflowX: 'hidden',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url(${backgroundImage})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    },
    wrapper: {
        padding: '1rem 2rem'
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
