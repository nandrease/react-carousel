import React from "react";
import logo from "./logo.svg";

import "bulma/css/bulma.css";
import "./App.css";

import CarouselComponent from "./components/CarouselComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carousel: []
    };
    this.addCarousel = this.addCarousel.bind(this);
    this.saveCarousel = this.saveCarousel.bind(this);
    this.removeCarousel = this.removeCarousel.bind(this);
  }

  addCarousel() {
    const carousel = this.state.carousel;
    carousel.push({});
    this.setState({ carousel });
  }
  removeCarousel(idx) {
    const carousel = this.state.carousel.filter((a, i) => i !== idx);
    this.setState({ carousel });
  }
  saveCarousel(idx, newData) {
    const carousel = this.state.carousel;
    carousel[idx] = newData;
    this.setState({ carousel });
  }

  render() {
    return (
      <div className="App section">
        <div className="container">
          <h2 className="title is-2">Build your carousel element</h2>
          <div className="control has-text-centered">
            <button onClick={this.addCarousel} className="button is-primary">
              Add new carousel item
            </button>
          </div>
          <hr />
          {this.state.carousel.map((item, idx) => (
            <CarouselComponent
              data={item}
              key={idx}
              index={idx}
              saveCarousel={this.saveCarousel}
              removeCarousel={this.removeCarousel}
            />
          ))}
          <pre class="has-text-left">
              {this.state.carousel.length > 0 ?
                JSON.stringify(this.state.carousel, null, 2) : 'Here comes carousel code'}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
