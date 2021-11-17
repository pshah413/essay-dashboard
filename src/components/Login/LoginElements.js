import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './RefreshToken';

const clientId =
  '941180258827-sju1l61gpjh0qihopj6g4bef3r68hl9q.apps.googleusercontent.com';

function LoginBtn() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Login succeeded.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Login failed.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default LoginBtn;