"use client"
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

const LoginPageClient = () => {
    return (
        <main className="min-h-screen w-screen flex items-center justify-center -mt-8">
            <div className={"max-w-[428px] w-full flex-col flex items-center"}>
                <Image
                    src={"/star-wars-logo.png"}
                    alt={"star wars logo"}
                    width={440}
                    height={196}
                    className={"h-auto w-[80%] mb-12"}
                />
                <h1 className={"text-theme-primary text-xl font-bold text-center mt-0"}>
                    Login
                </h1>
                <LoginForm />
            </div>
        </main>
    );
};
export default LoginPageClient;
