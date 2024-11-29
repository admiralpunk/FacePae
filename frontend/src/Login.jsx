import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const navigate = useNavigate(); // Initialize navigation for redirection

    // const handleLogin = async (data) => {
    //     try {
    //         const { email, password } = data; // Destructure email and password from form data
    //         const res = await axios.post('http://localhost:3000/api/login', {
    //             email,
    //             password,
    //         });
    //         alert('Login successful!'); // Show success message
    //         window.location.href='/dashboard'
    //     } catch (err) {
    //         alert(err.response?.data?.msg || 'Error logging in');
    //     }
    // };

    const handleLogin = async (data) => {
        try {
            const { email, password } = data; // Destructure email and password from form data
            const res = await axios.post('http://localhost:3000/api/login', {
                email,
                password,
            });
    
            // If login is successful, store the JWT token in localStorage
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);  // Store token in localStorage
                alert('Login successful!');
                window.location.href = '/dashboard';  // Redirect to dashboard or another page
            } else {
                alert('Login failed! Please try again.');
            }
        } catch (err) {
            alert(err.response?.data?.msg || 'Error logging in');
        }
    };
    

    return (
        <div className="admin-login">
            <h1 className="login-title">
                Login to FacePae Food Ordering System
            </h1>
            <div>
                <form
                    action=""
                    method="post"
                    onSubmit={handleSubmit(handleLogin)}
                    className="login-form"
                >
                    <label>
                        <input
                            type="email"
                            placeholder="E-mail"
                            {...register("email", {
                                required: "Insert E-mail",
                            })}
                        />
                        {errors.email && <p className="error-msg">{errors.email.message}</p>}
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Insert Password",
                            })}
                        />
                        {errors.password && <p className="error-msg">{errors.password.message}</p>}
                    </label>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Login"}
                    </button>
                </form>
                <span className="signup-link">
                    Don't have an account? <Link to="/signup">SignUp</Link>
                </span>
            </div>
        </div>
    );
}

export default Login;