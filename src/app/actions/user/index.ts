import { UserProfile } from "@/types"
import { createAsyncThunk } from "@reduxjs/toolkit"


const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async () => {
        try{
            const response = await fetch("/api/user/getUser")
            const {data} = await response.json()
            return data
        } catch (error){
            return error
        }
    }
)

const fetchCurrentProfile = createAsyncThunk(
    "user/fetchCurrentProfile",
    async () => {
        try{
            const response = await fetch("/api/profile/getUser")
            const {data} = await response.json()
            return data
        } catch (error){
            return error
        }
    }
)

const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async ({old, newUser}: {old:UserProfile, newUser: UserProfile}) => {
        try {
          const response = await fetch('/api/profile/edit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              old,
              newUser
            }),
          });
    
          if (response.status === 201) {
            console.log("Profile updated successfully");
            // setting in redux what set in server
            return response.json();
          } else {
          }
        } catch (error) {
          console.error("An error occurred while updating the profile:", error);
          return error;
        }
      } 
)



export {
    fetchCurrentUser,
    fetchCurrentProfile,
    updateProfile
}
