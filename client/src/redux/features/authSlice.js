import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from "../api";

export const login=createAsyncThunk("auth/login",async({formValue,navigate,toast},{rejectWithValue})=>{
    try {
        const response=await api.signIn(formValue);
        toast.success("Login Successfuly");
        navigate("/");
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const register=createAsyncThunk("auth/register",async({formValue,navigate,toast},{rejectWithValue})=>{
    try {
        const response=await api.signUp(formValue);
        toast.success("Register Successfuly");
        navigate("/login");
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user: JSON.parse(localStorage.getItem('profile')) || null,
        error:"",
        loading:false
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setLogout:(state,action)=>{
            state.user=null;
            localStorage.clear();
        },
    },
    extraReducers:{
        [login.pending]:(state,action)=>{
            state.loading=true
        },
        [login.fulfilled]:(state,action)=>{
           state.loading=false
           localStorage.setItem("profile",JSON.stringify({...action.payload}));
           state.user=action.payload
           state.error = ""
        },
        [login.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        [register.pending]:(state,action)=>{
            state.loading=true
        },
        [register.fulfilled]:(state,action)=>{
           state.loading=false
           state.error = ""
        },
        [register.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        }
    }
})

export const {setUser,setLogout}=authSlice.actions;

export default authSlice.reducer;
