function gmailForwardMessages() {
  
var domain = "@domain.com";
var label_after_forward = "Forwarded";
var people = [
                 "john.doe",
];
  

	for (counter = 0; counter < people.length; ++counter) {
		var label = GmailApp.getUserLabelByName(people[counter]);
		
		if (label != null) {
			var threads = label.getThreads();
			  
			for (var i = 0; i < threads.length; ++i) {
				var message = threads[i].getMessages()[0];
				
				if (message.isUnread() == true) {
					var subject = message.getSubject();
					var nadawca = message.getFrom();
				  
					if (message.getReplyTo() == '') {
						message.forward(people[counter] + domain, {replyTo: nadawca, subject: subject});
					}
					else {
						message.forward(people[counter] + domain, {replyTo: message.getReplyTo(), subject: subject});
					}
				
				
				var newlabel = GmailApp.getUserLabelByName(label_after_forward + '/' + people[counter]);
				threads[i].addLabel(newlabel);
				
				threads[i].markRead();
				
				threads[i].removeLabel(label);
				}
			}
		}
	}
}
