import mongoose from "mongoose";
const Schema = mongoose.Schema

const DatasetSchema = new Schema({
    title: String,
    problems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Problems'
        }
    ],
})


const Dataset = mongoose.model("Dataset", DatasetSchema)
export default Dataset