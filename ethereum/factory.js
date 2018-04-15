import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//pre-configured instance for our contract
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1d6A58ab5370d29c28F24D9f0b693a256e1b9840'
);

export default instance;