pragma solidity ^0.4.24;

contract Polls {
    
    struct Poll {
        //voting choices
        string description;
        string option1;
        string option2;
        string option3;
        string option4;
        string option5;
        address[] voters; // list of people who have voted
        string[] optionList; // list of the options
        uint[] voteResults;
        mapping(address=>bool) hasVoted; // keeps track of who has voted
        
    }

    mapping(address=>Poll) public polls; // creator => poll
    
    function createPoll(string description,string option1, string option2, string option3, string option4, string option5) public returns(string) {
        address[] filler; //filler array passed into the poll
        string[] optionList; //also a filler
        uint[] fill;
        if (_checkPoll(msg.sender)) { // if user has a poll then..
            return "You must destroy your other poll in order to create a new one";
        }
        else {
            polls[msg.sender] = Poll(description,option1,option2,option3,option4,option5,filler,optionList,fill); // create poll
            //add options to the optionList
            polls[msg.sender].optionList.push(option1);
            polls[msg.sender].optionList.push(option2);
            polls[msg.sender].optionList.push(option3);
            polls[msg.sender].optionList.push(option4);
            polls[msg.sender].optionList.push(option5);
            for(uint x =0; x< 5; x++) {
                polls[msg.sender].voteResults.push(0);
            }
            return "Creation complete";
        }
    }
    
    function _checkPoll(address _user) private view returns (bool){
        if(polls[_user].voters.length >0){ //checks if the user currently has a poll
            return true;
        }
        return false;
    }
    
    function vote(address creatorAddress, uint decision) public returns(string) {
        if(_checkVoter(msg.sender,creatorAddress) == false) { // if the user has not yet voted
            if (decision> 5 || decision <=0){
                return "Invalid Decision";
            }
            else {
                polls[creatorAddress].voteResults[decision-1] +=1;
                polls[creatorAddress].hasVoted[msg.sender] = true;
                polls[creatorAddress].voters.push(msg.sender);
                return "Success";
            }
        }
        return "You voted already";
    }

    function _checkVoter(address _user, address creator) private view returns (bool) {
        if (polls[creator].hasVoted[_user] == true){ // checks if voter has voted yet
            return true;
        }
        return false;
    }
    function destroyPoll(address _user) public {
        if (_user == msg.sender) {
            for (uint x = 0; x < polls[_user].voters.length; x++){
                polls[_user].hasVoted[polls[_user].voters[x]] = false;
            }
           delete polls[_user];
        }
    }
    
    function showOptions(address _user, uint option) public view returns(string){
        return polls[_user].optionList[option];
    }
    
    //functions to display the results of each option
    function showOptionOneResults(address _user) public view returns(uint) {
        return polls[_user].voteResults[0];
    }
    
    function showOptionTwoResults(address _user) public view returns(uint) {
        return polls[_user].voteResults[1];
    }
    
    function showOptionThreeResults (address _user) public view returns(uint) {
        return polls[_user].voteResults[2];
    }
    
    function showOptionFourResults(address _user) public view returns(uint) {
        return polls[_user].voteResults[3];
    }
    
    function showOptionFiveResults(address _user) public view returns(uint) {
        return polls[_user].voteResults[4];
    }
    function displayDescription (address _user) public view returns (string) {
        return polls[_user].description;
    }
}
