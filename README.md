# WebDevProject
WebDev Project

Installation: npm run build
Execution: npm start (port) // default 8080

map-loader: lädt google maps api
    jsonp: schreibt script tag in html datei mit attritbuten type und src (referenziert google maps api)
    gapi: referenziert jsonp, enthält maps api url und maps api on load callback. exportiert load function (done)
    load: klasse loader, enthält eigentliche funktionalität zum erstellen und anzeigen des map objekts und zum zeichnen der tracks auf dem map objekt
    
http-request-helper: hilfsmodul für GET, POST, PUT, DELETE anfragen  
    httpclient: enthält funktionen zum ausführen von o.a. anfragen (momentan nur GET). bekommt url und callback methode
    
element-utils: hilfsklassen
    htmlhelper: getter und setter für die html elemente (id´s). hat attribute für sidebar, page navigation container etc
    calculator: referenziert htmlhelper. enthält funktionen zum anzeigen der empfangenen tracks, zur pagination der tracks, meldet event listener an und ab etc
    
