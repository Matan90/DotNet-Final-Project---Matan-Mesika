using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace CareMyPet
{
    public class Adoption : DatabaseEntity
    {
        public int AdoptionID { get; set; }
        public string PetName { get; set; }
        public string PetRace { get; set; }
        public int PetAge { get; set; }
        public string Image { get; set; }
        public string Location { get; set; }
        public string LocationPhone { get; set; }

        protected static Column[] columns =
        {
            new Column("AdoptionID",ColumnType.PRIMARY_KEY),
            new Column("PetName", ColumnType.STRING),
            new Column("PetRace", ColumnType.STRING),
            new Column("PetAge", ColumnType.INT),
            new Column("Image", ColumnType.STRING),
            new Column("Location",ColumnType.STRING),
            new Column("LocationPhone",ColumnType.STRING)
        };

        public List<Adoption> GetAdoptions()
        {
            return GetList<Adoption>(dr => new Adoption()
            {
                AdoptionID = dr.GetInt32(0),
                PetName = dr.GetString(1),
                PetRace = dr.GetStringOrNull(2),
                PetAge = dr.GetInt32(3),
                Image = dr.GetStringOrNull(4),
                Location = dr.GetString(5),
                LocationPhone = dr.GetString(6),
            });
        }

        public Adoption GetLastAdoption()
        {
            Adoption lastAdoption = new Adoption();
            using (SqlConnection conn = new SqlConnection(DBHelper.CONN_STRING))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(SelectLastRowSQL(), conn))
                {
                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            lastAdoption.AdoptionID = dr.GetInt32(0);
                            lastAdoption.PetName = dr.GetStringOrNull(1);
                            lastAdoption.PetRace = dr.GetStringOrNull(2);
                            lastAdoption.PetAge = dr.GetInt32(3);
                            lastAdoption.Image = dr.GetStringOrNull(4);
                            lastAdoption.Location = dr.GetString(5);
                            lastAdoption.LocationPhone = dr.GetString(6);
                        }
                    }
                }
            }
            return lastAdoption;
        }

        protected override Column[] Columns => columns;

        protected override string TableName => "Adoptions";

        protected override Column PrimaryKey => Columns[0];
    }
}
