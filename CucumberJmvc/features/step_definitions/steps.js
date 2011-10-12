Given(/I have entered (\d+) in the calculator/, function(value)
{
	S("#calculator").type(value);
});

Given(/I have entered (\d+) and (\d+) in the calculator/, function(value, value2)
{
	S("#calculator").type(value);
	S("#calculator2").type(value2);
});

When(/I press (\w+)/, function(value)
{
	S("#"+value).click();
});

Then(/I should see (\d+) in the result/, function(value)
{
	console.log(S._window)
	ok(S("#result").hasClass("test"))
	//S("#result").exists();
	//console.log(S("#result").size());
	//equal(S("#result").val(),value);
});