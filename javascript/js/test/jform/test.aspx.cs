using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace js.test.jform
{
    public partial class test : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Write(new JavaScriptSerializer().Serialize(new { Name = Request.QueryString["Name"] }));
            Response.End();
        }
    }
}