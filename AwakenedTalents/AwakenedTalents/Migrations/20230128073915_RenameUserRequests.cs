using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AwakenedTalents.Migrations
{
    /// <inheritdoc />
    public partial class RenameUserRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRequests_Users_UserId",
                table: "UserRequests");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserRequests",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRequests_Users_UserId",
                table: "UserRequests",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRequests_Users_UserId",
                table: "UserRequests");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserRequests",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRequests_Users_UserId",
                table: "UserRequests",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
