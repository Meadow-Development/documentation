// data/docs.js
// Mehrsprachiges Beispiel: name: { de, en }, sections: { id: { title: {de,en}, html: {de,en} } }

const DOCS = {
  "IT_Licenseplate": {
    name: { de: "IT_Licenseplate", en: "IT_Licenseplate" },
    sections: {
      "installation": {
        title: { de: "Installation", en: "Install" },
        html: {
          de: "<p>Kopiere <code>police-system</code> nach <code>resources/police-system/</code> und füge <code>ensure police-system</code> in die server.cfg ein.</p><pre>ensure police-system</pre>",
          en: "<p>Copy <code>police-system</code> to <code>resources/police-system/</code> and add <code>ensure police-system</code> to server.cfg.</p><pre>ensure police-system</pre>"
        }
      },
      "developing": {
        title: { de: "Developing", en: "Developing" },
        html: {
          de: "<p>Entwicklerhinweise:</p><pre>-- config.lua\nConfig = {}\nConfig.Debug = true</pre>",
          en: "<p>Developer Notes:</p><pre>-- config.lua\nConfig = {}\nConfig.Debug = true</pre>"
        }
      },
      "usage": {
        title: { de: "Usage", en: "Usage" },
        html: {
          de: "<p>Commands:</p><pre>/dienst - Dienst an/abmelden\n/cuff - Festnehmen</pre>",
          en: "<p>Commands:</p><pre>/dienst - toggle duty\n/cuff - cuff a player</pre>"
        }
      }
    }
  },

  "IT_Versicherung": {
    name: { de: "IT_Versicherung", en: "IT_Versicherung" },
    sections: {
      "installation": {
        title: { de: "Installation", en: "Installation" },
        html: {
          de: "<p>Copy to <code>resources/vehicle-shop/</code> and add <code>ensure vehicle-shop</code> to server.cfg.</p>",
          en: "<p>Copy to <code>resources/vehicle-shop/</code> and add <code>ensure vehicle-shop</code> to server.cfg.</p>"
        }
      },
      "usage": {
        title: { de: "Usage", en: "Usage" },
        html: {
          de: "<p>NPC-Interaktion oder <code>/vehicleshop</code>.</p>",
          en: "<p>Interact with NPC or use <code>/vehicleshop</code>.</p>"
        }
      }
    }
  }
};

