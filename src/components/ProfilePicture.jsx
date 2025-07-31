const ProfilePicture = ({src, alt, className}) => {
    return (
        <>
            <img
            className={`rounded-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out ${className}`}
            src={src}
            loading="lazy"
            alt={alt} />
        </>
    );
};

export default ProfilePicture;