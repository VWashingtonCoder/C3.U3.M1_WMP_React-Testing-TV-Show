import React from 'react';
import { render, fireEvent, screen, getByAltText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisodeData = {
    id:1000, 
    image: "https://www.animationmagazine.net/wordpress/wp-content/uploads/One-Piece-1000-Commemorative-Battle-of-Onigashima-Visual-1000x600.jpg", 
    name: "Overwhelming Strength! The Straw Hats Come Together", 
    season: 20, 
    number: 27, 
    summary: "This is the anime's 1,000th episode and some features were changed to signify it", 
    runtime: 24
}
const testDataNullImg = { 
    id:1000, 
    image: null, 
    name: "Overwhelming Strength! The Straw Hats Come Together", 
    season: 20, 
    number: 27, 
    summary: "This is the anime's 1,000th episode and some features were changed to signify it", 
    runtime: 24
}

test("renders without error", async () => { 
    render(<Episode episode={testEpisodeData}/>)
    await screen.findByText('Overwhelming Strength!', { exact: false })

}); // Complete

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={testEpisodeData}/>)

    const summary = screen.getByText(/anime/i, { exact: false })
    const summaryNotThere = screen.queryByText('summary', { exact: false })

    expect(summary).toBeVisible()
    expect(summary).toBeInTheDocument()
    expect(summaryNotThere).toBe(null)
}); // Complete

test("renders default image when image is not defined", async () => { 
    render(<Episode episode={testDataNullImg}/>)
    const defaultImg = screen.getByAltText(/stranger-things.png/, { exact: false })
    expect(defaultImg).toBeVisible()
});

