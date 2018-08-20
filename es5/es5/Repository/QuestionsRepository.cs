using es5.api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es5.Repository
{
    public class QuestionsRepository: IQuestionsRepository
    {
        private readonly TestContext context;
        string errorMessage = string.Empty;

        public QuestionsRepository(TestContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// load to session part questions
        /// </summary>
        /// <returns>count</returns>
        public int LoadQuestions()
        {
            // нужно сохранять еще в сессию, и нужен выбор случайных
            return context.Questions.AsQueryable().Count();
        }

        /// <summary>
        /// get question by number in session
        /// </summary>
        /// <param name="number">nubmer question</param>
        /// <returns>question</returns>
        public Question GetNext(int number)
        {
            // нужно брать из сессии
            return context.Questions.Find(number);
        }
    }
}
