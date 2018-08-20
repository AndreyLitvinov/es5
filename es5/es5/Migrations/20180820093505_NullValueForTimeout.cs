using Microsoft.EntityFrameworkCore.Migrations;

namespace es5.api.Migrations
{
    public partial class NullValueForTimeout : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Timeout",
                table: "Questions",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Timeout",
                table: "Questions",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
