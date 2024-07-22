"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import _auth from "@/utils/auth";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = _auth();
  const router = useRouter();

  async function login() {
    setLoading(true);
    try {
      await auth.login(credential, password);
      router.push("homepage");
    } catch (ex) {
      console.log(ex);
      alert("a");
    }
    setLoading(false);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Or Username
            </label>
            <Input
              value={credential}
              onChange={(e) => setCredential((x) => e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword((x) => e.target.value)}
              placeholder="********"
              className="mt-1 block w-full"
            />
          </div>
          <Button
            onClick={login}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
