const Comment = require('../models/commentModel');

const commentController = {
    create : async(req, res)=>{
        const data = req.body;
        try{
            const newComment = new Comment(data);
            await newComment.save();
            
            res.status(200).json(newComment);
        }
        catch(error){
            res.status(500).json({message : 'Internal Server Error', error : error})
            console.log(error)
        }
    }
}

module.exports = commentController;