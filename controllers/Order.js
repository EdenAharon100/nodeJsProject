import mongoose from "mongoose";
import { OrderModel, orderValidatorForAdd } from "../models/Orders.js"
import { orderValidatorForUpdate } from "../models/Orders.js"

export const getAllOrdersByUser = async (req, res) => {
    try {
        let allOrders = await OrderModel.find({ userId: req.user._id })
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get  all Orders" })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        let allOrders = await OrderModel.find({})
        return res.json(allOrders)
    }
    catch (err) {
        return res.status(400).json({ type: "invalid operation", message: "sorry cannot get  all Orders" })
    }
}




export const deleteOrder = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id is not in the  right format" })

        let order = await OrderModel.findById(id);

        if (!order)
            return res.status(404).json({ type: "Not found", message: "There is no order with such id to delete" })
        if (req.user._id != order.userId && req.user.role != "ADMIN")
            return res.status(403).json({type: "not allowed", message:"you are not allowed to delete this order. Only manager or the ower are permitted."})
        if (order.isDone == true)
            return res.status(400).json({ type: "invalid operation", message: "This order is done already. You can't delete it" })
        order = await OrderModel.findByIdAndDelete(id)
        return res.json(order)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}

export const addOrder = async (req, res) => {
    let { orderDate, dueDate, address, products } = req.body;
    const errors = orderValidatorForAdd(req.body).error
    if (errors)
        return res.status(404).json(errors.details[0].message)
    try {
        let newOrder = new OrderModel({orderDate,dueDate,address,userId: req.user._id,products});
        await newOrder.save();
        return res.json(newOrder)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ type: "invalid operation", message: "sorry cannot add Order" })
    }

}


export const updateOrder = async (req, res) => {

    let { id } = req.params;
    let { isDone } = req.body;
    const errors = orderValidatorForUpdate(req.body).error
    if (errors)
        return res.status(404).json(errors.details[0].message)
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id is  not in the right format" })
    try {
        let order = await OrderModel.findById(id);
        if (!order)
            return res.status(404).json({ type: " not found", message: "There is no order with such id" })


        let updated = await OrderModel.findByIdAndUpdate(id, { isDone }, { new: true })

        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot update order" })
    }

}