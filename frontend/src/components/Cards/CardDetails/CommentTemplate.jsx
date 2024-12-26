import './CommentTemplate.scss'

const CommentTemplate = ({data}) =>{
    return(
        <div className='comment-template-container'>
            <div className='profile-picture-section'>
                <img src={data.user.profilePicture}></img>
            </div>
            <div className='comment-section'>
                <div className='comment-details'>
                    <span>{data.user.username}</span> <span>{data.createdAt}</span>
                </div>
                <div className='comment-container'>
                    <p>{data.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentTemplate;