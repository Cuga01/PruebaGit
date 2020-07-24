using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KY.AccesoDatos.Interfaz;
using KY.Entidades;

namespace KY.AccesoDatos.Implementacion
{
    public class PedidoImpl : PedidoInte
    {
        NorthwindEntities dbNorthwind = new NorthwindEntities();

        public Array DetallePedidoListar(int nro_Orden)
        {
            try
            {
                var consulta = dbNorthwind.Usp_DetallePedidoListar(nro_Orden);
                return consulta.ToArray();
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public Array OrdersClienteListar()
        {
            try
            {
                var consulta = dbNorthwind.Usp_OrdersClienteListar();
                return consulta.ToArray();
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
    }
}
