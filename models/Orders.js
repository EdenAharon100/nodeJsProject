// import mongoose from 'mongoose'


// const minimalProduct = mongoose.Schema({
//     _id: String,
//     productName: String,
//     productAmount: Number
// })

// export const minimalModel = mongoose.model("minimalProduct", minimalProduct)

// const orderSchema = mongoose.Schema({
//     _id: String,
//     orderDate: { type: Date, default: Date.now() },
//     DueDate: { type: Date },
//     orederAddress: String,
//     product: [minimalProduct],
//     userId: String,
//     onWayProduct: Boolean
// })
// export const OrderModel = mongoose.model("order", orderSchema)
import Joi from "joi";
import mongoose from "mongoose";


const minimalWineSchema = mongoose.Schema({
    _id:String,
    Name:String,
    Price: Number,
    amount:Number 
})
const orderSchema = mongoose.Schema({
    orderDate:Date,
    dueDate:Date,
    address:String,
    userId: String,
    products:[minimalWineSchema],
    isDone:{type:Boolean,default:false}
  
})

export const OrderModel = mongoose.model("orders", orderSchema);

export const orderValidatorForAdd = (order) => {
    const orderValidationSchema = Joi.object().keys({
        orderDate: Joi.date(),
        dueDate: Joi.date().required(),
        address:Joi.string().required(),
        products:Joi.array()
    })
    return orderValidationSchema.validate(order);
}

export const orderValidatorForUpdate = (order) => {
    const orderValidationSchema = Joi.object().keys({
        isDone:Joi.bool().required()
    })
    return orderValidationSchema.validate(order);
}