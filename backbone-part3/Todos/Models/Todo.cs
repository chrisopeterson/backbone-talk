using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace Todos.Models
{
    public class Todo
    {
        [Key]
        public int TodoID { get; set; }
        [Required, Column(TypeName = "text")]
        public string Description { get; set; }
        public int Order { get; set; }
        public bool IsComplete { get; set; }
    }

    public class TodoDB : DbContext
    {
        public DbSet<Todo> Todos { get; set; }
    }
}