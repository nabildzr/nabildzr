// let handler = m => m
let handler = m => m
 handler.before = function (m) {
   let user = global.db.data.users[m.sender]
         let role = (user.level <= 20) ? 'Beginner'
           : ((user.level >= 20) && (user.level <= 40)) ? 'Commander Elite'
           : ((user.level >= 40) && (user.level <= 60)) ? 'The Commander Hero'
           : ((user.level >= 60) && (user.level <= 80)) ? 'The Commander Elite Hero'
           : ((user.level >= 80) && (user.level <= 100)) ? 'The Commander Elite Super Strong Hero'
           : ((user.level >= 100) && (user.level <= 120)) ? 'The Commander Elite Super Strong Shadow Hero'
           : ((user.level >= 120) && (user.level <= 140)) ? 'The Commander Legends Shadow Hero'
           : ((user.level >= 140) && (user.level <= 160)) ? 'The Commander Super Legends Shadow Hero'
           : ((user.level >= 160) && (user.level <= 260)) ? 'Legends'
           : ((user.level >= 260) && (user.level <= 300)) ? 'The Commander Super Legends Shadow Hero'
           : ((user.level >= 360) && (user.level <= 460)) ? 'Arcane Voyager'
           : ((user.level >= 460) && (user.level <= 560)) ? 'Astral Luminary'
           : ((user.level >= 560) && (user.level <= 660)) ? 'Stellar Hierophant'
           : ((user.level >= 660) && (user.level <= 760)) ? 'Supernova Sorcerer'
           : ((user.level >= 760) && (user.level <= 860)) ? 'Infinity Weaver'
           : ((user.level >= 860) && (user.level <= 960)) ? 'Dimensional Alchemist'
           : ((user.level >= 960) && (user.level <= 1060)) ? 'Omniscient Nexus'
           : ((user.level >= 1060) && (user.level <= 1160)) ? 'Universal Custodian'
           : ((user.level >= 1160) && (user.level <= 1260)) ? 'Cosmic Harmonizer'
           : ((user.level >= 1260) && (user.level <= 1360)) ? 'Omnipotent Luminary'
           : ((user.level >= 1360) && (user.level <= 1460)) ? 'The Next God'
           : 'Infinite God'
         user.role = role
   return true
 }

module.exports = handler
