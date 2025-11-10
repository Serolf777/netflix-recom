import { FC } from 'react';

interface SigninProps {
    submitClicked: () => void;
}

const Signin: FC<SigninProps> = ({ submitClicked }) => {

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
            </div>
        </div>
    )
};

export default Signin;