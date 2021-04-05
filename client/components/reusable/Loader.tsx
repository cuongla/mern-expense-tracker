import React, { FC } from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';


const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const Loader: FC = () => {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <CircularProgressWithLabel value={progress} />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: '-50px',
        marginLeft: '-100px'
    }
}));



export default Loader;
