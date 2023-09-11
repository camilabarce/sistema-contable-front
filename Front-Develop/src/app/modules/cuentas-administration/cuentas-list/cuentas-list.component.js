"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CuentasListComponent = void 0;
var core_1 = require("@angular/core");
var cuenta_1 = require("src/app/models/cuenta");
var CuentasListComponent = /** @class */ (function () {
    function CuentasListComponent(router, cuentasService) {
        this.router = router;
        this.cuentasService = cuentasService;
        this.gruposBloquesRubros = [
            {
                "grupo": [
                    {
                        "id_grupo": 1,
                        "nombre_grupo": "Activo"
                    },
                    {
                        "id_grupo": 2,
                        "nombre_grupo": "Pasivo"
                    },
                    {
                        "id_grupo": 3,
                        "nombre_grupo": "Patrimonio neto"
                    },
                    {
                        "id_grupo": 4,
                        "nombre_grupo": "Resultado"
                    }
                ],
                "bloque": [
                    {
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_bloque": "Corriente"
                    },
                    {
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_bloque": "No corriente"
                    },
                    {
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_bloque": "Corriente"
                    },
                    {
                        "id_bloque": 2,
                        "id_grupo": 2,
                        "nombre_bloque": "No corriente"
                    },
                    {
                        "id_bloque": 3,
                        "id_grupo": 3,
                        "nombre_bloque": "Capital"
                    },
                    {
                        "id_bloque": 4,
                        "id_grupo": 4,
                        "nombre_bloque": "Ordinario"
                    },
                    {
                        "id_bloque": 5,
                        "id_grupo": 4,
                        "nombre_bloque": "Extraordinario"
                    }
                ],
                "rubro": [
                    {
                        "id_rubro": 1,
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_rubro": "Caja y bancos"
                    },
                    {
                        "id_rubro": 2,
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_rubro": "Inversiones temporarias"
                    },
                    {
                        "id_rubro": 3,
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_rubro": "Creditos por ventas"
                    },
                    {
                        "id_rubro": 4,
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_rubro": "Otros creditos"
                    },
                    {
                        "id_rubro": 5,
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_rubro": "Bienes de cambio"
                    },
                    {
                        "id_rubro": 6,
                        "id_bloque": 1,
                        "id_grupo": 1,
                        "nombre_rubro": "Otros bienes"
                    },
                    {
                        "id_rubro": 7,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Creditos por ventas"
                    },
                    {
                        "id_rubro": 8,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Bienes de cambio"
                    },
                    {
                        "id_rubro": 9,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Participacion permanente en sociedades"
                    },
                    {
                        "id_rubro": 10,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Otras inversiones"
                    },
                    {
                        "id_rubro": 11,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Bienes de uso"
                    },
                    {
                        "id_rubro": 12,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Activos intangibles"
                    },
                    {
                        "id_rubro": 13,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Otros activos"
                    },
                    {
                        "id_rubro": 14,
                        "id_bloque": 2,
                        "id_grupo": 1,
                        "nombre_rubro": "Llave de negocio"
                    },
                    {
                        "id_rubro": 15,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Deudas comerciales"
                    },
                    {
                        "id_rubro": 16,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Prestamos"
                    },
                    {
                        "id_rubro": 17,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Remuneraciones y cargas sociales"
                    },
                    {
                        "id_rubro": 18,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Cargas fiscales"
                    },
                    {
                        "id_rubro": 19,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Anticipo de clientes"
                    },
                    {
                        "id_rubro": 20,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Dividendos a pagar"
                    },
                    {
                        "id_rubro": 21,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Otras deudas"
                    },
                    {
                        "id_rubro": 22,
                        "id_bloque": 1,
                        "id_grupo": 2,
                        "nombre_rubro": "Previsiones"
                    },
                    {
                        "id_rubro": 23,
                        "id_bloque": 2,
                        "id_grupo": 2,
                        "nombre_rubro": "Duedas"
                    },
                    {
                        "id_rubro": 25,
                        "id_bloque": 2,
                        "id_grupo": 2,
                        "nombre_rubro": "Previsiones"
                    }
                ]
            }
        ];
        // !filtrar bloques y rubros
        this.grupoSeleccionado = null;
        this.bloqueSeleccionado = null;
        this.rubroSeleccionado = null;
        this.bloquesFiltrados = [];
        this.rubrosFiltrados = [];
        this.cuentasList = cuenta_1.Cuenta[] = []; // Especifica el tipo explícitamente
        this.dataSource = this.cuentasList;
        this.displayedColumns = ['codigo', 'nombre', 'tipo', 'saldo', 'acciones'];
    }
    CuentasListComponent.prototype.ngOnInit = function () {
    };
    CuentasListComponent.prototype.actualizarBloquesFiltrados = function () {
        var _this = this;
        if (this.grupoSeleccionado !== null) {
            var grupo_1 = this.gruposBloquesRubros[0].grupo.find(function (g) { return g.id_grupo === _this.grupoSeleccionado; });
            if (grupo_1) {
                this.bloquesFiltrados = this.gruposBloquesRubros[0].bloque.filter(function (b) { return b.id_grupo === grupo_1.id_grupo; });
            }
            this.bloqueSeleccionado = null;
            this.rubroSeleccionado = null;
        }
    };
    CuentasListComponent.prototype.actualizarRubrosFiltrados = function () {
        var _this = this;
        if (this.bloqueSeleccionado !== null) {
            this.rubrosFiltrados = this.gruposBloquesRubros[0].rubro.filter(function (r) { return r.id_bloque === _this.bloqueSeleccionado; });
            this.rubroSeleccionado = null;
        }
    };
    CuentasListComponent.prototype.mostrarCuentas = function () {
        var _this = this;
        this.cuentasService.mostrarCuentas(this.grupoSeleccionado, this.bloqueSeleccionado, this.rubroSeleccionado).subscribe(function (res) {
            if (res.body) { // Verifica si 'body' no es null
                _this.cuentasList = res.body.map(function (res) {
                    var cuentas = new cuenta_1.Cuenta(res.codigo, res.nombre, res.tipo, res.saldo);
                    return cuentas;
                });
            }
            else {
                // Handle the case where 'body' is null (no response body)
                console.log('La respuesta no tiene un cuerpo (body).');
            }
        });
    };
    CuentasListComponent = __decorate([
        core_1.Component({
            selector: 'app-cuentas-list',
            templateUrl: './cuentas-list.component.html',
            styleUrls: ['./cuentas-list.component.css']
        })
    ], CuentasListComponent);
    return CuentasListComponent;
}());
exports.CuentasListComponent = CuentasListComponent;
