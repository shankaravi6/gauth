import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    var decodedHeader = jwtDecode(response.credential);
    const { sub } = decodedHeader;

    //console.log("data", decodedHeader);
    if (sub !== null || sub !== "") {
      localStorage.setItem("userdet", JSON.stringify(decodedHeader));
      localStorage.setItem("google_id_token", response.credential);
      navigate("/Home");
    }
  };

  function toggleFullScreen() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  return (
    <div>
      <div className="full-container">
        <h1 className="title">Login With Google</h1>
        <GoogleOAuthProvider clientId="371665581818-tgjhvkqgp2ijcln872qr22rgj3hf274u.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(response) => responseGoogle(response)}
            onError={() => console.log("Error")}
            clientId="371665581818-tgjhvkqgp2ijcln872qr22rgj3hf274u.apps.googleusercontent.com"
            scopes={[
              "profile",
              "email",
              "https://www.googleapis.com/auth/user.phonenumbers.read",
              "https://www.googleapis.com/auth/user.addresses.read",
            ]}
          />
        </GoogleOAuthProvider>
        <p
          onClick={toggleFullScreen}
          style={{ color: "#29384c", cursor: "pointer", fontWeight: "600" }}
        >
          View Full Screen
        </p>
      </div>
    </div>
  );
};

export default Login;
