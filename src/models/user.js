import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    problems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Problems'
        }
    ],
    datasets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Datasets'
        }
      ]
})

const User = mongoose.model("User", UserSchema)
export default User