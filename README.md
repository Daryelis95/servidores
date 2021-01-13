# React y Laravel:
### Requisitos previos

Para la creacion del proyecto utilizaremos react para la UI y el backend laravel.
Para esta tarea, haremos uso de Babel , webpack y react-hot-loader para compilar nuestros activos react en la vista de laravel.

### Paso 1: crear nuestro proyecto laravel

```sh
$ laravel new react-laravel
```

### Paso 2: En nuestra /resources/view/ carpeta

podemos encontrar un archivo llamado welcome.blade.php. 
Elimine el archivo y cree un nuevo archivo llamado index.blade.php con el siguiente contenido.

```sh
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <title>App Service</title>
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  @if(env('APP_ENV') === 'local')
  <script src="http://localhost:3000/js/app.js"></script>
  @else
  <script src="/js/app.js"></script>
  @endif
</body>

</html>
```
### Paso 3: Luego modificar la ruta para apuntar a ese archivo /routes/web.php

```sh
  Route::get('/', function () {
    return view('index');
  });
```

### Paso 4: Package.json
 Debemos modificar el archivo
 
```sh
  {
    "private": true,
    "scripts": {
        "start": "webpack-dev-server --mode development",
        "build": "webpack"
    }
  }
```

### Paso 5: React
 Ahora queremos agregar react a nuestro proyecto laravel. Cree una carpeta llamada 'src' en la raíz de nuestro proyecto laravel y consigamos Babel.
 
```sh
$ npm install --save-dev @babel/core@7.1.0 @babel/cli@7.1.0 @babel/preset-env@7.1.0 @babel/preset-react@7.0.0
```

### Paso 6: Cree un archivo con el nombre .babelrc en la raiz del proyecto
 Configuraremos los ajustes preestablecidos para babel ingresando este contenido en el archivo.
 
```sh
{
  "presets" : [ "@ babel / env" ,  "@ babel / preset-react" ]
}
```

### Paso 7: Webpack
 Ahora necesitamos obtener y configurar el paquete web. Para hacer eso, necesitaremos instalar algunos paquetes más. Vamos a correr:
 
```sh
$ npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2
```
Webpack utiliza cargadores para procesar diferentes tipos de archivos. también viene con un servidor de desarrollo que se utilizará para empaquetar y servir nuestro proyecto React durante el desarrollo.

Crea un nuevo archivo llamado webpack.config.jstambién en la raíz del proyecto laravel. Este archivo exporta un objeto que será nuestra configuración de paquete web.

```sh
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "http://localhost:3000/js/",
    filename: "app.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 3000,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
```
### Paso 8: Instalemos un cargador para procesar archivos sass ya que es parte de los módulos que hemos definido en nuestra configuración.
 Ahora necesitamos obtener y configurar el paquete web. Para hacer eso, necesitaremos instalar algunos paquetes más. Vamos a correr:
 
```sh
$ npm install sass sass-loader
```

### Paso 9: Ahora podemos crear nuestro index.jsarchivo en el srcdirectorio.
 Este es el archivo que le dice a react cuándo conectarse al dom.
 
```sh
importar  React  de  "reaccionar" ;
importar  ReactDOM  desde  "react-dom" ;
importar la  aplicación  desde  "./App.js" ;
ReactDOM . render ( < App / > ,  document . getElementById ( "root" ) ) ;

```

También podemos crear otro archivo srcllamado App.js

```sh
import React from 'react';
import './styles/App.css';

function App() {

  return (
    <div className='App'>
      <h1>Hello</h1>
      <p>What a REAVELation</p>
    </div>
  );
}

export default App;

```

# Instalamos tambien estas Dependencias

```sh
$ npm i
```
```sh
$ composer install
```
# Levantar proyecto

### En la raiz del proyecto crea un archivo .env 
 Copia lo que esta en .env.example y pega en tu nuevo archivo modificando los campos:
 
```sh
 DB_CONNECTION=mysql
 DB_HOST=127.0.0.1
 DB_PORT=3306
 DB_DATABASE=nombreDb
 DB_USERNAME=root
 DB_PASSWORD=example
```


### Abre dos consola entra en el directorio donde creastes el proyecto y ejecuta: 
```sh
$ npm run start
```
### En la segunda :

```sh
$ php artisan serve
```



