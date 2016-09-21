using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyJournal.Startup))]
namespace MyJournal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
