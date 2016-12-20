﻿using FluentNHibernate.Mapping;
using ResourceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceRepository.Mapping
{
    public class AlbumMap : ClassMap<Album>
    {
        public AlbumMap()
        {
            Table("Album");
            Id(x => x.ID).Column("AlbumID").GeneratedBy.Identity();
            Map(x => x.Name).Column("Name");
            Map(x => x.Description).Column("Description");
            HasManyToMany<Resource>(x => x.Resources).Table("Album_X_Resource")
                .ParentKeyColumn("AlbumID")
                .ChildKeyColumn("ResourceID")
                .Not.LazyLoad();
        }
    }
}
