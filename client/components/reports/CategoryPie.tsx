import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import auth from '../../helpers/auth-helper'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { averageCategories } from '../../api/ExpenseAPI';
import { VictoryPie, VictoryTheme, VictoryLabel } from "victory"

const useStyles = makeStyles(theme => ({
    title: {
        padding: `16px ${theme.spacing(2.5)}px 2px`,
        color: '#2bbd7e',
        display: 'inline'
    },
    search: {
        display: 'flex',
        alignItems: 'center'
    },
    textField: {
        margin: '8px 16px',
        width: 240
    },
}))

const CategoryPie = () => {
    const classes = useStyles()
    const [error, setError] = useState('')
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true);
    const jwt = auth.isAuthenticated()
    const date = new Date(), y = date.getFullYear(), m = date.getMonth()
    const [redirecttoSignin, setRedirectToSignin] = useState(false);
    const [firstDay, setFirstDay] = useState(new Date(y, m, 1))
    const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0))
    

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        averageCategories(
            { firstDay: firstDay, lastDay: lastDay },
            { t: jwt.token },
            signal
        ).then((data) => {
            if (data.error) {
                setError(data.error)
            } 
            setExpenses(data)
            setLoading(false);
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const handleDateChange = (name: string) => (date: Date) => {
        if (name == 'firstDay') {
            setFirstDay(date)
        } else {
            setLastDay(date)
        }
    }

    const handleSearch = () => {
        const abortController = new AbortController()
        const signal = abortController.signal

        averageCategories(
            { firstDay, lastDay },
            { t: jwt.token },
            signal
        ).then((data) => {
            if (data.error) {
                setRedirectToSignin(true)
            } else {
                setExpenses(data)
            }
        })
    }

    return (
        <div>
            <div className={classes.search}>
                <Typography variant="h6" className={classes.title}>
                    Expenditures per category
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        disableFuture
                        format="dd/MM/yyyy"
                        label="FROM"
                        views={["year", "month", "date"]}
                        value={firstDay}
                        className={classes.textField}
                        onChange={handleDateChange('firstDay')}
                    />
                    <DatePicker
                        format="dd/MM/yyyy"
                        label="TO"
                        views={["year", "month", "date"]}
                        value={lastDay}
                        className={classes.textField}
                        onChange={handleDateChange('lastDay')}
                    />
                </MuiPickersUtilsProvider>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSearch}>
                    Search
                    </Button>
            </div>
            <div style={{ width: 550, margin: 'auto' }}>
                <svg viewBox="0 0 320 320">
                    <VictoryPie
                        standalone={false}
                        // @ts-ignore
                        data={expenses.monthAVG}
                        innerRadius={50}
                        theme={VictoryTheme.material}
                        labelRadius={({ innerRadius }) => Number(innerRadius) + 14}
                        labelComponent={
                            <VictoryLabel
                                angle={0}
                                style={[{
                                    fontSize: '11px',
                                    fill: '#0f0f0f'
                                },
                                {
                                    fontSize: '10px',
                                    fill: '#013157'
                                }]}
                                text={({ datum }) => `${datum.x}\n $${datum.y}`} />
                        }
                    />
                    <VictoryLabel
                        textAnchor="middle"
                        style={{
                            fontSize: 14,
                            fill: '#8b8b8b'
                        }}
                        x={175} y={170}
                        text={`Spent \nper category`} />
                </svg>
            </div>
        </div>
    )
}

export default CategoryPie;