import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

export default class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    return { campaigns };
  }

 renderCampaigns() {
   const items = this.props.campaigns.map(address => {
     return {
       header: address,
       description:(
         <Link route={`/campaigns/${address}`}>
        <a>View Campaigns</a>
        </Link>
      ),
       fluid: true
       //Using semantic UI's card component 'fluid: true' allows the card to stretch to entire container
     };
   });

   return <Card.Group items={items} />;
 }

  render() {
    
    return (
    <Layout>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
    <h3>Open Campaigns</h3>
    <Link route='campaigns/new'>
      <a>
        <Button 
        floated='right'
        content="Create Campaign"
        icon="add"
        primary={true}
        />
      </a>
    </Link>
    { this.renderCampaigns() }
    </Layout>
    )
  }
}
//Regular blog
//Manual entry
//Re-do team
//Modal pop-up team
//Blog - Team
//Mini icons static for transparency 
//Github //Telegram //Twitter //Reddit //Facebook/ //Linkdin //Medium //Youtube
//Content from Jenny Grayson


//Change question mark
//Send assets for reddit etc
//Color pallete
//Send hexcodes
