
namespace AwakenedTalents.Models
{
    public class Subject
    {
        public Subject() {
            TeacherProfiles = new List<TeacherProfile>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string RouterName { get; set; }
        public string Description { get; set; }
        public int TeachersCount { get; set; }
        public string Type { get; set; }
        public virtual ICollection<TeacherProfile> TeacherProfiles { get; set; }
        public Image Image { get; set; }
    }

    public class SubjectResponse : Subject
    {
        public string PicName { get; set; }
    }
}
