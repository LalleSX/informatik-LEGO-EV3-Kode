function variabler () {
    funktionAntal = 2
    antalDrej = 0
    FarveListeAntalHjem = farveRuteHjem.length
    farveListeRuteLevering = farveRuteLevering.length
}
function Rvudering () {
    funktionAntal = 6
    music.playSoundEffectUntilDone(sounds.expressionsFanfare)
    pauseUI = true
    brick.showString("Vuder leveringen!", 3)
    brick.showString("Syntes du den var god tryk op!", 5)
    brick.showString("Syntes du den var daarlig tryk ned", 7)
    while (pauseUI == true) {
        funktionAntal = 631
        if (brick.buttonUp.isPressed() || sensors.touch1.isPressed()) {
            funktionAntal = 6311
            brick.showImage(images.informationThumbsUp)
            music.playSoundEffectUntilDone(sounds.systemConfirm)
            vudering = 1
            pauseUI = false
        }
        if (brick.buttonDown.isPressed()) {
            funktionAntal = 6321
            brick.showImage(images.informationThumbsDown)
            music.playSoundEffectUntilDone(sounds.expressionsCrying)
            vudering = 0
            pauseUI = false
        }
    }
    pauseUI = true
}
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    motors.stopAll()
    brick.showValue("Fejlkode", funktionAntal, 2)
})
function drejHjem () {
    funktionAntal = 7
    brick.showString("Koere hjem", 5)
    while (pauseUI == true) {
        for (let index = 0; index < FarveListeAntalHjem; index++) {
            if (sensors.color3.isColorDetected(hjem)) {
                koerHjem()
            } else {
                drej()
                funktionAntal = 7112
                motors.largeBC.steer(ligeKoersel, hastighed)
                sensors.color3.pauseUntilColorDetected(farveRuteHjem.shift())
            }
        }
        drej()
        funktionAntal = 712
        motors.largeBC.steer(ligeKoersel, hastighed)
        sensors.color3.pauseUntilColorDetected(hjem)
        pauseUI = false
        pause(500)
        motors.stopAll()
    }
}
function koerHjem () {
    funktionAntal = 8
    brick.clearScreen()
    if (vudering == 0) {
        music.playSoundEffectUntilDone(sounds.expressionsBoo)
    } else if (vudering == 1) {
        brick.showImage(images.informationThumbsUp)
        music.playSoundEffectUntilDone(sounds.communicationGoodJob)
    }
}
function drejGentag () {
    funktionAntal = 4
    pauseUI = true
    while (pauseUI == true) {
        for (let index = 0; index < farveListeRuteLevering; index++) {
            if (sensors.color3.isColorDetected(maal)) {
                pause(efterFarvePauseTid)
                motors.stopAll()
                pauseUI = false
            } else {
                brick.showString("Drejer ik roer robotten!", 5)
                drej()
                funktionAntal = 4217
                motors.largeBC.steer(ligeKoersel, hastighed)
                brick.showString("Koere til destination", 5)
                sensors.color3.pauseUntilColorDetected(farveRuteLevering.shift())
            }
        }
    }
}
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen()
    sensors.gyro2.calibrate()
    funktionAntal = 1
    config()
    variabler()
    funktionAntal = 3
    pause(200)
    motors.largeBC.steer(ligeKoersel, hastighed)
    sensors.color3.pauseUntilColorDetected(farveRuteLevering.shift())
    drejGentag()
    Rvudering()
    brick.showString("Koere hjem", 5)
    drejHjem()
    koerHjem()
})
function config () {
    hastighed = 50
    drejVinkelListeRute = [80, 80, 170, -80, -80]
    farveRuteLevering = [ColorSensorColor.Green, ColorSensorColor.Blue, ColorSensorColor.Red]
    farveRuteHjem = [ColorSensorColor.Blue, ColorSensorColor.Green]
    hjem = ColorSensorColor.Black
    maal = ColorSensorColor.Red
    efterFarvePauseTid = 300
}
function drej () {
    funktionAntal = 5
    pause(efterFarvePauseTid)
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(100)
    motors.largeBC.tank(venstreHjul, hoejreHjul)
    funktionAntal = 55
    sensors.gyro2.pauseUntilRotated(drejVinkelListeRute[antalDrej])
    antalDrej = antalDrej + 1
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(100)
}
let hoejreHjul = 0
let venstreHjul = 0
let drejVinkelListeRute: number[] = []
let efterFarvePauseTid = 0
let maal = 0
let hastighed = 0
let ligeKoersel = 0
let hjem = 0
let vudering = 0
let farveRuteLevering: number[] = []
let farveListeRuteLevering = 0
let farveRuteHjem: number[] = []
let FarveListeAntalHjem = 0
let antalDrej = 0
let pauseUI = false
let funktionAntal = 0
funktionAntal = 0
pauseUI = true
brick.showString("Tryk Enter for start!", 3)
forever(function () {
    brick.showValue("Batteri Niveau", brick.batteryInfo(BatteryProperty.Level), 1)
    brick.showString("Leverings Robot V 1.0", 10)
    ligeKoersel = sensors.gyro2.angle() * -1
    if (drejVinkelListeRute[antalDrej] >= 1) {
        venstreHjul = 20
        hoejreHjul = 0
    }
    if (drejVinkelListeRute[antalDrej] <= 1) {
        venstreHjul = 0
        hoejreHjul = 20
    }
})
