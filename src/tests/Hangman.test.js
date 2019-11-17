import React from "react";
import { shallow, mount } from "enzyme";
import App from "../components/App";
import HiddenLetter from "../components/HiddenLetter";

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});

it("hidden letter", () => {
  const wrap = shallow(<HiddenLetter showLetter={false} letter="A" />);

  expect(wrap.find("input").props().placeholder).not.toEqual("A");
});

it("hidden letter empty", () => {
  const wrap = shallow(<HiddenLetter showLetter={false} letter="A" />);

  expect(wrap.find("input").props().placeholder).toEqual("");
});

it("displayed letter", () => {
  const wrap = shallow(<HiddenLetter showLetter={true} letter="A" />);

  expect(wrap.find("input").props().placeholder).toEqual("A");
});

it("displayed letter not empty", () => {
  const wrap = shallow(<HiddenLetter showLetter={true} letter="A" />);

  expect(wrap.find("input").props().placeholder).not.toEqual("");
});

// ------- App tests
it("game not started show play", () => {
  const wrap = shallow(<App />);
  wrap.setState({ started: false });

  expect(wrap.find("button").text()).toEqual("Play");
});

it("game not started click button", () => {
  const wrap = shallow(<App />);
  wrap.setState({ started: false });
  wrap.find("button").simulate("click");

  expect(wrap.state("started")).toEqual(true);
});

it("game lost", () => {
    const wrap = shallow(<App />);
    wrap.setState({ guessesLeft: 0 });
    
    expect(wrap.find("button").text()).toEqual("Play");
  });

  it("game won", () => {
    const wrap = shallow(<App />);
    wrap.setState({ gameWon: true });
  
    expect(wrap.find("button").text()).toEqual("Play");
  });

  