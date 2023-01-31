using AwakenedTalents.Models;
using AwakenedTalents.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using AwakenedTalents.Migrations;
using Newtonsoft;

namespace AwakenedTalents.Controllers
{
	public class TeacherController : Controller
	{
		IWebHostEnvironment env;
		ATContext db;
		public TeacherController(IWebHostEnvironment _env, ATContext _db)
		{
			env = _env;
			db = _db;
		}

		public string GetTeacherProfile(string authtoken)
		{
			if (string.IsNullOrEmpty(authtoken))
			{
				return "authtoken is empty";
			}
			TeacherProfile teacherProfile = db.TeacherProfile.FirstOrDefault(elem => elem.Id == Crypt.Decrypt(authtoken, Crypt.cryptKey))!;
			var json = JsonConvert.SerializeObject(teacherProfile);
			Response.StatusCode = 200;
			return json;
		}
		/*       https://localhost:7289/Teacher/GetTeachers?SubjectRouteName=Physics */

		
        public string GetTeachers(string SubjectRouteName)
		{
			Subject subject = db.Subjects.Include(s => s.TeacherProfiles).ThenInclude(tp => tp.User).FirstOrDefault(s => s.RouterName == SubjectRouteName)!;
			IList<TeacherProfile> teachers = subject.TeacherProfiles.ToList();

			string response = Newtonsoft.Json.JsonConvert.SerializeObject(
				teachers, 
				Formatting.Indented, 
				new JsonSerializerSettings { 
					ReferenceLoopHandling = ReferenceLoopHandling.Ignore 
				}
			);

			return response;
		}
		public string AddTeacherRequest(string FullName, string Description, string Subject, User User)
		{
			if(User.TeacherProfile != null) 
			{ 
				foreach (Subject subject in User.TeacherProfile.Subjects)
				{
					if (subject.RouterName == Subject)
					{
						return "already teaching";
					} 
				}
            }

            UserRequest userRequest = new UserRequest();
			User user = db.Users.FirstOrDefault(u => u.Id == User.Id);
			userRequest.User = user;
			userRequest.RequestDescription = "Запрос на становление учителем.";
			userRequest.RequestType = new RequestType() { Type = "AddTeacherRequest" };

            IDictionary<string, string> data = new Dictionary<string, string>()
			{
				{ "Description", Description },
				{ "SubjectType", Subject }
			};
			string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(data);
			userRequest.JsonData = jsonData;
            user.FullName = FullName;
			db.UserRequests.Add(userRequest);
			db.SaveChanges();
			Response.StatusCode = 200;
			return "OK";
		}
		public string DeleteSubject(string profileId, string subjectRouterName)
		{
			TeacherProfile teacherProfile = db.TeacherProfile.Include(u => u.Subjects).FirstOrDefault(tp => tp.Id == profileId)!;
			Subject subject = db.Subjects.FirstOrDefault(s => s.RouterName == subjectRouterName)!;
			teacherProfile.Subjects.Remove(subject);
			db.SaveChanges();			
			return "OK";	
		}
	}
}
