using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AwakenedTalents.Migrations
{
    /// <inheritdoc />
    public partial class AddRouterNameToSubjectModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "type",
                table: "Subjects",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "teachersCount",
                table: "Subjects",
                newName: "TeachersCount");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Subjects",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Subjects",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Subjects",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "RouterName",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RouterName",
                table: "Subjects");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Subjects",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "TeachersCount",
                table: "Subjects",
                newName: "teachersCount");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Subjects",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Subjects",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Subjects",
                newName: "id");
        }
    }
}
