const { MessageType } = require('@adiwajshing/baileys')
const PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  await conn.sendMessage(m.chat, {
    contacts: [{


    "displayName": "OWNER",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:OWNER;;;\nFN:OWNER\nitem1.TEL;waid=62859194145686:62859194145686\nitem1.X-ABLabel:ð Owner\nitem2.EMAIL;type=INTERNET:-\nitem2.X-ABLabel:ð Email\nitem3.URL:-\nitem3.X-ABLabel:âï¸ Rest Api\nitem4.ADR:;;ð¯ðµ Jepang;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:ð Region | Tokyo ð¯ðµ\nitem5.X-ABLabel:âââââââ[ á´¿á­ AZZ ÃáÖÍÃ ]âââââââ\nEND:VCARD"
  }, {
    "displayName": "BOT UTAMA",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:bot utama;;;\nFN:BOT\nitem1.TEL;waid=6281264952069:6281264952069\nitem1.X-ABLabel:ð Owner\nitem2.EMAIL;type=INTERNET:-\nitem2.X-ABLabel:ð Email\nitem3.URL:-\nitem3.X-ABLabel:âï¸ Rest Api\nitem4.ADR:;;ð¯ðµ Jepang;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:ð Region | Tokyo ð¯ðµ\nitem5.X-ABLabel:âââââââ[ Â©AzzBotz ]âââââââ\nEND:VCARD"
    }]
  }, MessageType.contactsArray, { quoted: m })
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(botutama)$/i

module.exports = handler
