import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProblemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isSolved: {
        type: Boolean,
        required: true
    },
    problemSet: [
        {
            type: String
        }
    ],
    solution: {
        type: String,
        required: true
    }
})
    
const Problem = mongoose.model("Problem", ProblemSchema)
export default Problem