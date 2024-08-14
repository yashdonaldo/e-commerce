import { ForgotPasswordAction, ResetPasswordAction, UpdatePasswordAction, UserAction, UserDetailsAction, allUserAction, deleteUserAction, updateProfileAction, updateUserAction } from '../Reducer/UserReducer';
import axios from 'axios';

// login Action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(UserAction.Login_Request())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
        );
        console.log(data)
        dispatch(UserAction.LOGIN_SUCCESS({data}))

    } catch (error) {
        console.log(error)
        dispatch(UserAction.Login_Fail({
            payload: error.response.data.message
        }))

    }
};

// Register Action
export const Register = (userData) => async (dispatch) => {
    try {
        dispatch(UserAction.Register_Request())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch(UserAction.Register_SUCCESS({
            data: data.user
        })
        )

    } catch (error) {
        dispatch(UserAction.Login_Fail({
            payload: error.response

        }))
    }
};

// Load User
export const LoadUser = () => async (dispatch) => {
    try {
        dispatch(UserAction.Load_User_Request())

        const data = await axios.get(`/api/v1/me`);

        dispatch(UserAction.Load_User_Success({
            data: data.data.user,
            isAuthenticated: true
        })
        )

    } catch (error) {
        dispatch(UserAction.Load_User_Fail({
            payload: error.response.data.message

        }))
    }
};

// Logout User
export const Logout = () => async (dispatch) => {
    try {
        dispatch(UserAction.Logout_Request())

        const data = await axios.get(`/api/v1/logout`);

        dispatch(UserAction.Logout_Success())

    } catch (error) {
        dispatch(UserAction.Logout_Fail({
            payload: error.response.data.message
        }))
    }
};

// Update User Profile Update
export const updateProfile = (userData) => async (dispatch) => {
    try {
        console.log("user data", userData)
        dispatch(updateProfileAction.UpdateProfileRequest())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch(updateProfileAction.UpdateProfileSucess({
            UpdateProfile: data
        }))
    } catch (error) {
        dispatch(updateProfileAction.UpdateProfileFail({
            message: error.response.data.message
        }))
    }
}

// Update Password
export const UpdatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(UpdatePasswordAction.UpdatePasswordRequest())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);

        console.log("Profile data", data)

        dispatch(UpdatePasswordAction.UpdatePasswordSucess({
            password: data
        }))
    } catch (error) {
        // console.log(error)
        dispatch(UpdatePasswordAction.UpdatePasswordFail({
            message: error.response.data.message
        }))
    }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = await axios.post(`/api/v1/password/forgot`, email, config);

        dispatch(ForgotPasswordAction.ForgotPasswordSucess({
            data: data.data.message,
        })
        )

    } catch (error) {
        console.log("error", error)
        dispatch(ForgotPasswordAction.ForgotPasswordFail({
            payload: error.response.data.message

        }))

    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = await axios.post(`/api/v1/password/reset/${token}`, passwords, config);

        console.log(data)
        dispatch(ResetPasswordAction.ResetPasswordSucess({
            data: data.data.success,
        })
        )

    } catch (error) {
        console.log("error", error)
        dispatch(ResetPasswordAction.ResetPasswordFail({
            payload: error.response.data.message

        }))

    }
};

// Clear Form Action
export const clearErrors = () => async (dispatch) => {
    dispatch(UserAction.Clear_Error())
}

// All user {Admin}
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch(allUserAction.All_User_Request());

        const data = await axios.get("/api/v1/admin/users");
        dispatch(allUserAction.All_User_Success(data.data.user))
    } catch (error) {
        dispatch(allUserAction.All_User_Clear_Error(error.response.data.message))
    }
}

// user Detail {Admin}
export const getUserDetail = (id) => async (dispatch) => {
    try {
        dispatch(UserDetailsAction.User_Details_Request());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.get(`/api/v1/admin/users/${id}`, config);
        dispatch(UserDetailsAction.User_Details_Success(data.data.user))
    } catch (error) {
        dispatch(UserDetailsAction.User_Details_Fail(error.response.data.message))
    }
}

// update user {Admin}
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch(updateUserAction.Update_User_Request());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.put(`/api/v1/admin/users/${id}`, userData, config);
        dispatch(updateUserAction.Update_User_Success(data.data.success))
    } catch (error) {
        dispatch(updateUserAction.Update_User_Fail(error.response.data.message))
    }
}

// All user {Admin}
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch(deleteUserAction.Delete_User_Request());

        const data = await axios.delete(`/api/v1/admin/users/${id}`);
        dispatch(deleteUserAction.Delete_User_Success(data))
    } catch (error) {
        dispatch(deleteUserAction.Delete_User_Fail(error.response.data.message))
    }
}