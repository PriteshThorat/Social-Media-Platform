const ProfilePicture = ({src, alt, className}) => {
    return (
        <>
            <img
            className={`rounded-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out ${className}`}
            src={src}
            alt={alt} />
        </>
    );
};

export default ProfilePicture;

//w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-md hover:scale-105 transition-transform duration-300 ease-in-out