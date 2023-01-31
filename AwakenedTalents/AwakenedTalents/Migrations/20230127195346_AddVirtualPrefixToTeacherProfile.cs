using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AwakenedTalents.Migrations
{
    /// <inheritdoc />
    public partial class AddVirtualPrefixToTeacherProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubjectTeacherProfile",
                columns: table => new
                {
                    SubjectsId = table.Column<int>(type: "int", nullable: false),
                    TeacherProfilesId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectTeacherProfile", x => new { x.SubjectsId, x.TeacherProfilesId });
                    table.ForeignKey(
                        name: "FK_SubjectTeacherProfile_Subjects_SubjectsId",
                        column: x => x.SubjectsId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectTeacherProfile_TeacherProfile_TeacherProfilesId",
                        column: x => x.TeacherProfilesId,
                        principalTable: "TeacherProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubjectTeacherProfile_TeacherProfilesId",
                table: "SubjectTeacherProfile",
                column: "TeacherProfilesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubjectTeacherProfile");
        }
    }
}
