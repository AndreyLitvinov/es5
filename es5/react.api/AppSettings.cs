using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace react.api{
    public class AppSettings
    {
        public string Key {get; set;}  // ключ для шифрации
        public int ExpiresMinutes {get; set;}  // ключ для шифрации
    }
}