using AwakenedTalents.Migrations;
using AwakenedTalents.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Console;
using Newtonsoft.Json;

namespace AwakenedTalents.Controllers
{
	public class UserRequestsController : Controller
	{
		ATContext db;
		public UserRequestsController(ATContext _db) {
			db = _db;
		}
		public string GetUserRequests()
		{
			IList<UserRequest> userRequests = db.UserRequests.Include(ur => ur.User).ToList();
			string userRequestsJson = Newtonsoft.Json.JsonConvert.SerializeObject(
				userRequests, 
				Newtonsoft.Json.Formatting.Indented, 
				new JsonSerializerSettings() {ReferenceLoopHandling = ReferenceLoopHandling.Ignore});
			return userRequestsJson;
		}
		public string Delete(int Id)
		{
			db.UserRequests.Remove(db.UserRequests.FirstOrDefault(req => req.Id == Id));
			db.SaveChanges();
			return "OK";
		}
		public string Allow(int Id)
		{
			UserRequest userRequest = db.UserRequests
				.Include(ur => ur.RequestType)
				.Include(ur => ur.User)
				.ThenInclude(u => u.TeacherProfile)
				.FirstOrDefault(ur => ur.Id == Id)!;
			string requestType = userRequest.RequestType.Type;

            IDictionary<string, string> jsonData = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, string>>(userRequest.JsonData)!;
            if (requestType == "AddTeacherRequest")
			{

                TeacherProfile teacherProfile = db.Users.FirstOrDefault(user=>user.Id == userRequest.User.Id).TeacherProfile!;
				if (teacherProfile == null)
				{
					TeacherProfile tprofile = new TeacherProfile();
                    Subject subject = db.Subjects.FirstOrDefault(s => s.RouterName == jsonData["SubjectType"]);
					tprofile.User = userRequest.User;
					tprofile.Subjects.Add(subject);
					tprofile.Description = jsonData["Description"];
                    db.TeacherProfile.Add(tprofile);
                    db.SaveChanges();
                    return "OK";
                }
				else
				{
					Subject subject = db.Subjects.FirstOrDefault(s => s.RouterName == jsonData["SubjectType"])!;
					teacherProfile.Subjects.Add(subject);
					teacherProfile.Description = jsonData["Description"];
					try
					{
                        db.SaveChanges();
                    }
					catch (Exception)
					{
                        teacherProfile.Subjects.Remove(subject);
						return "Пользователь уже преподаёт этот предмет";
					}
					
					return "OK";
                }
			}

                return "OK";
		}
	}
}
