const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();

  //Deploying a new contract
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode })
  .send({ 
    from: accounts[0], //New contract address
    gas: '1000000'});

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  //destructuring from an array
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  //If contract is already deployed, you pass in interface and contract address origin //Omit .deploy and .send
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface), //Pass interface as first argument
    campaignAddress //Pass campaign or contract address as second argument 
  );
});

describe('Campaigns', () => {
  it('It deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('Marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal( accounts[0], manager)
  });

  it('Allows people to contribute money and to mark them as approvers', async () => {
    await campaign.methods.contribute().send({ //Create instance of a new address
      value: '200',
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    //Methods created a new address and addes them to mapping of 'approvers' 
    //therefore can be called if instance above was successful
    assert(isContributor);
  });

  it('Requires a minimum contribution', async () => {
    try { //Intentionally failing code
      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      });
      assert(false); //If this line of code executes it automatically fails
    } catch (err) {
      assert(err) //If try code block fails the code will fail which will pass the test
    }
  });

  it('Allows a manager to make a payment request', async () => {
    await campaign.methods
    .createRequest('Buy Batteries', '100', accounts[1])
    .send({
      from: accounts[0],
      gas: '1000000'
    });

    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy Batteries', request.description);
  });

  it('Process requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });
  
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });
    
    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
