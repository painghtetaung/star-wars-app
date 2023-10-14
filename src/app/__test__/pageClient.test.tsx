/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import HomePage from '../pageClient'
import QueryWrapper from "@/components/shared/QueryWrapper";


jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null,
            push: jest.fn()
        };
    },
    useSearchParams: () => [[{ revalidate: '1' }]],

}));

it('App Router: Works with Client Components (React State)', () => {
    render(
        <QueryWrapper>
            <HomePage />
        </QueryWrapper>
    )
    // expect(screen.getByRole('heading')).toHaveTextContent('0')
    // fireEvent.click(screen.getByRole('button'))
    // expect(screen.getByRole('heading')).toHaveTextContent('1')
})
