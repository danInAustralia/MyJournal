using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Repository;
using System.IO;

namespace IntegrationTests
{
    [TestClass]
    public class IntegrationTests
    {
        [TestMethod]
        public void Test_Repository_Add_Tag_To_Resource()
        {
            ResourceRepository rr = new ResourceRepository();
            String filePath = @"D:\100APPLE\IMG_2231.JPG";
            FileStream stream = new FileStream(filePath, FileMode.Open);
        }
    }
}
