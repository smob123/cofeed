import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import CircularAvatar from '../../../../components/circular-avatar/circular-avatar';
import PostImage from '../../../../components/post-image/post-image';

export default function FeedItem({ feedObject, onLikeClick }) {
    return (
        <div>

            <PostImage imageSrc={feedObject.imageSrc} />

            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <CircularAvatar imageSrc={feedObject.user.avatar} size={50} />
                    <strong className='mx-1 text-truncate'>{feedObject.user.username}</strong>
                </div>

                <div className='d-flex'>
                    <div className={`mx-3 ${feedObject.isLiked ? 'text-danger' : 'text-muted'}`}>
                        <FontAwesomeIcon className='cursor-pointer mx-1' icon={faHeart} onClick={onLikeClick} />

                        <span>
                            {feedObject.numOfLikes}
                        </span>
                    </div>

                    <div className='text-muted'>
                        <FontAwesomeIcon icon={faComment} className='mx-1' />

                        <span>
                            {feedObject.numOfComments}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}