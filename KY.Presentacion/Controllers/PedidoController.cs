using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KY.AccesoNegocio;

namespace KY.Presentacion.Controllers
{
    public class PedidoController : Controller
    {
        PedidoCn PedidoCn = new PedidoCn();

        public ActionResult Index()
        {         
                return View();
        }
        // GET: Pedido
        [HttpGet]
        public JsonResult PedidoClienteListar()
        {
           
            Array PedidoClienteLista = PedidoCn.OrdersClienteListar();

            if (PedidoClienteLista != null && PedidoClienteLista.Length > 0)
                return Json(PedidoClienteLista, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult DetallePedidoListar(int nro_Orden)
        {

            Array DetallePedidoLista = PedidoCn.DetallePedidoListar(nro_Orden);

            if (DetallePedidoLista != null && DetallePedidoLista.Length > 0)
                return Json(DetallePedidoLista, JsonRequestBehavior.AllowGet);
            else
                return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}