export default function PostImage({ imageSrc }) {
    return (
        <div className='bg-white p-1 rounded-top rounded-bottom mb-2'>
            <img src={imageSrc} className='rounded' alt='post' />
        </div>
    );
}