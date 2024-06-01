const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.updatedAt;
        delete returnedObject.createdAt;

        // the password should not be revealed
        delete returnedObject.password;
    },
});

module.exports = mongoose.model("User", userSchema);
