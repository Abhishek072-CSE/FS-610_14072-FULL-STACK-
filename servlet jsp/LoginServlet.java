import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        if(user.equals("admin") && pass.equals("1234")) {
            out.println("<h2>Welcome " + user + "!</h2>");
        } else {
            out.println("<h2>Invalid Credentials</h2>");
        }
    }
}
