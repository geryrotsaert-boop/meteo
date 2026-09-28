/**
 * Les textes de « Météo locale » dans les huit langues de FA6LIT.
 *
 * La langue vient, dans l'ordre : du paramètre `?lang=` de l'adresse (c'est ainsi que FA6LIT impose la
 * langue choisie dans l'application, qui n'est pas forcément celle du téléphone), puis de la langue du
 * navigateur, et sinon du français.
 *
 * Le dictionnaire est indexé par le **texte français** : la page reste lisible en français dans le
 * source, et une phrase sans traduction s'affiche en français au lieu de disparaître.
 *
 * Ajouter une langue : l'écrire dans LANGUES, LOCALES, POINTS, puis compléter chaque entrée.
 */
"use strict";

const LANGUES = ["fr", "en", "de", "es", "it", "pt", "nl", "fil"];
const LOCALES = { fr: "fr-FR", en: "en-GB", de: "de-DE", es: "es-ES", it: "it-IT", pt: "pt-PT", nl: "nl-NL", fil: "fil-PH" };

const LANG = (() => {
  const demande = new URLSearchParams(location.search).get("lang");
  let code = (demande || navigator.language || "fr").toLowerCase().split("-")[0];
  if (code === "tl" || code === "tgl") code = "fil";
  return LANGUES.includes(code) ? code : "fr";
})();

const LOCALE = LOCALES[LANG];

/** La langue des noms de lieux rendus par Open-Meteo (elle ne connaît pas le filipino : repli anglais). */
const LANGUE_API = LANG === "fil" ? "en" : LANG;

/** Les points cardinaux, dans l'ordre N, NE, E, SE, S, SO, O, NO. */
const POINTS = {
  fr: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
  en: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"],
  de: ["N", "NO", "O", "SO", "S", "SW", "W", "NW"],
  es: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
  it: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
  pt: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],
  nl: ["N", "NO", "O", "ZO", "Z", "ZW", "W", "NW"],
  fil: ["H", "HS", "S", "TS", "T", "TK", "K", "HK"],
};

const TRAD = {
  // ---- L'en-tête et la recherche ----
  "Météo locale précise": { en: "Precise local weather", de: "Genaues Wetter vor Ort", es: "Tiempo local preciso", it: "Meteo locale precisa", pt: "Meteorologia local precisa", nl: "Nauwkeurig lokaal weer", fil: "Tumpak na lokal na panahon" },
  "Météo locale": { en: "Local weather", de: "Wetter vor Ort", es: "Tiempo local", it: "Meteo locale", pt: "Meteorologia local", nl: "Lokaal weer", fil: "Lokal na panahon" },
  "AROME Météo-France quand il est disponible, avec repli automatique.": { en: "AROME Météo-France when available, with automatic fallback.", de: "AROME Météo-France, sofern verfügbar, mit automatischer Ausweichlösung.", es: "AROME Météo-France cuando está disponible, con alternativa automática.", it: "AROME Météo-France quando è disponibile, con ripiego automatico.", pt: "AROME Météo-France quando está disponível, com alternativa automática.", nl: "AROME Météo-France wanneer beschikbaar, met automatische terugval.", fil: "AROME Météo-France kapag available, may awtomatikong kapalit." },
  "Ville ou code postal": { en: "Town or postcode", de: "Ort oder Postleitzahl", es: "Ciudad o código postal", it: "Città o codice postale", pt: "Cidade ou código postal", nl: "Plaats of postcode", fil: "Lungsod o postal code" },
  "Rechercher": { en: "Search", de: "Suchen", es: "Buscar", it: "Cerca", pt: "Procurar", nl: "Zoeken", fil: "Maghanap" },
  "Chargement…": { en: "Loading…", de: "Wird geladen…", es: "Cargando…", it: "Caricamento…", pt: "A carregar…", nl: "Laden…", fil: "Naglo-load…" },
  "Recherchez votre commune ou autorisez la géolocalisation.": { en: "Search for your town or allow location access.", de: "Suchen Sie Ihren Ort oder erlauben Sie die Standortbestimmung.", es: "Busque su municipio o permita la geolocalización.", it: "Cerchi il suo comune o autorizzi la geolocalizzazione.", pt: "Procure a sua localidade ou autorize a geolocalização.", nl: "Zoek uw plaats of sta locatiebepaling toe.", fil: "Hanapin ang inyong bayan o payagan ang lokasyon." },

  // ---- Les mesures ----
  "Ressenti": { en: "Feels like", de: "Gefühlt", es: "Sensación", it: "Percepita", pt: "Sensação", nl: "Gevoelstemperatuur", fil: "Pakiramdam" },
  "Humidité": { en: "Humidity", de: "Luftfeuchtigkeit", es: "Humedad", it: "Umidità", pt: "Humidade", nl: "Luchtvochtigheid", fil: "Halumigmig" },
  "Vent": { en: "Wind", de: "Wind", es: "Viento", it: "Vento", pt: "Vento", nl: "Wind", fil: "Hangin" },
  "Vent moyen": { en: "Average wind", de: "Mittlerer Wind", es: "Viento medio", it: "Vento medio", pt: "Vento médio", nl: "Gemiddelde wind", fil: "Katamtamang hangin" },
  "Rafales": { en: "Gusts", de: "Böen", es: "Rachas", it: "Raffiche", pt: "Rajadas", nl: "Windstoten", fil: "Buhos ng hangin" },
  "Pluie actuelle": { en: "Rain now", de: "Regen jetzt", es: "Lluvia actual", it: "Pioggia attuale", pt: "Chuva atual", nl: "Regen nu", fil: "Ulan ngayon" },
  "Pression": { en: "Pressure", de: "Luftdruck", es: "Presión", it: "Pressione", pt: "Pressão", nl: "Luchtdruk", fil: "Presyon" },
  "Visibilité": { en: "Visibility", de: "Sichtweite", es: "Visibilidad", it: "Visibilità", pt: "Visibilidade", nl: "Zicht", fil: "Visibility" },

  // ---- Le baromètre ----
  "Baromètre local": { en: "Local barometer", de: "Barometer vor Ort", es: "Barómetro local", it: "Barometro locale", pt: "Barómetro local", nl: "Lokale barometer", fil: "Lokal na barometro" },
  "Cadran barométrique": { en: "Barometer dial", de: "Barometerskala", es: "Esfera del barómetro", it: "Quadrante del barometro", pt: "Mostrador do barómetro", nl: "Barometerwijzerplaat", fil: "Dial ng barometro" },
  "Tendance en cours de calcul": { en: "Working out the trend", de: "Tendenz wird berechnet", es: "Calculando la tendencia", it: "Tendenza in fase di calcolo", pt: "A calcular a tendência", nl: "Trend wordt berekend", fil: "Kinakalkula ang trend" },
  "Dépression": { en: "Low", de: "Tief", es: "Borrasca", it: "Bassa pressione", pt: "Depressão", nl: "Lage druk", fil: "Mababa" },
  "Stable": { en: "Steady", de: "Gleichbleibend", es: "Estable", it: "Stabile", pt: "Estável", nl: "Stabiel", fil: "Matatag" },
  "Anticyclone": { en: "High", de: "Hoch", es: "Anticiclón", it: "Alta pressione", pt: "Anticiclone", nl: "Hoge druk", fil: "Mataas" },
  "En hausse": { en: "Rising", de: "Steigend", es: "En aumento", it: "In aumento", pt: "A subir", nl: "Stijgend", fil: "Tumataas" },
  "En baisse": { en: "Falling", de: "Fallend", es: "En descenso", it: "In calo", pt: "A descer", nl: "Dalend", fil: "Bumababa" },
  "{0} ({1} hPa environ)": { en: "{0} ({1} hPa or so)", de: "{0} (etwa {1} hPa)", es: "{0} ({1} hPa aproximadamente)", it: "{0} (circa {1} hPa)", pt: "{0} ({1} hPa aproximadamente)", nl: "{0} (ongeveer {1} hPa)", fil: "{0} (mga {1} hPa)" },

  // ---- La fiabilité des modèles ----
  "Fiabilité multi-modèles": { en: "Multi-model reliability", de: "Zuverlässigkeit mehrerer Modelle", es: "Fiabilidad multimodelo", it: "Affidabilità multi-modello", pt: "Fiabilidade multimodelo", nl: "Betrouwbaarheid van meerdere modellen", fil: "Pagkakatugma ng mga modelo" },
  "Calcul en cours": { en: "Calculating", de: "Wird berechnet", es: "Calculando", it: "Calcolo in corso", pt: "A calcular", nl: "Wordt berekend", fil: "Kinakalkula" },
  "Comparaison des modèles disponibles.": { en: "Comparing the available models.", de: "Vergleich der verfügbaren Modelle.", es: "Comparación de los modelos disponibles.", it: "Confronto dei modelli disponibili.", pt: "Comparação dos modelos disponíveis.", nl: "Vergelijking van de beschikbare modellen.", fil: "Paghahambing ng mga available na modelo." },
  "Température consolidée": { en: "Consolidated temperature", de: "Zusammengeführte Temperatur", es: "Temperatura consolidada", it: "Temperatura consolidata", pt: "Temperatura consolidada", nl: "Samengevoegde temperatuur", fil: "Pinagsamang temperatura" },
  "Dispersion thermique": { en: "Temperature spread", de: "Temperaturstreuung", es: "Dispersión térmica", it: "Dispersione termica", pt: "Dispersão térmica", nl: "Temperatuurspreiding", fil: "Pagkakaiba ng temperatura" },
  "Modèles prévoyant de la pluie": { en: "Models forecasting rain", de: "Modelle, die Regen vorhersagen", es: "Modelos que prevén lluvia", it: "Modelli che prevedono pioggia", pt: "Modelos que preveem chuva", nl: "Modellen die regen voorspellen", fil: "Mga modelong may ulan" },
  "Échéance analysée": { en: "Period analysed", de: "Betrachteter Zeitraum", es: "Plazo analizado", it: "Scadenza analizzata", pt: "Prazo analisado", nl: "Onderzochte termijn", fil: "Sinuring panahon" },
  "Prochaine heure": { en: "Next hour", de: "Nächste Stunde", es: "Próxima hora", it: "Prossima ora", pt: "Próxima hora", nl: "Komend uur", fil: "Susunod na oras" },
  "Modèle": { en: "Model", de: "Modell", es: "Modelo", it: "Modello", pt: "Modelo", nl: "Model", fil: "Modelo" },
  "Température": { en: "Temperature", de: "Temperatur", es: "Temperatura", it: "Temperatura", pt: "Temperatura", nl: "Temperatuur", fil: "Temperatura" },
  "Pluie": { en: "Rain", de: "Regen", es: "Lluvia", it: "Pioggia", pt: "Chuva", nl: "Regen", fil: "Ulan" },
  "État": { en: "Status", de: "Status", es: "Estado", it: "Stato", pt: "Estado", nl: "Status", fil: "Katayuan" },
  "Disponible": { en: "Available", de: "Verfügbar", es: "Disponible", it: "Disponibile", pt: "Disponível", nl: "Beschikbaar", fil: "Available" },
  "Indisponible": { en: "Unavailable", de: "Nicht verfügbar", es: "No disponible", it: "Non disponibile", pt: "Indisponível", nl: "Niet beschikbaar", fil: "Hindi available" },
  "Confiance élevée": { en: "High confidence", de: "Hohe Verlässlichkeit", es: "Confianza alta", it: "Affidabilità alta", pt: "Confiança elevada", nl: "Hoge betrouwbaarheid", fil: "Mataas na tiwala" },
  "Confiance moyenne": { en: "Medium confidence", de: "Mittlere Verlässlichkeit", es: "Confianza media", it: "Affidabilità media", pt: "Confiança média", nl: "Gemiddelde betrouwbaarheid", fil: "Katamtamang tiwala" },
  "Confiance faible": { en: "Low confidence", de: "Geringe Verlässlichkeit", es: "Confianza baja", it: "Affidabilità bassa", pt: "Confiança baixa", nl: "Lage betrouwbaarheid", fil: "Mababang tiwala" },
  "Comparaison insuffisante : moins de deux modèles disponibles.": { en: "Not enough to compare: fewer than two models available.", de: "Zu wenig für einen Vergleich: weniger als zwei Modelle verfügbar.", es: "Comparación insuficiente: menos de dos modelos disponibles.", it: "Confronto insufficiente: meno di due modelli disponibili.", pt: "Comparação insuficiente: menos de dois modelos disponíveis.", nl: "Te weinig om te vergelijken: minder dan twee modellen beschikbaar.", fil: "Kulang ang paghahambing: wala pang dalawang modelo." },
  "{0}/4 modèles disponibles": { en: "{0}/4 models available", de: "{0}/4 Modelle verfügbar", es: "{0}/4 modelos disponibles", it: "{0}/4 modelli disponibili", pt: "{0}/4 modelos disponíveis", nl: "{0}/4 modellen beschikbaar", fil: "{0}/4 modelong available" },
  "Écart thermique {0} °C ; {1} % d’accord sur la pluie.": { en: "Temperature spread {0} °C; {1} % agree on rain.", de: "Temperaturunterschied {0} °C; {1} % stimmen beim Regen überein.", es: "Diferencia térmica {0} °C; {1} % coinciden sobre la lluvia.", it: "Scarto termico {0} °C; {1} % concordano sulla pioggia.", pt: "Diferença térmica {0} °C; {1} % concordam quanto à chuva.", nl: "Temperatuurverschil {0} °C; {1} % zijn het eens over regen.", fil: "Agwat ng temperatura {0} °C; {1} % ang sang-ayon sa ulan." },
  "Pluie majoritaire": { en: "Rain more likely", de: "Mehrheitlich Regen", es: "Lluvia mayoritaria", it: "Pioggia per la maggioranza", pt: "Chuva maioritária", nl: "Meestal regen", fil: "Mas malamang umulan" },
  "Pluie minoritaire": { en: "Rain less likely", de: "Kaum Regen", es: "Lluvia minoritaria", it: "Pioggia per la minoranza", pt: "Chuva minoritária", nl: "Weinig kans op regen", fil: "Malabong umulan" },

  // ---- Les prévisions ----
  "Prochaines 24 heures": { en: "Next 24 hours", de: "Nächste 24 Stunden", es: "Próximas 24 horas", it: "Prossime 24 ore", pt: "Próximas 24 horas", nl: "Komende 24 uur", fil: "Susunod na 24 oras" },
  "Prévisions sur 4 jours": { en: "4-day forecast", de: "Vorhersage für 4 Tage", es: "Previsión a 4 días", it: "Previsioni su 4 giorni", pt: "Previsão a 4 dias", nl: "Verwachting voor 4 dagen", fil: "Taya sa 4 na araw" },
  "Maintenant": { en: "Now", de: "Jetzt", es: "Ahora", it: "Adesso", pt: "Agora", nl: "Nu", fil: "Ngayon" },
  "Aujourd’hui": { en: "Today", de: "Heute", es: "Hoy", it: "Oggi", pt: "Hoje", nl: "Vandaag", fil: "Ngayong araw" },
  "Source : {0} · actualisé à {1}": { en: "Source: {0} · updated at {1}", de: "Quelle: {0} · aktualisiert um {1}", es: "Fuente: {0} · actualizado a las {1}", it: "Fonte: {0} · aggiornato alle {1}", pt: "Fonte: {0} · atualizado às {1}", nl: "Bron: {0} · bijgewerkt om {1}", fil: "Pinagmulan: {0} · na-update {1}" },
  "meilleur modèle disponible": { en: "best available model", de: "bestes verfügbares Modell", es: "mejor modelo disponible", it: "miglior modello disponibile", pt: "melhor modelo disponível", nl: "beste beschikbare model", fil: "pinakamahusay na modelo" },

  // ---- Les avertissements ----
  "Orage possible vers {0}": { en: "Thunderstorm possible around {0}", de: "Gewitter möglich gegen {0}", es: "Posible tormenta hacia las {0}", it: "Possibile temporale verso le {0}", pt: "Trovoada possível por volta das {0}", nl: "Onweer mogelijk rond {0}", fil: "Posibleng kulog-kidlat bandang {0}" },
  "Pluie probable vers {0}": { en: "Rain likely around {0}", de: "Regen wahrscheinlich gegen {0}", es: "Lluvia probable hacia las {0}", it: "Pioggia probabile verso le {0}", pt: "Chuva provável por volta das {0}", nl: "Regen waarschijnlijk rond {0}", fil: "Malamang umulan bandang {0}" },
  "Rafales fortes possibles : {0} km/h": { en: "Strong gusts possible: {0} km/h", de: "Starke Böen möglich: {0} km/h", es: "Posibles rachas fuertes: {0} km/h", it: "Possibili raffiche forti: {0} km/h", pt: "Rajadas fortes possíveis: {0} km/h", nl: "Zware windstoten mogelijk: {0} km/h", fil: "Posibleng malakas na hangin: {0} km/h" },

  // ---- Les messages d'état ----
  "Récupération des prévisions…": { en: "Fetching the forecast…", de: "Vorhersage wird geholt…", es: "Obteniendo la previsión…", it: "Recupero delle previsioni…", pt: "A obter a previsão…", nl: "Verwachting ophalen…", fil: "Kinukuha ang taya…" },
  "Prévisions chargées.": { en: "Forecast loaded.", de: "Vorhersage geladen.", es: "Previsión cargada.", it: "Previsioni caricate.", pt: "Previsão carregada.", nl: "Verwachting geladen.", fil: "Nai-load na ang taya." },
  "La requête a expiré. Vérifiez votre connexion.": { en: "The request timed out. Check your connection.", de: "Die Anfrage ist abgelaufen. Prüfen Sie Ihre Verbindung.", es: "La solicitud ha caducado. Compruebe su conexión.", it: "La richiesta è scaduta. Controlli la connessione.", pt: "O pedido expirou. Verifique a sua ligação.", nl: "De aanvraag is verlopen. Controleer uw verbinding.", fil: "Nag-expire ang kahilingan. Suriin ang koneksyon." },
  "Impossible de charger la météo : ": { en: "Cannot load the weather: ", de: "Wetter kann nicht geladen werden: ", es: "No se puede cargar el tiempo: ", it: "Impossibile caricare il meteo: ", pt: "Não é possível carregar a meteorologia: ", nl: "Het weer kan niet worden geladen: ", fil: "Hindi ma-load ang panahon: " },
  "Recherche de la commune…": { en: "Looking up the town…", de: "Ort wird gesucht…", es: "Buscando el municipio…", it: "Ricerca del comune…", pt: "A procurar a localidade…", nl: "Plaats opzoeken…", fil: "Hinahanap ang bayan…" },
  "Recherche impossible.": { en: "Search failed.", de: "Suche nicht möglich.", es: "Búsqueda imposible.", it: "Ricerca impossibile.", pt: "Procura impossível.", nl: "Zoeken mislukt.", fil: "Hindi matagumpay ang paghahanap." },
  "Aucune commune trouvée.": { en: "No town found.", de: "Kein Ort gefunden.", es: "No se ha encontrado ningún municipio.", it: "Nessun comune trovato.", pt: "Nenhuma localidade encontrada.", nl: "Geen plaats gevonden.", fil: "Walang nahanap na bayan." },
  "La géolocalisation n’est pas prise en charge.": { en: "Location is not supported.", de: "Standortbestimmung wird nicht unterstützt.", es: "La geolocalización no es compatible.", it: "La geolocalizzazione non è supportata.", pt: "A geolocalização não é suportada.", nl: "Locatiebepaling wordt niet ondersteund.", fil: "Hindi suportado ang lokasyon." },
  "Localisation en cours…": { en: "Finding your location…", de: "Standort wird ermittelt…", es: "Localizando…", it: "Localizzazione in corso…", pt: "A localizar…", nl: "Locatie bepalen…", fil: "Hinahanap ang lokasyon…" },
  "Autorisation de géolocalisation refusée.": { en: "Location permission denied.", de: "Standortfreigabe verweigert.", es: "Permiso de geolocalización denegado.", it: "Autorizzazione alla geolocalizzazione negata.", pt: "Autorização de geolocalização recusada.", nl: "Toestemming voor locatie geweigerd.", fil: "Tinanggihan ang pahintulot sa lokasyon." },
  "Position indisponible.": { en: "Location unavailable.", de: "Standort nicht verfügbar.", es: "Posición no disponible.", it: "Posizione non disponibile.", pt: "Posição indisponível.", nl: "Locatie niet beschikbaar.", fil: "Walang available na lokasyon." },
  "La localisation a expiré.": { en: "Location timed out.", de: "Standortbestimmung abgelaufen.", es: "La localización ha caducado.", it: "La localizzazione è scaduta.", pt: "A localização expirou.", nl: "Locatiebepaling is verlopen.", fil: "Nag-expire ang paghahanap ng lokasyon." },
  "Erreur de géolocalisation.": { en: "Location error.", de: "Fehler bei der Standortbestimmung.", es: "Error de geolocalización.", it: "Errore di geolocalizzazione.", pt: "Erro de geolocalização.", nl: "Fout bij locatiebepaling.", fil: "May error sa lokasyon." },
  "Autorisez la position GPS ou recherchez une ville.": { en: "Allow GPS location or search for a town.", de: "Erlauben Sie den GPS-Standort oder suchen Sie einen Ort.", es: "Permita la ubicación GPS o busque una ciudad.", it: "Autorizzi il GPS oppure cerchi una città.", pt: "Autorize a localização GPS ou procure uma cidade.", nl: "Sta GPS-locatie toe of zoek een plaats.", fil: "Payagan ang GPS o maghanap ng lungsod." },
  "Détection de votre position GPS…": { en: "Finding your GPS location…", de: "Ihr GPS-Standort wird ermittelt…", es: "Detectando su posición GPS…", it: "Rilevamento della sua posizione GPS…", pt: "A detetar a sua posição GPS…", nl: "Uw GPS-locatie wordt bepaald…", fil: "Hinahanap ang inyong GPS…" },
  "Position GPS refusée. La dernière ville enregistrée est utilisée.": { en: "GPS location denied. The last saved town is used.", de: "GPS-Standort verweigert. Der zuletzt gespeicherte Ort wird verwendet.", es: "Ubicación GPS denegada. Se usa la última ciudad guardada.", it: "Posizione GPS negata. Si usa l'ultima città salvata.", pt: "Localização GPS recusada. É usada a última cidade guardada.", nl: "GPS-locatie geweigerd. De laatst opgeslagen plaats wordt gebruikt.", fil: "Tinanggihan ang GPS. Ginagamit ang huling lungsod." },
  "Position GPS indisponible. La dernière ville enregistrée est utilisée.": { en: "GPS location unavailable. The last saved town is used.", de: "GPS-Standort nicht verfügbar. Der zuletzt gespeicherte Ort wird verwendet.", es: "Ubicación GPS no disponible. Se usa la última ciudad guardada.", it: "Posizione GPS non disponibile. Si usa l'ultima città salvata.", pt: "Localização GPS indisponível. É usada a última cidade guardada.", nl: "GPS-locatie niet beschikbaar. De laatst opgeslagen plaats wordt gebruikt.", fil: "Walang GPS. Ginagamit ang huling lungsod." },
  "La détection GPS a expiré. La dernière ville enregistrée est utilisée.": { en: "GPS timed out. The last saved town is used.", de: "GPS-Suche abgelaufen. Der zuletzt gespeicherte Ort wird verwendet.", es: "La detección GPS ha caducado. Se usa la última ciudad guardada.", it: "Il rilevamento GPS è scaduto. Si usa l'ultima città salvata.", pt: "A deteção GPS expirou. É usada a última cidade guardada.", nl: "GPS-zoekactie is verlopen. De laatst opgeslagen plaats wordt gebruikt.", fil: "Nag-expire ang GPS. Ginagamit ang huling lungsod." },
  "Impossible d’utiliser la position GPS.": { en: "Cannot use the GPS location.", de: "Der GPS-Standort kann nicht verwendet werden.", es: "No se puede usar la ubicación GPS.", it: "Impossibile usare la posizione GPS.", pt: "Não é possível usar a localização GPS.", nl: "De GPS-locatie kan niet worden gebruikt.", fil: "Hindi magamit ang GPS." },
  "Ma position": { en: "My location", de: "Mein Standort", es: "Mi posición", it: "La mia posizione", pt: "A minha posição", nl: "Mijn locatie", fil: "Ang lokasyon ko" },

  // ---- Le pied de page ----
  "Données Open-Meteo · comparaison AROME/ARPEGE, ECMWF, ICON et GFS · aucune clé API requise.": { en: "Open-Meteo data · comparing AROME/ARPEGE, ECMWF, ICON and GFS · no API key needed.", de: "Daten von Open-Meteo · Vergleich von AROME/ARPEGE, ECMWF, ICON und GFS · kein API-Schlüssel nötig.", es: "Datos de Open-Meteo · comparación AROME/ARPEGE, ECMWF, ICON y GFS · sin clave API.", it: "Dati Open-Meteo · confronto AROME/ARPEGE, ECMWF, ICON e GFS · nessuna chiave API richiesta.", pt: "Dados Open-Meteo · comparação AROME/ARPEGE, ECMWF, ICON e GFS · sem chave API.", nl: "Gegevens van Open-Meteo · vergelijking AROME/ARPEGE, ECMWF, ICON en GFS · geen API-sleutel nodig.", fil: "Datos ng Open-Meteo · paghahambing ng AROME/ARPEGE, ECMWF, ICON at GFS · walang API key." },
  "Propulsé par": { en: "Powered by", de: "Betrieben von", es: "Con la tecnología de", it: "Realizzato da", pt: "Desenvolvido por", nl: "Mogelijk gemaakt door", fil: "Pinapagana ng" },

  // ---- Le temps qu'il fait (codes Open-Meteo) ----
  "Conditions variables": { en: "Changeable conditions", de: "Wechselhaft", es: "Condiciones variables", it: "Condizioni variabili", pt: "Condições variáveis", nl: "Wisselvallig", fil: "Pabago-bagong panahon" },
  "Ciel dégagé": { en: "Clear sky", de: "Klarer Himmel", es: "Cielo despejado", it: "Cielo sereno", pt: "Céu limpo", nl: "Heldere hemel", fil: "Maaliwalas" },
  "Principalement dégagé": { en: "Mainly clear", de: "Überwiegend klar", es: "Mayormente despejado", it: "Prevalentemente sereno", pt: "Maioritariamente limpo", nl: "Overwegend helder", fil: "Halos maaliwalas" },
  "Partiellement nuageux": { en: "Partly cloudy", de: "Teilweise bewölkt", es: "Parcialmente nublado", it: "Parzialmente nuvoloso", pt: "Parcialmente nublado", nl: "Half bewolkt", fil: "Bahagyang maulap" },
  "Couvert": { en: "Overcast", de: "Bedeckt", es: "Cubierto", it: "Coperto", pt: "Encoberto", nl: "Bewolkt", fil: "Makulimlim" },
  "Brouillard": { en: "Fog", de: "Nebel", es: "Niebla", it: "Nebbia", pt: "Nevoeiro", nl: "Mist", fil: "Hamog" },
  "Brouillard givrant": { en: "Freezing fog", de: "Gefrierender Nebel", es: "Niebla helada", it: "Nebbia gelata", pt: "Nevoeiro gelado", nl: "Aanvriezende mist", fil: "Nagyeyelong hamog" },
  "Bruine faible": { en: "Light drizzle", de: "Leichter Nieselregen", es: "Llovizna débil", it: "Pioviggine debole", pt: "Chuvisco fraco", nl: "Lichte motregen", fil: "Mahinang ambon" },
  "Bruine": { en: "Drizzle", de: "Nieselregen", es: "Llovizna", it: "Pioviggine", pt: "Chuvisco", nl: "Motregen", fil: "Ambon" },
  "Bruine forte": { en: "Heavy drizzle", de: "Starker Nieselregen", es: "Llovizna fuerte", it: "Pioviggine forte", pt: "Chuvisco forte", nl: "Zware motregen", fil: "Malakas na ambon" },
  "Bruine verglaçante": { en: "Freezing drizzle", de: "Gefrierender Nieselregen", es: "Llovizna helada", it: "Pioviggine gelata", pt: "Chuvisco gelado", nl: "Aanvriezende motregen", fil: "Nagyeyelong ambon" },
  "Forte bruine verglaçante": { en: "Heavy freezing drizzle", de: "Starker gefrierender Nieselregen", es: "Llovizna helada fuerte", it: "Pioviggine gelata forte", pt: "Chuvisco gelado forte", nl: "Zware aanvriezende motregen", fil: "Malakas na nagyeyelong ambon" },
  "Pluie faible": { en: "Light rain", de: "Leichter Regen", es: "Lluvia débil", it: "Pioggia debole", pt: "Chuva fraca", nl: "Lichte regen", fil: "Mahinang ulan" },
  "Pluie modérée": { en: "Moderate rain", de: "Mäßiger Regen", es: "Lluvia moderada", it: "Pioggia moderata", pt: "Chuva moderada", nl: "Matige regen", fil: "Katamtamang ulan" },
  "Forte pluie": { en: "Heavy rain", de: "Starker Regen", es: "Lluvia fuerte", it: "Pioggia forte", pt: "Chuva forte", nl: "Zware regen", fil: "Malakas na ulan" },
  "Pluie verglaçante": { en: "Freezing rain", de: "Gefrierender Regen", es: "Lluvia helada", it: "Pioggia gelata", pt: "Chuva gelada", nl: "Aanvriezende regen", fil: "Nagyeyelong ulan" },
  "Forte pluie verglaçante": { en: "Heavy freezing rain", de: "Starker gefrierender Regen", es: "Lluvia helada fuerte", it: "Pioggia gelata forte", pt: "Chuva gelada forte", nl: "Zware aanvriezende regen", fil: "Malakas na nagyeyelong ulan" },
  "Neige faible": { en: "Light snow", de: "Leichter Schnee", es: "Nieve débil", it: "Neve debole", pt: "Neve fraca", nl: "Lichte sneeuw", fil: "Mahinang niyebe" },
  "Neige": { en: "Snow", de: "Schnee", es: "Nieve", it: "Neve", pt: "Neve", nl: "Sneeuw", fil: "Niyebe" },
  "Forte neige": { en: "Heavy snow", de: "Starker Schnee", es: "Nieve fuerte", it: "Neve forte", pt: "Neve forte", nl: "Zware sneeuw", fil: "Malakas na niyebe" },
  "Grains de neige": { en: "Snow grains", de: "Schneegriesel", es: "Granos de nieve", it: "Granuli di neve", pt: "Grãos de neve", nl: "Motsneeuw", fil: "Butil ng niyebe" },
  "Averses faibles": { en: "Light showers", de: "Leichte Schauer", es: "Chubascos débiles", it: "Rovesci deboli", pt: "Aguaceiros fracos", nl: "Lichte buien", fil: "Mahinang ambon-ulan" },
  "Averses": { en: "Showers", de: "Schauer", es: "Chubascos", it: "Rovesci", pt: "Aguaceiros", nl: "Buien", fil: "Ambon-ulan" },
  "Fortes averses": { en: "Heavy showers", de: "Starke Schauer", es: "Chubascos fuertes", it: "Rovesci forti", pt: "Aguaceiros fortes", nl: "Zware buien", fil: "Malakas na ambon-ulan" },
  "Averses de neige": { en: "Snow showers", de: "Schneeschauer", es: "Chubascos de nieve", it: "Rovesci di neve", pt: "Aguaceiros de neve", nl: "Sneeuwbuien", fil: "Ambon ng niyebe" },
  "Fortes averses de neige": { en: "Heavy snow showers", de: "Starke Schneeschauer", es: "Chubascos de nieve fuertes", it: "Rovesci di neve forti", pt: "Aguaceiros de neve fortes", nl: "Zware sneeuwbuien", fil: "Malakas na ambon ng niyebe" },
  "Orage": { en: "Thunderstorm", de: "Gewitter", es: "Tormenta", it: "Temporale", pt: "Trovoada", nl: "Onweer", fil: "Kulog-kidlat" },
  "Orage avec grêle": { en: "Thunderstorm with hail", de: "Gewitter mit Hagel", es: "Tormenta con granizo", it: "Temporale con grandine", pt: "Trovoada com granizo", nl: "Onweer met hagel", fil: "Kulog-kidlat na may yelo" },
  "Fort orage avec grêle": { en: "Severe thunderstorm with hail", de: "Schweres Gewitter mit Hagel", es: "Tormenta fuerte con granizo", it: "Forte temporale con grandine", pt: "Trovoada forte com granizo", nl: "Zwaar onweer met hagel", fil: "Malakas na kulog-kidlat na may yelo" },
};

/** Le texte dans la langue affichée. Une phrase sans traduction reste en français. */
function T(texte) {
  if (LANG === "fr") return texte;
  const t = TRAD[texte];
  return t && t[LANG] ? t[LANG] : texte;
}

/** Comme T, mais remplace {0}, {1}… par les valeurs données. */
function Tf(modele, ...valeurs) {
  return T(modele).replace(/\{(\d)\}/g, (_, i) => valeurs[Number(i)]);
}

/**
 * Traduit ce qui est écrit en dur dans la page : les textes, les libellés de champ et le titre.
 * Appelée une fois, au démarrage ; le reste passe par T() au moment de l'affichage.
 */
function traduirePage() {
  document.documentElement.lang = LANG;
  document.title = T(document.title);
  if (LANG === "fr") return;
  const marcheur = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const noeuds = [];
  while (marcheur.nextNode()) {
    const brut = marcheur.currentNode.nodeValue.trim();
    if (brut && TRAD[brut]) noeuds.push(marcheur.currentNode);
  }
  for (const noeud of noeuds) {
    const brut = noeud.nodeValue.trim();
    noeud.nodeValue = noeud.nodeValue.replace(brut, T(brut));
  }
  for (const element of document.querySelectorAll("[placeholder],[aria-label]")) {
    for (const attribut of ["placeholder", "aria-label"]) {
      const valeur = element.getAttribute(attribut);
      if (valeur && TRAD[valeur]) element.setAttribute(attribut, T(valeur));
    }
  }
}
