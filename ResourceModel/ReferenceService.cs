using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Drawing.Imaging;

namespace ResourceModel
{
    public class ReferenceService
    {
        public static bool IsValidImage(Stream stream)
        {
            try
            {
                Image.FromStream(stream);
            }
            catch (ArgumentException)
            {
                return false;
            }
            return true;
        }

        //we init this once so that if the function is repeatedly called
        //it isn't stressing the garbage man
        private static Regex r = new Regex(":");

        //retrieves the datetime WITHOUT loading the whole image
        public static DateTime GetDateTakenFromImage(Stream stream)
        {

            using (Image myImage = Image.FromStream(stream, false, false))
            {
                PropertyItem propItem = myImage.GetPropertyItem(36867);
                string dateTaken = r.Replace(Encoding.UTF8.GetString(propItem.Value), "-", 2);
                return DateTime.Parse(dateTaken);
            }
        }
    }
}
