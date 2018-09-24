using Microsoft.EntityFrameworkCore.Migrations;

namespace react.api.Migrations
{
    public partial class Reader : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Readers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Readers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Readers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Readers");
        }
    }
}
