import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { formStyles } from '../../styles/formStyles';
import { ExpenseFormProps } from '../../types/expenseTypes'
import CardError from '../reusable/CardError'


const AddExpenseForm: React.FC<ExpenseFormProps> = ({ values, handleChange, onSubmit, isSubmitting, handleDateChange }) => {
    const classes = formStyles();

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography
                        component="h2"
                        className={classes.title}>
                        Expense Record
                    </Typography>
                    <br />
                    <TextField
                        id="title"
                        label="Title"
                        className={classes.textField}
                        value={values.title}
                        onChange={handleChange('title')}
                        margin="normal" />
                    <br />
                    <TextField
                        id="amount"
                        label="Amount ($)"
                        className={classes.textField}
                        value={values.amount}
                        onChange={handleChange('amount')}
                        margin="normal"
                        type="number" />
                    <br />
                    <TextField
                        id="category"
                        label="Category"
                        className={classes.textField}
                        value={values.category}
                        onChange={handleChange('category')}
                        margin="normal" />
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            label="Incurred on"
                            className={classes.textField}
                            views={["year", "month", "date"]}
                            value={values.incurred_on}
                            onChange={handleDateChange}
                            showTodayButton
                        />
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <TextField
                        id="multiline-flexible"
                        label="Notes"
                        multiline
                        rows="2"
                        value={values.notes}
                        onChange={handleChange('notes')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <br />
                    <br />
                    <CardError error={values.error} />
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                        className={classes.submit}>
                        {isSubmitting ? 'Adding...' : 'Add Expense'}
                    </Button>
                    <Link
                        to='/myauctions'
                        className={classes.submit}>
                        <Button variant="contained">
                            Cancel
                            </Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}

export default AddExpenseForm
