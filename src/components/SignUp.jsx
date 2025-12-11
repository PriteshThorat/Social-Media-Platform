import Label from "./Label"
import InputBox from "./InputBox"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { pass } from "../store/authSlice"
import auth from "../service/auth"
import { useEffect, useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X, Loader2 } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  Object.values(checks).forEach((check) => check && score++);

  if (score <= 2) return { score, label: "Weak", color: "bg-red-500", checks };
  if (score <= 3)
    return { score, label: "Fair", color: "bg-yellow-500", checks };
  if (score <= 4) return { score, label: "Good", color: "bg-blue-500", checks };
  return { score, label: "Strong", color: "bg-green-500", checks };
}

const SignUp = ({}) => {
  const { register, handleSubmit, watch } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const password = watch("password")
  const passwordStrength = getPasswordStrength(password)

  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckigUsername, setIsCheckigUsername] = useState(false)
  const debounced = useDebounceCallback(setUsername, 300)

  useEffect(() => {
    (async () => {
      if (username) {
        setIsCheckigUsername(true)
        setUsernameMessage("")

        try {
          const res = await auth.isUsernameUnique({ username })
          console.log(res)

          setUsernameMessage(res.message)
        } catch (error) {
          console.log(error)
        } finally {
          setIsCheckigUsername(false)
        }
      }
    })();
  }, [username])

  const signup = async (data) => {
    setError("");

    try {
      const { fullName, email, username, password } = data;

      const user = await auth.createAccount({
        username,
        fullName,
        email,
        password,
      });

      const userId = user?.data?._id;

      dispatch(pass({ userId, email, password }));

      if (user) {
        navigate("/verify-email");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join us today and get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(signup)} className="space-y-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label labelFor="name" text="Full Name" />
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <InputBox
                  id="name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  {...register("fullName", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label labelFor="email" text="Email Address" />
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <InputBox
                  id="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  type="email"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label labelFor="username" text="Username" />
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <InputBox
                  id="username"
                  autoComplete="username"
                  placeholder="Enter Username"
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  {...register("username", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^(?!.*\.\.)(?!.*\.$)(?!.*[A-Z])[^\W][\w.]{0,29}$/gim.test(
                          value
                        ) || "Username must be valid",
                    },
                  })}
                  onChange={(e) => {
                    register("username").onChange(e);

                    debounced(e.target.value);
                  }}
                />
              </div>
              {/* Username Validation Feedback */}
              {(isCheckigUsername || usernameMessage) && (
                <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg transition-all duration-200">
                  {isCheckigUsername ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Checking availability...
                      </span>
                    </>
                  ) : usernameMessage ? (
                    <>
                      {usernameMessage.includes("Username is available") ? (
                        <>
                          <div className="flex items-center justify-center w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                            {usernameMessage}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full">
                            <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                          </div>
                          <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                            {usernameMessage}
                          </span>
                        </>
                      )}
                    </>
                  ) : null}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label labelFor="password" text="Password" />
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <InputBox
                  id="password"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                  {...register("password", {
                    required: true,
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                      Password strength:
                    </span>
                    <span
                      className={`font-semibold ${
                        passwordStrength.label === "Strong"
                          ? "text-green-600 dark:text-green-400"
                          : passwordStrength.label === "Good"
                          ? "text-blue-600 dark:text-blue-400"
                          : passwordStrength.label === "Fair"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    {Object.entries({
                      "At least 8 characters": passwordStrength.checks?.length,
                      "Lowercase letter": passwordStrength.checks?.lowercase,
                      "Uppercase letter": passwordStrength.checks?.uppercase,
                      Number: passwordStrength.checks?.number,
                      "Special character": passwordStrength.checks?.special,
                    })
                      .slice(0, 4)
                      .map(([requirement, met]) => (
                        <div
                          key={requirement}
                          className="flex items-center space-x-1"
                        >
                          {met ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span
                            className={
                              met ? "text-green-600 dark:text-green-400" : ""
                            }
                          >
                            {requirement}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error.toString()}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 group"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <Lock className="w-3 h-3" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp