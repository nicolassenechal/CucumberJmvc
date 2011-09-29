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
	find_field(field).val(value);
});		

When(/^(?:|I )fill in "([^\"]*)" for "([^\"]*)"$/, function(value, field)
{
	find_field(field).val(value);
});		

When(/^(?:|I )select "([^"]*)" from "([^"]*)"$/, function(value, field)
{
	find_field(field).val(value);
});	

When(/^(?:|I )check "([^"]*)"$/, function(field)
{
	find_field(field).val(true);
});

When(/^(?:|I )uncheck "([^"]*)"$/, function(field)
{
	find_field(field).val(false);
});

Then(/^(?:|I )should see "([^"]*)"$/, function(text)
{		
	ok(S("*:contains("+ text +")").visible());
}			

Then(/^(?:|I )should see element "([^"]*)"$/, function(selector)
{
	ok(S(selector).visible());
});	

Then(/^(?:|I )should not see "([^"]*)"$/, function(text)
{		
	ok(!S("*:contains("+ text +")").visible());
}			

Then(/^(?:|I )should not see element "([^"]*)"$/, function(selector)
{
	ok(!S(selector).visible());
});

Then(/^the "([^"]*)" field(?: within (.*))? should contain "([^"]*)"$/, function(field, parent, value)
{
	ok(new Regex(value).match(find_field(field, parent).val()));
}		

Then(/^the "([^"]*)" field(?: within (.*))? should contain "([^"]*)"$/, function(field, parent, value)
{
	ok(!new Regex(value).match(find_field(field, parent).val()));
}	