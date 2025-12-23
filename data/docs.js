/* data/docs.js
   Struktur:
   DOCS = {
     scriptId: {
       name: { de: '...', en: '...' },
       sections: {
         sectionId: {
           title: { de: '...', en: '...' },
           html: { de: '...html string...', en: '...html string...' }
         }
       }
     }
   }
*/
const DOCS = {
  "licenseplate": {
    name: { de: "IT_Licenseplate", en: "IT_Licenseplate" },
    sections: {
      "installation": {
        title: { de: "Installation", en: "Installation" },
        html: {
          de: `<p>Kopiere den Ordner <code>police-system</code> nach <code>resources/police-system/</code> und füge in <code>server.cfg</code>:</p>
               <pre>ensure police-system</pre>`,
          en: `<p>Copy the folder <code>police-system</code> to <code>resources/police-system/</code> and add to <code>server.cfg</code>:</p>
               <pre>ensure police-system</pre>`
        }
      },
      "developing": {
        title: { de: "Developing", en: "Developing" },
        html: {
          de: `<p>Entwickler-Hinweise:</p>
               <pre>-- config.lua\nConfig = {}\nConfig.Debug = true</pre>`,
          en: `<p>Developer notes:</p>
               <pre>-- config.lua\nConfig = {}\nConfig.Debug = true</pre>`
        }
      },
      "updates": {
        title: { de: "Updates", en: "Updates" },
        html: {
          de: `<ul><li>v1.1 — Fix: Arrest</li></ul>`,
          en: `<ul><li>v1.1 — Fix: Arrest flow</li></ul>`
        }
      },
      "usage": {
        title: { de: "Usage", en: "Usage" },
        html: {
          de: `<p>Commands:</p><pre>/dienst - Dienst an/abmelden\n/cuff - Festnehmen</pre>`,
          en: `<p>Commands:</p><pre>/dienst - toggle duty\n/cuff - cuff a player</pre>`
        },
      "compatibility": {
        title: { de: "Kompatibilität", en: "compatibility" },
        html: {
          de: `<p>QBCore:</p><pre>Coming Soon...</pre>\n<p>ESX</p><pre>Unterstützt</pre>`,
          en: `<p>QBCore:</p><pre>Coming Soon...</pre>\n<p>ESX</p><pre>Supported</pre>`
        }
      }
    }
  },

  "insurance": {
    name: { de: "IT_Versicherung", en: "IT_Versicherung" },
    sections: {
      "installation": {
        title: { de: "Installation", en: "Installation" },
        html: {
          de: `<p>Kopiere nach <code>resources/vehicle-shop/</code> und füge <code>ensure vehicle-shop</code> in <code>server.cfg</code> ein.</p>`,
          en: `<p>Copy to <code>resources/vehicle-shop/</code> and add <code>ensure vehicle-shop</code> to <code>server.cfg</code>.</p>`
        }
      },
      "usage": {
        title: { de: "Usage", en: "Usage" },
        html: {
          de: `<p>Interagieren mit NPC oder benutze <code>/vehicleshop</code>.</p>`,
          en: `<p>Interact with NPC or use <code>/vehicleshop</code>.</p>`
        }
      },
      "updates": {
        title: { de: "Updates", en: "Updates" },
        html: {
          de: `<p>Keine aktuellen Updates.</p>`,
          en: `<p>No updates currently.</p>`
        }
      }
    }
  }
};

