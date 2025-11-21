import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignInValidationSchema } from './validationSchema.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { expireTime } from '../utilities/utilityFunctions.tsx';
import "./shared.scss";

interface SigninProps {
    submitClicked: () => void;
    registerClicked: () => void;
}

const Signin: FC<SigninProps> = ({ submitClicked, registerClicked }) => {
    const methods = useForm({
            resolver: yupResolver(SignInValidationSchema)
        });
    const { handleSubmit, getValues, formState: { errors }, register } = methods;
    const [loginError, setLoginError] = useState(false);

    async function submitClickedAction () {
        const loginCredentials = {
            userName: getValues("username"),
            password: getValues("password")
        }
        const json = JSON.stringify(loginCredentials);

        try {
            await fetch("http://localhost:8080/signin", {
                    method: "POST",
                    body: json,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        setLoginError(false);
                        document.cookie = `username=${getValues("username")}; expires ${expireTime()}; path=/;`
                        submitClicked();
                    } 
                    else {
                        setLoginError(true);
                    }
                    console.log(data);
                })
                .catch(error => console.log(error));
        }
        catch(error) {
            console.log(error)
        }
  }

    return (
        <FormProvider {...methods} >
            <form name="register-form" className="register-form" onSubmit={handleSubmit(submitClickedAction)}>
                <div className="signin">
                    <div className="signin-header">Sign-in</div>
                    {loginError &&
                        <div className="error-message">
                            Unable to login, please double check username and password.
                        </div>
                    }

                    <div className="signin-details">
                        <div className="username">
                            <div>Username</div>
                            <input {...register("username")} type="username" id="username" name="username" className="username-input"/>
                            {errors?.username &&
                                <div className="error-message"> 
                                    {errors?.username.message}
                                </div>
                            }
                        </div>
                        <div className="password">
                            <div>Password</div>
                            <input {...register("password")} type="password" id="password" name="password" className="password-input"/>
                            {errors?.password &&
                                <div className="error-message"> 
                                    {errors?.password.message}
                                </div>
                            }
                        </div>
                        <button className="submit-button" type="submit" value="submit">Submit</button>
                        <div className="register-footer">
                            <div>
                                Don't have an account?
                            </div>
                            <div className="register-button" onClick={registerClicked}>
                                Register.
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </ FormProvider>
    )
};

export default Signin;