const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

testSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.updatedAt;
        delete returnedObject.createdAt;
    },
});

module.exports = mongoose.model("Test", testSchema);
