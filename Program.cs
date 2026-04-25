using Microsoft.EntityFrameworkCore;
using WebApiRopa.Models.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TiendaRopaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// --- CAMBIO AQUÍ: Swagger habilitado para producción ---
app.UseSwagger();
app.UseSwaggerUI();
// -------------------------------------------------------

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();