import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@shared/context/auth/useAuth";

export function SignupPage() {
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
      <h1>Create account</h1>
      <p>Sign up with Google to continue.</p>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.error("Google login error")}
        useOneTap={false}
      />
    </div>
  );
}

export default SignupPage;
