using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es5.api.Models
{
    public class TestContext : DbContext
    {
        public TestContext(DbContextOptions<TestContext> options)
                   : base(options)
        { }

        public DbSet<Question> Questions { get; set; }
    }

    public class Question
    {
        public int QuestionId { get; set; }
        public string Text  { get; set; }
        public string Options { get; set; }
        public string Answers { get; set; }
        public int? Timeout { get; set; }
    }
}
