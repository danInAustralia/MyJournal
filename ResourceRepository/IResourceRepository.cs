using ResourceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ResourceRepository
{
    public interface IResourceRepository
    {
        int SaveFile();

        int AddTagToFile(String md5, Tag tag);

        int AddToAlbum(String albumName, Resource resource);
    }
}
