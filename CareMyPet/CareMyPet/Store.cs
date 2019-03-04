using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace CareMyPet
{
    public class Store : DatabaseEntity
    {
        public int StoreID { get; set; }
        public string StoreName { get; set; }
        public string Description { get; set; }
        public string ActivityTime { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }


        private static readonly Column[] columns = {
            new Column("StoreID",ColumnType.PRIMARY_KEY),
            new Column("StoreName",ColumnType.STRING),
            new Column("Description",ColumnType.STRING),
            new Column("ActivityTime",ColumnType.STRING),
            new Column("City",ColumnType.STRING),
            new Column("Address",ColumnType.STRING),
            new Column("Phone",ColumnType.STRING)
        };

        public List<Store> GetStores()
        {
            return GetList<Store>(dr => new Store()
            {
                StoreID = dr.GetInt32(0),
                StoreName = dr.GetString(1),
                Description = dr.GetStringOrNull(2),
                ActivityTime = dr.GetStringOrNull(3),
                City = dr.GetStringOrNull(4),
                Address = dr.GetStringOrNull(5),
                Phone = dr.GetStringOrNull(6)
            });
        }

        public bool AddNewStore(string storeName, string description, string activityTime, string city, string address, string phone)
        {
            if (IsStoreExist(storeName, city, address))
                return false;
            return Insert(GetNewStoreParameters(storeName, description, activityTime, city, address, phone).ToArray());
        }

        public bool IsStoreExist(string storeName, string city, string address)
        {
            using (SqlConnection conn = new SqlConnection(DBHelper.CONN_STRING))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(SelectStoresSQL(), conn))
                {
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            StoreName = dr.GetString(0);
                            City = dr.GetString(1);
                            Address = dr.GetString(2);
                            if (StoreName == storeName && City == city && Address == address)
                                return true;
                            if (StoreName != storeName && City == city && Address == address)
                                return true;
                            return false;
                        }
                    }
                }
            }
            return false;
        }

        private List<SqlParameter> GetNewStoreParameters(string storeName, string description, string activityTime, string city, string address, string phone)
        {
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@StoreName", storeName));
            parameters.Add(new SqlParameter("@Description", description));
            parameters.Add(new SqlParameter("@ActivityTime", activityTime));
            parameters.Add(new SqlParameter("@City", city));
            parameters.Add(new SqlParameter("@Address", address));
            parameters.Add(new SqlParameter("@Phone", phone));
            foreach (SqlParameter param in parameters)
            {
                if (param.Value == null)
                    param.Value = DBNull.Value;
            }
            return parameters;
        }

        protected override Column[] Columns => columns;

        protected override string TableName => "Stores";

        protected override Column PrimaryKey => Columns[0];
    }
}
