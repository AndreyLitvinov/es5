using es5.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace es5.Repository
{
    public interface IQuestionsRepository
    {
        int LoadQuestions();
        Question GetNext(int number);
    }
}
