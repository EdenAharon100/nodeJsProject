import mongoose from "mongoose"
import { WineModel, windValidator } from "../models/Wine.js"



export const getAllWines = async (req, res, next) => {

    console.log("awwwk");
    let AllProduct
    try {
        let text = req.query.text || undefined;
        let page = req.query.page || 1;
        let perPage = req.query.perPage||1000;
        if (!text){
        AllProduct = await WineModel.find().skip((page - 1) * perPage).limit(perPage);}
        else{
            AllProduct=await WineModel.find({Name:text
            }).skip((page - 1) * perPage).limit(perPage);
        }
        
        console.log(AllProduct);
        res.json(AllProduct);
    } catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", massage: "sorry cannot get courses" });
    }
}
    

export const getWinesById = async (req, res) => {
    let { id } = req.params
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400)
            throw new Error('Wrong code')
        }
        let Wine = await WineModel.findById(id)
        if (!Wine)
            return res.status(404).json({ type: "no id", message: "no wine with such id" })
        return res.json(Wine)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get wine" })
    }
}

export const deleteWinesById = async (req, res) => {
    let { id } = req.params
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id wrong" })
        let Wine = await WineModel.findById(id)
        if (!Wine)
            return res.status(404).json({ type: "no wine to delete", message: "no wine with such id to delete" })
        if (req.user.role != "ADMIN" && Wine.userId != req.user._id)
            res.status(403).json({ type: "not allowed", message: "you are not allowed" })
        Wine = await WineModel.findByIdAndDelete(id)
        return res.json(Wine)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get wine" })
    }
}

export const addWine = async (req, res) => {
    let { Name, Typ, dateYear, Price, idcustomers, src , Description, alcohol,MatchWithFood} = req.body;

    const result =  windValidator(req.body)
    if (result.error)
        return res.status(400).json({ type: "invalid data", message: result.error.details[0].message })
    try {
        let sameWine = await WineModel.findOne({ Name: Name });
        if (sameWine)
            return res.status(409).json({ type: "same detils", message: "there is already same wind" })
        let newWine = new WineModel({ Name, Typ, dateYear, Price, idcustomers, src ,Description ,alcohol, MatchWithFood});
        await newWine.save();
        return res.json(newWine)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get wine" })
    }
}

export const updateWine = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id in not right format" })
    try {
        let wine = await WineModel.findById(id);
        if (!wine)
            return res.status(404), json({ type: "wine not found", message: "no wine with such id" })
        let { Name, Typ, Price, dateYear, idcustomers } = req.body;
        let update = await WineModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.json(update);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get wine" })
    }

}