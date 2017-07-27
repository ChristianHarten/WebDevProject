# WebDevProject

**Webentwicklung Abgabe - GeoJSON Tracks**

**System:** Windows 10 Version 1703   
**IDE:** JetBrains WebStorm   
**Shell:** Windows Command Prompt, Windows Powershell   
**Einstiegspunkt:** main.js   

**Getestet in:** Google Chrome Version 59.0.3071.115, Microsoft Edge 40.15063.0.0, Microsoft Internet Explorer Version 11.483.15063.0   

**Externe Module (ohne Dev Dependencies):**   
 * d3.js v4 --> Höhenprofil   
 * express --> Server    
 * jQuery --> http Anfragen   
 * leaflet --> Kartendienst   
 
 **Eigene Module:**   
 * map-utils --> enthält Logik zum Zeichnen auf der Map und zum Anzeigen des Höhenprofils mit d3.js v4    
 * http-request-helper --> enthält Logik zum Ausführen der Anfragen (GET, POST, PUT, DELETE) mit jQuery. Unterstützt aktuell nur GET Anfrage    
 * element-utils --> enthält Logik zum Berechnen und Anzeigen der GeoJSON Daten als Tracks in Sidebar. Kapselt auch EventListener   

**d3:**   
Da wir nicht herausgefunden haben, wie man mit Leaflet Höhenprofile anhand von GeoJSON Features zeichnet und das, was wir gefunden haben (Leaflet Plugin Leaflet.Elevation) mit Browserify offensichtlich weniger gut funktioniert hat (zumindest haben wir es nicht zum Laufen bringen können), haben wir uns dazu entschieden, das Höhenprofil mit einer geeigneten Library selbst zu zeichnen. Zu diesem Zweck haben wir auf d3.js v4 zurückgegriffen, da andere Libraries entweder nicht mit Browserify liefen, nicht als npm Modul existierten oder einen nur sehr eingeschränkten Funktionsumfang hatten.   

**jQuery:**   
Wir nutzen jQuery, um die Antwort des Servers direkt als JSON zu bekommen. Vorher haben wir mit einem XMLHttpRequest gearbeitet, die Antwort einfach gesendet und nach dem Empfangen als JSON geparsed. Wir fanden die Verwendung von jQuery zu diesem Zweck allerdings angenehmer, vor allem, weil sich die Menge an Code dadurch etwas reduziert hat.
