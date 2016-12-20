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
        public int ID { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }

        public DateTime AlbumDate { get; set; }
        public List<Resource> Resources = new List<Resource>();
        public User Owner { get; set; }
    }
}
