
const { Client, GatewayIntentBits,PermissionsBitField} = require("discord.js");
const Discord = require("discord.js");
const bg = "https://nexus.leagueoflegends.com/wp-content/uploads/2019/10/Banner_Preseason-1_dwfwpnp0byzkpe2hk65v.jpg"
const GuildSettingsSchema = require('./@Shared/Models/GuildRegister.schema');
const JailLogsSchema = require('./@Shared/Models/JailLog.schema');
const ButtonRoleGuild = require('./@Shared/Models/ButtonRoleGuild.schema');
const SecretVoice = require('./@Shared/Models/SecretVoice.schema');

const chalk = require("chalk")
const Status = chalk.hex('#ff6dc6')

const Thealoq = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences
        ]
});

async function createCanvas(ctx,text) {
    const { createCanvas, loadImage,GlobalFonts } = require('@napi-rs/canvas');
    GlobalFonts.registerFromPath('./@Shared/arial.ttf', 'Arial')
    const canvas = createCanvas(700, 250);
    const ctx2 = canvas.getContext('2d');

    const backgroundImage = await loadImage(bg);
    ctx2.filter = 'blur(3px)';
    ctx2.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx2.filter = 'none';

    ctx2.fillStyle = '#ffffff';
    ctx2.font = '30px Arial';
    ctx2.textAlign = 'center';
    ctx2.fillText(`${text} ${ctx.user.username}`, canvas.width / 2, 220);

    const avatar = await loadImage(ctx.user.displayAvatarURL({ format: 'png' }));

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 25;
    const radius = 75;

    ctx2.beginPath();
    ctx2.arc(centerX, centerY, radius + 5, 0, Math.PI * 2, true);
    ctx2.strokeStyle = `#12312321`
    ctx2.lineWidth = 10;
    ctx2.stroke();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx2.closePath();
    ctx2.clip();

    const avatarX = centerX - radius;
    const avatarY = centerY - radius;

    ctx2.drawImage(avatar, avatarX, avatarY, radius * 2, radius * 2);

   return new Discord.AttachmentBuilder(await canvas.encode('png'), {name: 'profile.png'})
}
const warning = chalk.hex('#0D83AC')
let token = global.config.dev ? global.config.token2 : global.config.token;
Thealoq.login(token).then(e => console.log(Status(`💗 [${Thealoq.user.username}] Bot Giriş Yapti`))).catch(e => console.error(e));
globalThis.Underline = {
    Thealoq: Thealoq,
    createCanvas: createCanvas,
    Model: {
        GuildSettings: GuildSettingsSchema,
        JailLogsSchema: JailLogsSchema,
        ButtonRoleGuild: ButtonRoleGuild,
        SecretVoice: SecretVoice
    },
}

