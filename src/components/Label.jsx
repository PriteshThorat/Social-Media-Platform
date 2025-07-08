const Label = ({labelFor, text, fontSize}) => {
    return (
        <>
            <label
                htmlFor={labelFor}
                className={`${fontSize} block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1`} >
                {text}
            </label>
        </>
    );
};

export default Label;