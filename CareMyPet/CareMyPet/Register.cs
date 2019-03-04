using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Security.Cryptography;

namespace CareMyPet
{
    public class Register : DatabaseEntity
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Hash { get; set; }

        protected static Column[] columns =
        {
            new Column("FirstName",ColumnType.STRING),
            new Column("LastName",ColumnType.STRING),
            new Column("UserName",ColumnType.STRING),
            new Column("Hash",ColumnType.STRING)
        };

        public bool RegisterRequest(string firstName, string lastName, string userName, string password)
        {
            if (LoginCheck(userName))
                return false;
            return Insert(GetRegisterParameters(firstName, lastName, userName, password).ToArray());
        }


        public bool LoginCheck(string userName)
        {
            using (SqlConnection conn = new SqlConnection(DBHelper.CONN_STRING))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(SelectHashSQL(userName), conn))
                {
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        return dr.Read();
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

        private List<SqlParameter> GetRegisterParameters(string firstName, string lastName, string userName, string password)
        {
            string hashedPass = Convert.ToBase64String(GenerateSaltedHash(Encoding.UTF8.GetBytes(password), Encoding.UTF8.GetBytes(userName)));
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@Firstname", firstName));
            parameters.Add(new SqlParameter("@Lastname", lastName));
            parameters.Add(new SqlParameter("@Username", userName));
            parameters.Add(new SqlParameter("@Hash", hashedPass));
            foreach (SqlParameter param in parameters)
            {
                if (param.Value == null)
                    param.Value = DBNull.Value;
            }
            return parameters;
        }

        protected override Column[] Columns => columns;

        protected override string TableName => "Users";

        protected override Column PrimaryKey => Columns[0];
    }
}
