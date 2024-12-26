const BASE_URL = 'http://localhost:4000/api/users';
const UPDATE_URL = 'http://localhost:4000/api/update'


export const loginUser = async(email, password, googleId) =>{
    try{
        const response = await fetch(`${BASE_URL}/login`,{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email : email,
                password : password,
                googleId : googleId,
            })
        })

        if(!response.ok){
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Failed to Login';
            console.error('Login failed', errorMessage);
            alert(errorMessage);
            return;
        }

        return await response.json();
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const updateUser = async(updatedUserInfo, token) =>{
    try{
        const response = await fetch(`${BASE_URL}/userUpdate/${updatedUserInfo._id}`,{
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(updatedUserInfo)
        });
        if(response.ok){
            return await response.json();
        }else{
            throw new Error('Failed to update user');
        }
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const updateUserInfo = async(formData, userId) =>{
    try{
        const response = await fetch(`${UPDATE_URL}/userInfo/${userId}`,{
            method: 'PUT',
            body : formData,
        })

        if(!response.ok){
            const errorData = await response.json();
            console.error('Error updating profile', errorData);
        }
        else{
            const result = await response.json();
            return result;
        }
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const searchUsers = async(data) =>{
    try{
        const response = await fetch(`${BASE_URL}/search`,{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({data: data}),
        })

        if(!response.ok){
            const json = await response.json();
            throw new Error('Could not search for users', json.error);
        }

        const json = await response.json();
        return json;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

export const searchUsersById = async(userIds) =>{
    try{
        const response = await fetch(`${BASE_URL}/searchMembers`,{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({userIds}),
        });

        const json = await response.json();

        if(!response.ok){
            throw new Error('Could not get users', json.error);
        };

        return json.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export const addWorkspaceToMembers = async(members, workspaceId)=>{
    try{
        const response = await fetch(`${BASE_URL}/otherWorkspaces`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({members, workspaceId}),
        })

        const json = await response.json();

        if(!response.ok){
            throw new Error('Could not update members workspaces', json.error);
        }   
        return json;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}