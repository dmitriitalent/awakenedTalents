using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AwakenedTalents.Models
{
    public class Image
    {
        [Key]
        [ForeignKey("Subject")]
        public int Id { get; set; }
        public string Name { get; set; }
        public Subject Subject { get; set; }

    }
}
