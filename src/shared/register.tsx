import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SignInValidationSchema } from './validationSchema.tsx';
import { yupResolver } from '@hookform/resolvers/yup'

interface RegisterProps {
    toggleSignin: () => void;
}

const Register: FC<RegisterProps> = ({ toggleSignin }) => {
    const methods = useForm({
        resolver: yupResolver(SignInValidationSchema)
    });
    const { register, getValues, handleSubmit, formState: { errors } } = methods;

    const onSubmitHandler = () => {
        toggleSignin();
    };

    return (
        <FormProvider { ...methods }>
            <form name="register-form" className="register-form" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="register-modal">
                    <div className="register-header">
                        Register An Account
                    </div>
                    <div className="register-header">
                        Please create a username and password.
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
                        <div className="password-requirements">
                            Password must be at least 5 characters and include an uppercase letter, lowercase letter, and a number.
                        </div>
                        <button type="submit" value="submit"> Submit </button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
};

export default Register;