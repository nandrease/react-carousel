import React from "react";

const defaultData = {
  title: "",
  subtitle: "",
  full_price: "",
  monthly_price: "",
  image_url: "",
  button: [
    {
      title: "",
      url: ""
    }
  ]
};

class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data || defaultData,
      open: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.addButton = this.addButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  handleChange(event) {
    const foo = { ...this.state.data };
    foo[event.target.name] = event.target.value;
    this.setState({ data: foo });
  }
  handleButtonChange(event, i) {
    const foo = { ...this.state.data };
    foo.button[i][event.target.name] = event.target.value;
    this.setState({ data: foo });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveCarousel(this.props.index, this.state.data);
    this.toggleItem();
  }

  deleteItem() {
    this.props.removeCarousel(this.props.index);
  }

  toggleItem() {
    this.setState({ open: !this.state.open });
  }

  addButton() {
    let data = this.state.data;
    const defaultBtn = { title: "", url: "" };
    if (data.button) {
      data.button.push(defaultBtn);
    } else {
      data = { ...this.state.data, button: [defaultBtn] };
    }

    this.setState({ data });
  }

  deleteButton(btnIdx) {
    const button = this.state.data.button.filter((b,i) => i!==btnIdx)
    const data = {...this.state.data, button: button}
    this.setState({ data });
  }

  render() {
    return (
      <article className="message is-info">
        <div className="message-header" onClick={this.toggleItem}>
          Carousel {this.props.index}
          <button className="delete" type="button" onClick={this.deleteItem} />
        </div>
        {this.state.open && (
          <div className="message-body">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="title"
                    value={this.state.data.title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Subtitle</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="subtitle"
                    value={this.state.data.subtitle}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Full Price</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    name="full_price"
                    value={this.state.data.full_price}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Monthly Price</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    name="monthly_price"
                    value={this.state.data.monthly_price}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Image URL</label>
                <div className="control">
                  <input
                    className="input"
                    type="url"
                    name="image_url"
                    value={this.state.data.image_url}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <hr />

              {this.state.data.button &&
                this.state.data.button.map((b, i) => (
                  <div key={i}>
                    <div className="message-header has-background-dark">
                      Button {i}
                      <button className="delete" type="button" onClick={e => this.deleteButton(i)} />
                    </div>
                    <div className="message-body">
                      <div className="field">
                        <label className="label">Button title</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="title"
                            value={b.title}
                            onChange={e => this.handleButtonChange(e, i)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Button URL</label>
                        <div className="control">
                          <input
                            className="input"
                            type="url"
                            name="url"
                            value={b.url}
                            onChange={e => this.handleButtonChange(e, i)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Payload</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="payload"
                            value={b.payload}
                            onChange={e => this.handleButtonChange(e, i)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="control has-text-centered">
                <button
                  onClick={this.addButton}
                  type="button"
                  className="button is-info"
                >
                  Add new button
                </button>
              </div>
              <hr />
              <input className="button is-primary" type="submit" value="Save" />
            </form>
          </div>
        )}
      </article>
    );
  }
}

export default CarouselComponent;
