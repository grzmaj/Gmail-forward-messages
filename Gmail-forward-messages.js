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
					var sender = message.getFrom();
					
					var body = message.getBody();
					if (subject.length > 100) {
						var set_new_body = true;
						var new_body = subject + "<br><br>" + message.getBody();
						var subject = subject.substring(0, 100) + " (...)";
					}						
				  
					if (message.getReplyTo() == '') {
						if (set_new_body == true) {
							message.forward(people[counter] + domain, {replyTo: sender, subject: subject, htmlBody: new_body});
						}
						else {
							message.forward(people[counter] + domain, {replyTo: sender, subject: subject});
						}
					}
					else {
						if (set_new_body == true) {
							message.forward(people[counter] + domain, {replyTo: message.getReplyTo(), subject: subject, htmlBody: new_body});
						}
						else {
							message.forward(people[counter] + domain, {replyTo: message.getReplyTo(), subject: subject});
						}
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
