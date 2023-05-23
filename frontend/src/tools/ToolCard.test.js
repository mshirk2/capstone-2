import React from "react";
import { render } from "@testing-library/react";
import ToolCard from "./ToolCard";
import { MemoryRouter } from "react-router";

it('renders without crashing', () =>{
    render(
        <MemoryRouter>
            <ToolCard />
        </MemoryRouter>
    )
});

it ("matches snapshot", () =>{
    const { asFragment } = render(
        <MemoryRouter>
            <ToolCard 
                title={"Testing tool"}
                catalogCode={33}
                condition={"good"}
            />
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
});