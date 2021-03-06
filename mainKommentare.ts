let hoejreHjul = 0
let maal = 0
let venstreHjul = 0
let hjem = 0
let vudering = 0
let farveRuteHjem: number[] = []
let farveListeRuteLevering = 0
let efterFarvePauseTid = 0
let ligeKoersel = 0
let farveRuteLevering: number[] = []
let FarveListeAntalHjem = 0
let drejVinkelListeRute: number[] = []
let antalDrej = 0
let pauseUI = false
let hastighed = 0
let funktionAntal = 0
// Der er sat variabler rundt i koden til at vide hvor man er i koden
// Bliver knappen left trykket viser den hvor man er i koden.
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    motors.stopAll()
    brick.showValue("Fejlkode", funktionAntal, 2)
})
// Her er der en UI der spørger om man kunne lide leveringen, man kan trykke op for ja og nej på ned, den gemmer svaret i en variabel med navnet, "Vudering"
// UI en går væk når man har svaret siden at pauseUI bliver sat til false efter sit svar,
function Rvudering() {
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
// Her starter en forgrening som hvis farven er "HEJM" stopper funktionen, hvis den ikke er "HEJM" ville den køre frem, dreje og gentage indtil den finder HJEM
function drejHjem() {
    funktionAntal = 7
    brick.showString("Koere hjem", 5)
    while (pauseUI == true) {
        for (let i = 0; i < FarveListeAntalHjem; i++) {
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
// Kør hjem har et misvisende navn, den ville afspille en lyd udfra den feedback man gav den efter man fik sin vare leveret
// Den booer hvis man sagde den var dårlig og den siger godt job hvis den var god
function koerHjem() {
    funktionAntal = 8
    brick.clearScreen()
    if (vudering == 0) {
        music.playSoundEffectUntilDone(sounds.expressionsBoo)
    } else if (vudering == 1) {
        brick.showImage(images.informationThumbsUp)
        music.playSoundEffectUntilDone(sounds.communicationGoodJob)
    }
}
// Dette er grund sekvensen, når man trykker på enter knappen vil denne sekvens køre. 
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
// Variabler ansvarlig for at give bla længden af ruten
function variabler() {
    funktionAntal = 2
    antalDrej = 0
    FarveListeAntalHjem = farveRuteHjem.length
    farveListeRuteLevering = farveRuteLevering.length
}
// drejGentag vil køre frem indstil den finder farven MAAl, hvis farven ikke er MAAL vil den køre frem til næste farve på Farve Leverings Listen og dreje den satte vinkel til den farve.
function drejGentag() {
    funktionAntal = 4
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
                funktionAntal = 4217
                motors.largeBC.steer(ligeKoersel, hastighed)
                brick.showString("Koere til destination", 5)
                sensors.color3.pauseUntilColorDetected(farveRuteLevering.shift())
            }
        }
    }
}
// Config kan konfigureres til hvilke farver den skal køre til, hvilken retning den skal dreje, og hivlken farve den skal slutte levering og koden med 
function config() {
    hastighed = 50
    drejVinkelListeRute = [80, 80, 170, -80, -80]
    farveRuteLevering = [ColorSensorColor.Green, ColorSensorColor.Blue, ColorSensorColor.Red]
    farveRuteHjem = [ColorSensorColor.Blue, ColorSensorColor.Green]
    hjem = ColorSensorColor.Black
    maal = ColorSensorColor.Red
    efterFarvePauseTid = 300
}
// her stopper motoren og drejer til det tal gange det har drejet og det tal svarende til hvad der står på vinkel listen. 
function drej() {
    funktionAntal = 5
    pause(efterFarvePauseTid)
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(100)
    motors.largeBC.tank(venstreHjul, hoejreHjul)
    funktionAntal = 55
    sensors.gyro2.pauseUntilRotated(drejVinkelListeRute[antalDrej])
    motors.stopAll()
    sensors.gyro2.calibrate()
    pause(100)
}
// Når koden ikke er blevet sat igang af enter trykket vil der så på skærmen hvad man skal køre for at få koden til at køre
funktionAntal = 0
pauseUI = true
brick.showString("Tryk Enter for start!", 3)
// Den vil forevigt tjekke om at hvis den nuværene vinkel er i minus eller plus, hvis den er i minus drejer den til venste og højre hivs i plus
// Den viser også batteri tiden og hvilken udgivelse koden er, som i dette tilfælde er 1.0
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
