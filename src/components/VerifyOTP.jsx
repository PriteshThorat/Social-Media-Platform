import { InputBox } from './index'
import { useForm } from 'react-hook-form';
import authService from '../service/auth'
import { useDispatch, useSelector } from 'react-redux';
import { pass, login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.temp)

    const { register, handleSubmit, setValue } = useForm();

    const verify = async(parts) => {
        const { part1, part2, part3, part4, part5, part6 } = parts

        const userOTP = `${part1}${part2}${part3}${part4}${part5}${part6}`

        const isCorrectOTP = await authService.verifyOTP({ email: user.email, userOTP })

        if(isCorrectOTP){
          const userPassword = user.password
          const userEmail = user.email

          const loggedUser = await authService.login({ email: userEmail, password: userPassword })
          
          if(loggedUser){
            dispatch(pass(null))
            dispatch(login(loggedUser))

            navigate("/")
          }
        }
    }

    const registerOptions = (partName) => (
        register(partName, {
            required: true,
            onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "");
                setValue(partName, value);
            }
        })
    )

    return (
        <form 
            onSubmit={handleSubmit(verify)}
            className="flex flex-col items-center gap-4" >
            <div className='flex justify-center gap-2'>
                {
                    ["part1", "part2", "part3", "part4", "part5", "part6"].map(part => (
                        <InputBox
                            key={part}
                            placeholder=""
                            type="text"
                            className="w-12 h-12 text-center text-2xl border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                            maxLength={1}
                            inputMode="numeric"
                            pattern="\d*"
                            {...registerOptions(part)}
                        />
                    ))
                }
            </div>
            <button
                type="submit"
                className={`px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition"
                `} >
                Verify OTP
            </button>
        </form>
    )
}

export default VerifyOTP