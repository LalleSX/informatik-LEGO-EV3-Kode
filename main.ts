let hoejreHjul = 0
let maal = 0
let venstreHjul = 0
let hjem = 0
let farveRuteHjem: number[] = []
let vudering = 0
let ligeKoersel = 0
let farveRuteLevering: number[] = []
let farveListeRuteLevering = 0
let efterFarvePauseTid = 0
let drejVinkelListeRute: number[] = []
let FarveListeAntalHjem = 0
let hastighed = 0
let antalDrej = 0
let pauseUI = false
function Rvudering() {
    brick.clearScreen()
    music.playSoundEffectUntilDone(sounds.expressionsFanfare)
    pauseUI = true
    brick.showString("Vuder leveringen!", 3)
    brick.showString("Syntes du den var god tryk op!", 5)
    brick.showString("Syntes du den var daarlig tryk ned", 7)
    while (pauseUI == true) {
        brick.clearScreen()
        if (brick.buttonUp.isPressed()) {
            brick.showImage(images.informationThumbsUp)
            music.playSoundEffectUntilDone(sounds.systemConfirm)
            vudering = 1
            pauseUI = false
        } else if (brick.buttonDown.isPressed()) {
            brick.showImage(images.informationThumbsDown)
            music.playSoundEffectUntilDone(sounds.expressionsCrying)
            vudering = 0
            pauseUI = false
        }
    }
    pauseUI = false
    brick.clearScreen()
}
function drejHjem() {
    brick.showString("Koere hjem", 5)
    while (pauseUI == true) {
        for (let i = 0; i < FarveListeAntalHjem; i++) {
            if (sensors.color3.isColorDetected(hjem)) {
                koerHjem()
            } else {
                drej()
                motors.largeBC.steer(ligeKoersel, hastighed)
                sensors.color3.pauseUntilColorDetected(farveRuteHjem.shift())
            }
        }
        drej()
        motors.largeBC.steer(ligeKoersel, hastighed)
        sensors.color3.pauseUntilColorDetected(hjem)
        pauseUI = false
        pause(efterFarvePauseTid)
        motors.stopAll()
    }
}
function koerHjem() {
    brick.clearScreen()
    if (vudering == 0) {
        music.playSoundEffectUntilDone(sounds.expressionsBoo)
    } else if (vudering == 1) {
        brick.showImage(images.informationThumbsUp)
        music.playSoundEffectUntilDone(sounds.communicationGoodJob)
    }
}
function variabler() {
    antalDrej = 0
    FarveListeAntalHjem = farveRuteHjem.length
    farveListeRuteLevering = farveRuteLevering.length
    efterFarvePauseTid = 700
}
function drejGentag() {
    pauseUI = true
    while (pauseUI == true) {
        for (let i = 0; i < farveListeRuteLevering; i++) {
            if (sensors.color3.isColorDetected(maal)) {
                pause(efterFarvePauseTid)
                motors.stopAll()
                pauseUI = false
            } else {
                brick.showString("Drejer ik roer robotten!", 5)
                drej()
                motors.largeBC.steer(ligeKoersel, hastighed)
                brick.showString("Koere til destination", 5)
                sensors.color3.pauseUntilColorDetected(farveRuteLevering.shift())
            }
        }
    }
}
function config() {
    hastighed = 50
    drejVinkelListeRute = [80, 80, 170, -80, -80]
    farveRuteLevering = [ColorSensorColor.Green, ColorSensorColor.Blue, ColorSensorColor.Red]
    farveRuteHjem = [ColorSensorColor.Blue, ColorSensorColor.Green]
    hjem = ColorSensorColor.Black
    maal = ColorSensorColor.Red
}
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen()
    sensors.gyro2.calibrate()
    config()
    variabler()
    pause(200)
    motors.largeBC.steer(ligeKoersel, hastighed)
    sensors.color3.pauseUntilColorDetected(farveRuteLevering.shift())
    drejGentag()
    Rvudering()
    brick.showString("Koere hjem", 5)
    drejHjem()
    koerHjem()
})
function drej() {
    pause(efterFarvePauseTid)
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(100)
    motors.largeBC.tank(venstreHjul, hoejreHjul)
    sensors.gyro2.pauseUntilRotated(drejVinkelListeRute[antalDrej])
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(100)
    antalDrej = antalDrej + 1
}
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
