using FluentNHibernate.Mapping;
using ResourceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceRepository.Mapping
{
    public class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("Users");
            Id(x => x.ID).Column("UserID").GeneratedBy.Identity();
            Map(x => x.UserName).Column("Username");
        }
    }
}
