using es5.api.Infrastructure;
using es5.api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es5.Repository
{
    public class QuestionsRepository: IQuestionsRepository
    {
        readonly TestContext context;
        string errorMessage = string.Empty;
        ISession Session { get; set; }

        public QuestionsRepository(TestContext context, IServiceProvider services)
        {
            this.context = context;
            Session = services.GetRequiredService<IHttpContextAccessor>()?
              .HttpContext.Session;
        }

        /// <summary>
        /// load to session part questions
        /// </summary>
        /// <returns>count</returns>
        public int LoadQuestions()
        {
            var random = new Random();
            var allQuestionsCount = context
                .Questions
                .Count();

            var questions = context
                .Questions
                .OrderBy(x => random.Next(allQuestionsCount))
                .Take(random.Next(3, allQuestionsCount))
                .ToList();

            Session.SetJson("questions", questions);
            return questions.Count;
        }

        /// <summary>
        /// get question by number in session
        /// </summary>
        /// <param name="number">nubmer question</param>
        /// <returns>question</returns>
        public Question GetNext(int number)
        {
            // нужно брать из сессии
            return Session.GetJson<List<Question>>("questions")[number];
        }
    }
}
