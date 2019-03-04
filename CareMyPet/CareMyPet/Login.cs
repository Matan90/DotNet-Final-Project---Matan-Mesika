using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CareMyPet
{
    public class Login : DatabaseEntity
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Hash { get; set; }

        protected static Column[] columns =
        {
            new Column("UserID", ColumnType.PRIMARY_KEY),
            new Column("Username", ColumnType.STRING),
            new Column("Hash", ColumnType.STRING)
        };

        public string LoginCheck(string userName, string password)
        {
            string hashedPass = Convert.ToBase64String(GenerateSaltedHash(Encoding.UTF8.GetBytes(password), Encoding.UTF8.GetBytes(userName)));

            using (SqlConnection conn = new SqlConnection(DBHelper.CONN_STRING))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(SelectHashSQL(userName), conn))
                {
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            Hash = dr.GetString(0);
                            if (Hash == hashedPass)
                                return Hash;
                        }
                        return null;
                    }
                }
            }
        }

        public string GetUsernameFromHash(string hash)
        {
            string unEncodedHash = Uri.UnescapeDataString(hash);
            using (  SqlConnection conn = new SqlConnection(DBHelper.CONN_STRING))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(SelectUserSQL(unEncodedHash),conn))
                {
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                            return Username = dr.GetString(0);
                        return "";

                    }
                }
            }
        }

        static byte[] GenerateSaltedHash(byte[] plainText, byte[] salt)
        {
            HashAlgorithm algorithm = new SHA256Managed();

            byte[] plainTextWithSaltBytes =
              new byte[plainText.Length + salt.Length];

            for (int i = 0; i < plainText.Length; i++)
            {
                plainTextWithSaltBytes[i] = plainText[i];
            }
            for (int i = 0; i < salt.Length; i++)
            {
                plainTextWithSaltBytes[plainText.Length + i] = salt[i];
            }

            return algorithm.ComputeHash(plainTextWithSaltBytes);
        }

        protected override Column[] Columns => columns;

        protected override string TableName => "Users";

        protected override Column PrimaryKey => Columns[0];


    }
}
