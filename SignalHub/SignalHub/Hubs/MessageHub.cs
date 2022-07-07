
using Microsoft.AspNetCore.SignalR;

namespace SignalHub.Hubs
{
    public class MessageHub:Hub
    {
        public async Task NewMessage(MessageModel msg)
        {
            await Clients.All.SendAsync("ReceiveOne", msg);
        }
    }
}
