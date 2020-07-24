class PedidoCliente {

    constructor() {
       // this.dataOpcionSistema = [];       
        this.dataDetalle = [];
        this.dataBandeja = [];
        this.gridOptionBandeja = null;
        this.init();
    }

    static get GET_FILTER_INP_NOMBRE() { return __elem('#txtFiltroNrOrden').value.trim(); }

    //static get GET_INP_DESCRIPCION() { return __elem('#txtOpcionSistema').value.trim(); }
    static get GET_CBX_ACTIVO() { return __elem('#cbx_activo').checked; }

    listarOpcionSistema() {
        var self = this;
        self.apiOpcionSistema(function (data) {
            console.log('Tipo OpcionSistema', data);
            self.dataOpcionSistema = data;
        });
    }

    initGrillaBandeja() {
        var self = this;

        var columnDefs = [
            {
                field: "Cliente_Id", hide: true
            },
            {
                headerName: "Nro Orden", field: "Nro_Orden", width: 120,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Fecha Orden", field: "Fecha", width: 180,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Nombre/Razón Social", field: "Nombre", width: 180,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Nombre de Contacto", field: "Nombre_Contacto", width: 180,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Dirección", field: "Direcion", width: 180,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Ciudad", field: "Ciudad", width: 180,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Télefono", field: "Telefono", width: 180,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            //{
            //    field: "Eventos",
            //    width: 60,
            //    filter: false,
            //    cellRenderer: 'actionsCellRenderer',
            //    resizable: true,
            //    //pinned: 'right'
            //},
        ];

        self.gridOptionBandeja = {
            defaultColDef: {
                sortable: true,
                filter: true,
                tooltipValueGetter: function (params) {
                    return params.value;
                }
            },
            suppressRowClickSelection: true,
            columnDefs: columnDefs,
            onRowDoubleClicked: function (e) {
                self.modalRegistro(e.data.Nro_Orden);
            },
            components: {
                actionsCellRenderer: actionsCellRenderer
            },
            localeText: {
                contains: 'contiene',
                notContains: 'no contiene',
                equals: 'igual a',
                notEqual: 'diferente de',
                startsWith: 'inicia con',
                endsWith: 'finaliza con',
                filterOoo: 'Filtrar...',
                clearFilter: 'Limpiar Filtro...',
                lessThan: 'Menor a',
                greaterThan: 'Mayor a',
                inRange: 'en el Rango',
                applyFilter: 'Aplicar filtro...',
                noRowsToShow: 'No se encontró información.',
                // for filter panel
                page: 'Página',
                more: 'más',
                to: '-',
                of: 'de',
                next: 'Siguiente',
                last: 'Final',
                first: 'Primera',
                previous: 'Anterior',
                loadingOoo: 'Cargando...',
            },
        }

        function actionsCellRenderer() { }

        actionsCellRenderer.prototype.init = function (params) {
            this.data = params.data;

            this.eGui = document.createElement('div');

            this.eGui.innerHTML = `
                <div class="flex align-items-center">
                    <button id="btnEditar" type="button" class="btn-icon theme-icon" title="Editar"><i class="fa fa-pencil-alt"></i></button>      
                </div>
            `;

            this.btnEditar = this.eGui.querySelector('#btnEditar');

            this.editar = function () {
                self.modalRegistro(this.data.OpcionId);
            };

            this.btnEditar.addEventListener('click', this.editar.bind(this));
        }

        actionsCellRenderer.prototype.getGui = function () {
            return this.eGui;
        };

        var gridDiv = __elem('#gridPedidoCliente');
        gridDiv.innerHTML = '';

        new agGrid.Grid(gridDiv, self.gridOptionBandeja);

        self.cargarDatosGrillaBandeja();
    }

    cargarDatosGrillaBandeja() {
        var self = this;
        //var dataDel = {
        //    CodigoTablaMaestra: PedidoCliente.GET_CBX_CODIGOTABLAMAESTRA
        //}

        var url = `../Pedido/PedidoClienteListar`;
        ajaxJSON('GET', url, null, function (response) {
            var data = response;
            console.log('Bandeja', data);

            if (data.length == 0) {
                data = [];
            }

            self.dataBandeja = data;

            var arr_grilla = [];
            self.dataBandeja.forEach(function (item, i) {
                arr_grilla.push({
                    Nro: (i + 1),

                    Nro_Orden: item.Nro_Orden,
                    Fecha: moment(item.Fecha).format("dd-MM-YYYY"),
                    Ciudad: item.Ciudad == null ? "Ninguno" : item.Ciudad,
                    Cliente_Id: item.Cliente_Id ,
                    Direcion: item.Direcion,
                    Nombre: item.Nombre,
                    Nombre_Contacto: item.Nombre_Contacto ,
                    Telefono: item.Telefono,
                });
            });

            self.gridOptionBandeja.api.setRowData(arr_grilla);
        });
    }

    filtrarGrillaBandeja() {
        var self = this;

        if (self.gridOptionBandeja != null) {

            var resultado_filtro = self.dataBandeja.filter(function (item) { return (item.Nro_Orden.toString().toLowerCase().indexOf(PedidoCliente.GET_FILTER_INP_NOMBRE) >= 0) });

            var arr_grilla = [];
            resultado_filtro.forEach(function (item, i) {
                arr_grilla.push({
                    Nro: (i + 1),

                    Nro_Orden: item.Nro_Orden,
                    Fecha: moment(item.Fecha).format("dd-MM-YYYY"),
                    Ciudad: item.Ciudad == null ? "Ninguno" : item.Ciudad,
                    Cliente_Id: item.Cliente_Id ,
                    Direcion: item.Direcion,
                    Nombre: item.Nombre,
                    Nombre_Contacto: item.Cliente_Id ,
                    Telefono: item.Direcion,
                });
            });

            self.gridOptionBandeja.api.setRowData(arr_grilla);
        } else {
            self.cargarDatosGrillaBandeja();
        }
    }

    //#Region Detalle
    initGrillaDetalle(nro_Orden = 0) {
        var self = this;
        var columnDefs = [
            {
                field: "nro_Orden", hide: true,
            },
            {
                headerName: "#", field: "Nro", width: 50,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Código", field: "Codigo", width: 100,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },

            {
                headerName: "Descripción", field: "Descripcion", width: 100,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },

            {
                headerName: "Cantidad", field: "Cantidad", width: 100,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Precio", field: "Precio", width: 100,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
            {
                headerName: "Total", field: "Total", width: 100,
                filter: 'agTextColumnFilter',
                resizable: true,
                filterParams: { applyButton: true, clearButton: true },
            },
          
        ];

        self.gridDetalle = {
            defaultColDef: {
                sortable: true,
                filter: true,
                tooltipValueGetter: function (params) {
                    return params.value;
                }
            },
            suppressRowClickSelection: true,
            //rowSelection: 'multiple',
            columnDefs: columnDefs,
            rowData: null,

            onFilterChanged: function () {
                console.log('onFilterChanged');
            },
            onFilterModified: function () {
                console.log('onFilterModified')
            },
            onSelectionChanged: function (e) {
                console.log(e);
            },
            components: {
                actionsCellRenderer: actionsCellRenderer
            },

            localeText: {
                contains: 'contiene',
                notContains: 'no contiene',
                equals: 'igual a',
                notEqual: 'diferente de',
                startsWith: 'inicia con',
                endsWith: 'finaliza con',
                filterOoo: 'Filtrar...',
                clearFilter: 'Limpiar Filtro...',
                lessThan: 'Menor a',
                greaterThan: 'Mayor a',
                inRange: 'en el Rango',
                applyFilter: 'Aplicar filtro...',
                //noRowsToShow: 'No se encontró información.',
                noRowsToShow: ' ',
                // for filter panel
                page: 'Página',
                more: 'más',
                to: '-',
                of: 'de',
                next: 'Siguiente',
                last: 'Final',
                first: 'Primera',
                previous: 'Anterior',
                loadingOoo: 'Cargando...',
            }
        }

        function actionsCellRenderer() { }

        actionsCellRenderer.prototype.init = function (params) {
            this.data = params.data;

            //var nivel = this.data.Nivel;

            this.eGui = document.createElement('div');

            this.eGui.innerHTML = `
                <div class="flex align-items-center">
                    <button id="btnEliminar" type="button" class="btn btn-calendario btn-default btn--eliminar" title="Eliminar"><i class="fa fa-trash" style="font-size: 10px;"></i></button>   
                </div>
            `;

            this.btnEliminar = this.eGui.querySelector('#btnEliminar');

            this.eliminar = function () {
                //self.modalPrograma(this.data.ProgramaId);
                self.removerItemGrillaDetallePrograma(this.data.Nro);
            };

            this.btnEliminar.addEventListener('click', this.eliminar.bind(this));
        }

        actionsCellRenderer.prototype.getGui = function () {
            return this.eGui;
        };

        var gridDiv = __elem('#gridDetalles');
        gridDiv.innerHTML = '';

        new agGrid.Grid(gridDiv, self.gridDetalle);


       // self.cargarDatosGrillaDetalle();
    }

        cargarDatosGrillaDetalle() {
            var self = this;

            var arrGrilla = self.dataDetalle.map(function (item, i) {
                //var turno = self.
                return {
                    Nro: (i + 1),
                    Codigo: item.Codigo,
                    Descripcion: item.Descripcion,
                    Precio: item.Precio,
                    Cantidad: item.Cantidad,
                    Total: item.Total,
                    Total_General: item.Total_General,
                    Nro_Orden: item.Nro_Orden
                }
            });

            self.dataDetalle = arrGrilla;
            self.gridDetalle.api.setRowData((self.dataDetalle || []));
            __elem('#txtTotalSumado').value = self.dataDetalle[0].Total_General.toString();
        }

    //#EndRegion
    modalRegistro(RegistroId = 0) {
        var self = this;
        var titleModal = (`${RegistroId == 0 ? `` : ``} Confirmación del Pedido`);

        var objDataRow = null;
        if (RegistroId > 0) {
            var buscarRegistro = self.dataBandeja.filter(function (item) { return item.Nro_Orden.toString().trim() == RegistroId.toString().trim() });
            if (buscarRegistro.length == 0) {
                swal({
                    text: `Registro no válido.`,
                    icon: "warning",
                    button: "OK",
                });
                return;
            }

            objDataRow = buscarRegistro[0];
        }


        var html_body = `
         <div class="row">
                <div class="col-md-12 mt-4px mb-4px">
                    <div class="container-grid mt-16px">
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="i-block title">Pedido</h4>
                            </div>
                        </div>

                        <div class="container-grid mt-8px">
                            <div id="gridDetalles" style="height: 150px; width:100%" class="ag-theme-balham"></div>
                        </div>
                    </div>
                </div>   

                <div class="col-md-12 mt-4px mb-4px">
                    <div class="row">

                            <div class="col-md-4">
                                <div class="input-group">
                                    <label class="flex align-items-center mt-4px">
                                        <input class="m-0-force" type="checkbox" id="cbx_activo">
                                        <span class="ml-4px">CONFIRMADO</span>
                                    </label>
                                </div>                              
                            </div>

                            <div class="col-md-4">
                                <div class='input-group date'>
                                        <input type='text' class="form-control" id='dtpFechaConfirmacion' />
                                        <label class="input-group-addon" for='dtpFechaConfirmacion'>
                                        <span class="glyphicon glyphicon-calendar"></span>
                                        </label>
                                </div>
                            </div>

                         <div class="col-md-1">
                            <Label for="">TOTAL</Label>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control" id="txtTotalSumado" disabled />
                        </div>

                    </div>
                </div>

                <div class="col-md-12 mt-4px mb-4px">
                    <div class="row">      
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Comentarios :</label>
                                <textarea class="form-control" type="text" rows="3" id="observacion_comentario" maxlength="2000"></textarea>
                            </div>
                        </div>                         
                    </div>
                </div>


            </div>
        `;

        var html_footer = `<button id="btnGrabar" type="button" class="btn btn-success">Grabar</button>`;

        loadModalCustom(titleModal, html_body, html_footer, 'Cerrar',1, function () {
            self.dataDetalle = [];
            self.cargarDataRegistro(RegistroId, objDataRow);

            $('#dtpFechaConfirmacion').datetimepicker({
                format: 'DD/MM/YYYY',
                locale: 'es',
                defaultDate: moment()
            });
            listener('#btnGrabar', 'click', function () { self.grabarRegistro(RegistroId); });
        });
    }

    //apiObtenerDetallePedido(RegistroId,callback) {
    //    ajax('GET',`../Pedido/DetallePedidoListar?nro_Orden=${RegistroId}`, null, function (response) {
    //        var data = response;
    //        if (!data) return;

    //        console.log(data);
    //        var detallePrograma = data;
    //        if (detallePrograma.length == 0) return;

    //        self.dataDetalle = [];

    //        detallePrograma.forEach(function (item) {
    //            var objItem = {
    //                Codigo: item.Codigo,
    //                Descripcion: item.Descripcion,
    //                Precio: item.Precio,
    //                Cantidad: item.Cantidad,
    //                Total: item.Total,
    //                Total_General: item.Total_General,
    //                Nro_Orden: item.Nro_Orden                   
    //            }

    //            self.dataDetalle.push(objItem);
               
    //        });
    //    });
    //}

        cargarDataRegistro(RegistroId, objDataRow) {
            var self = this;
            self.initGrillaDetalle();
            //var comboOpcionAsociada = loadCombo('#ddlOpcionAsociada', null, self.dataOpcionSistema, function (value) { }, '--Seleccione--', true, 'Descripcion', 'OpcionId');
            if (RegistroId > 0) {

                apiObtenerPedidoDetalle(RegistroId, function (response) {
                   
                    var detallePrograma = response;
                    console.log(detallePrograma);
                    if (detallePrograma.length == 0) return;

                    self.dataDetalle = [];

                    detallePrograma.forEach(function (item) {
                        var objItem = {
                            Codigo: item.Codigo,
                            Descripcion: item.Descripcion,
                            Precio: item.Precio,
                            Cantidad: item.Cantidad,
                            Total: item.Total,
                            Total_General: item.Total_General,
                            Nro_Orden: item.Nro_Orden                   
                        }

                        self.dataDetalle.push(objItem);
               
                    });
                    self.cargarDatosGrillaDetalle();
                });
                
               // 
              //  self.cargarDatosGrillaDetalle();
            //    comboOpcionAsociada._setValue(objDataRow.AsociacionPadre == null ? "" : objDataRow.AsociacionPadre.toString().trim());

                //objDataRow.Descripcion;
                //__elem('#txtRutaPagina').value = "";//objDataRow.URL;
                ////__elem('#txtOpcionAsociada').value = objDataRow.AsociacionPadre;
                //__elem('#cbx_activo').checked = 1;//objDataRow.Activo;
                //__elem('#txtRutaPagina').disabled = true;
            } else {
                __elem('#cbx_activo').checked = true;
                __elem('#cbx_activo').disabled = true;

            }
        }

        validarRegistro(RegistroId) {
            var data = {
                OpcionId: RegistroId,
                Descripcion: PedidoCliente.GET_INP_DESCRIPCION,
                URL: PedidoCliente.GET_INP_URL,
                AsociacionPadre: PedidoCliente.GET_CBX_ASOCIACIONPADRE,
                Activo: PedidoCliente.GET_CBX_ACTIVO
            }

            for (var key in data) {
                if (key != "Valor") {
                    var val = data[key];
                    if (val == undefined || val == null || val.toString().trim().length == 0) return { result: false, message: "Los campos indicados con (*) son obligatorios." };
                }
            }

            return { result: true, data: data };
        }

        grabarRegistro(RegistroId) {
            var self = this;
            var objData = self.validarRegistro(RegistroId);
            if (!objData.result) {
                swal({
                    text: objData.message,
                    icon: "warning",
                    button: "OK",
                });

                return;
            }

            var texto = (RegistroId == 0 ? 'registrar' : 'actualizar');
            var url = (RegistroId == 0 ? `../Mantenimiento/RegistrarOpcionSistema` : `../Mantenimiento/ActualizarOpcionSistema`);

            swalConfirm(`¿Confirma ${texto} el rol?`, function (value) {
                ajaxJSON('POST', url, objData.data, function (data) {
                    if (data > 0) {
                        self.cargarDatosGrillaBandeja();
                        hideModal();

                        swal({
                            text: `La Opción del Sistema fue ${(RegistroId == 0 ? `registrado` : `actualizado`)} con éxito.`,
                            icon: "success",
                            button: "OK",
                        });
                        return;
                    }
                });
            });
        }

        init() {
            var self = this;
            self.initGrillaBandeja();
           // self.listarOpcionSistema();

            // listener('#btnNuevo', 'click', function (e) { self.modalRegistro(); });
            listener('#btnBuscar', 'click', function (e) { self.filtrarGrillaBandeja(); });
            listener('#btnLimpiar', 'click', function (e) { self.cargarDatosGrillaBandeja(); });
        }

        //APIS
        apiOpcionSistema(callback = function () { }) {
            var url = `../Mantenimiento/ListarOpcionSistemas`
            ajaxJSON('GET', url, null, function (response) {
                var data = response;
                callback(data);
            });
        }
    }

    (function () {
        new PedidoCliente();
    })(document);