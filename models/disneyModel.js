import { Schema, mongoose} from "mongoose"

export const disneySchema = new Schema({
    name:{type:String, unique:true},
    director:{
        firstName: String,
        lastName: String
    },
    year: Number,
})

export const disneyModel = mongoose.model("disney", disneySchema);