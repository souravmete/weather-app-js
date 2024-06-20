let dt= 1712866726;
const curDate =new Date(dt*1000)
console.log(curDate)


const options={
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
    // second:"numeric",
}

const formatter = new Intl.DateTimeFormat("en-US",options);

const formattedDate =formatter.format(curDate);

return formattedDate