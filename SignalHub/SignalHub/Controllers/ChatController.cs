using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalHub.Hubs;

namespace SignalHub.Controllers
{
    [Route("api/chat")]
    [ApiController]
    public class ChatController : Controller
    {
        private readonly IHubContext<MessageHub> hubContext;

        public ChatController(IHubContext<MessageHub> hubContext)
        {
            this.hubContext = hubContext;
        }
        [Route("send")]                                           //path looks like this: https://localhost:44379/api/chat/send
        [HttpPost]
        public IActionResult SendRequest([FromBody] MessageModel msg)
        {
            hubContext.Clients.All.SendAsync("ReceiveOne", msg.messageID, msg.messageText);
            return Ok();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
