# Vejledning til konfiguration

## Ændre ruten, hastigheden mm. 
Alle de omsnakkede variabler kan findes under funktionen `config`


For at ændre hastigheden kan variablen 'hastighed' ændres til ønsket hastighed. 
Variablen er sat til 50 normalt

For at ændre hvilken retning den drejer skal man ændre i  `drejVinkelListeRute`
Det er en liste over hele ruten, frem og tilbage
Vinkelen er det samme som en cirkel, skal man dreje til højre/venste skal værdien være +/- 90, skal man vende om skal værdien være +/- 180.

***VIGTIG! Sensoren er ikke den bedste og er langsom til at registere vinklen til koden
derfor skal man regne med den tager fejl ved at regne ca -10 fra med sin øsnekde vinkel.*** 

*For at dreje til venste skal værdien være minus -
For højre skal værdien være i plus +*

Et eksempel på en vinkelRute kunne være hvor robotten skulle dreje:
højre,højre,vend om,venste,venste.
Ville koden være:


drejVinkelRute(80,80,170,-80,-80)

For at ændre hvornår den skal dreje skan man ændre i nogle forskellige arrays og variabler:

`farveRuteLevering`

`maal`

`farveRuteHjem`

`Hjem`


farveRuteLevering:
Punkt (x1). Første farve den skal dreje ved
Punkt (x2). Anden farve den skal dreje ved
Punkt (x). x farve den skal dreje ved, forsætter indstil den ser farven sat ved `mål`
Punkt (x Maal). Samme farve som `mål` 

´Maal´:

Punkt (Maal). Leverings farve. (Turen standser vis farven bliver set under leveringskørslen) 

`farveRuteHjem`:

Punkt (1). Farven før 
Punkt (-x). den omvende Leverings rute undtagen `maal`

`Hjem`:

Farven at robotten skal soppe og afslutte ved efter leveringen. (Farven kan godt blive mødt mod leveringsTuren men ikke mod HjemTuren)

Anbefaling og info til farvevalg på Mål og Hjem: Vælg en mere unaturlig farve på begge to. 
En god farve kunne være Rød eller Grøn, mens en dårlig kunne være sort eller brun.

Et eksempel på en farve rute kunne være:
farveRuteLevering(Grøn,Blå,Rød)
maal(Rød)
farveRuteHjem(blå,grøn)
hjem(gul)

## Info til at ændre skærmen 
Hvis der tilføjes mere skærm tekst er det en god ide at følge dette skema:

1. Battery Level (P)
2. Fejl koder (K)
3. Information til UI (U)
4. Frit 
5. Nuværende mål (T) & UI valgmulighed (U)
6. Firt
7. UI valgmulighed (U)
8. FRIT
9. FIRT
10. Title på software (P)

P= Permanent 
U = Under User interface menuer, kræver handling
T = Afhænger af kodens handling 
K = Kræver et tryk på en knap for at blive vist

Tilføjer du evt en ny linje så tag dem markeret Firt for bedre overblik.

