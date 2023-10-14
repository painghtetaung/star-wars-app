import React from "react";
import { Metadata } from "next";
import LoginPageClient from "@/app/login/pageClient";

const LoginPage = async () => {
    return (
        <LoginPageClient/>
    );
};

export const metadata: Metadata = {
    title: "Login | May the Force Be With You.",
    description: "May the Force Be With You.",
};

export default LoginPage;
