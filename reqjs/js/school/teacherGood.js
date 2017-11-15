define('teacher',['math'],function(math) {
	var teacher = {
		say:function(a,b) {
			return math.add(a,b);
		}
	}
	return teacher;
});

