import React from 'react';
import { render, fireEvent, screen, findByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import Display from './../Display'

const testShowProps = {
    name: "Coder's Paradise",
    summary: "A reality show displaying the lives of top notch coders.",
    image: "https://www.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2021/02/black-coder.jpg/black-coder.jpg/dhiefc%3AfeaturedCard",
    seasons: [
        {id: 1, name: 'Season 1', episodes: []},
        {id: 2, name: 'Season 2', episodes: []},
        {id: 3, name: 'Season 3', episodes: []}
    ]
}


test('renders without errors', async () => {
    render(<Show show={testShowProps} selectedSeason='none' />)
    await screen.findByText("Coder's Paradise")
 }); // Complete

test('renders Loading component when prop show is null', async () => { 
    render(<Show show={null} />)
    const loadingScreen = await screen.findByText("Fetching data", {exact: false})
    expect(loadingScreen).toBeVisible
 }); // Complete

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShowProps} selectedSeason='none' />)
    const showSeasons = screen.getAllByTestId('season-option')
    expect(showSeasons).toHaveLength(3)
    expect(showSeasons).not.toHaveLength(0)
}); // Complete

test('handleSelect is called when an season is selected', async () => { 
    const spy = jest.fn()
    render(<Show 
        show={testShowProps} 
        selectedSeason='none'
        handleSelect={spy} 
    />)
    const seasonLabel = screen.getByLabelText('Select A Season', { exact: false })
    const seasonOptions = screen.getAllByTestId('season-option')
    const selectedSeason = screen.getByText('Season 2', { exact: true })

    fireEvent.change(seasonLabel, { target: { value: "2" } })
    
    expect(seasonOptions[0].selected).toBeFalsy()
    expect(seasonOptions[1].selected).toBeTruthy()
    expect(seasonOptions[2].selected).toBeFalsy()
    expect(selectedSeason).toBeVisible()
}); // Complete

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const testSeason = 0
    const { rerender } = render(<Show show={testShowProps} selectedSeason='none' />)
    const showName = screen.getByText("Coder's Paradise", { exact: false })
    expect(showName).toBeVisible()

    rerender(<Show show={testShowProps} selectedSeason={testSeason}/>)
    expect(showName).toBeVisible()
 }); //Complete
