
const getTimeNow = () =>{  
    let ts = Date.now();
    let date_Obj = new Date(ts);
    let hour = date_Obj.getHours();
    let minutes = date_Obj.getMinutes();
    let seconds = date_Obj.getSeconds();
    let date = date_Obj.getDate();
    let mounth = date_Obj.getMinutes() + 1;
    let year = date_Obj.getFullYear();
    return year + "-" + mounth + "-" + date + "-"+ hour + ":" + minutes + ":" + seconds;
};


module.exports.getTimeNow = getTimeNow;