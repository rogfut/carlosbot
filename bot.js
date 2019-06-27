// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
const axios = require('axios');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            // await context.sendActivity(`You said '${ context.activity.text }'`);
            switch (context.activity.text) {
            case '/btc':
                let btcPrice = await axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD');
                await context.sendActivity('BTC $' + btcPrice.data.data.amount);
                break;
            case '/bitconnect':
                await context.sendActivity('https://youtu.be/e5nyQmaq4k4');
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
