import React, { FC, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../../helpers/auth-helper'
import { removeExpense } from '../../api/ExpenseAPI';
import { IExpense, IExpenseState } from '../../types/expenseTypes'

interface DeleteExpenseProps {
    onRemove: any
    expense: IExpenseState
}

const DeleteExpense: FC<DeleteExpenseProps> = ({
    expense,
    onRemove
}) => {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const jwt = auth.isAuthenticated();

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const onDeleteExpense = () => {
        setIsDeleting(true);

        removeExpense({
            expenseId: expense._id
        }, { t: jwt.token }).then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            setOpen(false)
            onRemove(expense)
            setIsDeleting(false);
        });
    }

    return (
        <span>
            <IconButton aria-label="Delete" onClick={openDialog}>
                <DeleteIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={closeDialog}>
                <DialogTitle>
                    {"Delete " + expense.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete {expense.title}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeDialog}
                        color="primary">
                        Cancel
                     </Button>
                    <Button
                        onClick={onDeleteExpense}
                        color="secondary">
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

export default DeleteExpense
