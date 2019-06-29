// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory } = require('botbuilder');
const axios = require('axios');
const emoji = require('node-emoji');

// emojis for later use
const dollarEmoji = emoji.get('dollar');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            // await context.sendActivity(`You said '${ context.activity.text }'`);
            // await context.sendActivity('The WORLD is not ANYMORE the way it used to BE');
            if (context.activity.text.toLowerCase().includes('moon')) {
                await context.sendActivity('https://gfycat.com/agiletastyindianjackal');
            }
            if (context.activity.text.toLowerCase().includes('hi carlosbot') || context.activity.text.toLowerCase().includes('hi @BeetConnectBot')) {
                await context.sendActivity(emoji.get('wave') + ' Wassa wassa wassa wassa wassa wassa WASSUP BITCONNECT');
            }
            switch (context.activity.text) {
            case '/btc':
            case '/btc@BeetConnectBot':
                let btcPrice = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot?currency=USD');
                await context.sendActivity('BTC $' + btcPrice.data.data.amount + ' ' + dollarEmoji);
                break;
            case '/ltc':
            case '/ltc@BeetConnectBot':
                let ltcPrice = await axios.get('https://api.coinbase.com/v2/prices/LTC-USD/spot?currency=USD');
                await context.sendActivity('LTC $' + ltcPrice.data.data.amount + ' ' + dollarEmoji);
                break;
            case '/eth':
            case '/eth@BeetConnectBot':
                let ethPrice = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot?currency=USD');
                await context.sendActivity('ETH $' + ethPrice.data.data.amount + ' ' + dollarEmoji);
                break;
            case '/xrp':
            case '/xrp@BeetConnectBot':
                let xrpPrice = await axios.get('https://api.coinbase.com/v2/prices/XRP-USD/spot?currency=USD');
                await context.sendActivity('XRP $' + xrpPrice.data.data.amount + ' ' + dollarEmoji);
                break;
            case '/link':
            case '/link@BeetConnectBot':
                let linkPrice = await axios.get('https://api.coinbase.com/v2/prices/LINK-USD/spot?currency=USD');
                await context.sendActivity('LINK $' + linkPrice.data.data.amount + ' ' + dollarEmoji);
                break;    
            case '/bitconnect':
            case '/bitconnect@BeetConnectBot':
                await context.sendActivity('https://youtu.be/e5nyQmaq4k4');
                break;
            case '/rocket':
            case '/rocket@BeetConnectBot':
                // await context.sendActivity('https://gfycat.com/agiletastyindianjackal');
                let card = CardFactory.animationCard(
                    '',
                    [
                        { url: 'https://giant.gfycat.com/DeadlyVeneratedAmericangoldfinch.gif' }
                    ],
                    [],
                    {
                        subtitle: 'THE WORLD IS NO LONGER THE WAY THAT IT USED TO BE'
                    }
                );
                await context.sendActivity({ attachments: [card] });
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        // this.onMembersAdded(async (context, next) => {
        //     const membersAdded = context.activity.membersAdded;
        //     for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        //         if (membersAdded[cnt].id !== context.activity.recipient.id) {
        //             await context.sendActivity('Hello and welcome!');
        //         }
        //     }
        //     // By calling next() you ensure that the next BotHandler is run.
        //     await next();
        // });
    }
}

module.exports.MyBot = MyBot;
