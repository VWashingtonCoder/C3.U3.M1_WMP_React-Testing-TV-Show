import React from 'react';
import { render, fireEvent, screen, waitFor, findByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

test('renders without errors with no props', async () => {
    render(<Display />)
    const showBtn = screen.getByText("Show Data", {exact: false})
    expect(showBtn).toBeVisible()
 }); // Complete

test('renders Show component when the button is clicked ', async () => {
    render(<Display />)
    const showBtn = screen.getByText("Show Data", {exact: false})
    userEvent.click(showBtn)
    
    const label = await screen.findByLabelText('Select A Season', { exact: false })
    expect(label).toBeVisible()
 }); // Complete

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display />)
    const showBtn = screen.getByText("Show Data", {exact: false})
    userEvent.click(showBtn)
    
    const showSeasons = await screen.findAllByTestId('season-option')
    expect(showSeasons).toHaveLength(4)
 }); //Complete
 test('optional function called when fetch pressed', async () => {
    const spy = jest.fn()
    render(<Display displayFunc={spy}/>)
    
    userEvent.click(screen.getByText("Show Data", {exact: false}))
    
    await screen.findAllByTestId('season-option')
    expect(spy).toHaveBeenCalled()
    
 })
