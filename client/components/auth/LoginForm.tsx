import React, { FC } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardError from '../reusable/CardError';
import { formStyles } from '../../styles/formStyles';
import { openTitleStyle } from '../../styles/openTitle';
import { AuthFormProps } from '../../types/authTypes';
import { Link } from 'react-router-dom';

const LoginForm: FC<AuthFormProps> = ({ values, handleChange, onSubmit, isSubmitting }) => {
    const classes = formStyles();
    const titleStyle = openTitleStyle();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography
                    variant="h5"
                    className={titleStyle.title}>
                    Login to your account
                </Typography>
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
                        { isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
            </CardActions>
            <CardContent>
                <p>Test Email: test@test.com</p>
                <p>Test Password: test123</p>
            </CardContent>
            <CardContent>
                Don't have an account? <Link to="/auth/register">Register now</Link>
            </CardContent>
        </Card>
    )
}

export default LoginForm;
