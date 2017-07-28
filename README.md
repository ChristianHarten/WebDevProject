# WebDevProject

**Webentwicklung Abgabe - GeoJSON Tracks**

**System:** Windows 10 Version 1703   
**IDE:** JetBrains WebStorm   
**Shell:** Windows Command Prompt, Windows Powershell   
**Einstiegspunkt:** main.js   

**Getestet in:** Google Chrome Version 59.0.3071.115, Microsoft Edge 40.15063.0.0, Microsoft Internet Explorer Version 11.483.15063.0   

**Externe Module (ohne Dev Dependencies):**   
 * d3.js v4 --> Höhenprofil, HTTP Anfragen, Frontend 
 * express --> Server    
 * leaflet --> Kartendienst   
 
 **Eigene Module:**   
 * map-utils --> enthält Logik zum Zeichnen auf der Map und zum Anzeigen des Höhenprofils mit d3.js v4    
 * http-request-helper --> enthält Logik zum Ausführen der Anfragen (GET, POST, PUT, DELETE) mit d3.js v4. Unterstützt aktuell nur GET Anfrage    
 * element-utils --> enthält Logik zum Berechnen und Anzeigen der GeoJSON Daten als Tracks in Sidebar. Kapselt auch EventListener   
  
