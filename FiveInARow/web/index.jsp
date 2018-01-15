<%-- 
    Document   : index
    Created on : Nov 25, 2017, 7:21:42 PM
    Author     : Rohit
    Welcome page of our application.
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Five In a Row Game</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="websocket.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>

        <div id="wrapper">
            <h1>Five In a Row Game</h1>

            <div id="chessBoard">
                Player Name  : <input type="text" id="playerName"><br><br>
                <div id="colorChoice">
                    Select Color : <input id="blackColor" type="radio" name="colorName" value="black"> Black
                    <input id="whiteColor" type="radio" name="colorName" value="white"> White<br><br><br>
                </div>
                <form id="tableGrid">
                   <table style="width:70%">
                       <%
                        for(int i=0;i<13;i++)
                        {
                       %>
                        <tr>
                            <td><input type="button" class="button" id="<%=i%>x0" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x1" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x2" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x3" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x4" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x5" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x6" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x7" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x8" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x9" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x10" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x11" value="    " onclick=formSubmit()></td> 
                            <td><input type="button" class="button" id="<%=i%>x12" value="    " onclick=formSubmit()></td> 
                        </tr>
                        <%
                           }
                        %>
                    </table>               
                </form>
            </div>
            <br />
            <div id="content">
            </div>
            <p>Developed by: <b>Rohit Pawar  and Akshay Joshi at IUPUI<b></p> <br />

        </div>

    </body>
</html>
