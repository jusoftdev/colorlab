

setTimeout(function(){permitted = true;}, 500);

var clip = new Clipboard('.colours >*');
var clipr = new Clipboard('.individual .red');
var clipg = new Clipboard('.individual .green');
var clipb = new Clipboard('.individual .blue');
var permitted = false;
var selection = 0;
var r, g, b, a = 255;

clip.on('error', error());
clipr.on('error', error());
clipg.on('error', error());
clipb.on('error', error());

function error() {
   if(permitted) {
      console.error("Clip");
      $(".error").addClass("shown");
   }
}
$(".catchment, .close").click(function(){
   $(".error").removeClass("shown")
});

$(".dropdown .options div").click(function(){
   $(".dropdown .selection").text($(this).text());
   $(".dropdown .options div").removeClass("selected");
   $(this).addClass("selected");
   selection = $(this).index();
   if (selection == 14) {
      $(".individual").css("display", "flex");
   } else {
      $(".individual").css("display", "none");
   }
});

$(".sign").mousedown(function(e){
   var val = $(this).attr("color");
   $(this).parent().parent().append('<div class="blast" id="'+ts+'" style="background-color:#' + val + '"></div>');
   remove("#" + ts);
});
$(".colours >*").mousedown(function(e){
   var val = $(this).attr("color"), val2 = "";
   var ts = Math.floor(e.timeStamp);
   $(this).parent().parent().append('<div class="blast" id="'+ts+'" style="background-color:#' + val + '"></div>');
   remove("#" + ts);
   if (selection >= 2) {
      r = $.baseConvert(val.substr(0,2), 16, 10);
      g = $.baseConvert(val.substr(2,2), 16, 10);
      b = $.baseConvert(val.substr(4,2), 16, 10);
      $(".individual .red").css("background-color", "rgb(" + r + ",0,0)");
      $(".individual .green").css("background-color", "rgb(0," + g + ",0)");
      $(".individual .blue").css("background-color", "rgb(0,0," + b + ")");
   }
   if(selection >= 2 && selection <=5) {
      /*C0 -> BB not CC*/
      var r2 = Math.round(r/17) + "";
      val2 += $.baseConvert(r2, 10, 16); 
      /*I may have forgotten that jQuery already supports base 16-10 conversions absolutely fine*/
      if(selection >= 4) {
         val2 += $.baseConvert(r2, 10, 16);
      }
      var g2 = Math.round(g/17) + "";
      val2 += $.baseConvert(g2, 10, 16);
      if(selection >= 4) {
         val2 += $.baseConvert(g2, 10, 16);
      }
      var b2 = Math.round(b/17) + "";
      val2 += $.baseConvert(b2, 10, 16);
      if(selection >= 4) {
         val2 += $.baseConvert(b2, 10, 16);
      }
      val = val2;
   }
   if(selection >= 6 && selection <=7) {
      val += "FF";
   }
   switch(selection) {
      case 0:case 2:case 4:case 6:
         $(".colourvalue").val("#" + val);
         $(".errorcode").val("#" + val);
         break;
      case 1:case 3:case 5:case 7:
         $(".colourvalue").val(val);
         $(".errorcode").val(val);
         break;
      case 8:
         $(".colourvalue").val("(" + r + "," + g + "," + b + ")");
         $(".errorcode").val("(" + r + "," + g + "," + b + ")");
         break;
      case 10:
         $(".colourvalue").val("(" + r + "," + g + "," + b + ",1)");
         $(".errorcode").val("(" + r + "," + g + "," + b + ",1)");
         break;
      case 12:
         $(".colourvalue").val("(" + r + "," + g + "," + b + ",255)");
         $(".errorcode").val("(" + r + "," + g + "," + b + ",255)");
         break;
      case 9:
         $(".colourvalue").val("rgb(" + r + "," + g + "," + b + ")");
         $(".errorcode").val("rgb(" + r + "," + g + "," + b + ")");
         break;
      case 11:
         $(".colourvalue").val("rgba(" + r + "," + g + "," + b + ",1)");
         $(".errorcode").val("rgba(" + r + "," + g + "," + b + ",1)");
         break;
      case 13:
         $(".colourvalue").val("rgba(" + r + "," + g + "," + b + ",255)");
         $(".errorcode").val("rgba(" + r + "," + g + "," + b + ",255)");
         break;
      case 15:case 16:
          /*http://www.javascripter.net/faq/hex2cmyk.htm*/
          var C = 1 - (r/255);
          var M = 1 - (g/255);
          var Y = 1 - (b/255);
          var K = 0;
          var minCMY = Math.min(C,Math.min(M,Y));
          C = (C - minCMY) / (1 - minCMY) ;
          M = (M - minCMY) / (1 - minCMY) ;
          Y = (Y - minCMY) / (1 - minCMY) ;
          K = minCMY;
         if(selection == 15) {
            $(".colourvalue").val("cymk(" + C + "," + Y + "," + M + "," + K + ")");
            $(".errorcode").val("cymk(" + C + "," + Y + "," + M + "," + K + ")");
         } else {
            $(".colourvalue").val("cymk(" + C*100 + "," + Y*100 + "," + M*100 + "," + K*100 + ")");
            $(".errorcode").val("cymk(" + C*100 + "," + Y*100 + "," + M*100 + "," + K*100 + ")");
         }
         break;
   }
});

$(".individual .red").mousedown(function(){
   var ts = Math.floor(e.timeStamp);
   $(this).append('<div class="blast" id="'+ts+'" style="background-color:rgb(' + r + ',0,0)"></div>');
   remove("#" + ts);
   $(".colourvalue").val(r);
});

$(".individual .green").mousedown(function(){
   var ts = Math.floor(e.timeStamp);
   $(this).append('<div class="blast" id="'+ts+'" style="background-color:rgb(0,' + g + ',0)" onload="remove()"></div>');
   remove("#" + ts);
   $(".colourvalue").val(g);
});

$(".individual .blue").mousedown(function(){
   var ts = Math.floor(e.timeStamp);
   $(this).append('<div class="blast" id="'+ts+'" style="background-color:rgb(0,0,' + b + ')" onload="remove()"></div>');
   remove("#" + ts);
   $(".colourvalue").val(b);
});

function remove(id) {
   setTimeout(function(){$(id).remove();},1200);
}

/*https://github.com/koya-io/baseConvert.js*/
$.baseConvert=function(n,i,t){var r="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";if(36>=i&&(n=n.toUpperCase()),i>64||2>t||t>64||2>i?r="Error, selector out of bounds.":n.replace(/[^0-9a-zA-Z+\/]/g,"").length!=n.length?r="Error, invalid character.":$.each((n+"").split(""),function(n,t){i>=63?63==i&&"/"==t&&(r="Error, invalid character."):o.indexOf(t)>=i&&(r="Error, invalid character.")}),""==r){var a=bigInt(0),g="";for(n+="",i+="",t+="",$.each(n.split(""),function(t,r){if(i>=63){var g=bigInt(n.length).minus(t).minus(1),l=bigInt(i).pow(g),d=bigInt(o.indexOf(r)).multiply(l);a=bigInt(a).add(d)}else{var g=bigInt(n.length).minus(t).minus(1),l=bigInt(i).pow(g),d=bigInt(o.indexOf(r)).multiply(l);a=bigInt(a).add(d)}});a>0;){g=t>=63?e[bigInt(a).mod(t)]+""+g:o[bigInt(a).mod(t)]+""+g;var l=bigInt(a).mod(t);bigInt(a).minus(l),a=bigInt(a).divide(t)}return g}return r};