const BASE_URL = 'http://localhost:4000/api/card'

export const createCard = async(newTitle) =>{
    try{
        const response = await fetch(`${BASE_URL}`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title : newTitle})
        })

        if(!response.ok){
            throw new Error('Could not create new card');
        };

        const json = await response.json();
        return json;
    }
    catch(error){
        console.error(error)
        throw error;
    }
}

export const fetchCard = async(id)=>{
    try{
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        })

        if(!response.ok){
            throw new Error('Internal server error. Could not fetch card');
        };

        const json = await response.json();
        return json.data;
    }
    catch(error){
        console.error(error)
        throw error;
    }
}

export const updateCard = async(id, data)=>{
    try{
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error('Internal Server Error. Could not update card');
        };

        const json = await response.json();
        return json.data;
    }
    catch(error){
        console.error(error)
        throw error;
    }
}

export const updateCardComments = async(cardId, commentId) =>{
    try{
        const response = await fetch(`${BASE_URL}/addComment/${cardId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({commentId})
        })

        if(!response.ok){
            throw new Error('Could not add comment')
        }

        const json = await response.json();
        return json;
    }
    catch(error){
        console.log(error)
        throw error
    }
}