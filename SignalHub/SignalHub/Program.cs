using SignalHub.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(option => option.AddPolicy(
    "cors1",
    builder =>
    {
        builder.WithOrigins("http://localhost:5200");
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
        builder.AllowCredentials();
    }
    ));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseRouting();
app.UseCors("cors1");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<MessageHub>("/message");
});
app.UseHttpsRedirection();

//app.UseAuthorization();


app.Run();
