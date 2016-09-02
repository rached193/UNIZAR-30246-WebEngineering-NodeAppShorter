var app = angular.module('app-web', [

    "ngRoute",
    "highcharts-ng"

]);


//Constantes
var partial = "html/";
var addr = "http://localhost:8080";

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when("/mapa", {
                templateUrl: partial + "partialMapa.html",
                controller: "ControladorMapa"
            })
            .when("/index", {
                templateUrl: partial + "partialHistoria.html",
                controller: "ControladorHistoria"
            })
            .when("/chat", {
                templateUrl: partial + "partialChat.html",
                controller: "ControladorChat"
            })
            .when("/mensajes", {
                templateUrl: partial + "partialPrivados.html",
                controller: "ControladorPrivados"
            })
            .when("/login", {
                templateUrl: partial + "partiallogin.html",
                controller: "ControladorLogin"
            })
            .when("/casas", {
                templateUrl: partial + "partialSeleccionarCasa.html",
                controller: "ControladorSelecionarCasa"
            })
            .when("/signup", {
                templateUrl: partial + "partialsignupsimple.html",
                controller: "ControladorSignUp"
            })
            .when("/usuarios", {
                templateUrl: partial + "partialusuarios.html",
                controller: "ControladorListado"
            })
            .when("/personaje", {
                templateUrl: partial + "partialformPersonaje.html",
                controller: "ControladorPersonaje"
            })
            .when("/perritos/:userID", {
                templateUrl: partial + "partialListadoFichas.html",
                controller: "ControladorFichaUsuario"
            })
            .otherwise({redirectTo: "/index"});
    }]);