using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AwakenedTalents.Migrations
{
    /// <inheritdoc />
    public partial class AddLinkRequestTypeUserRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestType",
                table: "UserRequests");

            migrationBuilder.AddColumn<int>(
                name: "RequestTypeId",
                table: "UserRequests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RequestTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserRequests_RequestTypeId",
                table: "UserRequests",
                column: "RequestTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRequests_RequestTypes_RequestTypeId",
                table: "UserRequests",
                column: "RequestTypeId",
                principalTable: "RequestTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRequests_RequestTypes_RequestTypeId",
                table: "UserRequests");

            migrationBuilder.DropTable(
                name: "RequestTypes");

            migrationBuilder.DropIndex(
                name: "IX_UserRequests_RequestTypeId",
                table: "UserRequests");

            migrationBuilder.DropColumn(
                name: "RequestTypeId",
                table: "UserRequests");

            migrationBuilder.AddColumn<string>(
                name: "RequestType",
                table: "UserRequests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
