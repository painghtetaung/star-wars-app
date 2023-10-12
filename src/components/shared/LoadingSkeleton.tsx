import React from 'react';
import { Spin } from 'antd';
const LoadingSkeleton = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Spin/>
        </main>
    );
};

export default LoadingSkeleton;
