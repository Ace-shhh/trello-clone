const BASE_URL = 'http://localhost:4000/api/column';

export const createColumn = async(name) =>{
    try{
        const response = await fetch(`${BASE_URL}/create`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title : name})
        })

        if(!response.ok){
            throw new Error('Failed to create new column');
        }

        const json = await response.json();
        return json.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const updateColumnOrder = async(columns) =>{
    try{
        for(let i = 0; i < columns.length; i++){
            const column = columns[i]
            const response = await fetch(`${BASE_URL}/${column._id}`,{
                method: 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    order : i,
                })
            });
            
            if(!response.ok){
                throw new Error(`Failed to update column order for column ID: ${column._id}`)
            }
        }
    } catch(error){
        console.error(error)
        throw error;
    }
}

export const updateColumn = async(columnId, newColumnName)=>{
    try{
        const response = await fetch(`${BASE_URL}/updateColumn/${columnId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({title : newColumnName})
        })

        if(!response.ok){
            throw new Error('Could not update column name');
        }

        const json = await response.json();
        return json.data;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const addCardToColumn = async( columnId, cardId) =>{
    try{
        const response = await fetch(`${BASE_URL}/addCard/${columnId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({cardId : cardId})
        });

        if(!response.ok){
            throw new Error('Could not update column cards');
        }

        const json = await response.json();
        return json;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const updateCardsOrder = async(column, cards) =>{
    try{
        const response = await fetch(`${BASE_URL}/updateCardsOrder/${column._id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({cards})
        })

        if(!response.ok){
            throw new Error('Could not update cards order', response);
        }

        const json = await response.json();
        return json.data;
    }
    catch(error){
        console.error(error)
        throw error
    }
}
