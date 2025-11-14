import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignInValidationSchema } from './validationSchema.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import "./shared.scss";

interface SigninProps {
    submitClicked: () => void;
    registerClicked: () => void;
}

const Signin: FC<SigninProps> = ({ submitClicked, registerClicked }) => {
    const methods = useForm({
            resolver: yupResolver(SignInValidationSchema)
        });
    const { handleSubmit, formState: { errors }, register } = methods;

    return (
        <FormProvider {...methods} >
            <form name="register-form" className="register-form" onSubmit={handleSubmit(submitClicked)}>
                <div className="signin">
                    <div className="signin-header">Sign-in</div>
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