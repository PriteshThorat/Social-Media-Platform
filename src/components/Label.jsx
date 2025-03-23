const Label = ({text, fontSize}) => {
    return (
        <>
            <label
                className={`${fontSize} block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1`}>
                {text}
            </label>
        </>
    );
};

export default Label;