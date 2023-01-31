using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AwakenedTalents.Migrations
{
    /// <inheritdoc />
    public partial class AddRequestTypeToUserRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RequestType",
                table: "UserRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestType",
                table: "UserRequests");
        }
    }
}
