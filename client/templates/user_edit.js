(function(){

Template.user_edit.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();
    if(!Meteor.user()) throw 'You must be logged in.';

    var user=window.selected_user_id? Meteor.users.findOne(window.selected_user_id) : Meteor.user();
    var username= $('#title').val();
    var email = $('#url').val();
    var old_password = $('#new_password').val();
    var new_password = $('#new_password').val();

    if(old_password && new_password){
   		Meteor.changePassword(old_password, new_password);
    }

    Meteor.users.update(user._id,
 		{
	   		$set: {
		        username: username
	    	}
    	}
    );
  }

};

Template.user_edit.user = function(){
	var current_user=Meteor.user();
	if(window.selected_user_id && !current_user.loading && isAdmin(current_user)){
	  return Meteor.users.findOne(window.selected_user_id);
	}else{
		return current_user;
	}
}

Template.user_edit.email = function(){
	if(!this.loading){
		return this.emails[0].address;
	}
}

})();