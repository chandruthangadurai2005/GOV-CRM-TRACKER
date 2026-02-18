import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Shield, BarChart3, Navigation } from "lucide-react";
import api from "@/lib/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");

  } catch (error) {
    alert("Invalid credentials");
  }
};


  return (
    <div className="flex min-h-screen">
      {/* LEFT PANEL SAME AS YOURS */}

      {/* RIGHT FORM */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
