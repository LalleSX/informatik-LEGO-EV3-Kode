function variabler () {
    farveTur = 0
    tur = 0
    FarveListeAntalHjem = 0
    FarveListeAntalHjem = farvelisteHjem.length
    farveListeAntal = farveListe.length
}
function Rvudering () {
    music.playSoundEffectUntilDone(sounds.expressionsFanfare)
    vent = 0
    brick.showString("Vuder leveringen!", 1)
    brick.showString("Syntes du den var god tryk op!", 4)
    brick.showString("Syntes du den var daarlig tryk ned", 6)
    while (vent == 0) {
        brick.clearScreen()
        if (brick.buttonUp.isPressed()) {
            brick.showImage(images.informationThumbsUp)
            music.playSoundEffectUntilDone(sounds.systemConfirm)
            vudering = 1
            vent = 1
        } else if (brick.buttonDown.isPressed()) {
            brick.showImage(images.informationThumbsDown)
            music.playSoundEffectUntilDone(sounds.expressionsCrying)
            vudering = 0
            vent = 1
        }
    }
    vent = 0
    brick.clearScreen()
}
function drejHjem () {
    farvelisteHjem = [ColorSensorColor.Blue, ColorSensorColor.Green]
    while (vent == 0) {
        for (let index = 0; index < FarveListeAntalHjem; index++) {
            if (sensors.color3.isColorDetected(ColorSensorColor.Black)) {
                koerHjem()
            } else {
                drej()
                motors.largeBC.steer(ligeKoersel, speed)
                sensors.color3.pauseUntilColorDetected(farvelisteHjem.shift())
            }
        }
        drej()
        motors.largeBC.steer(ligeKoersel, speed)
        sensors.color3.pauseUntilColorDetected(slutHjem)
        vent = 1
        pause(700)
        motors.stopAll()
    }
}
function koerHjem () {
    brick.clearScreen()
    if (vudering == 0) {
        music.playSoundEffectUntilDone(sounds.expressionsBoo)
    } else if (vudering == 1) {
        brick.showImage(images.informationThumbsUp)
        music.playSoundEffectUntilDone(sounds.communicationGoodJob)
    }
}
function drejGentag () {
    vent = 0
    while (vent == 0) {
        for (let index = 0; index < farveListeAntal; index++) {
            if (sensors.color3.isColorDetected(leveringSlut)) {
                pause(700)
                motors.stopAll()
                vent = 1
            } else {
                drej()
                motors.largeBC.steer(ligeKoersel, speed)
                sensors.color3.pauseUntilColorDetected(farveListe.shift())
            }
        }
    }
}
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    brick.clearScreen()
    sensors.gyro2.calibrate()
    config()
    variabler()
    pause(500)
    motors.largeBC.steer(ligeKoersel, speed)
    sensors.color3.pauseUntilColorDetected(farveListe.shift())
    brick.showString("Koere til destination", 5)
    drejGentag()
    Rvudering()
    brick.showString("Koere hjem", 5)
    drejHjem()
    koerHjem()
})
function config () {
    speed = 50
    vinkel = [80, 80, 170, -80, -80]
    farveListe = [ColorSensorColor.Green, ColorSensorColor.Blue, ColorSensorColor.Red]
    farvelisteHjem = [ColorSensorColor.Blue, ColorSensorColor.Green]
    slutHjem = ColorSensorColor.Black
    leveringSlut = ColorSensorColor.Red
}
function drej () {
    pause(700)
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(500)
    motors.largeBC.tank(venstreHjul, hoejreHjul)
    sensors.gyro2.pauseUntilRotated(vinkel[tur])
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(200)
    tur = tur + 1
}
let hoejreHjul = 0
let venstreHjul = 0
let vinkel: number[] = []
let leveringSlut = 0
let slutHjem = 0
let speed = 0
let ligeKoersel = 0
let vudering = 0
let farveListe: number[] = []
let farveListeAntal = 0
let farvelisteHjem: number[] = []
let FarveListeAntalHjem = 0
let tur = 0
let farveTur = 0
let vent = 0
vent = 0
brick.showString("Tryk Enter for start!", 2)
forever(function () {
    ligeKoersel = sensors.gyro2.angle() * -1
    if (vinkel[tur] >= 1) {
        venstreHjul = 20
        hoejreHjul = 0
    }
    if (vinkel[tur] <= 1) {
        venstreHjul = 0
        hoejreHjul = 20
    }
})
