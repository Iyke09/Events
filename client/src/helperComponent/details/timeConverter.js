
let date = '';
const timeConverter = (event) => {
    const datex = event.date ;
    const newDate = datex.split('-');
    const dateArr = ['null', 'January', 'Febuary', 'March','April',  'May','June','July',
    'August', 'September','October', 'November','December'];
    let selector = '';
    if(parseInt(newDate[1]) < 10){
      selector = newDate[1][1];
    }else{
      selector = newDate[1];
    }
    const finalDate = dateArr[selector];
    date = `${newDate[2]}, ${finalDate}`;
    return date;
};

export default timeConverter;