let fs = require('fs')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? 'Â©AzzBotz tidak aktif' : banned ? 'kamu dibanned' : '*APAAN NGETAG",ADA BANSOS KAHð¿?*',
                'Â©AzzBotz',
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.send2ButtonLoc(m.chat, await (await fetch(fla + 'sewa bot')).buffer(), `
â­âââ ã ðððð ðððððððððððð ã ââââ
ââ¬¡ ð á·ááªá©á  *15.000*
ââ¬¡ 4 á·ááªá©á  *30.000*
ââ¬¡ 8 BULAN   *40.000*
ââââââââââââââââ
ððð® ð¬ðð°ð? ðð ð¥ðð§ð ð¬ð®ð§ð  ð¤ð ð¨ð°ð§ðð« ðð£ð ð§ð ðð©ð¢ð§ ð¤ð ðð¨ð­âï¸
â­âââââââââââââââââââââââ
ââ­âââ ã ððð ðððððð ã âââââââ
âââ¸ *DANA* : 081264952069
ââ°âââââââââ
âââââââââââââââââââââââââââââââ
â°âââââââââââââââââââââââ`.trim(), 'Â©AzzBotz', 'PAYMENT', '.payment', 'MENU', '.menu', m)
}

    // salam
    let reg = /(ass?alam|Ø§ÙÙØ³ÙÙÙØ§ÙÙÙ Ø¹ÙÙÙÙÙÙÙÙÙ|Ø§ÙØ³ÙØ§Ù Ø¹ÙÙÚ©Ù)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        this.sendSticker(m.chat, fs.readFileSync('./src/salam.webp'), m, {sendEphemeral: true})
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }

    // update status
    if (new Date() * 1 - setting.status > 1000) {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        await this.setStatus(`time ${uptime} | ð¥ï¸Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} |Â©AzzBotz || á´¿á­ AZZ ÃáÖÍÃ |`).catch(_ => _)
        setting.status = new Date() * 1
    }

}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
