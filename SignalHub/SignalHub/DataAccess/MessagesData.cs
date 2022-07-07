namespace SignalHub.DataAccess
{
    public class MessagesData
    {
        public List<MessageModel> GetMessages()
        {
            return new List<MessageModel>()
            {
                new MessageModel { messageID=1, messageText="Hi"},
                new MessageModel { messageID=1, messageText="Hello"},
                new MessageModel { messageID=1, messageText="Bye"}
            };

        }
    }
}
