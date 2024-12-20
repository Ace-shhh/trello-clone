const BASE_URL = 'http://localhost:4000/api/board';

export const fetchBoardById = async(id) =>{
    try{
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        if(!response.ok){
            throw new Error('Failed to fetch the board');
        }
        const json = await response.json();
        return json.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const createBoard = async(title) =>{
    try{
        const response = await fetch(`${BASE_URL}/create`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify({title})
        });

        if(!response){
            throw new Error('Failed to create board');
        }
        const data = await response.json();
        return data.data;
    }
    catch(error){
        console.log(error)
        throw error
    }
}

export const addBoardColumn = async(boardId, columnId) =>{
    try{

        const response = await fetch(`${BASE_URL}/addBoardColumn/${boardId}`,{
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({columnId : columnId})
        });

        if(!response.ok){
            throw new Error('Failed to update board')
        };

        const json = await response.json();
        return json.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const updateBoardColumnsOrder = async(boardId, columns) =>{
    const columnIds = columns.map((col)=> col._id);
    try{
        const response = await fetch(`${BASE_URL}/updateBoardColumnsOrder/${boardId}`,{
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({columnIds : columnIds})
        })

        if(!response.ok){
            throw new Error('Could not update columns order', response);
        }

        const json = await response.json();
        return json.data;
        console.log('updated columns order')
    }
    catch(error){
        console.error(error)
        throw error;
    }
}