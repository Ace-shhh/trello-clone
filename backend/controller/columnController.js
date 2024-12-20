const Columns = require('../models/columnModel')
const mongoose = require('mongoose')
const columnController = {
    getColumns : async(req,res)=>{
        const columns = await Columns.find().sort({order: 1});
        res.status(200).json(columns)
    },

    addColumn : async (req, res)=>{
        const {title} = req.body;
        try{
            const newColumn = new Columns({title});
            await newColumn.save();
            res.status(201).json({data: newColumn})
        }catch(error){
            res.status(500).json({data: error})
            console.log(error)
        }
    },

    addCardtoColumn: async(req, res)=>{
        const { id } = req.params
        const { cardId } = req.body;
        try{
            if(!id || !mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message: 'Invalid column ID'});
            };

            if (!cardId) {
                return res.status(400).json({ message: 'Card ID is required' });
            };

            const updated = await Columns.findByIdAndUpdate(
                id,
                {$push : {cards : cardId}},
                {new: true}
            ).populate('cards')
            
            if(!updated){
                res.status(404).json({message: 'Column not found'});
            }

            res.status(200).json(updated);
        }catch(error){
            console.error(error)
            res.status(500).json({message: 'Internal server error', error: error.message});
        }
    },

    updateCardsOrder: async(req, res) =>{
        const {id} = req.params;
        const {cards} = req.body;
        try{
            const updatedColumn = await Columns.findByIdAndUpdate(
                {_id : id},
                {cards : cards},
                {new : true}
            );

            if(!updatedColumn){
                res.status(404).json({message: 'Column not found'});
            }

            res.status(200).json({data : updatedColumn});
        }
        catch(error){
            console.error(error)
            res.status(500).json({message: 'Internal server error', error : error})
        }
    },

    updateColumn : async(req, res)=>{
        const { id } = req.params;
        const data = req.body;
        try{
            const updatedColumn = await Columns.findByIdAndUpdate(
                id,
                data,
                {new : true}
            );

            if(!updatedColumn){
                res.status(404).json({message: 'Column does not exist'});
            };

            res.status(200).json({data : updatedColumn});
        }
        catch(error){
            res.status(500).json({message : 'Internal Server Error', error : error});
            console.error(error);
        }
    }

}

module.exports = columnController;