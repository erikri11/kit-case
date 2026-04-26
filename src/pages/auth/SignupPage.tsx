import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@shared/context/auth/useAuth";
import { useTranslation } from "react-i18next";

export function SignupPage() {
  const { t } = useTranslation("common");
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) return;

    const response = await fetch("http://localhost:4000/api/auth/google/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        credential: credentialResponse.credential
      })
    });

    if (!response.ok) {
      console.error("Google signup failed");
      return;
    }

    const data = await response.json();
    console.log("Signed up:", data);
    login(data.user);
  };

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 420, margin: "80px auto" }}>
      <h1>{t("createAccount")}</h1>
      <p>{t("signUpWithGoogle")}</p>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.error("Google login error")}
        useOneTap={false}
        shape="circle"
        theme="filled_black"
      />
    </div>
  );
}

export default SignupPage;
