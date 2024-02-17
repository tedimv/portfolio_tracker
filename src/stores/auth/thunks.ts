import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from ".";

export const putUpdateUserInfo = createAsyncThunk("auth/updateInfo", async (updatedUserInfo: Auth["user"]) => {
    await new Promise((res) => setTimeout(res, 1000));
    return updatedUserInfo;
});
