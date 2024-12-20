const Board = require('../models/boardModel')
const Card = require('../models/cardModel')
const boardController = {

    getBoardById : async(req, res)=>{
        const { id } = req.params;
        try{
            const result = await Board.findById(id).populate({
                path: 'columns',
                populate : {
                    path : 'cards'
                }
            });
            if(!result){
                return res.status(404).json({Message: 'Board not found'})
            }
            res.status(200).json({data : result});
        }
        catch(error){
            console.log(error)
        }
    },

    createBoard : async(req,res)=>{
        const {title} = req.body;

        try{
            const newBoard = new Board({title});
            await newBoard.save();
            res.status(201).json({message: 'Board created', data : newBoard});
        }
        catch(error){
            console.log(error)
        }
    },

    addBoardColumn : async(req, res)=>{
        const {columnId} = req.body;
        const { id } = req.params;
        try{
            const updatedBoard = await Board.findOneAndUpdate(
                {_id : id},
                {$push : {columns : columnId}},
                {new: true}
            );

            if(!updatedBoard){
                return res.status(404).json({message: 'Board not found'});
            }

            res.status(200).json({data : updatedBoard})
        }
        catch(error){
            console.log(error);
            res.status(500).json({message : 'Internal server error'});
        }
    },

    updateBoardColumnsOrder: async(req, res)=>{
        const {columnIds} = req.body;
        const { id } = req.params;

        try{
            const updatedBoard = await Board.findByIdAndUpdate(
                {_id : id},
                {columns : columnIds},
                {new : true}
            );

            if(!updatedBoard){
                return res.status(404).json({message : 'Board not found'});
            }
            res.status(200).json({data : updatedBoard});
        }
        catch(error){
            res.status(500).json({message : 'Failed to update board', error : error});
            console.error(error);
        }
    }
}

module.exports = boardController;