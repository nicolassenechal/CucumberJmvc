/** If you use these step definitions as basis for your features you will quickly end up
* with features that are:
*
* - Hard to maintain
* - Verbose to read
*
* A much better approach is to write your own higher level step definitions, following
* the advice in the following blog posts:
*
* - http://benmabey.com/2008/05/19/imperative-vs-declarative-scenarios-in-user-stories.html
* - http://dannorth.net/2011/01/31/whose-domain-is-it-anyway/
* - http://elabs.se/blog/15-you-re-cuking-it-wrong
**/

Given(/^(?:|I )am on (.+)$/, function(page_name)
{
	S.open(path_to(page_name));
});

When(/^(?:|I )go to (.+)$/, function(page_name)
{
	S.open(path_to(page_name));
});		

var find = function(selector)
{
	if(S(selector).exists())
	{
		return S(selector).first();
	}
	else if(S("*:contains("+ selector +")").exists())
	{
		return S("*:contains("+ selector +")").first();
	}	
	else
	{
		throw new Error("invalid selector", selector);
	}	
}


var find_field = function(field, parent)
{
	if(parent)
	{
		if(S(parent).exists())
		{
			if(S(parent+" input[name="+field+"]").exists())
			{
				return S(parent+" input[name="+field+"]").first();
			}
			else if(S(parent+" input#"+field).exists())
			{
				return S(parent+" input[id="+field+"]").first();
			}	
			else if(S(parent+" "+field).exists())
			{
				return S(parent+" "+field).first();
			}
			else
			{
				throw new Error("Cannot find field", field, parent);
			}	
		}
		else
		{
			throw new Error("Cannot find parent", field, parent);
		}	
	}
	else
	{
		if(S("input[name="+field+"]").exists())
		{
			return S("input[name="+field+"]").first();
		}
		else if(S("input#"+field).exists())
		{
			return S("input[id="+field+"]").first();
		}	
		else if(S(field).exists())
		{
			return S(field).first();
		}
		else
		{
			throw new Error("Cannot find field", field);
		}	
	}	
}

When(/^(?:|I )press "([^\"]*)"$/, function(button)
{
	find(button).click();
});		
  
When(/^(?:|I )follow "([^\"]*)"$/, function(link)
{
	find(link).click();
});		

//When(/^(?:|I )follow "([^\"]*)" within "([^\"]*)"$/, function(link, parent)
//{
//	S(parent+" "+link).click();
//});		

When(/^(?:|I )fill in "([^\"]*)" with "([^\"]*)"$/, function(field, value)
{
	find_field(field).type(value);
});		

When(/^(?:|I )fill in "([^\"]*)" for "([^\"]*)"$/, function(value, field)
{
	find_field(field).type(value);
});		

When(/^(?:|I )select "([^"]*)" from "([^"]*)"$/, function(value, field)
{
	//Assume traditional radio buttons
	find_field(field).click();
});	

When(/^(?:|I )check "([^"]*)"$/, function(field)
{
	field = find_field(field);
	if(!field.val())
	{
		field.click();
	}	
});

When(/^(?:|I )uncheck "([^"]*)"$/, function(field)
{
	field = find_field(field);
	if(field.val())
	{
		field.click();
	}	
});

When(/^(?:|I )choose "([^"]*)"$/, function(field)
{
	//Assume traditional radio buttons
	find_field(field).click();
});

Then(/^(?:|I )should see "([^"]*)"$/, function(text)
{		
	ok(S("*:contains("+ text +")").visible());
});			

Then(/^(?:|I )should see element "([^"]*)"$/, function(selector)
{
	ok(S(selector).visible());
});	

Then(/^(?:|I )should not see "([^"]*)"$/, function(text)
{		
	ok(!S("*:contains("+ text +")").visible());
});			

Then(/^(?:|I )should not see element "([^"]*)"$/, function(selector)
{
	ok(!S(selector).visible());
});

Then(/^the "([^"]*)" field(?: within (.*))? should contain "([^"]*)"$/, function(field, parent, value)
{
	ok(new Regex(value).match(find_field(field, parent).val()));
});		

Then(/^the "([^"]*)" field(?: within (.*))? should contain "([^"]*)"$/, function(field, parent, value)
{
	ok(!new Regex(value).match(find_field(field, parent).val()));
});	

Then(/^the "([^"]*)" field should have the error "([^"]*)"$/, function(field, error_message)
{
	var element = find_field(field);
	if(element.hasClass('field_with_errors') || element.hasClass('error'))
	{
		ok(true);
	}
	else if(new RegEx(error_message).test(S("body").text()))
	{
		ok(true);
	}	
	else
	{
		ok(false);
	}
});

Then(/^the "([^"]*)" field should have no error$/, function(field)
{
	var element = find_field(field);
	if(element.hasClass('field_with_errors') || element.hasClass('error'))
	{
		ok(false);
	}
	else
	{
		ok(true);
	}
});		

Then(/^the "([^"]*)" checkbox(?: within (.*))? should be checked$/, function(label, parent)
{
	field = find_field(field);
	ok(field.val());
});

Then(/^the "([^"]*)" checkbox(?: within (.*))? should not be checked$/, function(label, parent)
{
	field = find_field(field);
	ok(!field.val());
});

Then(/^(?:|I )should be on (.+)$/, function(page_name)
{
	var current_path = S._window.location.href;
	equal(page_name, path_to(current_path));
});	

Then(/^(?:|I )should have the following query string:$/, function(expected_pairs)
{
	var hash = S.window.location.hash;
	hash = hash.substring(1,hash.length);
	hash = hash.split("&");
	var result = {};
	for(var i=0;i<hash.length;i++)
	{
		if(hash[i])
		{
			var s = hash[i].split("=");
			result[s[0]] = s[1];
		}			
	}	
	var expected = {};
	expected_pairs = expected_pairs.split("&");
	for(var i=0;i<expected_pairs.length;i++)
	{
		if(hash[i])
		{
			var s = hash[i].split("=");
			expected[s[0]] = s[1];
		}			
	}
	deepEqual(result,expected);
});		