const Workspace = require ('../models/workspaceModel');
const workspaceController = {

    updateWorkspace: async(req, res) =>{
        const id = req.params.id;
        const data = req.body;
        try{
            const updatedWorkspace = await Workspace.findByIdAndUpdate(
                id,
                {$set: {
                     boards: data.boards,
                     members : data.members
                }},
                {new : true}
            ).populate('boards');

            if(!updatedWorkspace){
                return res.status(404).json({message: 'Workspace not found'});
            };

            res.status(200).json(updatedWorkspace);

        } catch(error){
            console.log(error)
        }
    },

    getWorkspaces: async(req, res) =>{
        const id = req.params.id;
        try{
            const workspace = await Workspace.findById(id).populate('boards');

            if(!workspace){
                res.status(404).json({message: 'Workspace not found'});
            }

            res.status(200).json({data : workspace});
            
        }
        catch(error){
            console.log(error);
        }
    },

    createWorkspace : async(req, res) => {
        const data = req.body;
        try{
            const newWorkspace = new Workspace({...data});
            await newWorkspace.save();
            res.status(201).json({message: 'Workspace created', data : newWorkspace});
        }
        catch(error){
            res.status(500).json({message: 'Failed to create workspace'});
            console.log(error);
        }
    } 
}

module.exports = workspaceController;