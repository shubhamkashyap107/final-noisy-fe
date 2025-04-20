import { createSlice } from "@reduxjs/toolkit";

const connectionSLice = createSlice({
    name : "Connection",
    initialState : [],
    reducers : {
        addConnections : (state, action) => {
            return action.payload
        },
        removeConnections : (state, action) => {
            return []
        }
    }
})


export default connectionSLice.reducer
export const{addConnections, removeConnections} = connectionSLice.actions