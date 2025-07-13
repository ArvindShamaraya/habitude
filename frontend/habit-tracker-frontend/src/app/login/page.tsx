"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {Eye, EyeOff, Github, Mail} from "lucide-react"

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})



export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        // This would be replaced with actual authentication logic
        setTimeout(() => {
            setIsLoading(false)
            router.push("/dashboard")
        }, 1000)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted-foreground p-4 space-y-5">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Please enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="test@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={showPassword ? "text" : "password"} {...field} />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox className="h-4 w-4 text-primary border-gray-300 rounded hover:bg-blue-100 "/>
                                    <Label htmlFor="rememberMe" className="text-sm">
                                        Remember Me
                                    </Label>
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        <Link href="/forgot-password" className="text-primary underline underline-offset-4 hover:bg-blue-50">
                            Forgot your password?
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary underline underline-offset-4 hover:bg-blue-50">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
