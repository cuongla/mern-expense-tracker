import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardError from '../reusable/CardError';
import { formStyles } from '../../styles/formStyles';
import { openTitleStyle } from '../../styles/openTitle';
import { AuthFormProps } from '../../types/authTypes';


const RegisterForm: FC<AuthFormProps> = ({ values, handleChange, onSubmit, isSubmitting }) => {
    const classes = formStyles();
    const titleStyle = openTitleStyle();

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography
                        variant="h5"
                        className={titleStyle.title}>
                        Create Your Account
                    </Typography>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange('name')}
                        margin="normal" />
                    <br />
                    <TextField
                        id="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange('email')}
                        margin="normal" />
                    <br />
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        margin="normal" />
                    <br />
                    <CardError error={values.error} />
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                        className={classes.submit}>
                        { isSubmitting ? 'Regsitering...' : 'Register' }
                    </Button>
                </CardActions>
            </Card>
            <Dialog
                open={values.open}
                disableBackdropClick={true}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/auth/signin">
                        <Button
                            color="primary"
                            variant="contained">
                            Login Now
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RegisterForm
