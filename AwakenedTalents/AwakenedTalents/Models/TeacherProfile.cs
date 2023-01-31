using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AwakenedTalents.Models
{
	public class TeacherProfile
	{
		public TeacherProfile() {
			Subjects = new List<Subject>();
		}

        [Key]
        [ForeignKey("User")]
        public string Id { get; set; }
		public User User { get; set; }
		public virtual ICollection<Subject> Subjects { get; set; }
		public string Description { get; set; }
	}
}
