namespace AwakenedTalents.Models
{
    public class RequestType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public ICollection<UserRequest> UserRequests { get; set; }
        public RequestType() 
        { 
            UserRequests = new List<UserRequest>();
        }
    }
}
