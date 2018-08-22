import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import yesNoVote from './yesNoVote';

class App extends Component {
  //sets the initial state of the ethereum variables
  state = {
    
  }
  async componentDidMount() {

  }
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    await yesNoVote.methods.createPoll().send({
      from: accounts[0]
    });
  };

  pollDestruction = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    await yesNoVote.methods.destroyPoll(accounts[0]).send({
      from: accounts[0]
    });
  };

  render() {

    return (
      <div>
        <h1>EthPolls</h1>
        <hr/>
        <p>Click here to create a poll</p>
        <form>
        <div>
            <button onClick = {this.onSubmit} >Create</button>
        </div>
        </form>
        <hr/>
        <p>Click here to destroy your poll</p>
        <form>
        <div>
            <button onClick = {this.pollDestruction}>Destroy</button>
        </div>
        </form>
      </div>
    );
  }
}

export default App;
