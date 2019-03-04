using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace CareMyPet
{
    public class HomeContent : DatabaseEntity
    {
        public int CardID { get; set; }
        public string CardImage { get; set; }
        public string CardTitle { get; set; }
        public string CardDescription { get; set; }

        protected static Column[] columns =
        {
            new Column("CardID",ColumnType.PRIMARY_KEY),
            new Column("CardImage",ColumnType.STRING),
            new Column("CardTitle",ColumnType.STRING),
            new Column("CardDescription",ColumnType.STRING)
        };

        public List<HomeContent> GetContentCards()
        {
            return GetList<HomeContent>(dr => new HomeContent()
            {
                CardID = dr.GetInt32(0),
                CardImage = dr.GetString(1),
                CardTitle = dr.GetString(2),
                CardDescription = dr.GetString(3)
            });
        }

        protected override Column[] Columns => columns;

        protected override string TableName => "HomeContents";

        protected override Column PrimaryKey => Columns[0];

    }
}
