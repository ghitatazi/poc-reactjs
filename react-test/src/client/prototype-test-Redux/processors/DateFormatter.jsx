
function addZeroTime(s) {
  return s < 10 ? `0${s}` : s;
}

function addZeroDate(s) {
  return s[1] ? s : `0${s[0]}`;
}

export function stringToTimestamp(sDate) {
  // ex: '2016-05-19T06:04:01.414656362Z' to 1463637841
  return Date.parse(sDate.time);
}

export function timestampToDate(tmpDate) {
  // create a JS Date object based on a timestamp
  // ex returned value: 01/02/2016 10:30:23 format
  const date = new Date(tmpDate * 1000);
  const hours = addZeroTime(date.getHours());
  const minutes = addZeroTime(date.getMinutes());
  const seconds = addZeroTime(date.getSeconds());
  const extractedTime = `${hours}:${minutes}:${seconds}`;

  const d = addZeroDate(date.getDate().toString());
  const m = addZeroDate((date.getMonth() + 1).toString());
  const y = date.getFullYear().toString();
  const extractedDate = `${d}/${m}/${y}`;

  return `${extractedDate} ${extractedTime}`;
}

