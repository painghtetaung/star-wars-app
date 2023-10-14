"use client";
import React, {useEffect, useState} from "react";
import { message, Button, Divider, Input } from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
const LoginForm: React.FC = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [timeoutValue, setTimeoutValue] = useState<string>("10");

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(timeoutValue) {
            setCookie("auth_token", "token_test_password", {maxAge: parseInt(timeoutValue)});
        }else {
            setCookie("auth_token", "token_test_password");
        }
        messageApi.open({
            type: 'loading',
            content: 'Login...! May the force be with you',
        }).then(r => router.push("/"));
    };

    const handleTimeout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeoutValue(e.target.value)
    }

    return (
        <form
            className="w-full flex flex-col gap-4 items-center"
            onSubmit={handleSignIn}
        >
            {contextHolder}
            <Divider className={"!m-0"} />
            <Input
                className="w-full !bg-white"
                placeholder="Email"
                value={"admin@gmail.com"}
                prefix={
                    <UserOutlined className="site-form-item-icon pr-1 !text-theme-primary" />
                }
            />

            <Input.Password
                className="w-full !bg-white"
                placeholder="Password"
                value={"password"}
                prefix={
                    <LockOutlined className="site-form-item-icon pr-1 !text-theme-primary" />
                }
                iconRender={(visible) =>
                    visible ? (
                        <EyeTwoTone twoToneColor={"#1E46D2"} />
                    ) : (
                        <EyeInvisibleOutlined />
                    )
                }
            />

            <div className="grid grid-cols-2 place-items-center">
                <div>Token Expire at :</div>
                <Input className="!bg-white" type={"number"} placeholder={"Enter seconds"} defaultValue={"10"} onChange={(e) => handleTimeout(e)}/>
            </div>

            <Button type="primary" htmlType="submit" className="w-full !h-[48px]">
                Sign In
            </Button>
        </form>
    );
};

export default LoginForm;
