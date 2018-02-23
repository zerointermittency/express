## Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

### [Unreleased]

### [2.0.0] - 2018-01-08
#### Changed
- Se modifica la forma en que se reciben las opciones al momento de crear una instancia de ZIExpress
- Se permite opciones para las cabeceras desde las cuales se capturen la ip, por defecto "x-web-for" y "x-forwarded-for"
- Se permite pasar opciones para el modulo de [helmet][helmet], con el objetivo de que se pueda seleccionar que reglas aplicar
- Se actualiza .eslintrc.js => .eslintrc.json, donde se hace referencia a [eslint-config-zi][eslint-config-zi]

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
[eslint-config-zi]: https://github.com/zerointermittency/eslint-config-zi