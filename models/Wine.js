import mongoose from "mongoose"
import Joi from "joi"

const wineSchema = mongoose.Schema({
    Name: String,
    Typ: String,
    Price: Number,
    dateYear: { type: Date, default: Date.now },
    idcustomers: String,
    src: String,
    Description : String,
    alcohol:Number,
    MatchWithFood:String

})

export const WineModel = mongoose.model("wines", wineSchema)

export const windValidator = (_wind) => {
    const winsValidatorionSchema = Joi.object({
        Name: Joi.string().min(3).max(50).required(),
        Typ: Joi.string().min(3).max(15),
        Price: Joi.number().min(20).max(500),
        dateYear: Joi.date(),
        idcustomers: Joi.string(),
        src: Joi.string(),
        Description: Joi.string(),
        alcohol:Joi.number(),
        MatchWithFood:Joi.string()
    })
    return winsValidatorionSchema.validate(_wind);
}