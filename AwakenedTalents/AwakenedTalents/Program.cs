using AwakenedTalents.Models;
using Microsoft.AspNetCore.Routing.Patterns;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Newtonsoft;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
string connection = @"Server=localhost;Database=AwakenedTalents;Trusted_Connection=True;TrustServerCertificate=true";
builder.Services.AddDbContext<ATContext>(options => options.UseSqlServer(connection));
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

string DevelopmentAllowOrigins = "DevelopmentAllowOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: DevelopmentAllowOrigins,
                        policy =>
                        {
                            policy.WithOrigins("http://localhost:52697", "http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                        });
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(DevelopmentAllowOrigins);

app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
