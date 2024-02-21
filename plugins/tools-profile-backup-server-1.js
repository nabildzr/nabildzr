let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
const axios = require ("axios")
let fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    else who = m.quoted.sender ? m.quoted.sender : m.sender;

    let ppUrl = await conn.profilePictureUrl(who, 'image').catch((_) => "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/avatar_contact.png");
    let pp = await (await fetch(ppUrl)).buffer();

	if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == who) : {}
	let number = who.split('@')[0]

	let { exp, lastclaim, premiumDate, premium ,registered, regTime } = global.db.data.users[who]
    let now = new Date() * 1
	let user = global.db.data.users[who];
    let username = conn.getName(who)
    let limit = user.premium ? '∞' : user.limit; // Mengubah limit user premium menjadi 'Infinity' jika pengguna adalah premium
    let balance = user.money > 9999999999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.money;
    let saldo = user.saldo; // Mengubah balance user yang lebih dari 999999999 menjadi 'Infinity'
    let level = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; // Mengubah level pengguna yang lebih dari 9999 menjadi 'Infinity'
    let role = user.role;
    let kayu = user.kayu;
    let aqua = user.aqua;
   	let potion = user.potion;
    let diamond = user.diamond;
    let common = user.common;
    let uncommon = user.uncommon;
    let mythic = user.mythic;
    let sampah = user.sampah;
    let legendary = user.legendary;
    let armor = user.armor;
    let skill = user.skill;
    let rank = user.rank ? user.rank : user.premium ? 'Sepuh' : 'Kroco'; // Menambahkan 'Not Found' jika rank tidak terdefinisi
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
	// let buffer = await getBuffer(pp)
    let math = max - xp
    let age = user.age > 4000 ? 'Unknown' : user.age;
    let isPremium = user.premium ? "Yes" : "Free User";
    let isVip = user.vip ? "Yes" : "Free User";
    let premiumExpired = user.premium ? new Date(user.premiumDate).toDateString() : "Not Found";
    let vipExpired = user.vip ? new Date(user.vipDate).toDateString() : "Not Found";
	let prem = user.prems.includes(who.split`@`[0])
    let pasangan = user.pasangan ? global.db.data.users[user.pasangan].name : 'Not Have'; // Mengambil nama pasangan dari database
    let banned = user.banned ? true : false;
    let sahabat = user.sahabat ? '' + global.db.data.users[user.sahabat].name : 'Not Have';

    let caption = `
「 *U S E R - P R O F I L E* 」

  × *Name* : ${username}
  × *Age* : ${age}
  × *Role* : ${role}
  × *Rank* : ${rank}
  × *Level* : ${level}
  × *Saldo* : ${formatRupiah(saldo)}
  × *Balance* : ${balance}
  × *Exp* : ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready to *${usedPrefix}levelup*` : `${math} XP left to ${usedPrefix}levelup`}]
  × *Limit* : ${limit}

「 *U S E R - S T A T U S* 」

  × *Banned* : ${banned ? 'Yes' : 'No'}
  × *Pasangan*: ${pasangan.split`@`[0]}
  × *Sahabat* : ${sahabat}
  × *Premium* : ${isPremium}
  × *PremExpired* : ${(premiumDate - now) > 1 ? msToDate(premiumDate - now) : '*Tidak diatur expired premium!*'}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim) : ''}
  × *Registered* : ${registered ? 'Yes (' + new Date(regTime) + ')': 'No'}

「 *U S E R - I N V E N T O R Y* 」

  × *Potion* : ${potion}
  × *Diamond*: ${diamond}
  × *Uncommon* : ${common}
  × *Mythic* : ${mythic}
  × *Aqua* : ${aqua}
  × *Legendary* : ${legendary}
  × *Sampah* : ${sampah}
  × *Armor* : ${armor}
  
  		ᴡᴀ ʙᴏᴛ ʙʏ ɴᴀʙɪʟᴅᴢʀ
       
    `.trim();
    
    conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: `M y - P r o f i l e`,
          thumbnailUrl: ppUrl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch {
    let sender = m.sender;
    let ppUrl = await conn.profilePictureUrl(sender, 'image').catch((_) => "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/avatar_contact.png");
    let pp = await (await fetch(ppUrl)).buffer();
	
	if (typeof db.data.users[sender] == 'undefined') throw 'Pengguna tidak ada didalam data base'
	let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
    let participants = m.isGroup ? groupMetadata.participants : []
	let users = m.isGroup ? participants.find(u => u.jid == sender) : {}
	let number = sender.split('@')[0]

	let { exp, registered, lastclaim, premiumDate, premium, regTime } = global.db.data.users[sender]
	let now = new Date() * 1
	let user = global.db.data.users[sender];
    let username = conn.getName(sender)
    let limit = user.premium ? '∞' : user.limit; // Mengubah limit user premium menjadi 'Infinity' jika pengguna adalah premium
    let balance = user.money > 9999999999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.money; // Mengubah balance user yang lebih dari 999999999 menjadi 'Infinity'
    let saldo = user.saldo; 
    let level = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; // Mengubah level pengguna yang lebih dari 9999 menjadi 'Infinity'
    let role = user.role;
    let kayu = user.kayu;
    let aqua = user.aqua;
   	let potion = user.potion;
    let diamond = user.diamond;
    let common = user.common;
    let uncommon = user.uncommon;
    let mythic = user.mythic;
    let sampah = user.sampah;
    let legendary = user.legendary;
    let armor = user.armor;
    let skill = user.skill;
    let rank = user.rank ? user.rank : user.premium ? 'Sepuh' : 'Kroco'; // Menambahkan 'Not Found' jika rank tidak terdefinisi
    // let buffer = await getBuffer(pp)
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
	let math = max - xp
    let age = user.age > 4000 ? 'Unknown' : user.age;
    let isPremium = user.premium ? "Yes" : "Free User";
    let isVip = user.vip ? "Yes" : "Free User";
    let vipExpired = user.vip ? new Date(user.vipDate).toDateString() : "Not Found";
	let prem = global.prems.includes(sender.split`@`[0])
    let pasangan = user.pasangan ? global.db.data.users[user.pasangan].name : 'Not Have'; // Mengambil nama pasangan dari database
    let banned = user.banned ? true : false;
    let sahabat = user.sahabat ? '' + global.db.data.users[user.sahabat].name : 'Not Have';

    let caption = `
「 *U S E R - P R O F I L E* 」

  × *Name* : ${username}
  × *Age* : ${age}
  × *Role* : ${role}
  × *Rank* : ${rank}
  × *Level* : ${level}
  × *Saldo* : ${formatRupiah(saldo)}
  × *Balance* : ${balance}
  × *Exp* : ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready to *${usedPrefix}levelup*` : `${math} XP left to ${usedPrefix}levelup`}]
  × *Limit* : ${limit}
  
「 *U S E R - S T A T U S* 」

  × *Banned* : ${banned ? 'Yes' : 'No'}
  × *Pasangan*: ${pasangan.split`@`[0]}
  × *Sahabat* : ${sahabat}
  × *Premium* : ${isPremium}
  × *PremExpired* : ${(premiumDate - now) > 1 ? msToDate(premiumDate - now) : '*Tidak diatur expired premium!*'}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim) : ''}
  × *Registered* : ${registered ? 'Yes (' + new Date(regTime) + '': 'No'}

「 *U S E R - I N V E N T O R Y* 」

  × *Potion* : ${potion}
  × *Diamond*: ${diamond}
  × *Uncommon* : ${common}
  × *Mythic* : ${mythic}
  × *Aqua* : ${aqua}
  × *Legendary* : ${legendary}
  × *Sampah* : ${sampah}
  × *Armor* : ${armor}
  
  		ᴡᴀ ʙᴏᴛ ʙʏ ɴᴀʙɪʟᴅᴢʀ
       
    `.trim();

    conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: `M y - P r o f i l e`,
          thumbnailUrl: ppUrl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  }
};

handler.command = /^(profile|me)$/i
handler.help = ['profile *@user*'];
handler.tags = ['start'];
handler.limit = true
handler.register = true;

module.exports = handler;
 
function formatRupiah(number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}

function msToDate(ms) {
	temp = ms
	days = Math.floor(ms / (24*60*60*1000));
	daysms = ms % (24*60*60*1000);
	hours = Math.floor((daysms)/(60*60*1000));
	hoursms = ms % (60*60*1000);
	minutes = Math.floor((hoursms)/(60*1000));
	minutesms = ms % (60*1000);
	sec = Math.floor((minutesms)/(1000));
	return days+" Hari "+hours+" Jam "+ minutes + " Menit";
	// +minutes+":"+sec;
}

const getBuffer = async (url, options) => {
try {
	options ? options : {}
	const res = await axios({
		method: "get",
		url,
		headers: {
			'DNT': 1,
				'User-Agent': 'GoogleBot',
			'Upgrade-Insecure-Request': 1
		},
		...options,
		responseType: 'arraybuffer'
	})
	return res.data
} catch (e) {
	console.log(`Error : ${e}`)
}
