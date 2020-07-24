using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KY.AccesoDatos.Implementacion;

namespace KY.AccesoNegocio
{
    public class PedidoCn
    {
        PedidoImpl PedidoImpl = new PedidoImpl();
        public Array OrdersClienteListar()
        {
            return PedidoImpl.OrdersClienteListar();
        }

        public Array DetallePedidoListar(int nro_Orden)
        {
            return PedidoImpl.DetallePedidoListar(nro_Orden);
        }
    }
}
