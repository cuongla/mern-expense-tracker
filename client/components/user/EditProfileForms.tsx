import React, { ChangeEvent, FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Theme } from '@material-ui/core'
import { IProfile } from '../../types/userTypes'
import CardError from '../reusable/CardError'

interface EditProfileFormProps {
    values: IProfile
    handleChange: (name: string) => (event: ChangeEvent<HTMLInputElement>) => void
    isUpdating: boolean
    onSubmit: () => void
}

const EditProfileForms: FC<EditProfileFormProps> = ({
    values,
    handleChange,
    onSubmit,
    isUpdating
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Edit Profile
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
                    {isUpdating
                        ? 'Updating...'
                        : 'Update Profile'
                    }
                </Button>
            </CardActions>
        </Card>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default EditProfileForms
