import React from 'react';
//components
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount({CreateAccountFunction}) {
    return <div>
        <h1>Create Account</h1>
        <CreateAccountForm CreateAccountFunction={CreateAccountFunction}/>
    </div>;
}

export default CreateAccount;