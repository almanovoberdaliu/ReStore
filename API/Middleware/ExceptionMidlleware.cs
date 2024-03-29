using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace ReStore_app.Middleware
{
    public class ExceptionMidlleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMidlleware> _logger;
        public readonly IHostEnvironment _env ;
        public ExceptionMidlleware(RequestDelegate next, ILogger<ExceptionMidlleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;         
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType= "application/json";
                context.Response.StatusCode = 500;

                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title = ex.Message
                };

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);
            }

        }
    }
}