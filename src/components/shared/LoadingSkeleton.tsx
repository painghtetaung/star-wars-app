import React from 'react';
import { Spin } from 'antd';
const LoadingSkeleton = () => {
    return (
        <main className="absolute top-1/2 left-1/2 justify-center">
            <Spin/>
        </main>
    );
};

export default LoadingSkeleton;
