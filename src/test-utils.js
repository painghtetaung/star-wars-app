import React from 'react'
import {render} from '@testing-library/react'
import StyledComponentsRegistry from "./lib/AntdRegistry";
import QueryWrapper from "./components/shared/QueryWrapper";
import {ConfigProvider} from "antd";
import theme from "./theme/themeConfig";

const AllTheProviders = ({children}) => {
    return (
        <StyledComponentsRegistry>
            <QueryWrapper>
                <ConfigProvider theme={theme}>{children}</ConfigProvider>
            </QueryWrapper>
        </StyledComponentsRegistry>
    )
}

const customRender = (ui, options) =>
    render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}