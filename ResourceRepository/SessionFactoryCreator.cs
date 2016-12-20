using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceRepository
{
    class SessionFactoryCreator
    {
        public static ISessionFactory CreateSessionFactory()
        {
            return Fluently.Configure()
                .Database(MsSqlConfiguration.MsSql2012.ConnectionString("Server=tcp:{database}.database.windows.net,1433;Initial Catalog=resources;Persist Security Info=False;User ID={username};Password={password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))//Data Source=s9kgsjykm8.database.windows.net;Initial Catalog=iiidCore;User ID=IIIDTest@s9kgsjykm8;Password=p@sswOrd;Trusted_Connection=False;Encrypt=True;Connection Timeout=30;"))
                .Mappings(x => x.FluentMappings.AddFromAssemblyOf<SessionFactoryCreator>())
                .BuildSessionFactory();
        }
    }
}
