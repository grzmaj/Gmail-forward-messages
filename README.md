# Gmail-forward-messages
Easy forward messages in Gmail

In order to use this small script, you have to provide the value for three variables:
- domain - your domain name with '@' at the beginning (for example '@google.com')
- label_after_forward - forwarded messages will 
- people - accounts which should be checked and forwarded

How to use it?
1. Create labels named exactly the same as account names of people you will be forwarding your message to (if you forward messages to john.doe@google.com, create a label 'john.doe'
2. Create one more label where sent messages will be stored (such as 'Sent.messages')
3. Again create labels specified in point 1, but this time as sublabels of label from point 2, so that it looks like this:
  |
  |- john.doe
  |- sent.messages
    |- john.doe
    The steps above are just preparatory, you will do it only once
 4. Move messages you want to forward from your inbox to any label created in point 1
 5. Make sure all messages which you want to forward are unread
 6. Go to https://script.google.com and create a new project
 7. Name it whatever you want and copy the content of Gmail-forward-messages.js to the editor window and click run icon (near the icon of bug in upper menu)
 8. You will be asked if you want to allow Google to launch this script, allow it.
 9. Messages will be forwarded to specified e-mail addresses and old messages will be moved to label specified in 'label_after_forward' and marked as read.
