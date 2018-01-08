# Bienvenido

Este modulo es el encargado de proporcionar la base para los servicios, esta basado en **[express][express]**.

## Instalación

```bash
yarn add @zerointermittency/express
# npm i --save @zerointermittency/express
```

## Api

El modulo utiliza **[express][express]**, para poder utilizar sus funcionalidades e incluir funcionalidades extras para todas las rutas que se generen.

> Importante: para poder visualizar la información de desarrollo ```DEBUG=npm-express:*```

##### Iniciar

Se instancia un objeto como se hace a continuación:

```javascript
const ZIExpress = require('@zerointermittency/express');
let express = new ZIExpress(opts);
```

**Argumentos**:

- options \(*Object*\):
    - port \(*Number*\): puerto donde se alojan las rutas, por defecto: **8080**
    - ip \(*String*\): ip donde se alojan las rutas, por defecto: **'0.0.0.0'**
    - bodyParser \(*Object*\)
        - json \(*Object*\): opciones para el modulo [body-parser][body-parser], el cual permite entregar información en formato json, por defecto: ```{type: 'application/json', limit: '10mb'}```
    - logger \(*Object/Boolean*\): si es **false** no despliega información sobre las peticiones que se realizan a cada ruta, por defecto: ```{level: 'warn', format: 'nunchee'}```

**Retorna**:

\(*ZIExpress*\): Retorna la instancia de la clase **ZIExpress**.

##### Atributo **core**

Este atributo contiene la instancia de **[express][express]** y permite utilizar todas las funcionalidades que contiene en su [documentación][docs-express]

##### Método **Router**

Este método retorna un **router** de express para poder asociarle rutas y agregarlo posteriormente a nuestro servidor.

```javascript
// a partir de la instancia,
let router = express.Router();

// o a partir de la clase
let router = ZIExpress.Router();

router.route('test').get((req, res) => {...});
```

> Los argumentos y el retorno de esta funcionalidad pueden verla en [Router de express][express-router]


##### Método **use**

Este método permite asociarle a el servidor de rutas un **middleware** o un router.

```javascript
express.use(router);
// express.use(middleware);
```

> Para mayor información [app.use de express][app-use].

##### Método **listen**

Este método es el que ejecuta el servidor en el puerto e ip que se haya especificado.

> Importante: para poder visualizar la información de desarrollo ```DEBUG=npm-express:listen*```

```javascript
express.listen(callback);
```

**Argumentos**:

- callback \(*Function*\): función a ejecutar cuando se este ejecutando el servidor


## Pruebas funcionales (Unit Testing)

Se llevaron a cabo las pruebas funcionales para validar el funcionamiento de sus métodos y opciones por defecto:

```bash
$ yarn test
```

## Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

### [Unreleased]

### [1.0.0] - 2018-01-08
#### Added
- Se agregan pruebas funcionales con el objetivo de tener probado todo el código, usando [istanbul js][istanbul] para saber cuanto
- Se integra [debug][debug], con el objetivo de poder desplegar información cuando se active
- Utilizar [express][express] como motor de rutas
- Wrapper para los métodos de express (use, route, Router y listen)
- Toda ruta utiliza el middleware de ip para ser identificada
- Se utiliza [morgan][morgan] para desplegar la información de las peticiones, exclusivamente de las que retornan un error http superior o igual a 400 (si logger esta activado), si el nivel de logger es mayor a error o warn despliega todas las peticiones
- README.md instalación, pruebas, uso y como contribuir al proyecto

#### Security
- Se utiliza [helmet][helmet] para mejorar la seguridad de [express][express]

[helmet]: https://www.npmjs.com/package/helmet
[morgan]: https://www.npmjs.com/package/morgan
[express]: https://expressjs.com/
[body-parser]: https://www.npmjs.com/package/body-parser
[express-router]: https://expressjs.com/en/4x/api.html#express.router
[app-use]: https://expressjs.com/en/4x/api.html#app.use
[docs-express]: https://expressjs.com/en/4x/api.html
[dependency-versions]: https://yarnpkg.com/en/docs/dependency-versions#toc-semantic-versioning
[istanbul]: https://istanbul.js.org/
[debug]: https://www.npmjs.com/package/debug