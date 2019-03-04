using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareMyPet
{
    public class Hostel : DatabaseEntity
    {
        public int HostelID { get; set; }
        public string HostelImage { get; set; }
        public string HostelName { get; set; }
        public string AnimalsTypes { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }

        protected static Column[] columns =
        {
            new Column("HostelID", ColumnType.PRIMARY_KEY),
            new Column("HostelImage", ColumnType.STRING),
            new Column("HostelName", ColumnType.STRING),
            new Column("AnimalsTypes", ColumnType.STRING),
            new Column("Location", ColumnType.STRING),
            new Column("Phone", ColumnType.STRING)
        };

        public List<Hostel> GetHostelsList()
        {
            return GetList<Hostel>(dr => new Hostel() {

                HostelID = dr.GetInt32(0),
                HostelImage = dr.GetStringOrNull(1),
                HostelName = dr.GetStringOrNull(2),
                AnimalsTypes = dr.GetStringOrNull(3),
                Location = dr.GetStringOrNull(4),
                Phone = dr.GetStringOrNull(5)
            });
        }

        protected override Column[] Columns => columns;

        protected override string TableName => "Hostels";

        protected override Column PrimaryKey => Columns[0];

    }
}
