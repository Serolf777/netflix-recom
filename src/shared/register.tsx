import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignInValidationSchema } from './validationSchema.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import "./shared.scss";

interface RegisterProps {
    toggleSignin: () => void;
}

const Register: FC<RegisterProps> = ({ toggleSignin }) => {
    const methods = useForm({
        resolver: yupResolver(SignInValidationSchema)
    });
    const { register, getValues, handleSubmit, formState: { errors } } = methods;

    const onSubmitHandler = async () => {
        let userAdded = false;

        const loginCredentials = {
            userName: getValues("username"),
            password: getValues("password")
        }
        
        const json = JSON.stringify(loginCredentials);

        try {
            await fetch("http://localhost:8080/users", {
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
                        userAdded = true;
                    }
                    console.log(data);
                })
                .catch(error => console.log(error));
        }
        catch(error) {
            console.log(error)
        }
        
        if (userAdded) {
            toggleSignin();
        }
    };

    return (
        <FormProvider { ...methods }>
            <form name="register-form" className="register-form" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="register-modal">
                    <div className="register-header">
                        Register An Account
                    </div>
                    <div className="register-header">
                        <div className="header-text">Please create a username and password. </div>
                        <div className="requirements-text">
                            Username must be at least 6 characters and Password must be minimum 6 characters, 
                            contain an uppercase letter, and a number.
                        </div>
                    </div>
                    <div className="register-details">
                        <div className="username">
                            <div>Username</div>
                            <input {...register("username")} type="username" id="username" name="username" className="username-input"/>
                            { errors?.username &&
                                <div className="error-message"> 
                                    {errors?.username.message}
                                </div>
                            }
                        </div>
                        <div className="password">
                            <div>Password</div>
                            <input {...register("password")} type="password" id="password" name="password" className="password-input"/>
                            { errors?.password &&
                                <div className="error-message"> 
                                    {errors?.password.message}
                                </div>
                            }
                        </div>
                        <button className="submit-button" type="submit" value="submit"> Create An Account </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
};

export default Register;