import { makeStyles, Theme } from '@material-ui/core/styles';

export const formStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1em'
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
    },
    filename: {
        marginLeft: '10px'
    },
    input: {
        display: 'none'
    }
}));