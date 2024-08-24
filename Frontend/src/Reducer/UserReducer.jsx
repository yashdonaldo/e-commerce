import { createSlice } from '@reduxjs/toolkit'
import { LoadUser } from '../actions/UserActions'

// Register User
const RegisterUser = createSlice({
    name: "RegisterUser",
    initialState: { user: {}, loading: true, isAuthenticated: false, error: null, success: false },

})

// Load User
const LoginUser = createSlice({
    name: "LoginUser",
    initialState: { user: {}, loading: false, isAuthenticated: false, error: null, success: false },
    reducers: {
        Login_Request: (state) => {
            state.loading = true
        },
        LOGIN_SUCCESS: (state, actions) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = actions.payload.data.data.user
        },
        Login_Fail: (state, actions) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = actions.payload
        },
        Clear_Error: (state, actions) => {
            state.error = null
        },
        Load_User_Request: (state, actions) => {
            state.loading = true
        },
        Load_User_Success: (state, actions) => {
            state.user = actions.payload.data
            state.isAuthenticated = true
            state.loading = false
        },
        Load_User_Fail: (state, actions) => {
            state.isAuthenticated = false
            state.loading = false
            state.user = {}
            state.error = actions.payload
        },
        Logout_Request: (state) => {
            state.loading = true
        },
        Logout_Success: (state, actions) => {
            state.user = null
            state.loading = false
            state.isAuthenticated = false
        },
        Logout_Fail: (state, actions) => {
            state.loading = false,
                state.error = actions.payload
        },
        Register_Request: (state, actions) => {
            state.loading = true
        },
        Register_SUCCESS: (state, actions) => {
            state.loading = false
            state.isAuthenticated = true
            state.user = actions.payload.data
            state.success = actions.payload.success
        },
        Register_Fail: (state, actions) => {
            state.loading = false
            state.isAuthenticated = false
            state.user = null
            state.error = actions.payload
        },
        Register_Error: (state, actions) => {
            state.error = null
        },
    }
})

// Update User Profile
const ProfieUpdate = createSlice({
    name: "ProfileUpdate",
    initialState: { loading: false, isAuthenticated: false, error: null, isUpdated: null },
    reducers: {
        UpdateProfileRequest: (state, actions) => {
            state.loading = true
        },
        UpdateProfileSucess: (state, actions) => {
            state.loading = false
            state.isAuthenticated = true
            state.isUpdated = actions.payload.UpdateProfile.success
        },
        UpdateProfileFail: (state, actions) => {
            state.loading = false
            state.isAuthenticated = false
            state.isUpdated = null
            state.error = actions.payload
        },
        UpdateprofileReset: (state, actions) => {
            state.isUpdated = false
        }
    }
})

// Update Password
const UpdatePassword = createSlice({
    name: "UpdatePassword",
    initialState: { loading: false, error: null, isUpdated: null },
    reducers: {
        UpdatePasswordRequest: (state, actions) => {
            state.loading = true
        },
        UpdatePasswordSucess: (state, actions) => {
            state.loading = false
            state.isUpdated = actions.payload.password.success
        },
        UpdatePasswordFail: (state, actions) => {
            state.loading = false
            state.isUpdated = null
            state.error = actions.payload
        },
        UpdatePasswordReset: (state, actions) => {
            state.isUpdated = false
        }
    }
})

// Forgot Password
const ForgotPassword = createSlice({
    name: "ForgotPassword",
    initialState: { loading: false, error: null, Message: null },
    reducers: {
        ForgotPasswordRequest: (state, actions) => {
            state.loading = true
            state.error = null
        },
        ForgotPasswordSucess: (state, actions) => {
            state.loading = true
            state.Message = actions.payload.data
        },
        ForgotPasswordFail: (state, actions) => {
            state.loading = false
            state.error = actions.payload
        },
    }
})

// Reset Password
const ResetPassword = createSlice({
    name: "ResetPassword",
    initialState: { loading: false, error: null, success: null },
    reducers: {
        ResetPasswordRequest: (state, actions) => {
            state.loading = true
            state.error = null
        },
        ResetPasswordSucess: (state, actions) => {
            state.loading = false
            state.success = actions.payload.data
        },
        ResetPasswordFail: (state, actions) => {
            state.loading = false
            state.error = actions.payload
        },
    }
})

// All Users List 
const allUserReducer = createSlice({
    name: "all User",
    initialState: { loading: true, error: null, users: [] },
    reducers: {
        All_User_Request: (state, actions) => {
            state.loading = true
        },
        All_User_Success: (state, actions) => {
            state.loading = false
            state.users = actions.payload
        },
        All_User_Fail: (state, actions) => {
            state.error = actions.payload
            state.loading = false
        },
        All_User_Clear_Error: (state, actions) => {
            state.error = null
        }
    }
})

// Users Detail  
const userDetailReducer = createSlice({
    name: "User Details",
    initialState: { loading: true, error: null, user: [] },
    reducers: {
        User_Details_Request: (state, actions) => {
            state.loading = true
        },
        User_Details_Success: (state, actions) => {
            state.loading = false
            state.user = actions.payload
        },
        User_Details_Fail: (state, actions) => {
            state.error = actions.payload
            state.loading = false
        },
        User_Details_Clear_Error: (state, actions) => {
            state.error = null
        }
    }
})

// Update Users Details   
const updateUserReducer = createSlice({
    name: "Update User Details",
    initialState: { loading: true, error: null, isUpdated: null },
    reducers: {
        Update_User_Request: (state, actions) => {
            state.loading = true
        },
        Update_User_Success: (state, actions) => {
            state.loading = false
            state.isUpdated = actions.payload
        },
        Update_User_Fail: (state, actions) => {
            state.error = actions.payload
            state.loading = false
        },
        Update_User_Clear_Error: (state, actions) => {
            state.error = null
        },
        Update_User_Reset: (state, actions) => {
            state.isUpdated = null
        }
    }
})

// Delete User
const deleteUserReducer = createSlice({
    name: "Delete User",
    initialState: { loading: true, error: null, isDeleted: null, message: {} },
    reducers: {
        Delete_User_Request: (state, actions) => {
            state.loading = true
        },
        Delete_User_Success: (state, actions) => {
            state.loading = false
            state.isDeleted = actions.payload.data.success
            state.message = actions.payload.data.message
        },
        Delete_User_Fail: (state, actions) => {
            state.error = actions.payload
            state.loading = false
        },
        Delete_User_Clear_Error: (state, actions) => {
            state.error = null
        },
        Delete_User_Reset: (state, actions) => {
            state.isDeleted = null
        }
    }
})



export const UserAction = LoginUser.actions;
// export const LoadUserAction = LoadUser.actions;
// export const LogOutUserAction = LogOutUser.actions;
export const updateProfileAction = ProfieUpdate.actions;
export const UpdatePasswordAction = UpdatePassword.actions;
export const ForgotPasswordAction = ForgotPassword.actions;
export const ResetPasswordAction = ResetPassword.actions;
export const allUserAction = allUserReducer.actions;
export const UserDetailsAction = userDetailReducer.actions;
export const updateUserAction = updateUserReducer.actions;
export const deleteUserAction = deleteUserReducer.actions;

export { LoginUser, ProfieUpdate, UpdatePassword, ForgotPassword, ResetPassword, allUserReducer, updateUserReducer, deleteUserReducer, userDetailReducer };
