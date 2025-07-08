function HandleingValidateError({ error = "", error_params = [] }) {
  const splitingDotTwo = String(error||"").split(":")
  const messageErrorArray = String(splitingDotTwo[1]).split("|")
  const stringUp = Array.from(error_params)

  const errorVariable = {
    "fill-not-same-as-type": "Jenis data pada {{name}} harus berjenis {{type}}",
    "fill-not-fill": "Data {{name}} tidak terisi!",
    "fill-max-fill": "Data {{name}} maksimal hanya {{value}} huruf",
    "fill-min-fill": "Data {{name}} minimal harus {{value}} huruf",
    "fill-only-interger": "Data {{name}} hanya berformat interger dan bukan desimal",
    "fill-array-max": "Maksimal {{name}} list terisi {{value}}",
    "fill-array-min": "Minimal {{name}} list harus terisi {{value}}",
    "fill-string-url": "Data {{name}} harus berformat url seperti https:// atau http://",
    "fill-array-only-include": "Data {{name}} tidak cocok",
    "fill-date-cant-before": "Waktu/tanggal {{name}} yang dipilih harus hari ini atau kedepan",
    "fill-date-cant-after": "Waktu/tanggal {{name}} yang dipilih harus sebelumnya atau maksimal hari ini",
    "fill-date-format-type": "Waktu/tanggal {{name}} harus berformat YYYY-MM-DD dan harus valid",
    "fill-time-cant-before": "Jam {{name}} harus waktu setelah ini atau kedepan",
    "fill-time-can-after": "Jam {{name}} harus dipilih waktu sebelumnya",
    "fill-email-can-allow": "Mail {{name}} harus berformat email dengan *@*.*",
    "fill-email-only-validation": "Domain yang hadir pada {{name}} tidak dizinkan",
  }

  const replaceingMsg = (msg = "", objs = {}) => {
    let msgstr = String(msg||"")
    for(let key of Object.keys(objs)) {
      msgstr = msgstr.replace(new RegExp(`{{${key}}}`, "g"), objs[key])
    }
    return msgstr
  }
  let messageContext = {}
  const arrayMessage = messageErrorArray.map((key, i) => ({
    by: String({...(stringUp[i]||{})}.name||"").toLowerCase().replace(/ /g,"_"),
    msg: replaceingMsg(errorVariable[key], stringUp[i])
  })).reverse()
  arrayMessage.forEach(a => {
    messageContext[a.by] = a.msg
  })
  return {
    list: arrayMessage,
    context: messageContext
  }
}

export default HandleingValidateError