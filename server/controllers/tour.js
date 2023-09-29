import mongoose from 'mongoose';
import Tour from '../models/Tour.js';

export const createTour = async (req, res) => {
    const tour = req.body;
    const newTour = new Tour({
        ...tour,
        creator:req.userId,
        createdAt: new Date().toISOString()
    });
    try {
        await newTour.save();
        res.status(201).json(newTour)
    } catch (error) {
        console.log(error)
        res.status(404).json({message:"Something went wrong"});
    }
}

export const getTours = async (req, res) => {
    const {page}=req.query;
    try {
        const limit=6;
        const startIndex=(Number(page)-1)*limit;
        const total=await Tour.countDocuments({});
        const tours=await Tour.find().limit(limit).skip(startIndex);
        res.json({
            data:tours,
            currentPage:Number(page),
            totalTours:total,
            numberOfPages:Math.ceil(total/limit)
        })
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}

export const getTour = async (req, res) => {
    const {id}=req.params;
    try {
        const tour=await Tour.findById(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}

export const getToursByUser=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({message:"User doesn't exist"});
    }
    const userTours=await Tour.find({creator:id});
    res.status(200).json(userTours);
}

export const deleteTour=async(req,res)=>{
    const {id}=req.params;
    try {     
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({message:"No tour with this id"});
        }
        await Tour.findByIdAndRemove(id)
        res.json({message:"Tour deleted Succefully!"});
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}

export const updateTour=async(req,res)=>{
    const {id}=req.params;
    const {title,description,creator,imageFile,tags}=req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: `No tour with this id ${id}!` });
        }
      
        const updatedTour = {
          _id: id,
          title,
          description,
          creator,
          imageFile,
          tags
        }
        const updatedDoc = await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
        if (!updatedDoc) {
          return res.status(404).json({ message: `Tour with id ${id} not found` });
        }
        res.json(updatedDoc);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
}

export const getTourBySearch=async(req,res)=>{
    const {searchQuery}=req.query;
    try {     
        const title=new RegExp(searchQuery,"i")
        const tours=await Tour.find({title})
        res.json(tours);
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}
export const getToursByTag=async(req,res)=>{
    const {tag}=req.params;
    try {     
        const tours=await Tour.find({tags:{$in:tag}})
        res.json(tours)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}
