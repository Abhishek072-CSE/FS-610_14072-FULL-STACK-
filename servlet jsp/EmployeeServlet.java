import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

class EmployeeServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        String empID = req.getParameter("empid");

        out.println("<form action='EmployeeServlet' method='get'>");
        out.println("Search Emp ID: <input type='text' name='empid'>");
        out.println("<input type='submit' value='Search'></form><br>");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb","root","password");

            Statement st = con.createStatement();
            String query = (empID != null && !empID.equals("")) 
                ? "SELECT * FROM Employee WHERE EmpID=" + empID
                : "SELECT * FROM Employee";

            ResultSet rs = st.executeQuery(query);
            out.println("<table border='1'><tr><th>ID</th><th>Name</th><th>Salary</th></tr>");

            while(rs.next()) {
                out.println("<tr><td>"+rs.getInt(1)+"</td><td>"+rs.getString(2)+"</td><td>"+rs.getInt(3)+"</td></tr>");
            }
            out.println("</table>");

            con.close();
        } catch(Exception e) {
            out.println(e);
        }
    }
}
