const { MessageEmbed } = require("discord.js");
module.exports = { getEmbed };

function getEmbed(embed, newby) {
	switch (embed) {
        case 'newbyMsg': {
            const newbyMsg = new MessageEmbed()
                .setColor(`#942626`)
                .setTitle(`Welcome to Killjoy Gaming!`)
                .setDescription(
                    `Greetings **${newby}**! ` +
                    `I would like to be the first to welcome you to the Killjoy Gaming discord server. ` +
                    `Here you will find that we are a close-knit, social guild with a heavy emphasis on gaming. ` +
                    `\n\nBelow are two important aspects for getting started fast with us. The first is ` +
                    `Role Selection, and the second is getting acquainted with an Admin!`,
                )
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: `Discord Role Setup`, value:
                        `One of the core features of Killjoy Gaming is configuring your own roles, ` +
                        `so that you only see the content you want to be a part of! ` +
                        `Head over to the [ ROLE-SETUP ] text channel, at the top left of your discord app ` +
                        `when you have the "Killjoy Gaming" server open, and you should see a pinned message ` +
                        `showing all the channels you can subscribe to. Simply click the react button with the ` +
                        `correlating picture to the channel you want to be a part of, and you should now be able to access ` +
                        `all of the text and voice chat channels for that selection, as well as be notified for any ` +
                        `activity related to that channel.`, inline: 'true' },
                    { name: `Player Admin Team`, value:
                        `As I mentioned before, we are a close-knit guild here at Killjoy Gaming. ` +
                        `That is why we are assigning you an Admin to provide you with a personal welcome, ` +
                        `as well as a walk-through of how to get started and use Discord if you're new to it! ` +
                        `Furthermore, we want you to be included! If you were invited by a friend to this ` +
                        `group of strangers, then we all want to stay strangers for as short as possible! ` +
                        `We are excited to hang out with you and play your favorite games together!\n\n` +
                        `Our current Admins are listed below. In the event you'd like to select which Admin ` +
                        `is assigned to you, please reply back to me with '!' + their assigned number. ` +
                        `\n\nI.e.: !4`, inline: 'true' },
                )
                .setTimestamp();

            return newbyMsg;
        }

        case 'adminMsg': {
            const adminMsg = new MessageEmbed()
                .setColor(`#942626`)
                .setTitle(`New Member ${newby} Has Arrived!`)
                .setDescription(
                    `Greetings! A new member, **${newby}**, has joined the Killjoy Gaming Guild. ` +
                    `Please reach out to them and help them get comfortable and assigned some roles!`,
                )
                ;
            return adminMsg;
        }
    }
}