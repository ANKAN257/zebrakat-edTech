
import {createSlice} from '@reduxjs/toolkit'

const rootSlice=createSlice({
    name:'root',
    initialState:{
        portfolioData:null
    },
    reducers:{
        SetPortFolioData:(state,action)=>{
            state.portfolioData=action.payload
        }
    }

})

export const { SetPortFolioData }=rootSlice.actions
export default  rootSlice.reducer