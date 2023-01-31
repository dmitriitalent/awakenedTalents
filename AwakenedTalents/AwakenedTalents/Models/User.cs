using Microsoft.VisualBasic;

namespace AwakenedTalents.Models
{
    public class User
    {
        public string Id { get; set; }
        public TeacherProfile? TeacherProfile { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsEmailConfirmed { get; set; } = false;
        public int Reputation { get; set; } = 0;
        public string FullName { get; set; } = "";
        public DateTime RegistrationDate { get; set; }
        public string ImagePath { get; set; }
        public ICollection<UserRequest> UserRequests { get; set; }
        public User()
        {
            UserRequests = new List<UserRequest>();
        }
    }
}
