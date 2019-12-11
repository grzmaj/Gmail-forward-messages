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
				  
					// Sprawdzenie, czy wiadomość była już forwardowana
					if (message.getReplyTo() == '') {
						// Forwardowanie wiadomości - jako replyTo przekazujemy nadawcę
						message.forward(people[counter] + domain, {replyTo: nadawca, subject: subject});
					}
					else {
						// Forwardowanie wiadomości - jako replyTo przekazujemy dotychczasowe replyTo
						message.forward(people[counter] + domain, {replyTo: message.getReplyTo(), subject: subject});
					}
				
				
				// Dodanie nowej etykiety archiwum wiadomości
				var newlabel = GmailApp.getUserLabelByName(label_after_forward + '/' + people[counter]);
				threads[i].addLabel(newlabel);
				
				// Oznaczenie jako przeczytane
				threads[i].markRead();
				
				// Usunięcie starej etykiety
				threads[i].removeLabel(label);
				
				// Logowanie wykonanych czynności
				//Logger.log ("Forward: " + people[counter] + " ( " + subject + " ::: " + nadawca + " )");
				}
				else {
				//Logger.log("Znalazłem odczytaną wiadomość: " + people[counter] + " -> " + message.getSubject());
				}
			}
		}
	}
}
