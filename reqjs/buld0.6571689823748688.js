define("math",["require"],function(e){return{add:function(e,n){return e+n}}}),define("teacher",["math"],function(e){return{say:function(n,o){return e.add(n,o)}}}),require.config({baseUrl:"./js",paths:{math:"./clac/math",teacher:["./school/teacherGood","./school/teacherBad"],shimBook:"./shim/shimBook",shimPen:"./shim/shimPen",defineModule:"./defineModule",defineModuleFunction:"./defineModuleFunction",defineModuleMore:"./defineModuleMore",defineModuleMore2:"./defineModuleMore",text:"./lib/text"},shim:{shimBook:{exports:"shimBook"},shimPen:{deps:[],exports:"shimPen",init:function(e){return e}}}}),require(["teacher"],function(e){console.log(e.say(1,4))}),define("app",function(){});