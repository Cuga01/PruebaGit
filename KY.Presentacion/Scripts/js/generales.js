function apiObtenerPedidoDetalle(RegistroId, callback = function () { }) {
    var url = `../Pedido/DetallePedidoListar?nro_Orden=${RegistroId}`
    ajaxJSON('GET', url, null, function (response) {
        var data = response;
        callback(data);
    });
}