using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KY.AccesoDatos.Interfaz
{
    interface PedidoInte
    {
        Array OrdersClienteListar();
        Array DetallePedidoListar(int nro_Orden);
    }
}
