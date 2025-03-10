class SpaceStation {
    constructor() {
        console.log('space station operational')
        setInterval(() => {
            this.update();
        }, 1000);
    }
    LifeSupportSystems = {
        Atmospherics: {
            oxygen: 20,
            co2: 8,
            nitrogen: 70,
            other: 2
        },
        Environmental: {
            temperature: 22.222,
            humidity: 40,
            pressure: 14.7
        }
    }
    StructuralIntegrity = {
        HullIntegrity: {
            microfractures: 0,
            macrofractures: 0
        },
        Radiation: {
            millirads: 20,
        }
    }
    PowerSystems = {
        Generation: {
            solarpanels: 60,
            batteries: 30,
        },
        Distribution: {
            criticalsystems: 30,
            vitalsystems: 30,
            nonvitalsystems: 30,
            batteryreturn: 3.33
        }
    }
    CommunicationSystems = {
        TransmissionArray: {
            internal: 100,
            external: 100,
            gps: 100
        }
    }
    variation() {
        return (Math.floor(Math.random() * 10) - 5) / 10
    }
    update() {
        let v = this.variation();
        this.LifeSupportSystems.Atmospherics.oxygen += v;
        this.LifeSupportSystems.Atmospherics.co2 -= v;
        if (this.LifeSupportSystems.Atmospherics.oxygen < 19.8) {
            this.LifeSupportSystems.Atmospherics.oxygen = 19.8;
            this.LifeSupportSystems.Atmospherics.nitrogen += v;
        }
        if (this.LifeSupportSystems.Atmospherics.nitrogen < 65) {
            this.LifeSupportSystems.Atmospherics.nitrogen = 65;
            this.LifeSupportSystems.Atmospherics.co2 += v;
        }
    }
}

const button = document.querySelector('button');
button.addEventListener('click', (event) => {
    event.preventDefault();
    scheduleMission();
});

const mon = document.querySelector('#monitor');
const monitorOf = (message) => {
    const info = document.createElement('p');
    info.classList.add('monitor-text')
    info.innerText = message;
    mon.append(info);
    console.log(message);
}

const con = document.querySelector('#console');
const messageOf = (message, emphasize, type = 'p') => {
    const info = document.createElement(type);
    info.innerText = message;
    if (emphasize) info.style.fontStyle = 'italic';
    con.append(info);
    console.log(message);
}

const final = document.querySelector('#counter');
const counterOf = (message) => {
    final.innerText = message;
    console.log(message);
}

const oneTimeTasks = [];
let monitoringTaskId;

const addOneTimeTask = (func, delay) => {
    oneTimeTasks.push({ function: func, delay: delay });
    messageOf('added oneTimeTask');
}

const runOneTimeTasks = () => {
    oneTimeTasks.forEach((task) => {
        setTimeout(task.function, task.delay);
    });
    messageOf('• running tasks', false, 'h4');
}

const startMonitoring = () => {
    monitoringTaskId = setInterval(() => {
        //monitorOf('monitoring...');
        const { Atmospherics } = ourStation.LifeSupportSystems
        monitorOf(`O2: ${Atmospherics.oxygen.toFixed(2)}% CO2: ${Atmospherics.co2.toFixed(2)}% N: ${Atmospherics.nitrogen.toFixed(2)}% Trace: ${Atmospherics.other.toFixed(2)}%`)
    }, 1100);
    messageOf('• monitoring starting', false, 'h4');
}

const stopMonitoring = () => {
    clearInterval(monitoringTaskId);
    setTimeout(() => messageOf("...I'm sure everything'll be fine. :-D", true), 1000);
    messageOf('• stopped monitoring', false, 'h4');
    monitorOf('halted... [noHCF] ...system nominal');
}

const startCountdown = (duration) => {
    let timeLeft = duration;

    const launchTimerId = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) counterOf(`T-minus: ${String(timeLeft).padStart(4, '0')}`);

        if (timeLeft <= 0) {
            clearInterval(launchTimerId);
            messageOf('Lift Off!!!', true, 'h1');
        }
    }, 1000);
    messageOf(`countdown started: ${timeLeft} seconds`, false, 'h4');
}

const scheduleMission = () => {
    button.innerText = 'Scheduled';
    button.disabled = true;
    startMonitoring();
    addOneTimeTask(() => messageOf(' → pre-launch systems check... complete', false, 'h4'), 5000);
    addOneTimeTask(() => stopMonitoring(), 10000);
    addOneTimeTask(() => startCountdown(10), 13000);
    setTimeout(() => runOneTimeTasks(), 500);
    messageOf('mission scheduled...');
}

const ourStation = new SpaceStation();





