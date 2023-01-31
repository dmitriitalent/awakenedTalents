using AwakenedTalents.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AwakenedTalents.Controllers
{
	public class SubjectController : Controller
	{
        IWebHostEnvironment env;
        ATContext db;
		public SubjectController(IWebHostEnvironment _env, ATContext _db) 
		{
            env = _env;
            db = _db;
		}

		private IList<SubjectResponse> CreateSubjectResponse(IList<Subject> db_subjects)
		{
            IList<SubjectResponse> subjects = new List<SubjectResponse>();
            foreach (Subject db_subject in db_subjects)
            {
                SubjectResponse subject = new SubjectResponse();
                subject.Id = db_subject.Id;
                subject.Name = db_subject.Name;
				subject.RouterName = db_subject.RouterName;
                subject.Description = db_subject.Description;
				subject.TeachersCount = db_subject.TeachersCount;
                subject.Type = db_subject.Type;
                subject.PicName = db_subject.Image.Name;
                subjects.Add(subject);
            }
			return subjects;

        }

		public string GetSubjects(string subjectType)
		{
			Console.WriteLine(subjectType);
			IList<Subject> db_subjects;
			IList<SubjectResponse> subjects;
            if (subjectType != "undefined") 
			{
				db_subjects = db.Subjects.Include("Image").Where(sub => sub.Type == subjectType).ToList();
                subjects = CreateSubjectResponse(db_subjects);
            }
			else
			{
				db_subjects = db.Subjects.Include("Image").ToList();
                subjects = CreateSubjectResponse(db_subjects);
            }
			string response = Newtonsoft.Json.JsonConvert.SerializeObject(subjects);
			return response;
		}
		
		public string AddSubject(string name, string RouterName, string description, int teachersCount, string type)
		{
			Subject subject = new Subject();
			subject.Name = name;
			subject.RouterName = RouterName;
			subject.Description = description;
			subject.TeachersCount = teachersCount;
			subject.Type = type;

			db.Subjects.Add(subject);
			db.SaveChanges();

			return subject.Id.ToString();
		}

		public string UploadFile(IFormFile file)
		{
			try
			{
				return "OK";
			}
			catch (Exception ex) { return ex.ToString(); }
			
		}
	}

	
}
