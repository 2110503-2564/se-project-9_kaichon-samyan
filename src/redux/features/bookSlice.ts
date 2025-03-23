import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface"

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems: [] }

export const bookSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBooking : (state, action:PayloadAction<BookingItem>) => {
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.venue !== action.payload.venue)
                || (obj.bookDate !== action.payload.bookDate)
                );
            })
            state.bookItems = remainItems
            state.bookItems.push(action.payload)
            // console.log('add to cart')
        },
        removeBooking : (state, action:PayloadAction<BookingItem>) => {
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.nameLastname !== action.payload.nameLastname)
                || (obj.tel !== action.payload.tel)
                || (obj.venue !== action.payload.venue)
                || (obj.bookDate !== action.payload.bookDate)
                );
            })
            state.bookItems = remainItems
        }
    }
})

export const {addBooking, removeBooking} = bookSlice.actions
export default bookSlice.reducer