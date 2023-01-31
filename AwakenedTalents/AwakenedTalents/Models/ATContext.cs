using Microsoft.EntityFrameworkCore;

namespace AwakenedTalents.Models
{
    public class ATContext : DbContext
    {
        public DbSet<Subject> Subjects { get; set; } = null!;
        public DbSet<Image> Images { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<TeacherProfile> TeacherProfile { get; set; } = null!;
        public DbSet<UserRequest> UserRequests { get; set; } = null!;
        public DbSet<RequestType> RequestTypes { get; set; } = null!;
        public ATContext(DbContextOptions<ATContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}
