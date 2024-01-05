# Credits
This app recycles the code & logic of Zignatures, with some improvements
https://github.com/zendesk/zignatures

Built with Oleg Gulevskyy's incredible Vite Boilerplate
https://github.com/OlegGulevskyy/zendesk-vite-boilerplate

# What is this?
A Zendesk Support App that uses Zendesk's New Custom Objects to let agents create custom HTML Based Signatures.
The HTML Signature's HTML Content is injected at the `ticket.save` event.
This app lives in the Zendesk Ticket Sidebar and the New Ticket Sidebar.

# Disclaimer
* I haven't tested this app an awful lot, so I won't promise that it runs flawlessly.
* Feel free to use this app and to change it in any way you like 
* I am not committed to continuously update and maintain this repo
* In addition, keep in mind that "badly written" HTML Code in signatures may increase your Spam Score. Using HTML Signatures in Zendesk Tickets may lead to your responses ending up in your customer's spam folder. 

# How to install this?
## Step 1: Enable Custom Objects in Zendesk
1. Go to your Zendesk Admin Center
2. Go to Custom Objects (NOT Legacy Objects) https://`YOUR_DOMAIN`.zendesk.com/admin/objects-rules/custom-objects/objects
3. If not enabled yet, turn on Custom Objects.

## Step 2: Create the "agent_signature" Object
1. Open Custom Objects in the Admin Center https://`YOUR_DOMAIN`.zendesk.com/admin/objects-rules/custom-objects/objects
2. Click `Create object`
3. Create a new Object with the following parameters:
  1. Name: "Agent Siganture"
  2. Plural: "Agent Signatures"
  3. Object Key: "agent_signature"
  4. Description: "Custom Object to be used with "Signatures App""

## Step 3: Set up the required fields
1. Open the Agent Signature object
2. Create the field: "HTML Signature"
  1. Type: `Multi-line`
  2. Name: `HTML Signature`
  3. Key: `html_signature`
3. Create the field: "Active"
  1. Type: `Checkbox`
  2. Name: `Active`
  3. Key. `Active`
4. Create the field "Agent"
  1. Type: `Lookup Relationship Field`
  2. Name: `Agent`
  3. Key: `agent`

### Field descriptions
HTML Signature -> Textfield that holds plain HTML Content
Active -> This app lets agents create and manage multiple signatures. Only one can be active at a time. Tells the app which signature to apply
Agent -> Lookup Relationship field so that an Admin can manage agent signatures through an Agent's "Related" tab

## Step 4: Upload the Zendesk App
1. Download the the latest app package https://github.com/robertschwarz/zendesk-app-html-signatures/releases
2. Go to the Apps section of Zendesk's Admin Center https://`{{YOUR_DOMAIN}}`.zendesk.com/admin/apps-integrations/apps/support-apps
3. Click "Upload private app"
4. Set an "App Name" annd upload select the app package
5. Click "Upload" and wait for it to finish
6. Arrange the app at the top or bottom of your app list