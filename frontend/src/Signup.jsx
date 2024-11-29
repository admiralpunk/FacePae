import { useForm } from "react-hook-form";
import axios from "axios"; // Ensure axios is imported
import { Link } from "react-router-dom";


function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();


    const handleSignup = async (data) => {
        try {
            const { name, email, password } = data;
            const response = await axios.post('http://localhost:3000/api/create-restaurant', {
                name,
                email,
                password,
            });
            if (response.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
            } else {
                console.log(data)
                alert("Registered successfully! Please Login to proceed.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="admin-login">
            <h1 className="login-title">SignUp to FacePae Food Ordering System</h1>
            <form onSubmit={handleSubmit(handleSignup)} className="login-form">
                <label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        {...register("name", {
                            required: "Insert Name",
                        })}
                    />
                    {errors.name && <p className="error-msg">{errors.name.message}</p>}
                </label>
                <label>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        {...register("email", {
                            required: "Insert E-mail",
                        })}
                    />
                    {errors.email && <p className="error-msg">{errors.email.message}</p>}
                </label>
                <label>
                    <input
                        type="text"
                        name="userID"
                        placeholder="User ID"
                        {...register("userID", {
                            required: "Insert User ID",
                        })}
                    />
                    {errors.userID && <p className="error-msg">{errors.userID.message}</p>}
                </label>
                <label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Insert Password",
                        })}
                    />
                    {errors.password && <p className="error-msg">{errors.password.message}</p>}
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Redirecting to Login Page" : "SignUp"}
                </button>
            </form>
            <span className="signup-link"><Link to='/login'>Click Here</Link> to Login</span>
        </div>
    );
}

export default SignUp;
