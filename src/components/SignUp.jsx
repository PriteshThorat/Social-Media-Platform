import Label from './Label';
import Button from './Button';
import InputBox from './InputBox';

const SignUp = ({}) => {
    return (
        <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <h1 
                className='text-4xl font-extrabold text-gray-800 mb-4 tracking-wide' >
                    Create Account
                </h1>
                <p 
                className='mb-6 text-gray-600 text-lg'>
                    Already have an account? 
                    <a
                    className='text-blue-500 font-semibold hover:underline cursor-pointer'>
                        Sign in
                    </a>
                </p>
                <div className='w-full max-w-xs bg-white p-6 rounded-lg shadow-lg'>
                    <Label 
                    text="Enter Name"
                    fontSize="20px" />
                    <InputBox
                    placeholder="Enter your Name"
                    height='20px'
                    width='20px'
                    type="text"
                    className="" />
                    <Label 
                    text="Email"
                    fontSize="20px" />
                    <InputBox
                    placeholder="Enter your Email"
                    height='20px'
                    width='20px'
                    type="email"
                    className="" />
                    <Label 
                    text="Password"
                    fontSize="20px" />
                    <InputBox
                    placeholder="Enter your Password"
                    height='20px'
                    width='20px'
                    type="password"
                    className="" />
                    <Button
                    text="Sign up"
                    height="20px"
                    width="20px"
                    className="" />
                </div>
            </div>
        </>
    );
};

export default SignUp;