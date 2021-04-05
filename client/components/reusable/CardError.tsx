import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles, Theme } from '@material-ui/core/styles';

interface CardErrorProps {
    error: string
}

const CardError: FC<CardErrorProps> = ({ error }) => {
    const classes = useStyles();
    return (
        <div>
            {
                error && (
                    <Typography
                        component="p"
                        color="error">
                        <Icon
                            color="error"
                            className={classes.error}>error
                    </Icon>
                        {error}
                    </Typography>)
            }
        </div>
    )
};

const useStyles = makeStyles((theme: Theme) => ({
    error: {
        verticalAlign: 'middle'
    }
}));

export default CardError
