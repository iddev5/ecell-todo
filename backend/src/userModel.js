import { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: String,
    },
    { timestamps: true },
);

const User = model("User", userSchema);

export default User;