
const timeConverter = (event) => {
    const datex = event.date ;
    const newDate = datex.split('-');
    const dateArr = ['null', 'Jan', 'Feb', 'March','April',  'May','June','July',
    'August', 'Sept','Oct', 'Nov','Dec'];

    let selector = '';
    if(parseInt(newDate[1]) < 10){
        selector = newDate[1][1];
    }else{
        selector = newDate[1];
    }
    const finalDate = dateArr[selector];

    const date = newDate[2];
    const month = finalDate;
    const to = parseInt(event.time.split(':')[0]) + 2;
    return {date, month, to};
};

export default timeConverter;