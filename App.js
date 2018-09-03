import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import yesNoVote from './yesNoVote';
import multiData from'./multiData';

class App extends Component {
  //sets the initial state of the ethereum variables
  state = {
    //yesNoVOte Variables
    description: '',
    address: '',
    message: '',
    yesVotes: '',
    noVotes: '',
    display: 'none',
    voteMessage: '',
    yesNoDisplay: 'none',
    //multiData Variables
    desc: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    option1votes:'',
    option2votes:'',
    option3votes:'',
    option4votes:'',
    option5votes:'',
    multiDisplay:'none',
    multiInteractDisplay: 'none',
    voteChoice: '',
    optionDisplay:'initial',
    resultDisplay:"none"
  };

  createMulti = async (event) => {
    try{
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      this.setState({ message: 'Waiting on Transaction Success...'});
      await multiData.methods.createPoll(
        this.state.desc, this.state.option1, this.state.option2,
        this.state.option3, this.state.option4, this.state.option5 ).send({
          from: accounts[0],
        });

      this.setState({ message: 'Your Poll Has Been Created!'});

    } catch(e) {
      alert("Please Make Sure Metamask is Installed and You Are Logged Into It.");
      window.location.reload();
    }
  }

  onSubmit = async (event) => {
    try{
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      this.setState({ message: 'Waiting on Transaction Success...'})

      await yesNoVote.methods.createPoll(this.state.description).send({
        from: accounts[0],
      });

      this.setState({ message: 'Your Poll Has Been Created!'});
    } catch(e) {
      alert("Please Make Sure Metamask is Installed and You Are Logged Into It.");
      window.location.reload();
    }
  };

  pollDestruction = async (event) => {
    try{
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      await yesNoVote.methods.destroyPoll(accounts[0]).send({
        from: accounts[0]
      });
    }catch(e) {
      alert("Please Make Sure Metamask is Installed and You Are Logged Into It.");
      window.location.reload();
  }
  };

  getDescription = async (event) => {
    try {
    event.preventDefault();
    console.log(this.state.address);
    this.setState({description: await yesNoVote.methods.displayDescription(this.state.address).call()});
    this.setState({yesVotes: await yesNoVote.methods.displayYesVotes(this.state.address).call()});
    this.setState({noVotes: await yesNoVote.methods.displayNoVotes(this.state.address).call()});
    this.setState({ display: "initial"});
    this.setState({message: ""});
    this.setState({voteMessage: ''});
    } catch(e) {
      alert("Please make sure you are logged into metamask and have inputted a valid address.");
      window.location.reload();
    }
  }

  getMultiData = async (event) => {
    try {
    event.preventDefault();
    this.setState({desc: await multiData.methods.displayDescription(this.state.address).call()});
    this.setState({option1: await multiData.methods.showOptions(this.state.address,0).call()});
    this.setState({option2: await multiData.methods.showOptions(this.state.address,1).call()});
    this.setState({option3: await multiData.methods.showOptions(this.state.address,2).call()});
    this.setState({option4: await multiData.methods.showOptions(this.state.address,3).call()});
    this.setState({option5: await multiData.methods.showOptions(this.state.address,4).call()});
    this.setState({option1votes: await multiData.methods.showOptionOneResults(this.state.address).call()});
    this.setState({option2votes: await multiData.methods.showOptionTwoResults(this.state.address).call()});
    this.setState({option3votes: await multiData.methods.showOptionThreeResults(this.state.address).call()});
    this.setState({option4votes: await multiData.methods.showOptionFourResults(this.state.address).call()});
    this.setState({option5votes: await multiData.methods.showOptionFiveResults(this.state.address).call()});
    this.setState({ multiInteractDisplay: "initial"});
    this.setState({message: ""});
    this.setState({voteMessage: ''});
    } catch(e) {
      alert("Please make sure you are logged into metamask and have inputted a valid address.");
      window.location.reload();
    }
  }

  multiDataVote = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ voteMessage: "Casting Your Vote..."});
    console.log(this.state.voiceChoice);
    await multiData.methods.vote(this.state.address, this.state.voteChoice).send({
      from: accounts[0]
    });
    this.setState({option1votes: await multiData.methods.showOptionOneResults(this.state.address).call()});
    this.setState({option2votes: await multiData.methods.showOptionTwoResults(this.state.address).call()});
    this.setState({option3votes: await multiData.methods.showOptionThreeResults(this.state.address).call()});
    this.setState({option4votes: await multiData.methods.showOptionFourResults(this.state.address).call()});
    this.setState({option5votes: await multiData.methods.showOptionFiveResults(this.state.address).call()});
    this.setState({voteMessage: "Your Vote Has Been Casted." });
  }

  voteYes = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ voteMessage: "Casting Your Vote..."});

    await yesNoVote.methods.vote(this.state.address,"yes").send({
      from: accounts[0]
    });

    this.setState({voteMessage: "Your Vote Has Been Casted. Click Interact Again." });
  }

  voteNo = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ voteMessage: "Casting Your Vote..."});

    await yesNoVote.methods.vote(this.state.address,"no").send({
      from: accounts[0]
    });
    this.setState({voteMessage: "Your Vote Has Been Casted. Click Interact Again." });
  }

  displayYesNo = async (event) => {
    this.setState({yesNoDisplay: "initial"});
    this.setState({multiDisplay: 'none'})
  }
  displayMulti = async (event) => {
    this.setState({ multiDisplay: 'initial'});
    this.setState({yesNoDisplay: "none"});
  }

  destroyMultiPoll = async (event) => {
    try{
      event.preventDefault();

      const accounts = await web3.eth.getAccounts();

      await multiData.methods.destroyPoll(accounts[0]).send({
        from: accounts[0]
      });
    }catch(e) {
      alert("Please Make Sure Metamask is Installed and You Are Logged Into It.");
      window.location.reload();
  }
  };


  render() {

    return (
      <div>
      <div id="header">
      <h1>EthPolls<span id="betaSpan"> beta</span></h1>
      <h3>Which type of poll will you be creating or interacting with?</h3>
      </div>
      <div className="buttons">
      <button className="pollbuttons" onClick= {this.displayYesNo}>Yes or No Poll</button>
      <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
      <button className ="pollbuttons"onClick = {this.displayMulti}>Multi Data Poll</button>
      </div>
      <hr/>
      <div style={{display: this.state.yesNoDisplay}}>
        <h2 className ="yesNoHeading">Yes or No Poll</h2>
        <div className = "createYesNo">
        <p>Please Provide a Description of Your Poll, Then Click Create.</p>
        <form onSubmit = {this.onSubmit}>
        <div>
          <label>Description of your poll </label>
          <input
          description ={this.state.value}
            onChange={event=> this.setState({description: event.target.value})}
          placeholder="Description"/>
        </div>
        <div >
        <button className="cidbutton">Create</button>
        </div>
        </form>
        </div>
        <h2>{this.state.message}</h2>
        <hr/>
        <h2 className ="yesNoHeading">Interact With a Poll</h2>
        <div className = "createYesNo" >
        <form>
        <div>
          <label>Input the address of the creator of the poll you wish to
          interact with </label>
          <input
            address={this.state.value}
            onChange={event=> this.setState({address: event.target.value})}
          placeholder="Creator Address"/>
        </div>
        </form>
        <div>
        <button className="cidbutton" onClick= {this.getDescription} >Interact</button>
        </div>
        <div className="interactionOptions"style={{display: this.state.display}}>
        <p>You are currently interacting with a poll created by {this.state.address} </p>
        <p>Poll Description: {this.state.description}</p>
        <p>Yes Votes: {this.state.yesVotes} </p>
        <p>No Votes: {this.state.noVotes} </p>
        <div>
        <button className="yesButton" onClick={this.voteYes}>Vote Yes</button>
        <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
        <button className="destroyButton" onClick ={this.voteNo}>Vote No</button>
        </div>
        </div>
        </div>
        <hr/>
        <h2>{this.state.voteMessage}</h2>
        <h2 id="destroyHeader">Click here to destroy your poll.</h2>
        <div id="destroyStyle">
        <button className = "destroyButton" onClick = {this.pollDestruction}>Destroy</button>
        </div>
        <hr/>
      </div>

      <div className="multiData" style={{display: this.state.multiDisplay}}>
        <h2 class="multiHeading">Multi-Data Poll</h2>
        <div className="createYesNo">
        <p>Please Input the Following Data regarding your poll, then click create.</p>
        <form onSubmit={this.createMulti}>
        <div >
          <label>Description of your poll </label>
          <input
          desc ={this.state.value}
            onChange={event=> this.setState({desc: event.target.value})}
          placeholder="Description"/>
          <p>Now input the Data that your user will vote on. You do not have to use all five options.</p>
          <div className="createYesNo">
          <label>Option 1 </label>
          <input
          option1 ={this.state.value}
            onChange={event=> this.setState({option1: event.target.value})}
          placeholder="Poll Data"/>
          <br/>
          <br/>
          </div>
          <div className="createYesNo">
          <label>Option 2 </label>
          <input
          option2 ={this.state.value}
            onChange={event=> this.setState({option2: event.target.value})}
          placeholder="Poll Data"/>
          <br/>
          <br/>
          </div>
          <div className="createYesNo">
          <label>Option 3 </label>
          <input
          option3 ={this.state.value}
            onChange={event=> this.setState({option3: event.target.value})}
          placeholder="Poll Data"/>
          <br/>
          <br/>
          </div>
          <div className="createYesNo">
          <label>Option 4 </label>
          <input
          option4 ={this.state.value}
            onChange={event=> this.setState({option4: event.target.value})}
          placeholder="Poll Data"/>
          <br/>
          <br/>
          </div>
          <div className="createYesNo">
          <label>Option 5 </label>
          <input
          option5 ={this.state.value}
            onChange={event=> this.setState({option5: event.target.value})}
          placeholder="Poll Data"/>
        </div>
        </div>
        <br/>
        <div>
        <button className="cidbutton">Create Poll</button>
        </div>
        <br/>
        <h2>{this.state.message}</h2>
        </form>
        </div>
        <hr/>

        <h2 className="multiHeading">Interact With a Poll</h2>
        <div className="createYesNo">
        <form>
        <div>
          <label>Input the address of the creator of the poll you wish to
          interact with </label>
          <input
            address={this.state.value}
            onChange={event=> this.setState({address: event.target.value})}
          placeholder="Creator Address"/>
        </div>
        </form>
        <div>
        <button className="cidbutton" onClick= {this.getMultiData} >Interact</button>
        </div>
        <div className="interactionOptions"style={{display: this.state.multiInteractDisplay}}>
        <p>You are currently interacting with a poll created by {this.state.address} </p>
        <p>Poll Description: {this.state.desc}</p>
        <div>
        <form onSubmit={this.multiDataVote}>
        <div className="createYesNo">
        <div className="createYesNo">
        <input type="radio" name ="answer"
          onClick= {event=> this.setState({voteChoice: 1})}
        /> {this.state.option1}
        <br/>
        </div>
        <div className="createYesNo">
        <input type="radio" name ="answer"
          onClick= {event=> this.setState({voteChoice: 2})}
        /> {this.state.option2}
        <br/>
        </div>
        <div className = "createYesNo">
        <input type="radio" name ="answer"
          onClick= {event=> this.setState({voteChoice: 3})}
        /> {this.state.option3}
        <br/>
        </div>
        <div className="createYesNo">
        <input type="radio" name ="answer"
          onClick= {event=> this.setState({voteChoice: 4})}
        /> {this.state.option4}
        <br/>
        </div>
        <div className="createYesNo">
        <input type="radio" name ="answer"
          onClick= {event=> this.setState({voteChoice: 5})}
        /> {this.state.option5}
        </div>
        </div>
        <br/>
        <div className="createYesNo">
        <button className="yesButton">Submit Vote</button>
        </div>
        </form>
        </div>
        <div>
          <h3>Current Results</h3>
          <ul>
            <li>{this.state.option1}: {this.state.option1votes}</li>
            <li>{this.state.option2}: {this.state.option2votes}</li>
            <li>{this.state.option3}: {this.state.option3votes}</li>
            <li>{this.state.option4}: {this.state.option4votes}</li>
            <li>{this.state.option5}: {this.state.option5votes}</li>
          </ul>
        </div>
        </div>
        <h2>{this.state.voteMessage}</h2>
        </div>
        <hr/>
        <h2 className="yesNoHeading">Click here to destroy your poll.</h2>
        <div className ="createYesNo">
        <button className="destroyButton"onClick = {this.destroyMultiPoll}>Destroy</button>
        </div>
        <hr/>
      </div>
      </div>
    );
  }
}

export default App;
