/**
 * @jest-environment jsdom
 */
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import HomePage from '../pageClient'
import QueryWrapper from "@/components/shared/QueryWrapper";
import {BrowserRouter} from "react-router-dom";
import {rest} from "msw";
import {server} from "@/mocks/server";
import {fetchPeople} from "@/queries/getPeople";
import DetailModal from  "@/components/DetailModal"
import {getSpec} from "@/queries/getSpec";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null,
            push: jest.fn()
        };
    },
    useSearchParams: () => [[{ revalidate: '1' }]],

}));


it('opens the detail modal when the "detail-card" is clicked', async () => {
    render(
        <BrowserRouter>
            <QueryWrapper>
                <HomePage />
            </QueryWrapper>
        </BrowserRouter>

    )
    expect(screen.queryByTestId('detail-modal')).not.toBeInTheDocument();
    await fetchPeople("https://swapi.dev/api/people");

    await waitFor( async() => {
       const detailCard = await screen.findByTestId('detail-card-0');
        fireEvent.click(detailCard)
    })
})

it('renders with loading skeleton when data is not available', () => {
    render(
        <BrowserRouter>
            <QueryWrapper>
                <DetailModal open={true} onOk={() => {}} onCancel={() => {}} detailUrl="" imageUrl="" />
            </QueryWrapper>
        </BrowserRouter>
    );

    // Ensure loading skeleton is displayed
    const loadingSkeleton = screen.getByTestId('loading-skeleton');
    expect(loadingSkeleton).toBeInTheDocument();
});

it('renders character details when data is available', async () => {
   await fetchPeople("https://swapi.dev/api/people/1");
    getSpec("https://swapi.dev/api/planets/1")
    render(
        <BrowserRouter>
            <QueryWrapper>
                <DetailModal
                    open={true}
                    onOk={() => {}}
                    onCancel={() => {}}
                    detailUrl="https://swapi.dev/api/people/1"
                    imageUrl="https://picsum.photos/200?random=1"
                />
            </QueryWrapper>
        </BrowserRouter>
    );

    // Ensure character details are displayed
    await screen.findByTestId('name');
    screen.getByText('Height :');
    screen.getByText('Mass :');
    screen.getByText('Created Date :');
    screen.getByText('Number of Films :');
    screen.getByText('Birth Year :');
    screen.getByText('HomeWorld :');
    screen.getByText('Terrain :');
    screen.getByText('Climate :');
    screen.getByText('Climate :');

    const name = await screen.findByTestId('name');
    const height = await screen.findByTestId('height');
    const mass = await screen.findByTestId('mass');
    const created = await screen.findByTestId('created');
    const films = await screen.findByTestId('films');
    const birthYear = await screen.findByTestId('birth-year');
    const homeworld = await screen.findByTestId('homeworld');
    const terrain = await screen.findByTestId('terrain');
    const climate = await screen.findByTestId('climate');
    const residents = await screen.findByTestId('residents');

    expect(name).toHaveTextContent('Luke Skywalker');
    expect(height).toHaveTextContent('172 meters');
    expect(mass).toHaveTextContent('77 kg');
    expect(created).toHaveTextContent('09-12-2014');
    expect(films).toHaveTextContent('1');
    expect(birthYear).toHaveTextContent('19 BBY');
    expect(homeworld).toHaveTextContent('Tatooine');
    expect(terrain).toHaveTextContent('desert');
    expect(climate).toHaveTextContent('arid');
    expect(residents).toHaveTextContent('0');
});
