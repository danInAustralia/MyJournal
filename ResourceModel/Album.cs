using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceModel
{
    public class Album
    {
        public virtual int ID { get; set; }
        public virtual String Name { get; set; }
        public virtual String Description { get; set; }

        public virtual DateTime AlbumDate { get; set; }
        public virtual IList<Resource> Resources { get; set; }
        public virtual User Owner { get; set; }
    }
}
