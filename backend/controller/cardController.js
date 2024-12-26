const Card = require('../models/cardModel')
const Counter = require('../models/counterModel');
const cardController = {
    createCard : async(req, res)=>{
        try{
            const updatedCardCount = await Counter.findOneAndUpdate(
                {name : 'card counter'},
                {$inc : {count : 1}},
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            );

            const newCard = new Card({
                title : req.body.title,
                cardNumber : updatedCardCount.count,
            });

            await newCard.save();
            res.status(200).json(newCard);
        }
        catch(error){
            res.status(500).json({ message: 'Card creation failed', error : error})
            console.log(error);
        }
    },

    fetchCard : async(req, res)=>{
        try{
            const {id} = req.params;
            const fetchedCard = await Card.findById(id).populate({ path : 'comments', populate : { path : 'user' }});
            if(!fetchedCard){
                return res.status(404).json({message: 'Card does not exist'});
            };

            res.status(200).json({data : fetchedCard});
        }
        catch(error){
            res.status(500).json({message: 'Card fetch failed', error: error});
            console.error(error)
        }
    },

    updateCard : async(req, res)=>{
        const {id} = req.params;
        const data = req.body;
        try{
            const updatedCard = await Card.findByIdAndUpdate(
                id,
                data,
                {new: true}
            );

            if(!updatedCard){
                return res.status(404).json({message: 'Card does not exist'});
            };

            res.status(200).json({updatedCard});
        }
        catch(error){
            res.status(500).json({message : 'An error occured', error});
            console.error(error);
        }
    },

    addComment : async(req, res)=>{
        const { id } = req.params;
        const { commentId } = req.body;
        try{
            const updatedCard = await Card.findByIdAndUpdate(
                id,
                {$push : {comments : commentId}},
                {new : true},
            ).populate({path: 'comments', populate: {path: 'user'}})

            if(!updatedCard){
                res.status(404).json({message : 'Card not found'});
            }
            res.status(200).json(updatedCard);
        }
        catch(error){
            res.status(500).json({message : 'Internal Server Error', error : error})
            console.error(error)
        }
    }
}

module.exports = cardController;