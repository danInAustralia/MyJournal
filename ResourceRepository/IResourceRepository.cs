using Microsoft.Azure.Documents;
using ResourceModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IResourceRepository
    {
        void SaveFile(Stream fileStream, String originalName);

        int AddTagToFile(String md5, Tag tag);

        int AddToAlbum(String albumName, ResourceModel.Resource resource);

        Task<Document> AddAlbum(Album album);

        List<Album> GetAlbums(Expression<Func<Album, bool>> predicate);
    }
}
