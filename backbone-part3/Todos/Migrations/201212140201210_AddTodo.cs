namespace Todos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTodo : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Todoes",
                c => new
                    {
                        TodoID = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false, unicode: false, storeType: "text"),
                        Order = c.Int(nullable: false),
                        IsComplete = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.TodoID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Todoes");
        }
    }
}
