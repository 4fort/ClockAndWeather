const alarmForm = document.getElementById('alarm');
const hours = document.getElementById('alarm_Hours');
const minutes = document.getElementById('alarm_Minutes');

const alarm_Alert = document.querySelector('.alarm_Alert');
const alarm_AlertDetails = document.querySelector('#alarm_AlertDetails');

const userInputHour = document.getElementById('alarm_Hours');
const userInputMinute = document.getElementById('alarm_Minutes');
const userInputAmPm = document.getElementById('alarm_AmPm');
const userInputName = document.getElementById('alarm_Name');

let alarmListDisplay = document.getElementById('alarm_List');

var ringtone = new Audio('ringtone.mp3');

var h;
var m;
var am;

let currentAlarmID;
let isAlarming = false;

const alarmsArray = [];

alarmForm.addEventListener('submit', (e) => {
    e.preventDefault();

    alarmsArray.push(
        {
            id: Math.random(),
            name: userInputName.value,
            hour: +userInputHour.value,
            minute: +userInputMinute.value,
            seconds: 00,
            ampm: userInputAmPm.value,
            isEnabled: true
        }
    )
    
    // alarmsArray.sort((a, b) => Number(a) - Number(b))

    userInputName.value = '';
    
    console.log(alarmsArray)
    alarmDisplay();
})

setInterval(() => {
    
    h = new Date().getHours();
    m = new Date().getMinutes();
    s = new Date().getSeconds();
    am = h >= 12 ? "pm" : "am";

    if(h > 12){
        h = h - 12;
    }

    // let alarmHour;
    // let alarmMinute;
    // let alarmSeconds;
    // let alarmAmPm;
    // let alarmName;

    // alarmsArray.forEach(e => {
    //     alarmID = e.id;
    //     alarmHour = e.hour;
    //     alarmMinute = e.minute;
    //     alarmSeconds = e.seconds;
    //     alarmAmPm = e.ampm;
    //     alarmName = e.name;
    // })

    alarmsArray.forEach(e => {
        if(e.hour == h && e.minute == m && e.seconds == s && e.ampm == am){
            
            currentAlarmID = e.id;
            startAlarm(e.id, e.name , e.hour, e.minute, e.ampm)
        }
    })

    // console.log(`${alarmName} ${alarmHour}:${alarmMinute} ${alarmAmPm}`);


    // if(alarmHour == h && alarmMinute == m && alarmSeconds == s && alarmAmPm == am){
    //     currentAlarmID = alarmID;
    //     startAlarm(alarmID,alarmName, alarmHour, alarmMinute, alarmAmPm) 
    // }

    // console.log(`${alarmHour}:${alarmMinute} ${alarmAmPm}`)
    // console.log(`${h}:${m} ${am}`)
},1000)

const alarmDelete = (e) => {
    let deleteAlarm = alarmsArray.findIndex(el => el.id == e || el.id ==  e.parentElement.id);

    alarmsArray.splice(deleteAlarm, 1);
    alarmDisplay();

    console.log('deleted' + e);
}

const alarmDisplay = () => {

    hours.innerHTML = '';
    minutes.innerHTML = '';
    for(let i = 1; i <= 12; i++) {
        i = (i < 10) ? '0' + i : i;
        hours.innerHTML += `
            <option value="${i}">${i}</option>
        `;
    }

    for(let i = 0; i <= 59; i++) {
        i = (i < 10) ? '0' + i : i;
        minutes.innerHTML += `
            <option value="${i}">${i}</option>
        `;
    }

    alarmListDisplay.innerHTML = '';
    alarmsArray.forEach(e => {
        alarmListDisplay.innerHTML += `
        <div class="alarm_Object" id="${e.id}">

            <div class="alarm_objectTitle">
                <span>${e.name}</span>
                <span>
                    ${e.hour} : ${(e.minute < 10) ? '0' + e.minute : e.minute} ${e.ampm}
                </span>
            </div>
            
            <i class="bi bi-trash-fill" onclick="alarmDelete(this)"></i>
        </div>
    `;
    })
    console.log('test')
}
alarmDisplay();

const validation = () => {
    if(userInputName.value == '') {
        return true
    }
    else {
        return true
    }
}

let alarmTimeout;

const startAlarm = (ID, Name, Hour, Minute, AmPm) => {
    isAlarming = true;

    alarmTimeout = setTimeout(stopAlarm, 60000);

    if(isAlarming) {
        alarm_Alert.style.display = 'flex';
        alarm_AlertDetails.innerHTML = `
            <h3>${Name}</h3>
            <h1>${Hour} : ${(Minute < 10) ? '0' + Minute : Minute} ${AmPm}</h1>
        `;

        ringtone.play();
        console.log(isAlarming)
    }

    console.log(ID)
}

const stopAlarm = () => {
    console.log(isAlarming);
    alarm_Alert.style.display = 'none'
    isAlarming = false;

    ringtone.pause();

    console.log(currentAlarmID)
    alarmDelete(currentAlarmID);
}

const snoozeAlarm = () => {
    setTimeout(() => {
        startAlarm()
    }, 300000)
}