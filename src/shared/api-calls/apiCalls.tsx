import { UserSettings } from "../../utilities/interfaces";

export async function getAccountSettingsRequest(username: string, setAccountSettings: (settings: UserSettings) => void) {
    const user = {
          Username: username
        }
      
    const json = JSON.stringify(user);
    try {
        await fetch('http://localhost:8080/account-settings', {
        method: 'POST',
        body: json,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        })
        .then(response => response.json())
        .then(data => {
        if (data.code == 200) {
            setAccountSettings(data.accountSettings[0]);
            console.log(data.accountSettings[0]);
        }
        else if (data.code == 500) {
            console.log(data);
        }
        })
        .catch(error => console.log(error))
    }
    catch (error) {
        console.log(error);
    }
};

export async function saveSettingsRequest(settingsJson: string,
        accountUpdated: boolean,
        setSettingsUpdated: (updated: boolean) => void, 
        setErrorUpdating: (error: boolean) => void)
    {
        try {
            await fetch("http://localhost:8080/account-settings/update" , {
                method: "POST",
                body: settingsJson,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.code == 200) {
                    accountUpdated = true;
                    setErrorUpdating(false);
                } else if (data.code == 500) {
                    setErrorUpdating(true);
                }
                console.log(data);
            })
            .catch(error => console.log(error));
        }
        catch (error) {
            console.log('error')
        }

        setSettingsUpdated(accountUpdated);
};

export async function createUsersRequest(loginCredentials: string, setUserExists: (exists: boolean) => void) {
    let userAdded = false;
    try {
            await fetch("http://localhost:8080/users", {
                    method: "POST",
                    body: loginCredentials,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        userAdded = true;
                    } else if (data.code == 500) {
                        setUserExists(true);
                    }
                    console.log(data);
                })
                .catch(error => console.log(error));
        }
        catch (error) {
            console.log(error)
        }

    return userAdded;
};

export async function signInRequest(loginCredentials: string, username: string, expireTime: string, setLoginError: (error: boolean) => void, submitClicked: () => void) {
    try {
        await fetch("http://localhost:8080/signin", {
                method: "POST",
                body: loginCredentials,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.code == 200) {
                    setLoginError(false);
                    document.cookie = `username=${username}; expires=${expireTime}; path=/;`;
                    submitClicked();
                } 
                else {
                    setLoginError(true);
                }
            })
            .catch(error => console.log(error));
    }
    catch(error) {
        console.log(error);
    }
};

export async function chatbotRequest(inquiry: string) {
    const userInquiry = {
        inquiry: inquiry,
    };

    const jsonInquiry = JSON.stringify(userInquiry);
    try {
        const chatbotResponse = await fetch(`http://localhost:8080/chatbot-inquiry`, {
                method: "POST",
                body: jsonInquiry,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
            .then(response => response.json())
            .catch(error => { 
                console.log(error);
                return "Unable to process your question. Try again later.";
            });
        return chatbotResponse?.response;
    }
    catch(error) {
        console.log(error);
        return "Unable to process your question. Try again later.";
    }
};