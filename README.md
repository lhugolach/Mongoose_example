# Esempio Mongoose
Questo esempio sfrutta la libreria **Mongoose** in Node.js.

Mongoose è una libreria JavaScript orientata agli oggetti che crea una connessione tra MongoDB e il framework dell'applicazione web Express.

Può essere affiancata a framework front-end come Angual, React, etc.

# Installazione
Con il seguente comando da terminale, specifico per Node, verranno scaricate tutte le dipendenze elencate in `package.json`:
```bash
$ npm install
```
Al termine del download, basterà avviare il progetto sempre tramite Node:
```bash
$ npm start
```
O in alternativa:
```bash
$ node server.js
```
In entrambi modi verrà avviato automaticamente il main file `server.js`, che metterà il servizio API, in ascolto sulla porta `5000` 

# Struttura del progetto
Le directory del progetto sono composte nel seguente modo:
```
Mongoose_example/
│
├── middleware/
│   └── crud_user.js
│
├── model/
│   └── user.js
│
└── server.js
```

Nel dettaglio:
- `server.js` è il main file del progetto, contiene:
  -  la connesione con il database

        ```js
        mongoose.connect('mongodb://localhost:27017/mongo-test');
        ```

  -  la gestione di rooting con Express.js per indirizzare i metodi di request alle CRUD

        ```js
        const app = express();
        app.use(express.json());

        app.get('/user', async function(req, res) {
            let resp = await User.getUser(req)
            res.send(resp);
        });
        ```
        
  -  l'esposizione del servizio sulla porta `5000`

        ```js
        app.listen(5000, (req, res) => {
            console.log('Server is running on 5000 port.');
        });
        ```

    - il servizio sfrutta il meccanismo **CORS** (Cross-Origin Resource Sharing) attraverso l'omonima dipendenza

        ```js
        const cors = require('cors');
        const allowedOrigins = ['http://localhost:5000'];
        app.use(cors({
            origin: allowedOrigins
        }));
        ```

- all'interno di `model/` troviamo i modelli che disegneranno e tipizzeranno la struttura dei dati che desideriamo inserire all'interno del database di MongoDB
- in `middleware/` troviamo il file che contengono le **CRUD** (Create, Read, Update, Delete) per ogni rispettivo model.
  
  I metodi di CRUD vengono richiamati all'interno del file `server.js`, rispettivamente all'interno di ogni specifica root definita con express.js.
  
  Invocando il rispettivo metodo, viene passato al suo interno la request `req` e la CRUD la elabora per restituire la response `res`
    ```js
    createUser: async (req) => {
        let user = req.body
        const newUser = new User({
            nome: user.nome,
            cognome: user.cognome
            });
        const result = await newUser.save()
    };
    ```

# Dipendenze
L'applicativo sfrutta le seguente dipendenze:
- [**Mongoose**](https://mongoosejs.com/)
- [**Express**](https://expressjs.com/)
- [**CORS**](https://github.com/expressjs/cors)
- [**Dotenv**](https://github.com/motdotla/dotenv) permette la gestione delle variabili d'ambiente

# Requisiti
L'applicazione necessita di:
- [**Node.js**](https://nodejs.org/)
- [**MongoDB**](https://www.mongodb.com/)