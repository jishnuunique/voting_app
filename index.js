//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
web3 = new Web3(new Web3.providers.HttpProvider("http://10.1.24.48:8545"));

abiVotingContract = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"constituencyDict","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"getCandidateConstituency","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"},{"name":"constituencies","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
VotingContract = web3.eth.contract(abiVotingContract);
votingContractInstance = VotingContract.at('0x49983178346b0f3a2166ed8e55d153b9180cd6da'); //deep

addressAuthentication = '0xdac8aca0bb732d6513191c965f35481fc4e7502f';
interfaceAuthentiation = '[{"constant":false,"inputs":[{"name":"voter","type":"bytes32"}],"name":"isAuthentic","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"bytes32"}],"name":"getVoterConstituency","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"constituencyDict","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"bytes32"}],"name":"validVoter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"bytes32"}],"name":"isVoteAvailable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voterList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesAvailable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"bytes32"}],"name":"isVoterExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"myList","type":"bytes32[]"},{"name":"constituencies","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]';
abiAuthenticationContract = JSON.parse(interfaceAuthentiation);
AuthenticationContract = web3.eth.contract(abiAuthenticationContract);
authenticationContractInstance = AuthenticationContract.at(addressAuthentication); //deep

// In your nodejs console, execute votingContractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// votingContractInstance = VotingContract.at('0x2a9c1d265d06d47e8f7b00ffa987c9185aecf672'); //default
// votingContractInstance = VotingContract.at('0xd0a885aaa1255afe3f3c4695def20871d0231f72'); //my
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate() {

  candidateName = $("#candidate").val();
  console.log('candidateName:' + candidateName);

  voterName = $("#voter").val();
  console.log('voterName:' + voterName);

  constituencyName = $("#constituency").val();
  console.log('constituencyName:' + constituencyName);

  isCandidate = votingContractInstance.validCandidate.call(candidateName).toString();
  console.log('isCandidate:' + isCandidate);
  if(isCandidate=="false")
  {
    alert("invalid candidateName");
    return;
  }

  authenticationContractInstance.isVoterExist(voterName, {from: web3.eth.accounts[0]}, function() {  });
  isVoter = authenticationContractInstance.isVoterExist.call(voterName).toString();
  console.log('isVoter:' + isVoter);
  if(isVoter=="false")
  {
    alert("invalid voterName");
    return;
  }

  isVoteAvailable = authenticationContractInstance.isVoteAvailable.call(voterName).toString();
  console.log('isVoteAvailable:' + isVoteAvailable);
  if(isVoteAvailable=="false")
  {
    alert("no vote available");
    return;
  }

  candidateConstituency = votingContractInstance.getCandidateConstituency.call(candidateName).toString();
  console.log('candidateConstituency:' + candidateConstituency);
  isEqualsCandidateConstituency = ( candidateConstituency == constituencyName);
  console.log('isEqualsCandidateConstituency:' + isEqualsCandidateConstituency);
  if(isEqualsCandidateConstituency==false)
  {
    alert("different candidate constituency");
    return;
  }

  voterConstituency = authenticationContractInstance.getVoterConstituency.call(voterName).toString();
  console.log('voterConstituency:' + voterConstituency);
  isEqualsVoterConstituency = ( voterConstituency == constituencyName);
  console.log('isEqualsVoterConstituency:' + isEqualsVoterConstituency);
  if(isEqualsVoterConstituency==false)
  {
    alert("different voter constituency");
    return;
  }

  isAuthenticBool = isAuthenticVoter(voterName);
  console.log("isAuthentic:"+isAuthenticBool);

  if(isAuthenticBool == "false")
  {
    console.log("bhak saale");
    alert("bhak saale");
    return;
  }


  votingContractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(votingContractInstance.totalVotesFor.call(candidateName).toString());
    alert("voter done");
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = votingContractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});

function isAuthenticVoter(voterName)
{
  // if(voterName=='true')
    // return true;
  // if (voterName=='false')
    // return false;
  authenticationContractInstance.isAuthentic(voterName, {from: web3.eth.accounts[1]}, function(){});
  isAuthenticBool = authenticationContractInstance.isAuthentic.call(voterName);
  return isAuthenticBool;
}