"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CuentasService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CuentasService = /** @class */ (function () {
    function CuentasService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:3000';
    }
    CuentasService.prototype.mostrarCuentas = function (grupo, bloque, rubro) {
        // Construye la URL de solicitud con los parámetros proporcionados
        var url = this.baseUrl + "/mostrarCuentas/" + grupo + "/" + bloque + "/" + rubro;
        return this.http.get(url, { observe: "response" }).pipe(rxjs_1.catchError(function (error) {
            console.log(error.message);
            return rxjs_1.throwError(function () { return "Ocurrió un error"; });
        }));
    };
    CuentasService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CuentasService);
    return CuentasService;
}());
exports.CuentasService = CuentasService;
