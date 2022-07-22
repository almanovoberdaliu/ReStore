using Microsoft.AspNetCore.Mvc;

namespace ReStore_app.Controllers
{
    public class BaseApiController
    {
        [ApiController]
        [Route("[controller]")]
        public class BaseeApiController : ControllerBase
        {

        }
    }
}