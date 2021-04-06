import React, { FC, useState } from 'react';
import auth from '../../helpers/auth-helper';
import { deleteUser } from '../../api/UserAPI';
import { Redirect } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'


interface DeleteUserProps {
    userId: string
}

const DeleteUser: FC<DeleteUserProps> = ({ userId }) => {
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const jwt = auth.isAuthenticated();
    const [isDelete, setIsDelete] = useState(false); 

    const onDelete = () => {
        setIsDelete(true);
        deleteUser(
            { userId },
            { t: jwt.token })
            .then((data) => {
                if (data && data.error) {
                    console.log(data.error)
                }
                    auth.clearJWT(() => console.log('deleted'));
                    setIsDelete(false);
                    setRedirect(true)
            });
    };

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <span>
            <IconButton
                aria-label="Delete"
                onClick={openDialog}
                color="secondary">
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>
                    {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onDelete} color="secondary">
                        { isDelete ? 'Deleting...' : 'Delete' }
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

export default DeleteUser
