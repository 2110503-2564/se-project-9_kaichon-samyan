'use client'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { useState } from "react"

export default function DateReserve({onDateChange} : {onDateChange:Function}) {

    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null)

    return (
        <form className="mt-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={(value)=>{setReserveDate(value); onDateChange(value);}}/>
        </LocalizationProvider>
        </form>
    );
}