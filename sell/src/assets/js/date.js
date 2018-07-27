export function formDate(date, fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+ '').substr(4-RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }
  for(let i in o){
    if(new RegExp(`(${i})`).test(fmt)){
      let str = o[i] + ''
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:pad(str))
    }
  }
  return fmt
}
function pad(str) {
  return ('00'+str).substr(str.length)
}
