const BASE_URL = 'http://localhost:4000/api/comment';

export const createComment = async(data)=>{
    try{
        const response = await fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                comment : data.comment,
                user : data.user
            })
        });

        if(!response.ok){
            throw new Error('Could not create new comment');
        }

        const json = await response.json();
        return json;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}