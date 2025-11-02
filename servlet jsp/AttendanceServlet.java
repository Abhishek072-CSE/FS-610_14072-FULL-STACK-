import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

class AttendanceServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        String id = req.getParameter("sid");
        String date = req.getParameter("date");
        String status = req.getParameter("status");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb","root","password");

            PreparedStatement ps = con.prepareStatement("INSERT INTO Attendance VALUES(?,?,?)");
            ps.setString(1, id);
            ps.setString(2, date);
            ps.setString(3, status);
            ps.executeUpdate();

            out.println("<h2>Attendance Submitted Successfully</h2>");
            con.close();
        } catch(Exception e) {
            out.println(e);
        }
    }
}
