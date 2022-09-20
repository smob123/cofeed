export default function CircularAvatar({ imageSrc, size, className }) {
    return (
        <div style={{ width: size, height: size }} className={`rounded-circle p-1 ${className}`}>
            <div className="w-100 h-100 rounded-circle overflow-hidden">
                <img src={imageSrc} className='object-fit-cover' alt='avatar' />
            </div>
        </div>
    );
}