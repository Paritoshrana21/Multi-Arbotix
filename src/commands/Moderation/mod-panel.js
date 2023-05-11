const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mod-panel')
    .setDescription('Moderate a member.')
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user you want to moderate")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('reason')
        .setDescription('Reason for moderating the member')
        .setRequired(false)
    )
    .addIntegerOption(option => option
        .setName('time')
        .setDescription('This is how long the user\'s punishment is going to last (in minutes). Default: 1 hour')
        .setRequired(false)
    ),
    async execute (interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `You are missing the following permission: \`ADMINISTRATOR\``, ephemeral: true});

        const target = await interaction.options.getUser(`user`);
        const member = await interaction.options.getMember("user")
        const reason = await interaction.options.getString(`reason`) || "None.";
        const length = await interaction.options.getInteger(`time`) || 60;
        let guild = await interaction.guild.fetch();

        const mod_panel = new EmbedBuilder()
        .setTitle(`New Moderation Activity`)
        .setThumbnail('https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192')
        .addFields({ name: `Target:`, value: `${target}`, inline: true })
        .addFields({ name: `Target ID:`, value: `\`${target.id}\``, inline: true })
        .addFields({ name: `Timeout Length:`, value: `\`${length} minute(s)\``, inline: true })
        .addFields({ name: `Reason for Punishment:`, value: `\`${reason}\``, inline: false })
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })
        .setColor('#20C20E')

        const row_1 = new ActionRowBuilder() 
        .addComponents(
            new ButtonBuilder()
            .setCustomId('timeout')
            .setEmoji('🚧')
            .setLabel('Timeout')
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setCustomId('kick')
            .setEmoji('🦵')
            .setLabel('Kick')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId('ban')
            .setEmoji('🚫')
            .setLabel('Ban')
            .setStyle(ButtonStyle.Danger)
        )
        
        const failEmbed = new EmbedBuilder()
        .setColor('#20C20E')
        .setDescription(`Failed to moderate ${target}.`)
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const banEmbed = new EmbedBuilder()
        .setColor('#20C20E')
        .setTitle(`You Were Banned From ${guild.name}.`)
        .setDescription(`\`Reason: ${reason}\``)
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const timeoutEmbed = new EmbedBuilder()
        .setColor('#20C20E')
        .setTitle(`You Were Timeouted In ${guild.name}`)
        .setDescription(`\`Reason: ${reason}. \n Length: ${length} minute(s).\``)
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const kickEmbed = new EmbedBuilder()
        .setColor('#20C20E')
        .setTitle(`You Were Kicked From ${guild.name}`)
        .setDescription(`\`Reason: ${reason}.\``)
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const banEmbed2 = new EmbedBuilder()
        .setColor('#20C20E')
        .setTitle(`${target.tag} is **\`BANNED\`**`)
        .addFields({ name: `Moderator:`, value: `${interaction.user.tag}`, inline: true })
        .addFields({ name: `Target:`, value: `${target}`, inline: true })
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const kickEmbed2 = new EmbedBuilder()
        .setColor('#20C20E')
        .setTitle(`${target.tag} is **\`KICKED\`**`)
        .addFields({ name: `Moderator:`, value: `${interaction.user.tag}`, inline: true })
        .addFields({ name: `Target:`, value: `${target}`, inline: true })
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const timeoutEmbed2 = new EmbedBuilder()
        .setColor('#20C20E')
        .setTitle(`${target.tag} is **\`TIMEOUTED\`**`)
        .addFields({ name: `Moderator:`, value: `${interaction.user.tag}`, inline: true })
        .addFields({ name: `Target:`, value: `${target}`, inline: true })
        .addFields({ name: `Length`, value: `${length} minute(s)`, inline: true })
        .setFooter({ text: `moderation`, iconURL: `https://images-ext-1.discordapp.net/external/vZVGrU9mDntSjN4swzuXaedYKSGKtMj1HnY4xlRJOyM/https/cdn.discordapp.com/avatars/1075781600375210135/2c47d1848973a88bd43d29b7c634353b.webp?width=192&height=192` })

        const msg = await interaction.reply({ embeds: [mod_panel], components: [row_1] })
        
        collector = msg.createMessageComponentCollector()
        collector.on('collect', async i => {
            if(i.customId == 'kick') {
                target.send({ embeds: [kickEmbed] }).catch((err) => { interaction.channel.send({ content: "Failed to DM user" }) });  
                let kick = await guild.members.kick(target).catch((err) => {
                    console.log("Error with Kick command: " + err) 
                })
                await interaction.channel.send({ embeds: [kickEmbed2] });
                if(!kick) {
                    await interaction.reply({ embeds: [failEmbed], ephemeral: true })
                }
            }
            if(i.customId == 'timeout') {
                target.send({ embeds: [timeoutEmbed] }).catch((err) => { interaction.channel.send({ content: "Failed to DM user" }) });  
                let timeout = await member.timeout(length * 60000).catch((err) => {
                    console.log("Error with timeout command: " + err)
                })
                await interaction.channel.send({ embeds: [timeoutEmbed2] });
                if(!timeout) {
                    await interaction.reply({ embeds: [failEmbed], ephemeral: true })
                }
            }
            if(i.customId == 'ban') {
                target.send({ embeds: [banEmbed] }).catch((err) => { interaction.channel.send({ content: "Failed to DM user" }) });  
                await interaction.channel.send({ embeds: [banEmbed2] });
                let ban = await guild.members.ban(target, { reason: `${reason}`}).catch((err) => { 
                    console.log("Error with Ban command: " + err) 
                })
                if(!ban) {
                    await interaction.reply({ embeds: [failEmbed], ephemeral: true })
                }
            }
        })
    }
}