import React, { Component } from "react";
import Routes from "./Routes";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Routes intento={"1"} />
        <Footer />
      </div>
    );
  }
}

export default App;
