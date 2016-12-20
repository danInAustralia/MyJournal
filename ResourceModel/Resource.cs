using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceModel
{
    public class Resource
    {
        public virtual String Md5 { get; set; }
        //public String Path { get; set; }
        public virtual String OriginalFileName { get; set; }
        public virtual ResourceType Type { get; set; }
        public virtual List<Tag> Tags { get; set; }
        public virtual String Description { get; set; }
        public virtual DateTime Date { get; set; }
        public virtual User Owner { get; set; }
    }


}
