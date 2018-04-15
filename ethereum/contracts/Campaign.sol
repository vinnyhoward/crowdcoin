pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    //These are not initialized variables, but new types 
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
  //initializing global variables and if theyre public or private
  Request[] public requests;
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;
  
  modifier restricted() {
      require(msg.sender == manager);
      _;
  }
  
  function Campaign(uint minimum, address creator) public {
      manager = creator;
      minimumContribution = minimum;
  }
  // Public - a public function that you can use
  // Payable - a transaction will be used
  function contribute() public payable {
      require (msg.value > minimumContribution);
      
      // Simliar to someVar.push(someOtherVar) in arrays, and setting values in objects in javascript objects
      approvers[msg.sender] = true;
      
      //Increments the number of approvers so we can use in the finalizeRequest 
      //function to find out if more then 50% have approved or not
      approversCount++;
  }
  
  function createRequest( string description, uint value, address recipient ) public restricted {
      //Because we used mapping approvers[msg.senders] can easily find if person exists in mapping or not
    //   require(approvers[msg.sender]);
      Request memory newRequest = Request({
         description: description,
         value: value,
         recipient: recipient,
         complete: false,
         approvalCount: 0
         // You dont have to provide an arguement for the mapping because you dont need it for reference types
      });
      
      //Request newRequest = Request(description, value, recipient, false)6
      //Alternative to line 35
      
      requests.push(newRequest);
  }
  
  function approveRequest(uint index) public {
      Request storage request = requests[index];
      
      require(approvers[msg.sender]);
      require(!request.approvals[msg.sender]);
      
      request.approvals[msg.sender] = true;
      request.approvalCount++;
  }
  
  function finalizeRequest(uint index) public restricted {
      Request storage request = requests[index];
      // require statement makes sure the provided index is not complete
      require(!request.complete);
      
      // This require statement makes sure the approverCount is higher then 50%
      require(request.approvalCount > (approversCount / 2));
      
      request.recipient.transfer(request.value);
      
      // If index has not been complete mark as complete
      request.complete = true;

  }

  function getSummary() public view returns (
      uint, uint, uint, uint, address
  ) {
      return(
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
      );
  }
  function getRequestsCount() public view returns (uint) {
    return requests.length;
  }
}