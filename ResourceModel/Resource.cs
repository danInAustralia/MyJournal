using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceModel
{
    public class Resource
    {
        public String Md5 { get; set; }
        public String OriginalFileName { get; set; }
        public MimeType Type;
        public List<Tag> Tags { get; set; }
    }


}
