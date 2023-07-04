const moment = require('moment');
require('moment-timezone');

const TTM_Calc = (expiryDate) => {
    // const InitialDate = new Date('2023-07-06T19:20:00');
    const InitialDate = new Date(expiryDate);

    let date = InitialDate.getDate().toString().padStart(2, '0');
    let month = (InitialDate.getMonth() + 1).toString().padStart(2, '0');
    let year = InitialDate.getFullYear().toString();
    const date3 = year + "-" + month + "-" + date;
    // console.log(date3);

    const time = '15:30:00';

    const dateTime = moment.tz(`${date3} ${time}`, 'YYYY-MM-DD HH:mm:ss', 'Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss');
    // console.log(dateTime);
    // console.log(typeof(dateTime))
    // console.log(moment.utc(dateTime).toDate())

    const expirationDate = moment.utc(dateTime).toDate()

    const currentDate = moment().toDate();

    // console.log(currentDate);
    const difference = expirationDate - currentDate;
    const days = Math.floor(difference / (1000 * 24 * 60 * 60))
    // console.log(days);
    const hours = (difference % (1000 * 24 * 60 * 60)) / (1000 * 60 * 60);
    // console.log(hours);
    const hours2days = hours / 24
    // console.log(htd);
    // console.log((days + hours2days).toFixed(2));
    return ((days + hours2days).toFixed(2));
}

module.exports = {
    TTM_Calc
}


