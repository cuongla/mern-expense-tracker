import { makeStyles, Theme } from '@material-ui/core/styles';

export const openTitleStyle = makeStyles((theme: Theme) => ({
    title: {
        margin: theme.spacing(2),
        color: theme.palette.openTitle
    }
}));