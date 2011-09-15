Given(/I have entered (\d+) in the calculator/, function(value)
{
	S.open("index.html");
	S("#calculator").type(value);
});

When(/I press (\w+)/, function(value)
{
	S("#"+value).click();
});

Then(/I should see (\d+) in the calculator/, function(value)
{
	equal(S("#calculator").val(),value);
});