// Put your custom code here


var db = openDatabase ("Test", "1.0", "Test", 65535);

/*$("#create").bind ("click", function (event)
{
  
});

$("#remove").bind ("click", function (event)
{
  if (!confirm ("Delete table?", "")) return;;
  db.transaction (function (transaction) 
  {
    var sql = "DROP TABLE customers";
    transaction.executeSql (sql, undefined, ok, error);
  });
});
*/
  $('#addExpenseForm').submit(function() 
{	
	db.transaction (function (transaction) 
  {
    var sql = "CREATE TABLE expenses " +
        " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "category VARCHAR(15) NOT NULL, " + 
        "amount VARCHAR(10) NOT NULL, " +
		"paymode VARCHAR(15) NOT NULL, " +
		"remark VARCHAR(50) NOT NULL " +
		"date VARCHAR(15) NOT NULL " +
		"time VARCHAR(10) NOT NULL " +
		 ")";
    transaction.executeSql (sql, undefined, function ()
    { 
      alert ("Table created");
    }, error);
  });
  var category = $("#categorySel").val ();
  var amount = $("#amount").val ();
  var paymode = $("#paymodeSel").val ();
  var remark = $("#remarkTxt").val ();
  var param1 = new Date();
	var date = param1.getDate() + '/' + param1.getMonth() + '/' + param1.getFullYear					    ();
	var time = param1.getHours() + ':' + param1.getMinutes() + ':' + param1.getSeconds();
  
  db.transaction (function (transaction) 
  {
    var sql = "INSERT INTO expenses (category, amount, paymode, remark, date,time) VALUES (?, ?)";
    transaction.executeSql (sql, [category, amount, paymode, remark,date,time], function ()
    { 
      alert ("Customer inserted");
    }, error);
	
	  	  var sql2 = "SELECT * FROM customers";
    transaction.executeSql (sql2, undefined, 
    function (transaction, result)
    {
     
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
          html += "<li>" + rescat + "&nbsp;" + resamount + "</li>";
        }
      }
      else
      {
        html += "<li> No customer </li>";
      }
      
	 
		 $('#day_list').append(html).listview('refresh');
      
 
    
      
    }, error);
		 
		 
		 
	
	
	
  });
});
/*
$("#list").bind ("click", function (event)
{
  db.transaction (function (transaction) 
  {
    var sql = "SELECT * FROM customers";
    transaction.executeSql (sql, undefined, 
    function (transaction, result)
    {
      var html = "<ul>";
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var lname = row.lname;
          var fname = row.fname;
          html += "<li>" + lname + "&nbsp;" + fname + "</li>";
        }
      }
      else
      {
        html += "<li> No customer </li>";
      }
      
      html += "</ul>";
      
      $("#win2").unbind ().bind ("pagebeforeshow", function ()
      {
        var $content = $("#win2 div:jqmData(role=content)");
        $content.html (html);
        var $ul = $content.find ("ul");
        $ul.listview ();
      });
      
      $.mobile.changePage ($("#win2"));
      
    }, error);
  });
});
*/
function ok ()
{
}

function error (transaction, err) 
{
  alert ("DB error : " + err.message);
  return false;
}