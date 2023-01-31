namespace AwakenedTalents.Models
{
    public class UserRequest
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string JsonData { get; set; }
        public string RequestDescription { get; set; }
        public RequestType RequestType { get; set; }
    }
}
