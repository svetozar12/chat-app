const expireDate = (exp: string) => {
  const seconds = exp.indexOf("s") !== -1;
  const hours = exp.indexOf("h") !== -1;
  const days = exp.indexOf("d") !== -1;
  const date = new Date();

  if (seconds) {
    date.setSeconds(date.getSeconds() + Number(exp.split("s")[0]));
    return date;
  }
  if (hours) {
    date.setHours(date.getHours() + Number(exp.split("h")[0]));
    return date;
  }
  if (days) {
    date.setDate(date.getDay() + Number(exp.split("d")[0]));
    return date;
  }
};

export default expireDate;
