const enum Intervals {
    //% block="one-second intervals"
    //% block.loc.de="Sekundentakt"
    Seconds = 1000,
    //% block="one-minute intervals"
    //% block.loc.de="Minutentakt"
    Minutes = Seconds * 60
}

const enum CountActions {
    //% block="continue counting"
    //% block.loc.de="zähle weiter"
    Continue,
    //% block="stop counting"
    //% block.loc.de="höre auf zu zählen"
    Stop
}

//% block="Counter"
//% block.loc.de="Zähler"
//% weight=110
//% color="#007A4B" icon="\uf163"
namespace Counter {  
    let currentCount: number = 1;
    let currentInterval: Intervals = Intervals.Seconds;

    let minCount: number = 1;

    //% blockId=counter_start_counting_from_min
    //% block="start counting from $minCount in $interval"
    //% block.loc.de="beginne bei $minCount im $interval zu zählen"
    //% minCount.min=1 minCount.max=25 minCount.defl=1
    //% expandableArgumentMode="toggle"
    export function startFromMin(minCount: number, interval: Intervals): void {
        currentCount = minCount
        currentInterval = interval

        basic.forever(() => {
            basic.pause(currentInterval)
            currentCount += 1
        })
    }

    //% blockId=counter_start_counting_from_min_again
    //% block="start counting over again from the beginning using the same interval"
    //% block.loc.de="beginne wieder von vorne im gleichen Takt zu zählen"
    export function startFromMinAgain(): void {
        currentCount = minCount
    }

    //% blockId=counter_count
    //% block="On the count of $countStop, $action and"
    //% block.loc.de="Wenn bis $countStop gezählt, dann $action und"
    //% countStop.min=1 countStop.max=25 countStop.defl=5
    //% expandableArgumentMode="toggle"
    export function onCountEvent(countStop: number, action: CountActions, handler: () => void) {
        basic.forever(() => {
            if (currentCount == countStop) {
                switch (action) {
                    case CountActions.Continue:
                        handler()
                        break
                    case CountActions.Stop:
                        handler()
                        for (; ;) { }
                }
            }
        })
    }
}