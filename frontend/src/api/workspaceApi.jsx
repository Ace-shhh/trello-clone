const BASE_URL = 'http://localhost:4000/api/workspace';

export const createNewWorkspace = async(workspaceData) =>{
    try{
        const response = await fetch(`${BASE_URL}/create`,{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(workspaceData)
        })

        if(!response.ok){
            throw new Error('Failed to create workspace');
        }
        
        const newWorkspace = await response.json();
        return newWorkspace.data;
    }
    catch(error){
        console.log(error)
        throw error;
    }
}

export const fetchOwnWorkspace = async(workspaceId)=>{
    try{
        const response = await fetch(`${BASE_URL}/get/${workspaceId}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if(response.ok){
            const json = await response.json();
            return json.data;
        }
    }catch(error){
        console.log(error)
        throw error;
    }

}

export const updateWorkspace = async(updatedWorkspace)=>{
    try{
        const response = await fetch(`${BASE_URL}/update/${updatedWorkspace._id}`,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updatedWorkspace)
        })

        if(!response.ok){
            throw new Error('Failed to update workspace')
        }

        const json = response.json();
        return json;
    }catch(error){
        console.log(error);
        throw error;
    }
}