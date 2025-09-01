const Label = ({labelFor, text, fontSize}) => {
    return (
        <>
            <label
                htmlFor={labelFor}
                className={`${fontSize} block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2`} >
                {text}
            </label>
        </>
    );
};

export default Label;