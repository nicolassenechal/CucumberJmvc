Given(/^(?:|I )am on (.+)$/, function(page_name)
{
	S.open(path_to(page_name));
});

Given(/^(?:|I )go to (.+)$/, function(page_name)
{
	S.open(path_to(page_name));
});		

When(/^(?:|I )press "([^\"]*)"$/, function(button)
{
	S(button).click();
});		
  
When(/^(?:|I )follow "([^\"]*)"$/, function(link)
{
	S(link).click();
});		

When(/^(?:|I )follow "([^\"]*)" within "([^\"]*)"$/, function(link, parent)
{
	S(parent+" "+link).click();
});		

When(/^(?:|I )fill in "([^\"]*)" with "([^\"]*)"$/, function(field, value)
{
	S(field).val(value);
});		

When(/^(?:|I )fill in "([^\"]*)" for "([^\"]*)"$/, function(value, field)
{
	S(field).val(value);
});		

// Use this to fill in an entire form with data from a table. Example:
//
// When I fill in the following:
// | Account Number | 5002 |
// | Expiry date | 2009-11-01 |
// | Note | Nice guy |
// | Wants Email? | |
//
// TODO: Add support for checkbox, select og option
// based on naming conventions.
When(/^(?:|I )fill in the following:$/, function(fields)
{
	//fields.rows_hash.each do |name, value|
    //	When %{I fill in "#{name}" with "#{value}"}
	//==> Add way to call steps, i.e. CucumberJmvc.step("When I fill in "+name+" with "+value);
});		

//
//When /^(?:|I )select "([^\"]*)" from "([^\"]*)"$/ do |value, field|
//  select(value, :from => field)
//end
//
//# Use this step in conjunction with Rail's datetime_select helper. For example:
//# When I select "December 25, 2008 10:00" as the date and time
//When /^(?:|I )select "([^\"]*)" as the date and time$/ do |time|
//  select_datetime(time)
//end
//
//# Use this step when using multiple datetime_select helpers on a page or
//# you want to specify which datetime to select. Given the following view:
//# <%= f.label :preferred %><br />
//# <%= f.datetime_select :preferred %>
//# <%= f.label :alternative %><br />
//# <%= f.datetime_select :alternative %>
//# The following steps would fill out the form:
//# When I select "November 23, 2004 11:20" as the "Preferred" date and time
//# And I select "November 25, 2004 10:30" as the "Alternative" date and time
//When /^(?:|I )select "([^\"]*)" as the "([^\"]*)" date and time$/ do |datetime, datetime_label|
//  select_datetime(datetime, :from => datetime_label)
//end
//
//# Use this step in conjunction with Rail's time_select helper. For example:
//# When I select "2:20PM" as the time
//# Note: Rail's default time helper provides 24-hour time-- not 12 hour time. Webrat
//# will convert the 2:20PM to 14:20 and then select it.
//When /^(?:|I )select "([^\"]*)" as the time$/ do |time|
//  select_time(time)
//end
//
//# Use this step when using multiple time_select helpers on a page or you want to
//# specify the name of the time on the form. For example:
//# When I select "7:30AM" as the "Gym" time
//When /^(?:|I )select "([^\"]*)" as the "([^\"]*)" time$/ do |time, time_label|
//  select_time(time, :from => time_label)
//end
//
//# Use this step in conjunction with Rail's date_select helper. For example:
//# When I select "February 20, 1981" as the date
//When /^(?:|I )select "([^\"]*)" as the date$/ do |date|
//  select_date(date)
//end
//
//# Use this step when using multiple date_select helpers on one page or
//# you want to specify the name of the date on the form. For example:
//# When I select "April 26, 1982" as the "Date of Birth" date
//When /^(?:|I )select "([^\"]*)" as the "([^\"]*)" date$/ do |date, date_label|
//  select_date(date, :from => date_label)
//end
//
//When /^(?:|I )check "([^\"]*)"$/ do |field|
//  check(field)
//end
//
//When /^(?:|I )uncheck "([^\"]*)"$/ do |field|
//  uncheck(field)
//end
//
//When /^(?:|I )choose "([^\"]*)"$/ do |field|
//  choose(field)
//end
//
//# Adds support for validates_attachment_content_type. Without the mime-type getting
//# passed to attach_file() you will get a "Photo file is not one of the allowed file types."
//# error message
//When /^(?:|I )attach the file "([^\"]*)" to "([^\"]*)"$/ do |path, field|
//  type = path.split(".")[1]
//
//  case type
//  when "jpg"
//    type = "image/jpg"
//  when "jpeg"
//    type = "image/jpeg"
//  when "png"
//    type = "image/png"
//  when "gif"
//    type = "image/gif"
//  end
//  
//  attach_file(field, path, type)
//end
//
//Then /^(?:|I )should see "([^\"]*)"$/ do |text|
//  if defined?(Spec::Rails::Matchers)
//    response.should contain(text)
//  else
//    assert_contain text
//  end
//end
//
//Then /^(?:|I )should see "([^\"]*)" within "([^\"]*)"$/ do |text, selector|
//  within(selector) do |content|
//    if defined?(Spec::Rails::Matchers)
//      content.should contain(text)
//    else
//      hc = Webrat::Matchers::HasContent.new(text)
//      assert hc.matches?(content), hc.failure_message
//    end
//  end
//end
//
//Then /^(?:|I )should see \/([^\/]*)\/$/ do |regexp|
//  regexp = Regexp.new(regexp)
//  if defined?(Spec::Rails::Matchers)
//    response.should contain(regexp)
//  else
//    assert_match(regexp, response_body)
//  end
//end
//
//Then /^(?:|I )should see \/([^\/]*)\/ within "([^\"]*)"$/ do |regexp, selector|
//  within(selector) do |content|
//    regexp = Regexp.new(regexp)
//    if defined?(Spec::Rails::Matchers)
//      content.should contain(regexp)
//    else
//      assert_match(regexp, content)
//    end
//  end
//end
//
//Then /^(?:|I )should not see "([^\"]*)"$/ do |text|
//  if defined?(Spec::Rails::Matchers)
//    response.should_not contain(text)
//  else
//    assert_not_contain(text)
//  end
//end
//
//Then /^(?:|I )should not see "([^\"]*)" within "([^\"]*)"$/ do |text, selector|
//  within(selector) do |content|
//    if defined?(Spec::Rails::Matchers)
//      content.should_not contain(text)
//    else
//      hc = Webrat::Matchers::HasContent.new(text)
//      assert !hc.matches?(content), hc.negative_failure_message
//    end
//  end
//end
//
//Then /^(?:|I )should not see \/([^\/]*)\/$/ do |regexp|
//  regexp = Regexp.new(regexp)
//  if defined?(Spec::Rails::Matchers)
//    response.should_not contain(regexp)
//  else
//    assert_not_contain(regexp)
//  end
//end
//
//Then /^(?:|I )should not see \/([^\/]*)\/ within "([^\"]*)"$/ do |regexp, selector|
//  within(selector) do |content|
//    regexp = Regexp.new(regexp)
//    if defined?(Spec::Rails::Matchers)
//      content.should_not contain(regexp)
//    else
//      assert_no_match(regexp, content)
//    end
//  end
//end
//
//Then /^the "([^\"]*)" field should contain "([^\"]*)"$/ do |field, value|
//  if defined?(Spec::Rails::Matchers)
//    field_labeled(field).value.should =~ /#{value}/
//  else
//    assert_match(/#{value}/, field_labeled(field).value)
//  end
//end
//
//Then /^the "([^\"]*)" field should not contain "([^\"]*)"$/ do |field, value|
//  if defined?(Spec::Rails::Matchers)
//    field_labeled(field).value.should_not =~ /#{value}/
//  else
//    assert_no_match(/#{value}/, field_labeled(field).value)
//  end
//end
//
//Then /^the "([^\"]*)" checkbox should be checked$/ do |label|
//  if defined?(Spec::Rails::Matchers)
//    field_labeled(label).should be_checked
//  else
//    assert field_labeled(label).checked?
//  end
//end
//
//Then /^the "([^\"]*)" checkbox should not be checked$/ do |label|
//  if defined?(Spec::Rails::Matchers)
//    field_labeled(label).should_not be_checked
//  else
//    assert !field_labeled(label).checked?
//  end
//end
//
//Then /^(?:|I )should be on (.+)$/ do |page_name|
//  if defined?(Spec::Rails::Matchers)
//    URI.parse(current_url).path.should == path_to(page_name)
//  else
//    assert_equal path_to(page_name), URI.parse(current_url).path
//  end
//end
//
//Then /^(?:|I )should have the following query string:$/ do |expected_pairs|
//  actual_params = CGI.parse(URI.parse(current_url).query)
//  expected_params = Hash[expected_pairs.rows_hash.map{|k,v| [k,[v]]}]
// 
//  if defined?(Spec::Rails::Matchers)
//    actual_params.should == expected_params
//  else
//    assert_equal expected_params, actual_params
//  end
//end
//
//Then /^show me the page$/ do
//  save_and_open_page
//end