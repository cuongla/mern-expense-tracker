import React, { useState, useEffect } from 'react'
import auth from '../../helpers/auth-helper';
import { getUserDetail } from '../../api/UserAPI';
import { Redirect, Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from '../../components/user/DeleteUser';
import { IParams } from '../../types/historyTypes';
import { IUser } from '../../types/userTypes';
import Loader from '../../components/reusable/Loader';


const Profile = () => {
    const classes = useStyles();
    const params = useParams<IParams>();
    const [user, setUser] = useState<IUser>();
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [loading, setLoading] = useState(true);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        getUserDetail(
            { userId: params.userId },
            { t: jwt.token },
            signal
        ).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            }
            setUser(data)
            setLoading(false);
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [params.userId]);

    if (redirectToSignin) {
        return <Redirect to='/auth/login' />
    }

    return (
        <>
            { loading
                ? <Loader />
                : (
                    <Paper className={classes.root} elevation={4}>

                        <Typography variant="h6" className={classes.title}>
                            Profile
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.name} secondary={user.email} /> {
                                    auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && (
                                        <ListItemSecondaryAction>
                                            <Link to={"/user/edit/" + user._id}>
                                                <IconButton aria-label="Edit" color="primary">
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                            <DeleteUser userId={user._id} />
                                        </ListItemSecondaryAction>
                                    )
                                }
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={"Joined: " + (
                                    new Date(user.created)).toDateString()} />
                            </ListItem>
                        </List>
                    </Paper>
                )
            }
        </>
    )
}

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    }
}))

export default Profile
