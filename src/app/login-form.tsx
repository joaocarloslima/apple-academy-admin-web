"use client"
import { login } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"

const initialState = {
  email: "",
  password: "",
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [form, setForm] = useState(initialState);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    setPending(true);
    if (!await login(form)) {
      setError("Invalid email or password");
      setPending(false);
      return
    }
    setError("");
    redirect("/admin")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Apple Developer Academy</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@sp.senac.br"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  required />
              </div>
              <Button onClick={handleSubmit} disabled={pending} className="w-full">
                {pending && (
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Login
              </Button>

              <span className="text-destructive text-center block">{error}</span>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
