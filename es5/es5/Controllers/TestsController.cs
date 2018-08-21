using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using es5.api.Models;
using es5.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace es5.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestsController : ControllerBase//, ITestService
    {
        IQuestionsRepository questionsRepository;

        public TestsController(IQuestionsRepository questionsRepository)
        {
            this.questionsRepository = questionsRepository;
        }

        [EnableCors("SiteCorsPolicy")]
        [HttpGet]
        [HttpGet("/TestInit")]
        public ActionResult<int> TestInit()
        {
            
            return questionsRepository.LoadQuestions();
        }

        // возможно тут нужна другая модель, 
        [EnableCors("SiteCorsPolicy")]
        [HttpGet("/GetNext/{number}")]
        public ActionResult<Question> GetNext(int number)
        {
            return questionsRepository.GetNext(number);
        }
        /*
        // GET api/values
        [EnableCors("SiteCorsPolicy")]
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }


        // GET api/values/5
        [EnableCors("SiteCorsPolicy")]
        [HttpGet("{number}")]
        public ActionResult<string> Get(int number)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */

    }
}
