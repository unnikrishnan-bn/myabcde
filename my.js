      <!-- User-generated js -->
         
        function onDeviceReady() {
		
             $(document).one ('pageshow', function (e, data) {
        if ($.mobile.activePage.attr('id') == 'home') {
            document.addEventListener("backbutton", function () { 
			console.log('going to exit');
                setTimeout( function() {navigator.app.exitApp();}, 100 );
            }, true);
        }
       /* else  if ($.mobile.activePage.attr('id') == 'add_expense') {
            document.addEventListener("backbutton", function () { 
                setTimeout( function() {$.mobile.changePage("#expenses_page_day");}, 100 );
            }, true);
        }*/
        else{
            document.addEventListener("backbutton", function () {
				console.log('going to home');
				
                setTimeout( function() {$.mobile.changePage("#home");}, 100 );
            }, true);
        }
    });

        }

        document.addEventListener("deviceready", onDeviceReady, false);

		  
		  
		  
              try {
  
      $(function() {
  		var db0 = window.openDatabase ("Test2", "1.0", "Test2", 65535);
		db0.transaction (function (transaction) 
  { 
    var sqll = "CREATE TABLE IF NOT EXISTS category " +
        " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "cat VARCHAR(15) NOT NULL)";
		
    transaction.executeSql (sqll, []); 
	
	 //alert ("Table created1212");
	 
  })
	
	db0.transaction (function (transaction) {
		
		 var sql12 = "SELECT * FROM category ";
    transaction.executeSql (sql12, undefined, 
    function (transaction, result)
    {
		
      //console.log(result.rows.length);
      if (result.rows.length===0)
      { var catarr = ["Bills","Food","Stationary", "Others"];
	 for(i=0; i< catarr.length;i++){
 
    var sqll3 = "INSERT INTO category (cat) VALUES (?)";
    transaction.executeSql (sqll3, [catarr[i]], function ()
    { 
     
	}
	 
	)}	
	  }})
	})
	  })
			  
    } catch (error) {
      console.error("Your javascript has an error: " + error);
    }
          
          
          
           
		  
		function loadExpenses(){
		 var db2 = window.openDatabase ("Test2", "1.0", "Test2", 65535);
		// document.addEventListener("backbutton", onBackKey, false);
  			console.log('load exp');
			db2.transaction (function (transaction) 
  { 
  	
  	var param1 = new Date();
	var date = param1.getDate();
	var month =  '0' + (param1.getMonth()+1);
	var year =   param1.getFullYear();
	var totexp='0';
	//var parsedDate = $.datepicker.parseDate('yy-mm-dd', current_date);
	$('#defflip').datebox('setTheDate',param1);
	$('#defflip').trigger('datebox', {'method':'doset'});
	
    var sql5 = "SELECT * FROM expenses where date='"+ date +"' AND month='"+month+"' AND year='" +year+"'";
    transaction.executeSql (sql5, undefined, 
    function (transaction, result)
    {
    //  console.log(result.rows.length);
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
		  var respaymode = row.paymode;
		  var resremark = row.remark;
		  var resdate = row.date;
		  var restime = row.time;
		  var resid = row.id;
		  var temprestime = restime.split(':');
			 var hours = temprestime[0];
  var minutes = temprestime[1];
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
   totexp = parseInt(totexp) + parseInt(row.amount);
		 
          html += "<li id=\""+ resid +"\" data-name=\"" +resid+"\" > <a> <h3>" +rescat+ "</h3> <h4>Rs. "+ resamount+ " by "+ respaymode+ "</h4><p>" +  resremark + "</p> <p class=\"ui-li-aside\"> "+strTime+"</p></a>" + 
		  " <a href=\"#delete_item\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +resid+ "\">Purchase album</a></li>";
        }
      }
      else
      {
        html += "<li> No Expenses</li>";
		totexp = '0';
      }
      
	// alert (html);
	  $('#day_list').empty();
	   $('#totalexpenses').text(' Total Expenses Rs. ' + totexp);
	   
		 $('#day_list').append(html).listview('refresh');
		 $.mobile.changePage("#expenses_page_day");
      html="";
 		
    totexp='0';
      
    });
	 
  })
	
		
			
		}
		
			
		
             
         
         
var db = window.openDatabase ("Test2", "1.0", "Test2", 65535);
var html="";
var item_name;
		  $('#addCategoryForm').submit(function() 
{	
         
	db.transaction (function (transaction) { 
	  var category_New = $("#new_cat").val ();
  	  var sqll3 = "INSERT INTO category (cat) VALUES (?)";
	  var html2 ="";
    transaction.executeSql (sqll3, [category_New], function ()
    { 
     
	   html2 += "<li id=\""+ category_New +"\" data-name=\"" +category_New+"\" > <a> <h3>" +category_New+ "</h3></a>" + 
		  " <a href=\"#delete_item_cat\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +category_New+ "\">Delete</a></li>";
 $('#cat_list').append(html2).listview('refresh');
 html2="";
   var ddl = $("#categorySel"); 
 ddl.append("<option value='" +category_New+ "'>" + category_New + "</option>").select('refresh');
	 $.mobile.changePage("#catagories_list");
	 $("#new_cat").val('');
	})
	
		
	})
	 
	  
	return false;
})
         
          
        
         
var db = window.openDatabase ("Test2", "1.0", "Test2", 65535);
var html="";
var item_name;
		  $('#addExpenseForm').submit(function() 
{	

db.transaction (function (transaction) 
  { 
    var sql = "CREATE TABLE IF NOT EXISTS expenses " +
        " (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "category VARCHAR(15) NOT NULL, " + 
        "amount VARCHAR(10) NOT NULL, " +
		"paymode VARCHAR(15) NOT NULL, " +
		"remark VARCHAR(50) NOT NULL, " +
		"date VARCHAR(15) NOT NULL, " +
		"month VARCHAR(15) NOT NULL, " +
		"year VARCHAR(15) NOT NULL, " +
		"time VARCHAR(10) NOT NULL " +
		 ")";
		
    transaction.executeSql (sql, []); 
	
	 //alert ("Table created1212");
	 
  })
  
    var err = false;
       
        // Perform form validation
         
        if($('#amount').val()==null || $('#amount').val()==''){  
            alert(err);
            err = true;
          }          
    
    // Do whatever if it fails.

        
        
        // If validation fails, show Dialog content
        if(err == true){            
         alert("Fill required fields");
          return false;
        }        
			
					
			var testNumber= /^[0-9]+$/;
			var amnt = $('#amount').val();
			
if(!testNumber.test(amnt)){
alert('Invalid Amount');
return false;

} else{
	
	db.transaction (function (transaction) { 
	  var category = $("#categorySel").val ();
  var amount = $("#amount").val ();
  var paymode = $("#paymodeSel").val ();
  var remark = $("#remarkTxt").val ();
  var param1 = new Date();
	var date = param1.getDate() + "";
	var month =  "0" + (param1.getMonth()+1);
	var year =   param1.getFullYear() + "";
	var time = param1.getHours() + ':' + param1.getMinutes();
    var sql3 = "INSERT INTO expenses (category, amount, paymode, remark, date,month,year,time) VALUES (?, ?, ?, ? , ?, ?, ?, ?)";
    transaction.executeSql (sql3, [category, amount, paymode, remark,date,month,year,time], function ()
    { 
      
    });
	$("#amount").val('');
	$("#remarkTxt").val('');
	 
	loadExpenses(); 
	
  });
  
}
 return false;
})
function onReadyTransaction( ){
		console.log( 'Transaction completed' )
	}
 
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' )
	}
 
	function onError( err ){
		console.log( err )
	}
           
          
          
          
          $("#delete_item_btn").click( function()
           {
				db.transaction (function (transaction) 
  { 
    var sql4 = "DELETE FROM expenses WHERE id='"+item_name + "'";
		
    transaction.executeSql (sql4, []); 
	 var item2= $("#day_list").find("li[id='" + item_name+"']");
	 item2.remove();
   $('#day_list').listview('refresh');
  });
  sql4 =""
           }
      );
          
 $('#day_list').on('click','li',function () {
   
   item_name= $(this).attr('data-name');
   
});
          
   
    
          $("#delete_item_month_btn").click( function()
           {
				db.transaction (function (transaction) 
  { 
    var sql4 = "DELETE FROM expenses WHERE id='"+item_name + "'";
		
    transaction.executeSql (sql4, []); 
	 var item2= $("#month_list").find("li[id='" + item_name+"']");
	 item2.remove();
   
  });
  sql4 =""
           }
      );
          
 $('#month_list').on('click','li',function () {
   
   item_name= $(this).attr('data-name');
   
});
          
          
             
          $("#delete_item_year_btn").click( function()
           {
				db.transaction (function (transaction) 
  { 
    var sql4 = "DELETE FROM expenses WHERE id='"+item_name + "'";
		
    transaction.executeSql (sql4, []); 
	 var item2= $("#year_list").find("li[id='" + item_name+"']");
	 item2.remove();
   
  });
  sql4 =""
           }
      );
          
 $('#year_list').on('click','li',function () {
   
   item_name= $(this).attr('data-name');
   
});
          
          
          
		   $('#cat_list').on('click','li',function () {
   
   item_name= $(this).attr('data-name');
   
});
          $("#delete_item_cat_btn").click( function()
           {
				db.transaction (function (transaction) 
  { 
    var sql4 = "DELETE FROM category WHERE cat='"+item_name + "'";
		
    transaction.executeSql (sql4, []); 
	 var item2= $("#cat_list").find("li[id='" + item_name+"']");
	 item2.remove();
   $('#cat_list').listview('refresh');
  });
           }
      );
          

          
        
		 function onBackKey() {
      //  console.log("I've caught a back key");
			//alert('Back Button!');
        // We are going back to home so remove the event listener 
        // so the default back key behaviour will take over
		//$.mobile.changePage("#home");
       // document.removeEventListener("backbutton", onBackKey, false);
		 }
		
        
        
		function loadMonthExpenses(){
		 var db2 = window.openDatabase ("Test2", "1.0", "Test2", 65535);
		 // document.addEventListener("backbutton", onBackKey, false);
  			
			db2.transaction (function (transaction) 
  { 
  	var param1 = new Date();
	var date = param1.getDate();
	var month =  '0' + (param1.getMonth()+1);
	var year =   param1.getFullYear();
	var totexp='0';
	//var parsedDate = $.datepicker.parseDate('yy-mm-dd', current_date);
	$('#datepicker_month').datebox('setTheDate',param1);
	$('#datepicker_month').trigger('datebox', {'method':'doset'});
    var sql5 = "SELECT * FROM expenses where month='"+month+"' AND year='" +year+"'";
    transaction.executeSql (sql5, undefined, 
    function (transaction, result)
    {
     // console.log(result.rows.length);
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
		  var respaymode = row.paymode;
		  var resremark = row.remark;
		  var resdate = row.date;
		  var restime = row.time;
		  var resid = row.id;
		  var temprestime = restime.split(':');
			 var hours = temprestime[0];
  var minutes = temprestime[1];
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
   totexp = parseInt(totexp) + parseInt(row.amount);
		var fullDate = row.date +'/' + row.month + '/'+row.year; 
          html += "<li id=\""+ resid +"\" data-name=\"" +resid+"\" > <a> <h3>" +rescat+ "</h3> <h4>Rs. "+ resamount+ " by "+ respaymode+ "</h4><p>" +  resremark + "</p> <p class=\"ui-li-aside\"> "+fullDate+"</p></a>" + 
		  " <a href=\"#delete_item\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +resid+ "\">Purchase album</a></li>";
        }
      }
      else
      {
        html += "<li> No Expenses</li>";
		totexp = '0';
      }
      
	// alert (html);
	  $('#month_list').empty();
	   $('#totalmonthexpenses').text(' Total Expenses Rs. ' + totexp);
	  // console.log(totexp);
		 $('#month_list').append(html).listview('refresh');
      html="";
 		
    totexp='0';
      
    });
	 
  })
	
			
			
		}
		
		
        
          
		function loadYearExpenses(){
		 var db2 = window.openDatabase ("Test2", "1.0", "Test2", 65535);
		  //document.addEventListener("backbutton", onBackKey, false);
  			
			db2.transaction (function (transaction) 
  { 
  	var param1 = new Date();
	var date = param1.getDate();
	var month =  '0' + (param1.getMonth()+1);
	var year =   param1.getFullYear();
	var totexp='0';
	//var parsedDate = $.datepicker.parseDate('yy-mm-dd', current_date);
	$('#datepicker_year').datebox('setTheDate',param1);
	$('#datepicker_year').trigger('datebox', {'method':'doset'});
    var sql5 = "SELECT * FROM expenses where year='" +year+"'";
    transaction.executeSql (sql5, undefined, 
    function (transaction, result)
    {
     // console.log(result.rows.length);
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
		  var respaymode = row.paymode;
		  var resremark = row.remark;
		  var resdate = row.date;
		  var restime = row.time;
		  var resid = row.id;
		  var temprestime = restime.split(':');
			 var hours = temprestime[0];
  var minutes = temprestime[1];
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
   totexp = parseInt(totexp) + parseInt(row.amount);
   var fullDate = row.date +'/' + (row.month) + '/'+row.year;
		 
          html += "<li id=\""+ resid +"\" data-name=\"" +resid+"\" > <a> <h3>" +rescat+ "</h3> <h4>Rs. "+ resamount+ " by "+ respaymode+ "</h4><p>" +  resremark + "</p> <p class=\"ui-li-aside\">"+fullDate+"<p></p></a>" + 
		  " <a href=\"#delete_item\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +resid+ "\">Purchase album</a></li>";
        }
      }
      else
      {
        html += "<li> No Expenses</li>";
		totexp = '0';
      }
      
	// alert (html);
	  $('#year_list').empty();
	   $('#totalyearexpenses').text(' Total Expenses Rs. ' + totexp);
	   //console.log(totexp);
		 $('#year_list').append(html).listview('refresh');
      html="";
 		
    totexp='0';
      
    });
	 
  })
	
			
			
		}
		
		
              
        
          
          
		  var db2 = window.openDatabase ("Test2", "1.0", "Test2", 65535);
		 
linkedCheckin = function (date, name) {
	console.log('inside...');

		db2.transaction (function (transaction) 
  { 
  	var param1 = new Date();
  	var current_date = param1.getDate() + '/' + param1.getMonth() + '/' + param1.getFullYear();
	//var parsedDate = $.datepicker.parseDate('yy-mm-dd', current_date);
	//$('#defflip').datebox('setTheDate',param1);
	//$('#defflip').trigger('datebox', {'method':'doset'});
	var getdate = $('#defflip').datebox('callFormat', '%d/%m/%Y', $('#defflip').datebox('getTheDate'));
	var arrDate = getdate.split('/');
	arrDate[0] =  parseInt(arrDate[0]); 
    var sql5 = "SELECT * FROM expenses where date='"+ arrDate[0] +"' AND month='"+arrDate[1]+"' AND year='" +arrDate[2]+"'";
	//console.log(sql5);
	var totexp = '0';
    transaction.executeSql (sql5, undefined, 
    function (transaction, result)
    {
     // console.log(result.rows.length);
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
		  var respaymode = row.paymode;
		  var resremark = row.remark;
		  var resdate = row.date;
		  var restime = row.time;
		  var resid = row.id;
  var temprestime = restime.split(':');
			 var hours = temprestime[0];
  var minutes = temprestime[1];
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
		   totexp = parseInt(totexp) + parseInt(row.amount);
          html += "<li id=\""+ resid +"\" data-name=\"" +resid+"\" > <a> <h3>" +rescat+ "</h3> <h4>Rs. "+ resamount+ " by "+ respaymode+ "</h4><p>" +  resremark + "</p> <p class=\"ui-li-aside\"> "+strTime+"</p></a>" + 
		  " <a href=\"#delete_item\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +resid+ "\">Purchase album</a></li>";
        }
      }
      else
      {
        html += "<li> No Expenses</li>";
		totexp='0';
      }
      
	// alert (html);
	  $('#day_list').empty();
	   $('#totalexpenses').text('Total Expenses Rs. ' + totexp);
	 //  console.log(totexp);
		 $('#day_list').append(html).listview('refresh');
		 html="";
      totexp='0';
 
    
      
    });
	 
  })
	
	
}

linkedmonth = function (date, name) {
	var totexp = '0';
		db2.transaction (function (transaction) 
  { 
  	var param1 = new Date();
  	var current_date = param1.getDate() + '/' + param1.getMonth() + '/' + param1.getFullYear();
	var getdate = $('#datepicker_month').datebox('callFormat', '%m/%Y', $('#datepicker_month').datebox('getTheDate'));
	var arrDate = getdate.split('/');
	console.log(getdate);
    var sql6 = "SELECT * FROM expenses where month='"+arrDate[0]+"' AND year='" +arrDate[1]+"'";
	//console.log(sql6);
    transaction.executeSql (sql6, undefined, 
    function (transaction, result)
    {
      //console.log(result.rows.length);
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
		  var respaymode = row.paymode;
		  var resremark = row.remark;
		  var resdate = row.date;
		  var resmonth = row.month;
		  var resyear = row.year;
		  var restime = row.time;
		  var resid = row.id;
		  totexp = parseInt(totexp) + parseInt(row.amount);
		  
          html += "<li id=\""+ resid +"\" data-name=\"" +resid+"\" > <a> <h3>" +rescat+ "</h3> <h4>Rs. "+ resamount+ " by "+ respaymode+ "</h4><p>" +  resremark + "</p> <p class=\"ui-li-aside\"> "+resdate+"/" +resmonth+"/" +resyear+"</p></a>" + 
		  " <a href=\"#delete_item\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +resid+ "\">Purchase album</a></li>";
        }
      }
      else
      {
        html += "<li> No Expenses</li>";
		   $('#totalmonthexpenses').text(' Total Expenses Rs. 0');
      }
      
	// alert (html);
	  $('#month_list').empty();
		 $('#month_list').append(html).listview('refresh');
		 html="";
        $('#totalmonthexpenses').text(' Total Expenses Rs. ' + totexp);   
    });
	 
  })
  totexp = '0';
}


linkedyear = function (date, name) {
	
	var totexp = '0';
		db2.transaction (function (transaction) 
  { 
  	var param1 = new Date();
  	var current_date = param1.getDate() + '/' + param1.getMonth() + '/' + param1.getFullYear();
	var getdate = $('#datepicker_year').val();
	var arrDate = getdate.split('/');
    var sql6 = "SELECT * FROM expenses where year='" +arrDate[0]+"'";
	//console.log(sql6);
    transaction.executeSql (sql6, undefined, 
    function (transaction, result)
    {
     // console.log(result.rows.length);
      if (result.rows.length)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var row = result.rows.item (i);
          var rescat = row.category;
          var resamount = row.amount;
		  var respaymode = row.paymode;
		  var resremark = row.remark;
		  var resdate = row.date;
		  var resmonth = row.month;
		  var resyear = row.year;
		  var restime = row.time;

		  var resid = row.id;

		  totexp = parseInt(totexp) + parseInt(row.amount);
          html += "<li id=\""+ resid +"\" data-name=\"" +resid+"\" > <a> <h3>" +rescat+ "</h3> <h4>Rs. "+ resamount+ " by "+ respaymode+ "</h4><p>" +  resremark + "</p> <p class=\"ui-li-aside\"> "+resdate+"/" +resmonth+"/" +resyear+"</p></a>" + 
		  " <a href=\"#delete_item\" data-rel=\"popup\" data-position-to=\"window\" data-transition=\"pop\" id = \"" +resid+ "\">Purchase album</a></li>";
        }
      }
      else
      {
        html += "<li> No Expenses</li>";
		$('#totalyearexpenses').text(' Total Expenses Rs. 0');
      }
      
	// alert (html);
	  $('#year_list').empty();
	   $('#totalyearexpenses').text(' Total Expenses Rs. ' + totexp);
		 $('#year_list').append(html).listview('refresh');
		 html="";
        totexp = '0';
    });
	 
  })
}
		  
          
          
    function loadChart(){
	//alert('chart loaded');	
	 var totamt=0;
  
$(function () {
    
   // for (var i = 0; i < 14; i += 0.5)
       // d1.push([i, Math.sin(i)]);
	  
	  var db2 = window.openDatabase ("Test2", "1.0", "Test2", 65535);
		db2.transaction (function (transaction) 
  { 
  	
    var sql0 = "SELECT amount, year FROM expenses ";
    transaction.executeSql (sql0, undefined, 
    function (transaction, result)
    {
     // console.log(result.rows.length);
      if (result.rows.length)
      {
		   for (var i = 0; i < result.rows.length; i++) 
        {
			var row = result.rows.item (i);
			totamt = parseInt(totamt) + parseInt(row.amount);
			//console.log(totamt);
		}
	  
   //  console.log(totamt);
    var d2 = [[2011, 0], [2012, 0], [2013,totamt], [2014, 0]];

    // a null signifies separate line segments
  //  var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];
    
    $.plot($("#barChart"), [ {label: "Total expenses Per Year"},{data : d2,  bars: { show: true, barWidth: 1,
        align: "center" }}, {
   xaxis: {
     ticks: [
       [1, "2011"],
       [2, "2012"],
       [3, "2013"],
       [4, "2014"],
	   [5, "2015"]
     ]  ,  tickOptions: {
                formatString: '%d'
            },
            numberTicks: 4 }}] 
	
);
}
	})
  });
});

	}
  