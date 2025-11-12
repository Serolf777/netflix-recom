import { FC } from 'react';

interface SigninProps {
    submitClicked: () => void;
    registerClicked: () => void;
}

const Signin: FC<SigninProps> = ({ submitClicked, registerClicked }) => {
    return (
        <div className="signin">
            <div className="signin-header">Sign-in</div>
            <div className="signin-details">
                <div className="username">
                    <div>Username</div>
                    <input type="username" id="username" name="username" className="username-input"/>
                </div>
                <div className="password">
                    <div>Password</div>
                    <input type="password" id="password" name="password" className="password-input"/>
                </div>
                <button onClick={submitClicked}>Submit</button>
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
    )
};

export default Signin;